import { shuffleArray } from "@/utils/arrayFunctions";
import { useCourses } from "@/utils/courses/CourseContext";
import { Box, Button, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import CorrectDiv from "./CorrectDiv";
import { Prompts } from "@/types/Courses";
import IncorrectDiv from "./IncorrectDiv";


const TranslatePhraseCard = (props: {courseId: string, lessonNo: number, onAdvance: () => void, currState: number}) => {
    const { courses } = useCourses();
    const course = courses.find(c => c.id === props.courseId);
    const phrase = course?.lessons[props.lessonNo].cards[props.currState].phrase;
    const buttonOptions = shuffleArray(course?.lessons[props.lessonNo].cards[props.currState].options || []);
    const correctAnswer = course?.lessons[props.lessonNo].cards[props.currState].correctTranslation;
    const prompt: Prompts | undefined = course?.lessons[props.lessonNo]?.cards[props.currState]?.correctPrompts;

    const [options, setOptions] = useState<string[]>(buttonOptions);
    const [selectedWords, setSelectedWords] = useState<string[]>([]);
    const [showMessage, setShowMessage] = useState(false);
    const [answerStatus, setAnswerStatus] = useState<'correct' | 'incorrect' | 'try again'>('try again');
    const [attempts, setAttempts] = useState(0);

    //handleOptionClick
    const handleOptionClick = (word: string) => {
        setSelectedWords(prev => [...prev, word]);
        setOptions(prev => prev.filter(selected => selected !== word));
    };
    //handleSelectedClick
    const handleSelectedClick = (word: string) => {
        setOptions(prev => [...prev, word]);
        setSelectedWords(prev => prev.filter(selected => selected !== word));
    };
    //checkAnswer
    const checkAnswer = () => {
        const concatenatedString = selectedWords.join(' ');

        if (concatenatedString === correctAnswer) {
            setAnswerStatus('correct');
          } else if (attempts < 2) {
            setAttempts(prev => prev + 1);
            setAnswerStatus('try again');
          } else {
            setAnswerStatus('incorrect')
          }
    }

    //try again message
    useEffect(() => {
        if (answerStatus === 'try again' && attempts > 0) {
            setShowMessage(true);
            const timer = setTimeout(() => {
                setShowMessage(false);
            }, 2000);

            return () => clearTimeout(timer);
        }
    }, [answerStatus, attempts]);

    if (answerStatus == 'try again') {
        return (
            <div>
                {/* Header and phrase */}
                <Grid container spacing={1} sx={{
                    width: "70%",
                    marginLeft: "15%",
                    marginRight: "15%",
                }}> 
                    <Grid item xs={12}>
                        <Typography variant="h4" component="div" mt={3}>
                            Translate the following:
                        </Typography>
                        <Typography
                            mt={3}
                            fontSize="28px"
                            fontWeight={400}
                            textAlign="center"
                        >
                            {phrase}
                      </Typography>
                    </Grid>
                    {/* Selected Words */}
                    <Grid item xs={12}>
                        <Box
                            height={100}
                            width="100%"
                            display="flex"
                            alignItems="flex-end"
                            sx={{ borderBottom: '2px solid grey' }}
                            >
                            {selectedWords.map((word: string) => (
                            <Button
                                key={word}
                                variant='contained'
                                onClick={() => handleSelectedClick(word)}
                                sx={{
                                    display: 'inline-block',
                                    margin: '5px',
                                    textAlign: 'center',
                                }}
                            >
                                {word}
                            </Button>
                            ))}
                        </Box>   
                    </Grid>
                    {/* Options */}
                    <Grid item xs={12} mt={2}>
                        {options.map((word: string) => (
                            <Button
                                key={word}
                                variant='contained'
                                onClick={() => handleOptionClick(word)}
                                sx={{
                                    mt: '15px',
                                    display: 'inline-block',
                                    margin: '5px',
                                }}
                            >
                                {word}
                            </Button>
                        ))}
                    </Grid>
                    {/* Submit button */}
                    <Grid item xs={6}>
                        {showMessage && (
                            <Typography variant="h6" sx={{ mt: 2 }}>
                                Incorrect. Try again.
                            </Typography>
                        )}
                        <Button
                            variant='contained'
                            onClick={() => checkAnswer()}
                            sx={{
                                    mt: '15px',
                                    width: "50%",
                                    backgroundColor: 'grey',
                                }}
                            >
                            Done
                        </Button>
                    </Grid>
                </Grid>
            </div>
        );
    }
    
    return (
        <div>
            {/* Header and phrase */}
            <Grid container spacing={1} sx={{
                width: "70%",
                marginLeft: "15%",
                marginRight: "15%",
            }}> 
                <Grid item xs={12}>
                    <Typography variant="h4" component="div" mt={3}>
                        Translate the following:
                    </Typography>
                    <Typography
                        mt={3}
                        fontSize="28px"
                        fontWeight={400}
                        textAlign="center"
                    >
                        {phrase}
                  </Typography>
                </Grid>
                {/* Selected Words */}
                <Grid item xs={12}>
                    <Box
                        height={100}
                        width="100%"
                        display="flex"
                        alignItems="flex-end"
                        sx={{ borderBottom: '2px solid grey' }}
                        >
                        {selectedWords.map((word: string) => (
                        <Button
                            key={word}
                            variant='contained'
                            disabled={true}
                            onClick={() => handleSelectedClick(word)}
                            sx={{
                                display: 'inline-block',
                                margin: '5px',
                                textAlign: 'center',
                            }}
                        >
                            {word}
                        </Button>
                        ))}
                    </Box>   
                </Grid>
                <Grid item xs={12}>  
                    <Box sx={{width: "125%"}}>        
                        {answerStatus === 'correct' ? (
                            <CorrectDiv
                                prompt={prompt || { title: "¡Correcto!", translation: "Correct!" }}
                                onAdvance={props.onAdvance}
                            />
                        ) : (
                            <IncorrectDiv
                                prompt={{ title: "¡Incorrecto!", translation: correctAnswer || ""}}
                                onAdvance={props.onAdvance}
                            />
                        )}
                    </Box>
                </Grid>
            </Grid>
        </div>
    );
};

export default TranslatePhraseCard;