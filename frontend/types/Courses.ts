import { API_BASE_URL, COURSES_ENDPOINT } from "@/utils/constants";

export interface Course {
    id: string;
    name: string;
    shortname: string;
    length: string;
    description: string;
    totalLessons: number;
    lessonsCompleted?: number;
  };

export function removeCourse(courseId: string, arr: Course[]){ 
  const index = arr.findIndex(c => c.id === courseId);
  
  if (index !== -1) {
    arr.splice(index, 1);
  }
  return arr;
}
