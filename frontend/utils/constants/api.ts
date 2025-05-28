export const API_BASE_URL = 'https://greetings101-django-api.onrender.com/api';

// Gets CSRF token
export const CSRF_ENDPOINT = '/csrf/'

// Gets pfp image for user and all pfp options
export const PROFILE_IMGS_ENDPOINT = '/get_profile_imgs/'
export const USER_PFP_ENDPOINT = '/get_user_pfp/' //${user.pfp}

// Finds user data
export const LOGIN_ENDPOINT = '/users/login/';
// Creates a new user
export const SIGNUP_ENDPOINT = '/users/signup/';

// Updates user data
export const UPDATE_USER_ENDPOINT = '/users/update/'; //${user.id}
export const UPDATE_USER_STATS_ENDPOINT = '/users/update_stats/' //${user_id}/${course_id}/${lesson_id}/${timeinseconds}/${accuracy}/
export const ADD_USER_COURSE_ENDPOINT = '/users/add/'; //${user.id}/${course_id}

// Gets course data
export const COURSES_ENDPOINT = '/courses/';
// Gets and updates lesson data
export const LESSONS_ENDPOINT = '/lesson/' //${courseId}/${lessonNoAsNumber}/${state}/
export const MISS_ENDPOINT = '/lesson/miss/' //${course_id}/${lesson_id}/${user_id}/${word_id}/${card_id}/
