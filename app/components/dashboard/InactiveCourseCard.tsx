// Cards for inactive courses under "Additional Learning"  <Courses
// update once account info is sorted!!
import React from "react";
import { Card, CardContent, Typography, Button, Grid } from "@mui/material";

const courses = [
  {
    id: "asl102",
    name: "ASL 101: The Alphabet",
    shortname: "ASL 102",
    length: "30 min",
    description: "A-B-C! Easy as 1-2-3!",
  }, 
  {
      id: "asl103",
      name: "ASL 101: Numbers",
      shortname: "ASL 103",
      length: "10 min",
      description: "A-B-C! Easy as 1-2-3!",
  },
  {
    id: "span102",
    name: "Spanish 101: Numbers",
    shortname: "ASL 101",
    length: "20 min",
    description: "A-B-C! Easy as 1-2-3!",
  }, 
];

const InactiveCourseCard = () => {
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
