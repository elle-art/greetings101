// Initializes course-related objects for app functions
// Sets courses [], myCourses [], inactive_courses [], completed_courses []
"use client";
import { Course, Language, Lesson } from "@/types/Courses";
import { User } from "@/types/User";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
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
  myVocabList: Lesson[];
  setVocabList: Dispatch<SetStateAction<Lesson[] | []>>;
}

const CourseContext = createContext<CourseContextProps>({
  user: null,
  courses: [],
  myCourses: [],
  inactive_courses: [],
  completed_courses: [],
  myVocabList: [],
  setVocabList: () => {},
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
  const [myVocabList, setVocabList] = useState<Lesson[] | []>([]);

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

    const active: Course[] = [];
    const completed: Course[] = [];
    const inactive: Course[] = [];
    const vocab: Lesson[] = []; // holds list of completed lessons (with their vocab words) - for VocabList, Flashcard

    for (const course of courses) {
      const active_courseId = user.courses.active_courses.find(
        (c) => c.id === course.id);

      const completed_courseId = user.courses.completed_courses.find(
        (c) => c.id === course.id
      );

      if (active_courseId) {
        active.push(course); // adds the course to the user's active courses list

        for (let i = 0; i < (course.lessons_completed? course.lessons_completed : 0); i++) { // adds the lessons completed to the users' vocab list with the course id and the language
          let lessonObj = course.lessons[i];
          
          lessonObj.course_id = course.id;
          lessonObj.language = (course.shortname.split(" ")[0].toLowerCase()) as Language
            
          vocab.push(lessonObj); 
        }
      } else if (completed_courseId) {
        completed.push(course);// adds the course to the user's completed courses list

        for (let lessonObj of course.lessons) { // adds the lessons to the users' vocab list with the course id and the language    
          lessonObj.course_id = course.id;
          lessonObj.language = (course.shortname.split(" ")[0].toLowerCase()) as Language
            
          vocab.push(lessonObj);
        }
      } else {
        inactive.push(course); // adds the course to the user's active courses list
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

    setVocabList((prev) => {
      if (JSON.stringify(prev) !== JSON.stringify(vocab)) {
        return vocab;
      }
      return prev;
    });
  }, [user, courses]);

  return (
    <CourseContext.Provider
      value={{ user, myCourses, inactive_courses, completed_courses, courses, myVocabList, setVocabList }}
    >
      {children}
    </CourseContext.Provider>
  );
};

export const useCourses = () => useContext(CourseContext);
