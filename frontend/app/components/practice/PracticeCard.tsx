// Cards for practice games under "Practice"
// update once account info is sorted!!
import { Card, CardContent, Typography, Button, Grid, SvgIconProps, useMediaQuery } from "@mui/material";
import HeaderWithIcon from "@/app/layout/text-formats/TextHeadings";
import Image from 'next/image';
import {
  IconCardsFilled, IconPuzzle2, IconNotes, IconDeviceGamepad2
} from "@tabler/icons-react";

const exercises = [
  {
    id: "flashcards",
    icon: IconCardsFilled,
    name: "Flashcards",
    description: "This is the description of this game. Play it. It's cool I swear",
    imageLink: "/images/temp-game.jpg",
  },
  {
    id: "matching",
    icon: IconPuzzle2,
    name: "Matching",
    description: "This is the description of this game. Play it. It's cool I swear",
    imageLink: "/images/temp-game.jpg",
  },
  {
    id: "test",
    icon: IconNotes,
    name: "Test",
    description: "This is the description of this game. Play it. It's cool I swear",
    imageLink: "/images/temp-game.jpg",
  },
  {
    id: "game",
    icon: IconDeviceGamepad2,
    name: "Game",
    description: "This is the description of this game. Play it. It's cool I swear",
    imageLink: "/images/temp-game.jpg",
  },
];

const PracticeCard = () => {
  const smUp = useMediaQuery((theme: any) => theme.breakpoints.up("sm"));

  if (smUp) {
    return (
      <Grid container spacing={3}>
        {exercises.map((game) => (
          <Grid item sm={6} md={12} key={game.id}>
            <Card sx={{
              p:0,
              width: "100%",
            }}
            >
              <CardContent
                sx={{
                  paddingLeft: "30px",
                  paddingRight: "40px",
                }}
              >
                <Grid container spacing={4}>
                  {/* image */}
                  <Grid item sm={12} md={6}>
                    <Image
                      src={game.imageLink}
                      layout="responsive"
                      width={500}
                      height={300}
                      alt="temp alt text"
                    />
                  </Grid>
                  {/* text and button */}
                  <Grid item sm={12} md={6}>
                    <Grid container spacing={2} alignContent="space-between">
                      {/* text */}
                      <Grid item xs={12}>
                        {/* game name */}
                        <Typography
                          variant="h2"
                          component="div"
                          >
                          {game.name}
                        </Typography>
                        {/* description */}
                        <Typography
                          color="textSecondary"
                          mt={1}
                          fontSize="18px"
                          fontWeight={400}
                        >
                          {game.description}
                        </Typography>
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
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    );
  }
  // mobile screen layout
  return (
    <Grid container spacing={2}>
      {exercises.map((game) => (
        <Grid item xs={12} key={game.id}>
          <Card sx={{
            width: "100%",
          }}
          >
            <CardContent
              sx={{
                paddingLeft: "30px",
                paddingRight: "20px",
                paddingTop: "10px",
              }}
            >
              <Grid container spacing={4} height={70}>
                  {/* text */}
                  <Grid item xs={9} sx={{marginTop: "5px"}}>
                      {/* game name */}
                      <HeaderWithIcon icon={game.icon  as React.ComponentType<SvgIconProps>} variant="h2" title={game.name} />
                  </Grid>
                  {/* button */}
                  <Grid item xs={3} container justifyContent="flex-end" alignContent="center" sx={{marginTop: "-10px"}}>
                      <Button
                        variant="contained"
                        sx={{
                          mt: "15px",
                          width: "150px",
                          height: "70%",
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

export default PracticeCard;
