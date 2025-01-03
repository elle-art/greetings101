"""
URL configuration for backendDB project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from . import views
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/csrf/', views.csrf_token_view, name="csrf_token_view"),
    path("users/", views.get_all_users, name="get_all_users"),
    path("users/<int:user_id>/", views.get_user_by_id, name="get_user_by_id"),
    path("users/login/", views.login, name="login"),
    path("users/signup/", views.signup, name="signup"),
    path("users/update/<int:user_id>/", views.update_user_info, name="update_user_info"),
    path("users/update_stats/<int:user_id>/<str:course_id>/<int:lesson_id>/<int:time>/<int:accuracy>/", views.update_user_lesson_stats, name="update_user_lesson_stats"),
    path('users/add/<int:user_id>/<str:course_id>/', views.add_active_courses, name='add_active_courses'),
    path("users/delete/<str:email>/", views.delete_user, name="delete_user"),
    path('courses/', views.get_courses, name='get_courses'),
    path('lesson/<str:course_id>/<int:lesson_no>/<int:state>/', views.get_lesson_data, name='get_lesson_data'),
    path("lesson/miss/<str:course_id>/<int:lesson_id>/<int:user_id>/<int:word_id>/<int:card_id>/", views.add_missed_word, name="add_missed_word"),
    path("api/get_profile_imgs/", views.get_profile_picture_options, name="get_profile_picture_options"), 
    path("api/get_user_pfp/<int:picture_id>/", views.get_user_pfp, name="get_user_pfp"), 
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
