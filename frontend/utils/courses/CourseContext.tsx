// Initializes course-related objects for app functions
// Sets courses [], myCourses [], inactive_courses [], completed_courses []
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
  inactive_courses: Course[];
  completed_courses: Course[];
}

const CourseContext = createContext<CourseContextProps>({
  user: null,
  courses: [],
  myCourses: [],
  inactive_courses: [],
  completed_courses: [],
});

interface CourseProviderProps {
  children: ReactNode;
}

export const CourseProvider = ({ children }: CourseProviderProps) => {
  const { user } = useUser();
  const [myCourses, setMyCourses] = useState<Course[] | []>([]);
  const [inactive_courses, setInactive_courses] = useState<Course[] | []>([]);
  const [completed_courses, setCompleted_courses] = useState<Course[] | []>([]);
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
    if (!user || courses.length === 0) {
      return;
    }

    let index = 0;
    const active: Course[] = [];
    const completed: Course[] = [];
    const inactive: Course[] = [];

    for (const course of courses) {
      //add push loop for completed courses - add condition for inactive courses below [ if not in completed[] ]
      const active_courseId = user.courses.active_courses.find(
        (c) => c.id === course.id);

      const completed_courseId = user.courses.completed_courses.find(
        (c) => c.id === course.id
      );

      if (active_courseId) {
        active.push(course);
        index++;
      } else if (completed_courseId) {
        completed.push(course);
      } else {
        inactive.push(course);
      }
    }

    setMyCourses((prev) => {
      if (JSON.stringify(prev) !== JSON.stringify(active)) {
        return active;
      }
      return prev;
    });

    setCompleted_courses((prev) => {
      if (JSON.stringify(prev) !== JSON.stringify(completed)) {
        return completed;
      }
      return prev;
    });

    setInactive_courses((prev) => {
      if (JSON.stringify(prev) !== JSON.stringify(inactive)) {
        return inactive;
      }
      return prev;
    });
  }, [user, courses]);

  return (
    <CourseContext.Provider
      value={{ user, myCourses, inactive_courses, completed_courses, courses }}
    >
      {children}
    </CourseContext.Provider>
  );
};

export const useCourses = () => useContext(CourseContext);
