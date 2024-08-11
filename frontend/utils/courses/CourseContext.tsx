// Initializes course-related objects for app functions
// Sets courses [], myCourses [], inactiveCourses [], completedCourses []
"use client";
import { Course } from "@/types/Courses";
import { User } from "@/types/User";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useUser } from "../user/UserContext";
import { API_BASE_URL, COURSES_ENDPOINT } from "../constants";

interface CourseContextProps {
  user: User | null;
  courses: Course[];
  myCourses: Course[];
  inactiveCourses: Course[];
  completedCourses: Course[];
}

const CourseContext = createContext<CourseContextProps>({
  user: null,
  courses: [],
  myCourses: [],
  inactiveCourses: [],
  completedCourses: [],
});

interface CourseProviderProps {
  children: ReactNode;
}

export const CourseProvider = ({ children }: CourseProviderProps) => {
  const { user } = useUser();
  const [myCourses, setMyCourses] = useState<Course[] | []>([]);
  const [inactiveCourses, setInactiveCourses] = useState<Course[] | []>([]);
  const [completedCourses, setCompletedCourses] = useState<Course[] | []>([]);
  const [courses, setCourses] = useState<Course[] | []>([]);

  const fetchCourses = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}${COURSES_ENDPOINT}`);
      if (!response.ok) {
        throw new Error("Failed to fetch courses");
      }
      const data = await response.json();
      setCourses(data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  useEffect(() => {
    if (!user) {
      return;
    }

    let index = 0;
    const active: Course[] = [];
    const inactive: Course[] = [];

    for (const course of courses) {
      //add push loop for completed courses - add condition for inactive courses below [ if not in completed[] ]
      const activeCourseId = user.courses.activeCourses.find(
        (c) => c.id === course.id
      );

      if (activeCourseId) {
        active.push(course);
        index++;
      } else if (
        !active.find((activeCourse) => activeCourse.id === course.id)
      ) {
        inactive.push(course);
      }
    }
    setMyCourses(active);
    setInactiveCourses(inactive);
  }, [user, courses]);

  return (
    <CourseContext.Provider
      value={{ user, myCourses, inactiveCourses, completedCourses, courses }}
    >
      {children}
    </CourseContext.Provider>
  );
};

export const useCourses = () => useContext(CourseContext);
