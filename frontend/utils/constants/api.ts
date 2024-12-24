export const API_BASE_URL = 'http://localhost:4000';

export const CSRF_ENDPOINT = '/api/csrf/'
export const PROFILE_IMGS_ENDPOINT = '/api/get_profile_imgs/'
export const USER_PFP_ENDPOINT = '/api/get_user_pfp/' //${user.pfp}

export const LOGIN_ENDPOINT = '/users/login/';
export const SIGNUP_ENDPOINT = '/users/signup/';

export const UPDATE_USER_ENDPOINT = '/users/update/'; //${user.id}
export const UPDATE_USER_STATS_ENDPOINT = '/users/update_stats/' //${user_id}/${course_id}/${lesson_id}/${timeinseconds}/${accuracy}/

export const COURSES_ENDPOINT = '/courses/';

export const LESSONS_ENDPOINT = '/lesson/' //${courseId}/${lessonNoAsNumber}/${state}/
export const MISS_ENDPOINT = '/lesson/miss/' //${course_id}/${lesson_id}/${user_id}/${word_id}/${card_id}/
