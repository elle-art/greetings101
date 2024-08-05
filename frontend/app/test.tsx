// good state machine for flashcard component
'use client'
import { useCourses } from "@/utils/courses/CourseContext";
import { Button, Typography } from "@mui/material";
import { useState } from "react";
import { Course } from "@/types/Courses";

const stateMachineForLessons = (initialState = 0, maxState = 3) => {
    const [state, setState] = useState(initialState);

    const advanceState  = () => {
        setState((prevState) => (prevState + 1) % (maxState + 1));

    };

    return [state, advanceState] as const;
}

const Lesson: React.FC<{ course: Course; lessonNo: number }> = ({ course, lessonNo }) => {
    const [state, advanceState] = stateMachineForLessons(0, course.lessons[lessonNo].words.length - 1);
  
    return (
      <>
        <Typography variant="h2" component="div">
          {course?.name}
        </Typography>
        <Typography color="textSecondary" mt={1} fontSize="18px" fontWeight={400}>
          {course?.lessons[lessonNo]?.words[state]?.eng || "Word not found"}
        </Typography>
        <Typography color="textSecondary" fontSize="18px" fontWeight={400}>
          {course?.lessons[lessonNo]?.words[state]?.span || "Word not found"}
        </Typography>
        <Button
                    variant="contained"
                    onClick={advanceState}
                    sx={{
                      mt: "15px",
                      width: "150px",
                      "&:hover": {},
                    }}
                  >
                    Next
                  </Button>
      </>
    );
  };
  
  // Main page component
  const HomePage: React.FC = () => {
    const {courses} = useCourses();
    const course = courses.find(c => c.id === 'span101')
    if (!course) {return;}
    return (
      <div style={{ width: '100vw', height: '100vh' }}>
        <Lesson course={course} lessonNo={0} />
      </div>
    );
  };
  
  export default HomePage;
  
