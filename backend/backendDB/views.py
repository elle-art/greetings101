from .models import Card, Lesson, Course, MissedWord, ProfilePicture, User, UserCourse, UserLessonData, Word
from django.http import HttpResponseBadRequest, JsonResponse
from django.views.decorators.csrf import csrf_exempt, ensure_csrf_cookie
from django.contrib.auth.hashers import make_password, check_password
from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view
from django.views.decorators.http import require_http_methods
from rest_framework.response import Response
from .serializers import CourseSerializer
import json
import datetime

@ensure_csrf_cookie
def csrf_token_view(request):
    return JsonResponse({"message": "CSRF cookie set"})


# Create your views here.
@csrf_exempt
def get_all_users(req):
    if req.method == "GET":
        users = User.objects.all()
        
        hashed_users = []
        for user in users:
            active_courses = user.usercourse_set.filter(active=True)
            completed_courses = user.usercourse_set.filter(completed=True)
            hashed_users.append({
                "id": user.id,
                "name": user.name,
                "email": user.email,
                "password": make_password(user.password),
                "yearJoined": user.yearJoined,
                "pfp": user.pfp,
                "preferences": user.preferences,
                "courses": {
                    "active_courses": [
                        {
                            "id": course.course.id,
                            "lessons_completed": course.lessons_completed,
                            "missed_words": list(course.missed_words.values()),
                            "missed_cards": list(course.missed_cards.values()),
                        }
                        for course in active_courses
                    ],
                    "completed_courses": [
                        {
                            "id": course.course.id,
                            "lessons_completed": course.lessons_completed,
                            "missed_words": list(course.missed_words.values()),
                            "missed_cards": list(course.missed_cards.values()),
                        }
                        for course in completed_courses
                    ]
                }
            })
            
        return JsonResponse(hashed_users, safe=False)
    
@csrf_exempt
def get_user_by_id(req, user_id):
    if req.method == "GET":
        user = get_object_or_404(User, id=user_id)
        active_courses = user.usercourse_set.filter(active=True)
        completed_courses = user.usercourse_set.filter(completed=True)
        hashed_user = [
            {
                "id": user.id,
                "name": user.name,
                "email": user.email,
                "password": make_password(user.password),
                "yearJoined": user.yearJoined,
                "pfp": user.pfp,
                "preferences": user.preferences,
                "courses": {
                    "active_courses": [
                        {
                            "id": course.course.id,
                            "lessons_completed": course.lessons_completed,
                            "missed_words": list(course.missed_words.values()),
                            "missed_cards": list(course.missed_cards.values()),
                        }
                        for course in active_courses
                    ],
                    "completed_courses": [
                        {
                            "id": course.course.id,
                            "lessons_completed": course.lessons_completed,
                            "missed_words": list(course.missed_words.values()),
                            "missed_cards": list(course.missed_cards.values()),
                        }
                        for course in completed_courses
                    ]
                }
            }
        ]
        return JsonResponse(hashed_user, safe=False)

def login(request):
    if request.method == "POST":
        data = json.loads(request.body)
        email = data.get("email")
        password = data.get("password")
        user = User.objects.filter(email=email).first()
        if user:
            active_courses = user.usercourse_set.filter(active=True)
            completed_courses = user.usercourse_set.filter(completed=True)
            if check_password(password, user.password):
                response_data = {
                    "message": "Login successful",
                    "user": {
                        "id": user.id,
                        "name": user.name,
                        "email": user.email,
                        "yearJoined": user.yearJoined,
                        "pfp": user.pfp.id,
                        "preferences": user.preferences,
                        "courses": {
                            "active_courses": [
                                {
                                    "id": course.course.id,
                                    "lessons_completed": course.lessons_completed,
                                    "missed_words": list(course.missed_words.values()),
                                    "missed_cards": list(course.missed_cards.values()),
                                }
                                for course in active_courses
                            ],
                            "completed_courses": [
                                {
                                    "id": course.course.id,
                                    "lessons_completed": course.lessons_completed,
                                    "missed_words": list(course.missed_words.values()),
                                    "missed_cards": list(course.missed_cards.values()),
                                }
                                for course in completed_courses
                            ]
                        }
                    },
                }
                return JsonResponse(response_data)

        return JsonResponse({"message": "Invalid credentials"}, status=401)

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

