from django.contrib.auth.models import AbstractUser
from django.db import models

from django.db.models.signals import post_save
from django.dispatch import receiver

def get_default_preferences():
    return {
        "darkModePref": "light",
        "pfColor": "#4287f5"
    }

def get_default_courses():
    return {
        "activeCourses": [
            {
                "id": "span101",
                "lessons_completed": 0
            },
            {
                "id": "asl101",
                "lessons_completed": 0
            }
        ],
        "coursesCompleted": []
    }

class User(AbstractUser):
    name = models.CharField(max_length=25)
    # email and password are default of AbstractUser
    email = models.EmailField(unique=True)
    yearJoined = models.IntegerField(default=2024)
    pfp = models.ForeignKey("ProfilePicture", on_delete=models.SET_DEFAULT, default=1)
    preferences = models.JSONField(default=get_default_preferences)
    
    USERNAME_FIELD = 'email'  # Use email as the unique identifier
    REQUIRED_FIELDS = ['username', 'name']  # Fields required for superusers
    
    def __str__(self):
        return self.email

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
        return f"{self.course.name} - {self.name}"
    
class WordThrough(models.Model):
    lesson = models.ForeignKey(Lesson, on_delete=models.CASCADE)
    word = models.ForeignKey('Word', on_delete=models.CASCADE)
        
class Word(models.Model):
    lesson = models.ManyToManyField(Lesson, related_name='words')
    eng = models.CharField(max_length=255)
    span = models.CharField(max_length=255, null=True, blank=True)
    asl = models.FileField(upload_to='asl_translations/', null=True, blank=True)
    
    def __str__(self):
        return self.eng

class MissedWord(models.Model):
    word =  models.ForeignKey(Word, related_name='missed_words', on_delete=models.CASCADE)
    lesson =  models.ForeignKey(Lesson, related_name='missed_words', on_delete=models.CASCADE)
    times_missed = models.IntegerField(default=1)
    
    def __str__(self):
        return f"{self.word.eng} missed {self.times_missed} times"

class Card(models.Model):
    lesson = models.ForeignKey(Lesson, related_name='cards', on_delete=models.CASCADE)
    phrase = models.CharField(max_length=255, null=True, blank=True)
    options = models.JSONField(null=True, blank=True) 
    correct_translation = models.CharField(max_length=255, null=True, blank=True)
    correct_prompts = models.JSONField() 
    words_indices = models.JSONField(null=True, blank=True)
    note = models.JSONField(null=True, blank=True)
    times_missed = models.IntegerField(default=0)
    
    def __str__(self):
        return self.phrase or f"Card for {self.lesson.name}"

class UserCourse(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    lessons_completed = models.IntegerField(default=0)
    missed_words = models.ManyToManyField(MissedWord, blank=True, related_name='missed_by_users')
    missed_cards = models.ManyToManyField(Card, blank=True, related_name='missed_by_users')
    active = models.BooleanField(default=False)
    completed = models.BooleanField(default=False)
    
    @classmethod
    def get_active_courses(cls, user):
        return cls.objects.filter(user=user, active=True)
    
    @classmethod
    def get_completed_courses(cls, user):
        return cls.objects.filter(user=user, completed=True)
    
    def __str__(self):
        return f"{self.user.email} - {self.course.name} (Active: {self.active} | (Completed: {self.completed}))"

class UserLessonData(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    lesson = models.ForeignKey(Lesson, on_delete=models.CASCADE)
    time_to_complete =  models.DurationField()
    accuracy = models.IntegerField(default=0)
    
    def __str__(self):
        return f"{self.user.email} - {self.lesson.name}"
    
class ProfilePicture(models.Model):
    image = models.ImageField(upload_to='profile_pictures/')
    description = models.CharField(max_length=255, blank=True, null=True)

# adds default courses to new user accounts
@receiver(post_save, sender=User)
def create_default_courses(sender, instance, created, **kwargs):
    if created:
        default_course_ids = ["span101", "asl101"]
        for course_id in default_course_ids:
            try:
                course = Course.objects.get(id=course_id)
                UserCourse.objects.create(user=instance, course=course, active=True)
            except Course.DoesNotExist:
                pass
