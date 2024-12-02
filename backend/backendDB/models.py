from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    name = models.CharField(max_length=25)
    email = models.CharField(max_length=100)
    password = models.CharField(max_length=50)
    yearJoined = models.IntegerField()
    preferences = models.JSONField(default=lambda: {
        "darkModePref": "light",
        "pfpId": "default",
        "pfColor": "default"
    })
    courses = models.JSONField(default=lambda: {
        "activeCourses": [],
        "coursesCompleted": []
    })
    
    def __str__(self):
        return self.username

class Course(models.Model):
    name = models.CharField(max_length=100)
    shortname = models.CharField(max_length=25)
    length = models.CharField(max_length=15)
    description = models.CharField(max_length=200)
    
    def __str__(self):
        return self.name

class Lesson(models.Model):
    course = models.ForeignKey(Course, related_name='lessons', on_delete=models.CASCADE)
    index = models.PositiveIntegerField()
    name = models.CharField(max_length=100)
    words = models.JSONField()
    cards = models.JSONField()
    
    def __str__(self):
        return self.name

    class Meta:
        ordering = ['index']
