from django.contrib import admin
from .models import ProfilePicture, User, Course, Lesson, WordThrough, Word, MissedWord, Card, UserCourse, UserLessonData


class WordInline(admin.TabularInline):
    model = WordThrough
    extra = 1  

class CardInline(admin.TabularInline):
    model = Card
    extra = 1  

class LessonAdmin(admin.ModelAdmin):
    list_display = ('name',)  
    inlines = [WordInline, CardInline]
    
admin.site.register(User)
admin.site.register(Course)
admin.site.register(Lesson, LessonAdmin)
admin.site.register(WordThrough)
admin.site.register(Word)
admin.site.register(MissedWord)
admin.site.register(Card)
admin.site.register(UserCourse)
admin.site.register(UserLessonData)
admin.site.register(ProfilePicture)
