from django.contrib import admin
from .models import User, Course, Lesson, Word, Card


class WordInline(admin.TabularInline):
    model = Word
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
admin.site.register(Word)
admin.site.register(Card)
