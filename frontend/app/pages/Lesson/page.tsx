'use client';
import { Button, Typography } from "@mui/material";
import useLessonStateMachine from "@/utils/courses/useLessonStateMachine";
import MatchCard from "@/app/components/lessons/MatchCard";
import { useSearchParams } from "next/navigation";
import { useCourses } from "@/utils/courses/CourseContext";

const Lesson = () => {
    const searchParams = useSearchParams();
    const courseId = searchParams.get('courseId');
    const lessonNo = searchParams.get('lessonsCompleted');
    const lessonNoAsNumber = lessonNo ? parseInt(lessonNo, 10): 0;
    const [state, advanceState] = useLessonStateMachine();
    const { courses } = useCourses();
    const course = courses.find(c => c.id === courseId);

    const renderState = () => { // should make functions for each lesson? probably in backend?
      switch (state) {
        case 0:
          return (
            <MatchCard courseId={courseId || ''} lessonNo={lessonNoAsNumber} onAdvance={advanceState} />
          );
        case 1:
          return ( <Typography variant="h2" component="div">
            case 1
          </Typography>);
        case 2:
          return(<Typography variant="h2" component="div">
          case 2
        </Typography>);
        case 3:
          return (<Typography variant="h2" component="div">
            case 3
          </Typography>);
        case 4:
          return (<Typography variant="h2" component="div">
            case 4
          </Typography>);
        case 5:
          return (<Typography variant="h2" component="div">
            case 5
          </Typography>);
        case 6:
          return(<Typography variant="h2" component="div">
            case 6
          </Typography>);
        default:
          return null;

      }
    };

    return (
      <div style={{ width: '100vw', height: '100vh' }}>
        <Typography variant="h1" component="div">
            {course?.shortname}: {course?.lessons[lessonNoAsNumber].name}
          </Typography>
        {/* add progress bar */}
        {renderState()}
      </div>
    );
};
  
  export default Lesson;
  