@api_view(["PUT"])
def update_user_info(request, user_id):
    if request.method == "PUT":
        try: 
            user = get_object_or_404(User, id=user_id)
            data = json.loads(request.body)
        except json.JSONDecodeError:
            return HttpResponseBadRequest("Invalid JSON data")
        
        user.name = data.get("name", user.name)
        user.email = data.get("email", user.email)
        if "password" in data:
            user.set_password(data["password"])
        
        if "pfp" in data:
            pfp_id = data["pfp"]
            user.pfp = ProfilePicture.objects.get(id=pfp_id) 
        
        if "preferences" in data:
            user.preferences = {**user.preferences, **data["preferences"]}
        
        if "courses" in data:
            courses_data = data.get("courses", {})
            
        if "active_courses" in courses_data:
            for course_data in courses_data["active_courses"]:
                print("Course data:", course_data)
                print("Course ID:", course_data.get("id"))
                course_id = course_data.get("id")
                lessons_completed = course_data.get("lessons_completed", 0)
                missed_words = course_data.get("missed_words", [])
                missed_cards = course_data.get("missed_cards", [])
                missed_word_ids = [word['id'] for word in missed_words]
                missed_card_ids = [card['id'] for card in missed_cards] 
                    
                if course_id:
                    course = get_object_or_404(Course, id=course_id)
                    user_course, created = UserCourse.objects.get_or_create(user=user, course=course)
                    user_course.lessons_completed = lessons_completed
                    user_course.is_active = True
                    user_course.is_completed = False
                    user_course.missed_words.set(missed_word_ids)
                    user_course.missed_cards.set(missed_card_ids)
                    user_course.save()
            
            if "completed_courses" in courses_data:
                for course_data in courses_data["completed_courses"]:
                    course_id = course_data.get("id")["id"]
                    lessons_completed = course_data.get("lessons_completed", 0)
                    missed_words = course_data.get("missed_words", [])
                    missed_cards = course_data.get("missed_cards", [])
                    missed_word_ids = [word['id'] for word in missed_words]
                    missed_card_ids = [card['id'] for card in missed_cards] 
                    
                    if course_id:
                        course = get_object_or_404(Course, id=course_id)
                        user_course, created = UserCourse.objects.get_or_create(user=user, course=course)
                        user_course.lessons_completed = lessons_completed
                        user_course.is_active = False
                        user_course.is_completed = True
                        user_course.missed_words.set(missed_word_ids)
                        user_course.missed_cards.set(missed_card_ids)
                        user_course.save()
        
        user.save()
        
        active_courses = user.usercourse_set.filter(active=True)
        completed_courses = user.usercourse_set.filter(completed=True)
        return_data = {
            "message": "User updated",
            "user": {
                "id": user.id,
                "name": user.name,
                "email": user.email,
                "yearJoined": user.yearJoined,
                "pfp": user.pfp.id,
                "preferences": user.preferences,
                "courses": {
                    "active_courses": [
                        {
                            "id": course.course.id,
                            "lessons_completed": course.lessons_completed,
                            "missed_words": list(course.missed_words.values()),
                            "missed_cards": list(course.missed_cards.values()),
                        }
                        for course in active_courses
                    ],
                    "completed_courses": [
                        {
                            "id": course.course.id,
                            "lessons_completed": course.lessons_completed,
                            "missed_words": list(course.missed_words.values()),
                            "missed_cards": list(course.missed_cards.values()),
                        }
                        for course in completed_courses
                    ],
                },
            },
        }
        
        return JsonResponse(return_data)

