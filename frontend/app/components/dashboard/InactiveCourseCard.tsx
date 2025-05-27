// Cards for inactive courses under "Additional Learning" 
import React, { useEffect } from "react";
import { Card, CardContent, Typography, Button, Grid, Tooltip } from "@mui/material";
import { useCourses } from "@/utils/courses/CourseContext";
import { useUser } from "@/utils/user/UserContext";
import { addCoursetoUser } from "@/types/Courses";

const InactiveCourseCard = () => {
  const { inactive_courses } = useCourses();
  const { user } = useUser();

  const canUnlockCourse = (prerequisties: string[]) => {
    if (!user?.courses.completed_courses)
      return false;

    for (let prerequisite of prerequisties) {
      if (user?.courses.completed_courses.find(course => course.id === prerequisite))
        continue;
      else return false;
    }
    return true;
  }

  return (
    <Grid container spacing={3}>
      {inactive_courses.map((course) => (
        <Grid item xs={6} sm={6} md={6} key={course.id}>
          <Card sx={{
            p: 0,
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
                  {canUnlockCourse(course.prerequisites) ? (
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
                  ) : (
                    <Tooltip title={`You must complete ${course.prerequisites} to unlock this course.`}>
                      <span>
                        <Button
                          variant="outlined"
                          disabled
                          sx={{
                            mt: "15px",
                            width: "150px",
                          }}
                        >
                          Locked
                        </Button>
                      </span>
                    </Tooltip>
                  )}
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
