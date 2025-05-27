import { vocabWord } from "@/types/Courses";
import { useCourses } from "@/utils/courses/CourseContext";
import { Button, Checkbox, FormControlLabel, Typography } from "@mui/material";
import { Dispatch, SetStateAction, useState } from "react";

type CheckedState = {
    [courseId: string]: {
        all: boolean;
        lessons: {
            [lessonId: string]: boolean;
        };
    };
};

const OptionsList = (props: { setInitialDeck: Dispatch<SetStateAction<vocabWord[]>> }) => {
    const { myCourses } = useCourses();
    const myVocabList = localStorage.getItem('myVocabList');
    let words: vocabWord[] = [];
    let vocabLessonNos = new Set<number>();

    if (myVocabList) {
        const parsedVocabList = JSON.parse(myVocabList);
        for (let lesson of parsedVocabList) {
            vocabLessonNos.add(lesson.lesson_no);

            const wordsWithLNo = lesson.words.map((word: vocabWord) => ({
                ...word,
                lesson_no: lesson.lesson_no,
            }));

            words = [...words, ...wordsWithLNo];
        }
    }
    const [checked, setChecked] = useState<CheckedState>({});

    const handleCourseCheck = (courseId: string, isChecked: boolean, lessonIds: number[]) => {
        setChecked((prev) => ({
            ...prev,
            [courseId]: {
                all: isChecked,
                lessons: lessonIds.reduce((acc, id) => ({ ...acc, [id]: isChecked }), {})
            }
        }));
    };

    const handleLessonCheck = (courseId: string, lessonId: number, isChecked: boolean) => {
        setChecked((prev) => {
            const course = prev[courseId] || { lessons: {} };
            const updatedLessons = { ...course.lessons, [lessonId]: isChecked };

            const lessonValues = Object.values(updatedLessons);
            const all = lessonValues.every(Boolean);

            return {
                ...prev,
                [courseId]: {
                    all,
                    lessons: updatedLessons
                }
            };
        });
    };

    return (
        <div style={{ padding: 30 }}>
            <Typography variant="h1">Choose lessons</Typography>
            <Button
                sx={{ display: "block" }}
                onClick={() => {
                    const selectedLessonNos = Object.values(checked)
                        .flatMap(course =>
                            Object.entries(course.lessons)
                                .filter(([_, isChecked]) => isChecked)
                                .map(([lessonNo]) => Number(lessonNo))
                        );

                    const filteredWords = words.filter(word =>
                        selectedLessonNos.includes(word.lesson_no ?? 0)
                    );

                    props.setInitialDeck(filteredWords);
                }}
            >
                Update Deck
            </Button>
            {myCourses.map((course) => {
                const courseCheck = checked[course.id] || {};
                const lessons =  course.lessons.slice(0, course.lessons_completed);

                const allLessonsChecked = lessons.length > 0 && lessons.every(lesson =>
                    courseCheck.lessons?.[lesson.lesson_no]
                );
                const someLessonsChecked = lessons.some(lesson =>
                    courseCheck.lessons?.[lesson.lesson_no]
                );

                return (
                    <div key={course.id} style={{ display: 'inline-block', width: '300px' }}>
                        <FormControlLabel
                            label={course.name}
                            control={
                                <Checkbox
                                    checked={allLessonsChecked}
                                    indeterminate={someLessonsChecked && !allLessonsChecked}
                                    onChange={(e) =>
                                        handleCourseCheck(
                                            course.id,
                                            e.target.checked,
                                            lessons.map((lesson) => lesson.lesson_no)
                                        )
                                    }
                                />
                            }
                        />

                        <div style={{ paddingLeft: 24 }}>
                            {lessons.map((lesson) => (
                                <FormControlLabel
                                    key={lesson.lesson_no}
                                    label={lesson.name}
                                    control={
                                        <Checkbox
                                            checked={
                                                courseCheck.lessons?.[lesson.lesson_no] || false
                                            }
                                            onChange={(e) =>
                                                handleLessonCheck(
                                                    course.id,
                                                    lesson.lesson_no,
                                                    e.target.checked
                                                )
                                            }
                                        />
                                    }
                                />
                            ))}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default OptionsList;
