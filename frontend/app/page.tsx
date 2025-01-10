//Home or About page? - click on "Logo"
"use client";
import { Grid, Box, Typography, Button, ListItem, List, ListItemText, Link } from "@mui/material";
import PageContainer from "@/app/components/container/PageContainer";
import './homepage.css';
// components
import Logo from "./layout/shared/logo/Logo";
import PieAnimation from "./components/homepage/PieAnimation";
import PeopleAnimation from "./components/homepage/PeopleAnimation";

const Start = () => {
  return (
    <PageContainer
      title="Greetings 101"
      description="An introduction to other cultures"
    >
      <Box mt={3} ml={8}>
        <Logo />
        <Button
          variant="contained"
          color="primary"
          href="pages/Login"
          sx={{
            width: "100px",
            position: 'absolute',
            right: "30px",
            top: "35px",
          }}
        >
          Sign In!
        </Button>
        <Grid container spacing={3} mt={3}>
          <Grid item xs={12}>
            <Typography variant="h1" fontWeight={"bold"}>Welcome to Greetings 101!</Typography>
            <Typography variant="subtitle1" mb={6}>Where learning benefits all.</Typography>
            <Button
              variant="contained"
              color="primary"
              href="pages/Signup"
              sx={{ mb: 3 }}
            >
              Sign up now!
            </Button>
            <Typography variant='body1' display="inline" ml={3}>
              Already a member?&nbsp;
              <Link href="pages/Login">
                Sign In!
              </Link>
            </Typography>
            <Grid item container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="h2" fontWeight="bold" mt={4} mb={4}>Did you know?</Typography>
              </Grid>
              <Grid item xs={4} sx={{ maxHeight: "400px" }}>
                <Typography variant="h3" component="p" fontWeight={500} textAlign={'left'}>About <div className="percent-val">60%</div> of people worldwide can speak more than one language.</Typography>
              </Grid>
              <Grid item xs={4} ml={-10} mr={-2} sx={{ height: "400px" }}>
                <PieAnimation />
              </Grid>
              <Grid item xs={4} sx={{ maxHeight: "400px" }}>
                <Typography variant="h3" component="p" fontWeight={500} textAlign={'right'} mt={"75%"} mr={"5%"}>In the US,<div></div> that number drops to <div className="percent-val">22%</div>.</Typography>
              </Grid>
            </Grid>
            <Grid item container spacing={2} xs={12} mt={20}>
              <Grid item xs={9.5} sx={{ height: "875px", overflow: "hidden" }}>
                <PeopleAnimation />
              </Grid>
              <Grid item xs={2.5}>
                <Typography variant="h3" component="p" textAlign={"center"} mt={4}><div className="number one">1</div> in <div className="number global-stat">8</div> people in the United States are Spanish speakers.</Typography>
                <Typography variant="h3" component="p" textAlign={"center"} mt={30} id="animation-trigger"><div className="number one">1</div> in <div className="number global-stat">36</div> people use American Sign Language.</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h3" component="p" mt={5} ml={-4} textAlign={"center"}>With Greetings 101, You could be one of them! Learn the fundamentals of Spanish and ASL with ease today.</Typography>
                <Button
                  variant="contained"
                  color="primary"
                  href="pages/Signup"
                  sx={{ mt: 3, mb: 3, ml: "42%", mr: "42%" }}
                >
                  Sign up now!
                </Button>
              </Grid>
            </Grid>
            <Typography variant="h2" fontWeight="bold" mt={6}>Why learn another language?</Typography>
            <List>
              <ListItem>
                <ListItemText><div className="list-header">1. Inclusive Community</div>
                  <Typography ml={2}>Connect with others-whether it’s friends who speak multiple languages at home or those who don’t know English at all. Being able to communicate with people of diverse backgrounds expands empathy and cultural understanding.
                  </Typography>
                </ListItemText>
              </ListItem>
              <ListItem>
                <ListItemText><div className="list-header">2. Cognitive Abilities</div>
                  <Typography ml={2}>Bilingualism has been proven to boost problem-solving, memory, and executive functions. It’s even linked to reduced cognitive decline and delayed onset of neurodegenerative diseases.
                  </Typography>
                </ListItemText>
              </ListItem>
              <ListItem>
                <ListItemText><div className="list-header">3. Career Advantages</div>
                  <Typography ml={2}>Many fields value multilingualism. Whether you’re working with non-English speaking coworkers, clients, or students, knowing another language is a definite plus.
                  </Typography>
                </ListItemText>
              </ListItem>
              <ListItem>
                <ListItemText><div className="list-header">4. Why ASL?</div>
                  <Typography ml={2}>Even if you don’t know someone who is Deaf, ASL is incredibly versatile. It’s useful for:
                  </Typography>

                  <List sx={{ listStyle: 'disc', paddingLeft: 4 }}>
                    <ListItem>
                      <ListItemText>
                        ○ Supporting neurodivergent individuals
                      </ListItemText>
                    </ListItem>
                    <ListItem>
                      <ListItemText>
                        ○ Early childhood education
                      </ListItemText>
                    </ListItem>
                    <ListItem>
                      <ListItemText>
                        ○  Non-verbal communication with others (particularly useful in loud places!)
                      </ListItemText>
                    </ListItem>
                    <ListItem>
                      <ListItemText>
                        ○ Fun fact: Sign Language has even been taught to animals!
                      </ListItemText>
                    </ListItem>
                  </List>
                </ListItemText>
              </ListItem>
            </List>
          </Grid>
          <Grid item xs={12}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              href="pages/Signup"
            >
              Start learning now!
            </Button>
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default Start;
