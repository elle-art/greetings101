from rest_framework import serializers

# Word serializer
class WordSerializer(serializers.Serializer):
    eng = serializers.CharField()
    span = serializers.CharField()
    asl = serializers.FileField()

# Card serializer
class CardSerializer(serializers.Serializer):
    words_indices = serializers.ListField(child=serializers.IntegerField())
    phrase = serializers.CharField(required=False)
    options = serializers.ListField(child=serializers.CharField(), required=False)
    correct_translation = serializers.CharField(required=False)
    correct_prompts = serializers.DictField()

# Lesson serializer
class LessonSerializer(serializers.Serializer):
    name = serializers.CharField()
    lesson_no = serializers.IntegerField()
    words = WordSerializer(many=True)
    cards = CardSerializer(many=True)

# Course serializer
class CourseSerializer(serializers.Serializer):
    id = serializers.CharField()
    name = serializers.CharField()
    shortname = serializers.CharField()
    length = serializers.CharField()
    description = serializers.CharField()
    lessons = LessonSerializer(many=True)
