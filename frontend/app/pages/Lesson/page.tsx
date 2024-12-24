"use client";
import { Button, Typography } from "@mui/material";
import useLessonStateMachine from "@/utils/courses/useLessonStateMachine";
import MatchCard from "@/app/components/lessons/MatchCard";
import { useSearchParams } from "next/navigation";
import { useCourses } from "@/utils/courses/CourseContext";
import TranslatePhraseCard from "@/app/components/lessons/TranslatePhraseCard";
import EndOfLesson from "@/app/components/lessons/EndOfLesson";
import { API_BASE_URL, LESSONS_ENDPOINT } from "@/utils/constants";
import { useEffect, useRef, useState } from "react";

interface lessonData {
  component: "MatchCard" | "TranslatePhraseCard" | "EndOfLesson";
  courseId: string;
  lessonNo: number;
}

const Lesson = () => {
  const searchParams = useSearchParams();
  const courseId = searchParams.get("courseId");
  const lessonNo = searchParams.get("lessons_completed");
  const lessonNoAsNumber = lessonNo ? parseInt(lessonNo, 10) : 0;
  const [state, advanceState] = useLessonStateMachine();
  const { courses } = useCourses();
  const course = courses.find((c) => c.id === courseId);
  const lesson = course?.lessons.find((lesson) => lesson.lesson_no === lessonNoAsNumber);
  const [lessonData, setLessonData] = useState<lessonData | null>(null);
  const [accuracy, setAccuracy] = useState<number[]>([]);
  const runningRef = useRef(false);
  const timerRef = useRef(0);
  const intervalRef = useRef<number | null>(null);
  const [mistakesMade, setMistakes] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `${API_BASE_URL}${LESSONS_ENDPOINT}${courseId}/${lessonNoAsNumber}/${state}`,
      );
      const data = await response.json();
      setLessonData(data);
    };

    fetchData();

    // timer
    if (lessonData?.component !== "EndOfLesson") {
      intervalRef.current = null;
      if (!intervalRef.current) {
        intervalRef.current = window.setInterval(() => {
          if (runningRef.current) {
            timerRef.current += 1000;
          }
        }, 1000);
      }
      runningRef.current = true;
    }

    if (lessonData?.component === "EndOfLesson") {
      runningRef.current = false;
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [courseId, lessonNoAsNumber, state, /* eslint-disable-line react-hooks/exhaustive-deps */]);

  const renderState = async () => {
    if (!lessonData) return null;

    switch (lessonData.component) {
      case "MatchCard":
        return (
          <MatchCard
            courseId={lessonData.courseId}
            lessonNo={lessonData.lessonNo}
            onAdvance={advanceState}
            currState={state}
            setAccuracy={setAccuracy}
            setMistakes={setMistakes}
          />
        );
      case "TranslatePhraseCard":
        return (
          <TranslatePhraseCard
            courseId={lessonData.courseId}
            lessonNo={lessonData.lessonNo}
            onAdvance={advanceState}
            currState={state}
            setAccuracy={setAccuracy}
            setMistakes={setMistakes}
          />
        );
      case "EndOfLesson":
        return (
          <EndOfLesson 
            courseId={lessonData.courseId} 
            lessonNo={lessonData.lessonNo} 
            accuracyArray={accuracy} 
            totalMistakes={mistakesMade} 
            timeToComplete={timerRef.current}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div style={{}}>
      <Typography variant="h1" component="div">
        {course?.shortname}: {lesson?.name}
      </Typography>
      {/* add progress bar */}
      <div style={{ marginLeft: "15%", marginRight: "15%" }}>
        {renderState()}
      </div>
      {/* for testing purposes */}
      <Button
        onClick={() => advanceState()}
        variant="contained"
        color="success"
        style={{ marginTop: "20px", width: "80%" }}
      >
        Next
      </Button>
    </div>
  );
};

export default Lesson;
