// Interfaces and functions for course-related objects
import { useUser } from "@/utils/user/UserContext";
import { User } from "./User";
import { ADD_USER_COURSE_ENDPOINT, API_BASE_URL, getCSRFToken } from "@/utils/constants";
import Cookies from "js-cookie";

export interface Course {
  id: string;
  name: string;
  shortname: string;
  length: string;
  description: string;
  lessons_completed?: number;
  lessons: Lesson[];
  prerequisites: string[];
}

export type Language = 'eng' | 'span' | 'asl';

export interface Lesson {
  name: string;
  words: vocabWord[];
  cards: lessonCard[];
  lesson_no: number;
  language?: Language | null;
  course_id?: string;
}

export interface vocabWord {
  id: number;
  eng: string;
  span: string | null;
  asl: string | null;
  lesson_no?: number;
}

export interface lessonCard {
  id: number;
  words_indices?: number[];
  phrase?: string;
  options?: string[];
  correct_translation?: string;
  correct_prompts: Prompts;
}

export interface Prompts {
  title: string;
  translation: string;
  note?: string[];
}

export function addCoursetoUser(course_id: string, user: User | null) {
  if (!user) {
    return;
  }

  const found = user?.courses.active_courses.find(course => course.id === course_id);

  if (!found) {
    const updateUserLessons = async () => {
      if (!user) {
        console.error('No user found');
        return;
      }

      const updatedUser = { ...user };

      updatedUser.courses.active_courses.push({ id: course_id, lessons_completed: 0, missed_words: [], missed_cards: [] })
      console.log("update", updatedUser)
      const csrfToken = getCSRFToken();
      console.log('CSRF Token:', Cookies.get('csrftoken'));
      const response = await fetch(`${API_BASE_URL}${ADD_USER_COURSE_ENDPOINT}${updatedUser.id}/${course_id}/`, {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrfToken,
        },
        body: JSON.stringify(updatedUser),
      });

      if (response.ok) {
        const result = await response.json();
        localStorage.setItem('user', JSON.stringify(result.user));
        console.log('response ok')
        console.log('response json:', JSON.stringify(result.user))

      } else {
        console.log('response NOT ok')

        console.error('Failed to update user courses');
      }
    };

    updateUserLessons();
  }
}

export function setUserCourseProgress(arr: Course[]) {
  //need to set back to null on log out
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { user } = useUser();

  arr.forEach((course) => {

    const userCourse = user?.courses.active_courses.find(
      (active) => active.id === course.id
    );

    if (userCourse) {
      course.lessons_completed =
        userCourse.lessons_completed;
    }
  });
}

export function updateUserLessonProgress(user: User, setUser: (user: User | null) => void, id: string) {
  if (!user) return;

  const updatedInfo = user.courses.active_courses.map((course) =>
    course.id === id
      ? { ...course, lessons_completed: course.lessons_completed + 1 }
      : course
  );

  const updatedUser = {
    ...user,
    courses: {
      ...user.courses,
      active_courses: updatedInfo,
    },
  };

  setUser(updatedUser);
  localStorage.setItem("user", JSON.stringify(updatedUser));
}

export function getPercentValue(totalLessons: number, lessonsCompleted?: number) {
  if (lessonsCompleted == null || lessonsCompleted === 0) {
    return 0;
  }

  return Math.round((lessonsCompleted / totalLessons) * 100);
}
