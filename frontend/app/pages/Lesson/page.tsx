"use client";
import { Button, Typography } from "@mui/material";
import useLessonStateMachine from "@/utils/courses/useLessonStateMachine";
import MatchCard from "@/app/components/lessons/MatchCard";
import { useSearchParams } from "next/navigation";
import { useCourses } from "@/utils/courses/CourseContext";
import TranslatePhraseCard from "@/app/components/lessons/TranslatePhraseCard";
import EndOfLesson from "@/app/components/lessons/EndOfLesson";
import { API_BASE_URL, LESSONS_ENDPOINT } from "@/utils/constants";
import { useEffect, useState } from "react";

interface lessonData {
  component: "MatchCard" | "TranslatePhraseCard" | "EndOfLesson";
  courseId: string;
  lessonNo: number;
}

const Lesson = () => {
  const searchParams = useSearchParams();
  const courseId = searchParams.get("courseId");
  const lessonNo = searchParams.get("lessonsCompleted");
  const lessonNoAsNumber = lessonNo ? parseInt(lessonNo, 10) : 0;
  const [state, advanceState] = useLessonStateMachine();
  const { courses } = useCourses();
  const course = courses.find((c) => c.id === courseId);
  const [lessonData, setLessonData] = useState<lessonData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `${API_BASE_URL}${LESSONS_ENDPOINT}${courseId}&lessonNo=${lessonNoAsNumber}&state=${state}`
      );
      const data = await response.json();
      setLessonData(data);
    };

    fetchData();
  }, [courseId, lessonNoAsNumber, state]);

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
          />
        );
      case "TranslatePhraseCard":
        return (
          <TranslatePhraseCard
            courseId={lessonData.courseId}
            lessonNo={lessonData.lessonNo}
            onAdvance={advanceState}
            currState={state}
          />
        );
      case "EndOfLesson":
        return (
          <EndOfLesson courseId={lessonData.courseId} lessonNo={lessonData.lessonNo} />
        );
      default:
        return null;
    }
  };


  return (
    <div style={{}}>
      <Typography variant="h1" component="div">
        {course?.shortname}: {course?.lessons[lessonNoAsNumber].name}
      </Typography>
      {/* add progress bar */}
      <div style={{ marginLeft: "15%", marginRight: "15%" }}>
        {renderState()}
      </div>
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
