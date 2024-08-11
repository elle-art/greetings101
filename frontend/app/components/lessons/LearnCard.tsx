// Learn card for lessons
import { useCourses } from "@/utils/courses/CourseContext";
import { Grid, Typography } from "@mui/material";

const LearnCard = (props: {
  courseId: string;
  lessonNo: number;
  onAdvance: () => void;
  currState: number;
}) => {
  const { courses } = useCourses();
  const course = courses.find((c) => c.id === props.courseId);
  const phrase = course?.lessons[props.lessonNo].cards[props.currState].phrase;

  return (
    <div>
      <Grid
        container
        spacing={1}
        sx={{
          width: "70%",
          marginLeft: "15%",
          marginRight: "15%",
        }}
      >
        <Grid item xs={12}>
          <Typography variant="h4" component="div" mt={3}>
            Learn this phrase:
          </Typography>
          <Typography
            mt={3}
            fontSize="28px"
            fontWeight={400}
            textAlign="center"
          >
            {phrase}
          </Typography>
          <Typography
            mt={3}
            fontSize="28px"
            fontWeight={400}
            textAlign="center"
          >
            1. Listen
          </Typography>
          <Typography
            mt={3}
            fontSize="28px"
            fontWeight={400}
            textAlign="center"
          >
            2. Practice speaking
          </Typography>
          <Typography
            mt={3}
            fontSize="28px"
            fontWeight={400}
            textAlign="center"
          >
            3. Type it out
          </Typography>
        </Grid>
        <Grid item xs={6}></Grid>
        <Grid item xs={6}></Grid>
      </Grid>
    </div>
  );
};

export default LearnCard;
