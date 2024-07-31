// Cards for courses under "My Courses"  <Courses
import React from "react";
import { Card, CardContent, Typography, Button, Grid, Box } from "@mui/material";
import { PieChart } from '@mui/x-charts/PieChart';
import { Course } from "@/types/Courses";
import { useCourses } from "@/utils/courses/CourseContext";
import { useUser } from "@/utils/user/UserContext";

function setUserProgress(arr: Course[]) { //need to set back to null on log out
  const { user } = useUser();
  let idx = 0;

  arr.forEach(course => {
      if (course.id === user?.courses.activeCourses[idx].id) {
        course.lessonsCompleted = user?.courses.activeCourses[idx].lessonsCompleted;
      }
      idx++;
  });
}

function getPercentValue(totalLessons: number, lessonsCompleted?: number) {
  if (lessonsCompleted == null) {
    return 0;
  }
  const percent = (lessonsCompleted / totalLessons) * 100;
  
  return (lessonsCompleted / totalLessons) * 100;
}

const CourseCard = () => {
  const { user } = useUser();
  const { myCourses } = useCourses();
  setUserProgress(myCourses);

  console.log('active: ', myCourses);

  return (
    <Grid container spacing={3}>
    {myCourses.map((course: Course) => {
      const percent = getPercentValue(course.totalLessons, course.lessonsCompleted);
      return (
        <Grid item xs={6} sm={6} md={6} key={course.id}>
          <Card sx={{
            p:0,
            width: "100%",
          }}
          >
            <CardContent
              sx={{
                paddingLeft: "60px",
                paddingRight: "40px",
              }}
            >
              <Grid container spacing={2}>
                {/* text */}
                <Grid item xs={12} md={7}>
                  {/* course shortname */}
                  <Typography
                    color="textSecondary"
                    mt={1}
                    fontSize="14px"
                    fontWeight={400}
                  >
                    {course.shortname}
                  </Typography>
                  {/* course name */}
                  <Typography
                    variant="h5"
                    component="div"
                  >
                    {course.name}
                  </Typography>
                  {/* completion */}
                  <Typography
                    color="textSecondary"
                    mt={1}
                    fontSize="18px"
                    fontWeight={400}
                  >
                    {course.lessonsCompleted}/{course.totalLessons} lessons
                  </Typography>
                  {/* Accuracy */}
                  <Typography
                    color="textSecondary"
                    fontSize="18px"
                    fontWeight={400}
                  >
                    94% Accuracy 
                  </Typography>
                </Grid>
                {/* piechart */}
                <Grid item xs={12} md={5}>
                  <PieChart 
                    series={[
                      {
                        data: [
                          { id: 0, value: percent},
                          { id: 1, value: (100 - percent), color: 'white'}
                        ],
                        innerRadius: percent,
                        startAngle: 0,
                        endAngle: -360,
                        cx: 90,
                      },
                    ]}
                    width={300}
                    height={200}
                  />
                  <Typography
                    textAlign="center"
                    fontSize="14px"
                    fontWeight={400}
                  >
                    {percent}% Complete
                  </Typography>
                  {/* Disables PieChart hover effect */}
                  <Box
                    sx={{
                      position: 'relative',
                      top: -220,
                      left: 0,
                      width: '110%',
                      height: '100%',
                      backgroundColor: 'transparent',
                      zIndex: 10,
                    }}
                  />
                </Grid>
                {/* button */}
                <Grid item xs={12} container justifyContent="flex-end">
                  <Button
                    variant="contained"
                    sx={{
                      mt: "15px",
                      width: "150px",
                      "&:hover": {},
                    }}
                  >
                    Start
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      )})}
    </Grid>
  );
};

export default CourseCard;
