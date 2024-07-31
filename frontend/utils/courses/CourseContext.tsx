'use client'
import { Course, courses } from "@/types/Courses";
import { User } from "@/types/User";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { useUser } from "../user/UserContext";

interface CourseContextProps {
    user: User | null;
    myCourses: Course[];
    inactiveCourses: Course[];
    completedCourses: Course[];
}

const CourseContext = createContext<CourseContextProps> ({
    user: null,
    myCourses: [],
    inactiveCourses: [],
    completedCourses: [],
})

interface CourseProviderProps {
    children: ReactNode;
}

export const CourseProvider = ({ children }: CourseProviderProps) => {
    const { user } = useUser();
    const [myCourses, setMyCourses] = useState<Course[] | []>([]);
    const [inactiveCourses, setInactiveCourses] = useState<Course[] | []>([]);
    const [completedCourses, setCompletedCourses] = useState<Course[] | []>([]);

    useEffect(() => {
        if (!user) {
            return;
        }
        
        let index = 0;
        const active: Course[] = [];
        const inactive: Course[] = [];
        
        for (const course of courses) {
            //add push loop for completed courses - add condition for inactive courses below [ if not in completed[] ]
            const activeCourseId = user.courses.activeCourses?.length > index ? user.courses.activeCourses[index].id : null;
            
            if (activeCourseId && activeCourseId === course.id) {
                active.push(course);
                index++;
            } else if (!active.find(activeCourse => activeCourse.id === course.id)) {
                inactive.push(course);
                }
        }
        setMyCourses(active);
        setInactiveCourses(inactive);
        console.log('active courses set.', myCourses);
        console.log('inactive courses set.', inactiveCourses);
    }, [user]);


    return (
        <CourseContext.Provider value={{ user, myCourses, inactiveCourses, completedCourses }}>
          {children}
        </CourseContext.Provider>
      );
};

export const useCourses = () => useContext(CourseContext);