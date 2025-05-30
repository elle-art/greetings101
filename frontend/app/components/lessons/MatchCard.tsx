// "Match correct pairs" card of lessons
import { Prompts, vocabWord } from "@/types/Courses";
import { useCourses } from "@/utils/courses/CourseContext";
import { Button, Grid, Typography } from "@mui/material";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import CorrectDiv from "./CorrectDiv";
import { separateWordArray, shuffleArray } from "@/utils/courses/lessons/arrayFunctions";
import { calculateAccuracy } from "@/utils/courses/lessons/endOfLessonFunctions";
import { useUser } from "@/utils/user/UserContext";

const MatchCard = (props: {
  courseId: string;
  lessonNo: number;
  onAdvance: () => void;
  currState: number;
  setAccuracy: Dispatch<SetStateAction<number[]>>;
  setMistakes: Dispatch<SetStateAction<number>>;
}) => {
  const { user } = useUser();
  const userCourseData = user?.courses.active_courses.find((course) => course.id === props.courseId);
  const { courses } = useCourses();
  const course = courses.find((c) => c.id === props.courseId);
  const lesson = course?.lessons.find((lesson) => lesson.lesson_no === props.lessonNo);
  const [leftArray, setLeftArray] = useState<string[]>([]);
  const [rightArray, setRightArray] = useState<string[]>([]);
  const [matchedWords, setMatchedWords] = useState<string[]>([]);
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [isAllMatched, setIsAllMatched] = useState(false);
  const [correctPredictions, setCorrectPredictions] = useState(0);
  const [totalPredictions, setTotalPredictions] = useState(0);

  // set left and right arrays
  useEffect(() => {
    if (course) {
      const cardWordsArray: vocabWord[] = [];
      const wordsIndices = lesson?.cards[props.currState]?.words_indices ?? [];

      for (const index of wordsIndices) {
        const word = lesson?.words.find((word) => word.id === index);
        if (word) {
          cardWordsArray.push(word);
        }
      }

      const { engArray, langArray } = separateWordArray(cardWordsArray);
      setLeftArray(shuffleArray(engArray));
      setRightArray(shuffleArray(langArray));
      setCorrectPredictions(leftArray.length);
      setTotalPredictions(leftArray.length);

      if (
        matchedWords.length > 0 &&
        matchedWords.length === leftArray.length * 2
      ) {
        cardWordsArray.length = 0;
      }
    }
  }, [course, leftArray.length, /* eslint-disable-line react-hooks/exhaustive-deps */]);

  function doWordsMatch(arr: string[]) {
    for (const vocabWord of lesson?.words ?? []) {
      if (
        (arr[0] === vocabWord.eng && arr[1] === vocabWord.span) ||
        (arr[0] === vocabWord.span && arr[1] === vocabWord.eng)
      ) {
        setMatchedWords((prev) => [...prev, vocabWord.eng!, vocabWord.span!]);
        return true;
      }
    }
    setTotalPredictions(totalPredictions + 1);
    return false;
  }

  useEffect(() => {
    if (selectedWords.length === 2) {
      doWordsMatch(selectedWords);
      setSelectedWords([]);
    }
  }, [selectedWords, /* eslint-disable-line react-hooks/exhaustive-deps */]);

  useEffect(() => {
    if (
      matchedWords.length > 0 &&
      matchedWords.length === leftArray.length * 2
    ) {
      setIsAllMatched(true);
      props.setAccuracy(prevAccuracy => [...prevAccuracy, calculateAccuracy(correctPredictions, totalPredictions)]);
      props.setMistakes(prevMistakes => prevMistakes + (totalPredictions - correctPredictions));

    }
  }, [matchedWords, leftArray.length, /* eslint-disable-line react-hooks/exhaustive-deps */]);

  const handleClick = (word: string) => {
    if (selectedWords.length < 2) {
      setSelectedWords((prev) => [...prev, word]);
    }
  };

  const isWordSelected = (word: string) => selectedWords.includes(word);
  const isWordMatched = (word: string) => matchedWords.includes(word);
  const prompt: Prompts | undefined =
    lesson?.cards[props.currState]?.correct_prompts;

  if (!isAllMatched) {
    return (
      <div>
        <Grid
          container
          spacing={1}
          sx={{
            width: "50%",
            marginLeft: "15%",
            marginRight: "15%",
          }}
        >
          <Grid item xs={12}>
            <Typography variant="h4" component="div" mt={3}>
              Match correct pairs:
            </Typography>
          </Grid>
          <Grid item xs={6}>
            {leftArray.map((word: string) => (
              <Button
                key={word}
                onClick={() => handleClick(word)}
                variant={isWordSelected(word) ? "contained" : "outlined"}
                disabled={isWordMatched(word)}
                sx={{
                  mt: "15px",
                  width: "100%",
                  ...(isWordMatched(word) && {
                    backgroundColor: "grey",
                    color: "grey",
                  }),
                }}
              >
                {word}
              </Button>
            ))}
          </Grid>
          <Grid item xs={6}>
            {rightArray.map((word: string) => (
              <Button
                key={word}
                onClick={() => handleClick(word)}
                variant={
                  isWordSelected(word) || isAllMatched
                    ? "contained"
                    : "outlined"
                }
                disabled={isWordMatched(word)}
                sx={{
                  mt: "15px",
                  width: "100%",
                  ...(isWordMatched(word) && {
                    backgroundColor: "grey",
                    color: "grey",
                  }),
                }}
              >
                {word}
              </Button>
            ))}
          </Grid>
        </Grid>
      </div>
    );
  }
  // All matches have been found, greys out options and displays correct card
  return (
    <div>
      <Grid
        container
        spacing={1}
        sx={{
          width: "50%",
          marginLeft: "15%",
          marginRight: "15%",
        }}
      >
        <Grid item xs={12}>
          <Typography variant="h4" component="div" mt={3}>
            Match correct pairs:
          </Typography>
        </Grid>
        <Grid item xs={6}>
          {leftArray.map((word: string) => (
            <Button
              key={word}
              variant="contained"
              disabled={true}
              sx={{
                mt: "15px",
                width: "100%",
                backgroundColor: "grey",
                color: "grey",
              }}
            >
              {word}
            </Button>
          ))}
        </Grid>
        <Grid item xs={6}>
          {rightArray.map((word: string) => (
            <Button
              key={word}
              variant="contained"
              disabled={true}
              sx={{
                mt: "15px",
                width: "100%",
                backgroundColor: "grey",
                color: "grey",
              }}
            >
              {word}
            </Button>
          ))}
        </Grid>
      </Grid>
      <CorrectDiv
        prompt={prompt || { title: "Correct!", translation: "" }}
        onAdvance={props.onAdvance}
      />
    </div>
  );
};

export default MatchCard;
