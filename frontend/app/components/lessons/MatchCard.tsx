// "Match correct pairs" card of lessons
import { Prompts, vocabWord } from "@/types/Courses";
import { useCourses } from "@/utils/courses/CourseContext";
import { Button, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import CorrectDiv from "./CorrectDiv";
import { separateWordArray, shuffleArray } from "@/utils/arrayFunctions";

const MatchCard = (props: {courseId: string, lessonNo: number, onAdvance: () => void, currState: number}) => {
    const { courses } = useCourses();
    const course = courses.find(c => c.id === props.courseId);
    const [leftArray, setLeftArray] = useState<string[]>([]);
    const [rightArray, setRightArray] = useState<string[]>([]);
    const [matchedWords, setMatchedWords] = useState<string[]>([]);
    const [selectedWords, setSelectedWords] = useState<string[]>([]);
    const [isAllMatched, setIsAllMatched] = useState(false);

    // set left and right arrays
    useEffect(() => {
        if (course) {
            const cardWordsArray: vocabWord[] = [];
            const wordsIndices = course?.lessons[props.lessonNo]?.cards[props.currState].wordsIndices ?? [];

            for (const index of wordsIndices) {
                const word = course?.lessons[props.lessonNo]?.words[index];
                if (word) {
                    cardWordsArray.push(word);
                }
            }     
        
            const {engArray, langArray} = separateWordArray(cardWordsArray);
            setLeftArray(shuffleArray(engArray));
            setRightArray(shuffleArray(langArray));
        }
    }, [course, props.lessonNo]);

    function doWordsMatch(arr: string[]) {
        for (const vocabWord of course?.lessons[props.lessonNo]?.words ?? []) {
            if ((arr[0] === vocabWord.eng && arr[1] === vocabWord.span) || (arr[0] === vocabWord.span && arr[1] === vocabWord.eng)) {
                setMatchedWords(prev => [...prev, vocabWord.eng, vocabWord.span]);
                return true;
            } 
        }   
        return false;  
    };

    useEffect(() => {
        if(selectedWords.length === 2) {
            doWordsMatch(selectedWords);
            setSelectedWords([]);
        }
    }, [selectedWords]);

    useEffect(() => {
        if ((matchedWords.length > 0) && (matchedWords.length === leftArray.length * 2)) {
          setIsAllMatched(true);
        }
      }, [matchedWords, leftArray.length]);

    const handleClick = (word: string) => {
        if (selectedWords.length < 2) {
            setSelectedWords(prev => [...prev, word]);
            console.log(selectedWords);
        }
    };

    const isWordSelected = (word: string) => selectedWords.includes(word);
    const isWordMatched = (word: string) => matchedWords.includes(word);
    const prompt: Prompts | undefined = course?.lessons[props.lessonNo]?.cards[props.currState]?.correctPrompts;

    if (!isAllMatched) {
        return (
            <div>
                <Grid container spacing={1} sx={{
                    width: "50%",
                    marginLeft: "15%",
                    marginRight: "15%",
                }}>
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
                                variant={isWordSelected(word)? 'contained' : 'outlined'}
                                disabled={isWordMatched(word)}
                                sx={{
                                    mt: '15px',
                                    width: "100%",
                                    ...(isWordMatched(word) && {
                                        backgroundColor: 'grey',
                                        color: 'grey',
                                    })
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
                                variant={(isWordSelected(word) || isAllMatched) ? 'contained' : 'outlined'}
                                disabled={isWordMatched(word)}
                                sx={{
                                    mt: '15px',
                                    width: "100%",
                                    ...(isWordMatched(word) && {
                                        backgroundColor: 'grey',
                                        color: 'grey',
                                    })
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

    return (
        <div>
            <Grid container spacing={1} sx={{
                width: "50%",
                marginLeft: "15%",
                marginRight: "15%",
            }}> 
                <Grid item xs={12}>
                    <Typography variant="h4" component="div" mt={3}>
                        Match correct pairs:
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    {leftArray.map((word: string) => (
                        <Button
                            key={word}
                            variant='contained'
                            disabled={true}
                            sx={{
                                mt: '15px',
                                width: "100%",
                                backgroundColor: 'grey',
                                color: 'grey',
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
                            variant='contained'
                            disabled={true}
                            sx={{
                                mt: '15px',
                                width: "100%",
                                backgroundColor: 'grey',
                                color: 'grey',
                            }}
                        >
                            {word}
                        </Button>
                    ))}
                </Grid>
            </Grid>
            <CorrectDiv prompt={prompt || { title: "Correct!", translation: "" }} onAdvance={props.onAdvance} />
        </div>
    );
};

export default MatchCard;