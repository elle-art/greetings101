// Cards for courses under "My Courses"  <Courses
// update once account info is sorted!!
import React from "react";
import { Card, CardContent, Typography, Button, Grid, Box } from "@mui/material";
import { PieChart } from '@mui/x-charts/PieChart';

const courses = [
  {
    id: "span101",
    name: "Spanish 101: The Basics",
    shortname: "SPAN 101",
  },
  {
      id: "asl101",
      name: "ASL 101: The Basics",
      shortname: "ASL 101",
    },
];

const CourseCard = () => {
  return (
    <Grid container spacing={3}>
      {courses.map((course) => (
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
                    7/10 lessons
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
                          { id: 0, value: 70},
                          { id: 1, value: 30, color: 'white'}
                        ],
                        innerRadius: 70,
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
                    70% Complete
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
      ))}
    </Grid>
  );
};

export default CourseCard;
