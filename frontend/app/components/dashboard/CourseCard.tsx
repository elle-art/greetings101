// Cards for courses under "My Courses"
import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  Box,
} from "@mui/material";
import { PieChart } from "@mui/x-charts/PieChart";
import { Course, setUserCourseProgress, getPercentValue } from "@/types/Courses";
import { useCourses } from "@/utils/courses/CourseContext";
import { useRouter } from "next/navigation";
import { useUser } from "@/utils/user/UserContext";

const CourseCard = () => {
  const { myCourses } = useCourses();
  const { user } = useUser();
  const router = useRouter();

  const navigateToLesson = (courseId: string, lessons_completed: number) => {
    router.push(
      `/pages/Lesson/?courseId=${courseId}&lessons_completed=${lessons_completed}`
    );
  };

  setUserCourseProgress(myCourses);

  return (
    <Grid container spacing={3}>
      {myCourses.map((course: Course) => {
        const percent = getPercentValue(
          course.lessons.length,
          course.lessons_completed  
        );
        console.log("course:", course)
        return (
          <Grid item xs={6} sm={6} md={6} key={course.id}>
            <Card
              sx={{
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
                    <Typography variant="h5" component="div">
                      {course.name}
                    </Typography>
                    {/* completion */}
                    <Typography
                      color="textSecondary"
                      mt={1}
                      fontSize="18px"
                      fontWeight={400}
                    >
                      {course.lessons_completed}/{course.lessons.length} lessons
                    </Typography>
                  </Grid>
                  {/* piechart */}
                  <Grid item xs={12} md={5}>
                    <PieChart
                      series={[
                        {
                          data: [
                            { id: 0, value: percent, color: user?.preferences.pfColor },
                            { id: 1, value: 100 - percent, color: "#dbdbdb" },
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
                        position: "relative",
                        top: -220,
                        left: 0,
                        width: "110%",
                        height: "100%",
                        backgroundColor: "transparent",
                        zIndex: 10,
                      }}
                    />
                  </Grid>
                  {/* button */}
                  <Grid item xs={12} container justifyContent="flex-end">
                    <Button
                      onClick={() =>
                        navigateToLesson(
                          course.id,
                          course.lessons_completed || 0
                        )
                      }
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
        );
      })}
    </Grid>
  );
};

export default CourseCard;
