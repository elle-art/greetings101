// Interfaces and functions for course-related objects
import { useUser } from "@/utils/user/UserContext";
import { User } from "./User";

export interface Course {
  id: string;
  name: string;
  shortname: string;
  length: string;
  description: string;
  lessonsCompleted?: number;
  lessons: Lesson[];
}

export interface Lesson {
  name: string;
  words: vocabWord[];
  cards: lessonCard[];
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

  const found = user?.courses.activeCourses.find(course => course.id === courseId);

  if (!found) {
    const newCourse = {id: courseId, lessonsCompleted: 0}
    user?.courses.activeCourses.push(newCourse);
    console.log(user?.courses.activeCourses);
    localStorage.setItem('user', JSON.stringify(user));
  }
}

export function setUserCourseProgress(arr: Course[]) {
  //need to set back to null on log out
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { user } = useUser();
  let idx = 0;

  arr.forEach((course) => {
    if (course.id === user?.courses.activeCourses[idx].id) {
      course.lessonsCompleted =
        user?.courses.activeCourses[idx].lessonsCompleted;
    }
    idx++;
  });
}

export function updateUserLessonProgress(user: User, setUser: (user: User | null) => void, id: string) {
  if (!user) return;

  const updatedInfo = user.courses.activeCourses.map((course) =>
    course.id === id
    ? { ...course, lessonsCompleted: course.lessonsCompleted + 1 }
    : course
  );

  setUser({
    ...user,
    courses: {
      ...user.courses,
      activeCourses: updatedInfo,
    },
  });
}

export function getPercentValue(totalLessons: number, lessonsCompleted?: number) {
  if (lessonsCompleted == null || lessonsCompleted === 0) {
    return 0;
  }

  return Math.round((lessonsCompleted / totalLessons) * 100);
}
