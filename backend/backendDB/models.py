from django.contrib.auth.models import AbstractUser
from django.db import models

def get_default_preferences():
    return {
        "darkModePref": "light",
        "pfpId": "default",
        "pfColor": "default"
    }

def get_default_courses():
    return {
        "activeCourses": [
            {
                "id": "span101",
                "lessonsCompleted": 0
            },
            {
                "id": "asl101",
                "lessonsCompleted": 0
            }
        ],
        "coursesCompleted": []
    }

class User(AbstractUser):
    name = models.CharField(max_length=25)
    email = models.CharField(max_length=100)
    password = models.CharField(max_length=250)
    yearJoined = models.IntegerField(default=2024)
    preferences = models.JSONField(default=get_default_preferences)
    courses = models.JSONField(default=get_default_courses)
    
    def __str__(self):
        return self.username

class Course(models.Model):
    id = models.CharField(max_length=100, primary_key=True)
    name = models.CharField(max_length=100)
    shortname = models.CharField(max_length=25)
    length = models.CharField(max_length=15)
    description = models.CharField(max_length=200)
    
    def __str__(self):
        return self.name

class Lesson(models.Model):
    course = models.ForeignKey(Course, related_name='lessons', on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    lesson_no = models.IntegerField(default=0)
    
    def __str__(self):
        return self.name
        
class Word(models.Model):
    lesson = models.ForeignKey(Lesson, related_name='words', on_delete=models.CASCADE)
    eng = models.CharField(max_length=255)
    span = models.CharField(max_length=255)

class Card(models.Model):
    lesson = models.ForeignKey(Lesson, related_name='cards', on_delete=models.CASCADE)
    phrase = models.CharField(max_length=255, null=True, blank=True)
    options = models.JSONField(null=True, blank=True) 
    correct_translation = models.CharField(max_length=255, null=True, blank=True)
    correct_prompts = models.JSONField() 
    words_indices = models.JSONField(null=True, blank=True)
