// "End" card of lessons
import { Box, Button, Grid, Typography } from "@mui/material";
import CurvedTextWithImage from "./CurvedTextWithImage";
import { useCourses } from "@/utils/courses/CourseContext";
import ErrorIcon from "@mui/icons-material/Error";
import TrackChangesIcon from "@mui/icons-material/TrackChanges";
import TimerIcon from "@mui/icons-material/Timer";
import LibraryAddCheckIcon from "@mui/icons-material/LibraryAddCheck";
import { updateUserLessonProgress } from "@/types/Courses";
import { useRouter } from "next/navigation";
import { useUser } from "@/utils/user/UserContext";
import { calculateAverage } from "@/utils/courses/lessons/endOfLessonFunctions";

const EndOfLesson = (props: {
  courseId: string;
  lessonNo: number;
  accuracyArray: number[];
  totalMistakes: number;
  timeToComplete: number;
}) => {
  const { user, setUser } = useUser();
  const { courses } = useCourses();
  const course = courses.find((c) => c.id === props.courseId);
  const lesson = course?.lessons.find((lesson) => lesson.lesson_no === props.lessonNo);
  const router = useRouter();
  const lessonAccuracy = calculateAverage(props.accuracyArray);
  const formattedTime = `${Math.floor(props.timeToComplete / 1000 / 60)}:${String(Math.floor((props.timeToComplete / 1000) % 60)).padStart(2, '0')}`;

  function completeLesson() {
    if (user) {
      updateUserLessonProgress(user, setUser, props.courseId);
    }

    router.push(`/pages/Dashboard`);
  }

  return (
    <div>
      <Grid container spacing={1}>
        <Grid item xs={7}>
          <CurvedTextWithImage />
        </Grid>
        <Grid item xs={5} alignContent="center">
          <Box display="flex" alignItems="center" mt={1}>
            <LibraryAddCheckIcon sx={{ marginRight: 1, mt: "5px" }} />
            <Typography mt={1} fontSize="20px" fontWeight={400}>
              {lesson?.words.length} words learned
            </Typography>
          </Box>
          <Box display="flex" alignItems="center" mt={2}>
            <TimerIcon sx={{ marginRight: 1, mt: "5px" }} />
            <Typography mt={1} fontSize="20px" fontWeight={400}>
              {formattedTime} time spent
            </Typography>
          </Box>
          <Box display="flex" alignItems="center" mt={2}>
            <ErrorIcon sx={{ marginRight: 1, mt: "0px" }} />
            <Typography fontSize="20px" fontWeight={400}>
              {props.totalMistakes} mistakes made
            </Typography>
          </Box>
          <Box display="flex" alignItems="center" mt={2}>
            <TrackChangesIcon sx={{ marginRight: 1, mt: "8px" }} />
            <Typography mt={1} fontSize="20px" fontWeight={400}>
              {lessonAccuracy}% accuracy
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} alignContent="center">
          <Button
            onClick={() => completeLesson()}
            variant="contained"
            color="success"
            style={{ marginTop: "-150px", marginLeft: "50px", width: "80%" }}
          >
            Finish lesson
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default EndOfLesson;
