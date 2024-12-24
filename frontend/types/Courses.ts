// Interfaces and functions for course-related objects
import { useUser } from "@/utils/user/UserContext";
import { User } from "./User";

export interface Course {
  id: string;
  name: string;
  shortname: string;
  length: string;
  description: string;
  lessons_completed?: number;
  lessons: Lesson[];
}

export interface Lesson {
  name: string;
  words: vocabWord[];
  cards: lessonCard[];
  lesson_no: number;
}

export interface vocabWord {
  eng: string;
  span: string;
}

export interface lessonCard {
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

export function addCoursetoUser(courseId: string, user: User | null) {
  if (!user) {
    return;
  }

  const found = user?.courses.active_courses.find(course => course.id === courseId);

  if (!found) {
    const newCourse = {id: courseId, lessons_completed: 0, missed_words: [], missed_cards: []}
    user?.courses.active_courses.push(newCourse);
    localStorage.setItem('user', JSON.stringify(user));
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

  setUser({
    ...user,
    courses: {
      ...user.courses,
      active_courses: updatedInfo,
    },
  });
}

export function getPercentValue(totalLessons: number, lessonsCompleted?: number) {
  if (lessonsCompleted == null || lessonsCompleted === 0) {
    return 0;
  }

  return Math.round((lessonsCompleted / totalLessons) * 100);
}
