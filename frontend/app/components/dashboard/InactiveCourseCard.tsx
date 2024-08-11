// Cards for inactive courses under "Additional Learning" 
import React from "react";
import { Card, CardContent, Typography, Button, Grid } from "@mui/material";
import { useCourses } from "@/utils/courses/CourseContext";
import { useUser } from "@/utils/user/UserContext";
import { addCoursetoUser } from "@/types/Courses";

const InactiveCourseCard = () => {
  const { inactiveCourses } = useCourses();
  const { user } = useUser();

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
                <Grid item xs={12}>
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
                    onClick={async () => {
                      await addCoursetoUser(course.id, user);
                      window.location.reload();
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
