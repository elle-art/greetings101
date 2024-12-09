from .models import Lesson, Course, User
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.hashers import make_password, check_password
from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import CourseSerializer
import json
import datetime

import logging
logger = logging.getLogger(__name__)

# Create your views here.
@csrf_exempt
def get_all_users(req):
    if req.method == "GET":
        users = User.objects.all()
        hashed_users = [
            {
                "id": user.id,
                "name": user.name,
                "email": user.email,
                "password": make_password(user.password),
                "yearJoined": user.yearJoined,
                "preferences": user.preferences,
                "courses": user.courses,
            }
            for user in users
        ]
        return JsonResponse(hashed_users, safe=False)
    
@csrf_exempt
def get_user_by_id(req, user_id):
    if req.method == "GET":
        user = get_object_or_404(User, id=user_id)
        hashed_user = [
            {
                "id": user.id,
                "name": user.name,
                "email": user.email,
                "password": make_password(user.password),
                "yearJoined": user.yearJoined,
                "preferences": user.preferences,
                "courses": user.courses,
            }
        ]
        return JsonResponse(hashed_user)

@csrf_exempt
def login(request):
    if request.method == "POST":
        data = json.loads(request.body)
        email = data.get("email")
        password = data.get("password")
        user = User.objects.filter(email=email).first()
        if user and check_password(password, user.password):
            response_data = {
                "message": "Login successful",
                "user": {
                    "id": user.id,
                    "name": user.name,
                    "email": user.email,
                    "yearJoined": user.yearJoined,
                    "preferences": user.preferences,
                    "courses": user.courses,
                },
            }
            return JsonResponse(response_data)
        return JsonResponse({"message": "Invalid credentials"}, status=401)

@csrf_exempt
def signup(request):
    if request.method == "POST":
        data = json.loads(request.body)
        name = data.get("name")
        email = data.get("email")
        password = data.get("password")

        if User.objects.filter(email=email).exists():
            return JsonResponse({"message": "User already exists"}, status=400)

        current_year = datetime.datetime.now().year
        new_user = User.objects.create(
            username=email.split("@")[0],
            name=name,
            email=email,
            password=make_password(password),
            yearJoined=current_year,
        )
        return JsonResponse({"message": "Signup successful", "id": new_user.id}, status=201)

@csrf_exempt
def update_user_info(request, user_id):
    if request.method == "PUT":
        user = get_object_or_404(User, id=user_id)
        data = json.loads(request.body)
        user.name = data.get("name", user.name)
        user.email = data.get("email", user.email)
        user.password = make_password(data.get("password", user.password))
        user.preferences.update(data.get("preferences", {}))
        user.save()
        return JsonResponse({"message": "User updated"})

@csrf_exempt
def delete_user(request, email):
    if request.method == "DELETE":
        user = User.objects.filter(email=email).first()
        if user:
            user.delete()
            return JsonResponse({"message": "User deleted successfully"})
        return JsonResponse({"message": "User not found"}, status=404)

@api_view(['GET'])
def get_courses(request):
    courses = Course.objects.all()
    serializer = CourseSerializer(courses, many=True)
    return Response(serializer.data)

def get_component_for_state(state):
    state_component_map = {
        0: "MatchCard",
        1: "TranslatePhraseCard",
        2: "EndOfLesson",
    }
    return state_component_map.get(int(state), "UnknownComponent")

def get_course_data(request):
    course_id = request.GET.get('courseId')
    lesson_no = int(request.GET.get('lessonNo'))
    state = request.GET.get('state')

    course = get_object_or_404(Course, id=course_id)
    lessons = course.lessons.all() 
    lesson = get_object_or_404(Lesson, course=course, lesson_no=lesson_no)

    component = get_component_for_state(state)

    return JsonResponse({
        "component": component,
        "courseId": course_id,
        "lessonNo": lesson_no,
        "lessons": [
            {
                "lesson_no": lesson.lesson_no,
                "lesson_name": lesson.name,
            }
            for lesson in lessons
        ]})

def get_lesson_data(request, course_id, lesson_no, state):
    logger.debug(f"Request received: {request.method} for course_id: {course_id}, lesson_no: {lesson_no}, state: {state}")
    course = Course.objects.get(id=course_id)
    lesson = course.lessons.get(lesson_no=lesson_no)

    lesson_state_functions = {
        "span101": {
            "lesson0": {
            0: "MatchCard",
            1: "TranslatePhraseCard",
            2: "MatchCard", #replace
            3: "TranslatePhraseCard",
            4: "MatchCard",
            5: "TranslatePhraseCard",
            6: "MatchCard", #replace
            7: "TranslatePhraseCard",
            8: "TranslatePhraseCard",
            9: "MatchCard",
            10: "EndOfLesson",
            },
            "lesson1": {
            0: "TranslatePhraseCard",
            1: "TranslatePhraseCard",
            2: "MatchCard",
            3: "TranslatePhraseCard",
            4: "MatchCard", #replace
            5: "MatchCard",
            6: "TranslatePhraseCard",
            7: "TranslatePhraseCard",
            8: "EndOfLesson",
            },
            "lesson2": {
            0: "MatchCard",
            1: "TranslatePhraseCard",
            2: "TranslatePhraseCard",
            3: "MatchCard",
            4: "TranslatePhraseCard",
            5: "TranslatePhraseCard",
            6: "MatchCard",
            7: "EndOfLesson",
            },
            "lesson3": {
            0: "MatchCard", #replace
            1: "MatchCard",
            2: "TranslatePhraseCard",
            3: "TranslatePhraseCard",
            4: "MatchCard",
            5: "TranslatePhraseCard",
            6: "EndOfLesson",
            },
            "lesson4": {
            0: "TranslatePhraseCard",
            1: "MatchCard",
            2: "TranslatePhraseCard",
            3: "TranslatePhraseCard",
            4: "EndOfLesson",
            },
        },
        "asl101": {
            "lesson0": {},
        },
    }

    try:
        component = lesson_state_functions[course.id][f"lesson{lesson_no}"].get(state)
    except KeyError:
        return JsonResponse({"error": "Invalid state or lesson"}, status=400)

    return JsonResponse({"component": component, "lessonNo": lesson_no, "courseId": course_id})
