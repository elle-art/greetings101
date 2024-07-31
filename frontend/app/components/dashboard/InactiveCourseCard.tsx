// Cards for inactive courses under "Additional Learning"  <Courses
// update once account info is sorted!!
import React from "react";
import { Card, CardContent, Typography, Button, Grid } from "@mui/material";
import { Course, courses } from "@/types/Courses";
import { useCourses } from "@/utils/courses/CourseContext";
import { User } from "@/types/User";
import { useUser } from "@/utils/user/UserContext";

function addCoursetoUser(courseId: string, user: User | null) {
  if (!user) {
    return;
  }
  console.log('adding ', courseId, 'to user');
  const newCourse = {id: courseId, lessonsCompleted: 0}
  user?.courses.activeCourses.push(newCourse);
  console.log(user?.courses.activeCourses);
  localStorage.setItem('user', JSON.stringify(user));

}

const InactiveCourseCard = () => {
  const { inactiveCourses, myCourses } = useCourses();
  const { user } = useUser();
  console.log('inactive: ', inactiveCourses);

  return (
    <Grid container spacing={3}>
      {inactiveCourses.map((course) => (
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
                <Grid item xs={12} md={7}>
                  <Typography
                    color="textSecondary"
                    mt={1}
                    fontSize="14px"
                    fontWeight={400}
                  >
                    {course.shortname}
                  </Typography>
                  <Typography
                    variant="h5"
                    component="div"
                  >
                    {course.name}
                  </Typography>
                  <Typography
                    color="textSecondary"
                    mt={1}
                    fontSize="18px"
                    fontWeight={400}
                  >
                    {course.length}
                  </Typography>
                  <Typography
                    color="textSecondary"
                    fontSize="18px"
                    fontWeight={400}
                  >
                    {course.description}
                  </Typography>
                </Grid>
                <Grid item xs={12} container justifyContent="flex-end">
                  <Button
                    variant="outlined"
                    onClick={() => {
                      addCoursetoUser(course.id, user);
                    }}
                    sx={{
                      mt: "15px",
                      width: "150px",
                      "&:hover": {},
                    }}
                  >
                    Add Course
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default InactiveCourseCard;