@api_view(['POST'])
def update_user_lesson_stats(request, user_id, course_id, lesson_id, time, accuracy):
    if request.method == "POST":
        course = get_object_or_404(Course, id=course_id)
        lesson = get_object_or_404(Lesson, id=lesson_id)
        user = get_object_or_404(User, id=user_id)
        user_course = get_object_or_404(UserCourse, user=user, course=course)
        
        # increment lessons completed
        user_course.lessons_completed += 1
        user_course.save()
        
        # convert time in seconds to timedelta
        time_to_complete = datetime.timedelta(seconds=time)
        
        # create UserLessonData object
        lesson_stats = UserLessonData.objects.create(user=user, course=course, lesson=lesson, time_to_complete=time_to_complete, accuracy=accuracy)
        
        return JsonResponse({"message": "User lesson stats updated successfully."})

@api_view(['PUT'])
def add_active_courses(request, user_id, course_id):
    course = get_object_or_404(Course, id=course_id)
    user = get_object_or_404(User, id=user_id)
    user_course = get_object_or_404(UserCourse, user=user, course=course)
    
    user_course.active = True
    user_course.save() 
    
    active_courses = user.usercourse_set.filter(active=True)
    completed_courses = user.usercourse_set.filter(completed=True)
    return_data = {
        "message": "User updated",
        "user": {
            "id": user.id,
            "name": user.name,
            "email": user.email,
            "yearJoined": user.yearJoined,
            "pfp": user.pfp.id,
            "preferences": user.preferences,
            "courses": {
                "active_courses": [
                    {
                        "id": course.course.id,
                        "lessons_completed": course.lessons_completed,
                        "missed_words": list(course.missed_words.values()),
                        "missed_cards": list(course.missed_cards.values()),
                    }
                    for course in active_courses
                ],
                "completed_courses": [
                    {
                        "id": course.course.id,
                        "lessons_completed": course.lessons_completed,
                        "missed_words": list(course.missed_words.values()),
                        "missed_cards": list(course.missed_cards.values()),
                    }
                    for course in completed_courses
                ],
            },
        },
    }
    return JsonResponse(return_data)

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

def get_lesson_data(request, course_id, lesson_no, state):
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
        words = lesson.words.all()  
        cards = lesson.cards.all()
        
        lesson_data = {
            "component": component,
            "lessonNo": lesson_no,
            "courseId": course_id,
            "lessonData": {
                "words": [
                    {
                        "id": word.id,  # Include vocab word ID
                        "eng": word.eng,
                        "span": word.span,
                    }
                    for word in words
                ],
                "cards": [
                    {
                        "id": card.id,  # Include card ID
                        "phrase": card.phrase,
                        "correct_translation": card.correct_translation,
                    }
                    for card in cards
                ],
            }
        }
    except KeyError:
        return JsonResponse({"error": "Invalid state or lesson"}, status=400)

    return JsonResponse(lesson_data)

@api_view(['POST'])
def add_missed_word(request, course_id, lesson_id, user_id, word_id, card_id):
    course = get_object_or_404(Course, id=course_id)
    lesson = get_object_or_404(Lesson, id=lesson_id)
    user = get_object_or_404(User, id=user_id)
    word = get_object_or_404(Word, id=word_id)
    card = get_object_or_404(Card, id=card_id)
    user_course = get_object_or_404(UserCourse, user=user, course=course)
    
    # updates component data
    card.times_missed += 1
    card.save()
    missed_word, created = MissedWord.objects.get_or_create(word=word, lesson=lesson)
    
    if not created:
        missed_word.times_missed += 1
        missed_word.save()
    
    # updates user course data
    user_course.missed_words.add(missed_word)
    user_course.missed_cards.add(card)
    
    return JsonResponse({"message": "Missed word and card updated successfully."})

@api_view(['GET'])
def get_profile_picture_options(request):
    options = ProfilePicture.objects.all()
    data = [{'id': option.id, 'url': option.image.url, 'description': option.description} for option in options]
    return JsonResponse(data, safe=False)

@api_view(['GET'])
def get_user_pfp(request, picture_id):
    picture = get_object_or_404(ProfilePicture, id=picture_id)
    data = {'id': picture.id, 'url': picture.image.url, 'description': picture.description}
    return JsonResponse(data, safe=False)
