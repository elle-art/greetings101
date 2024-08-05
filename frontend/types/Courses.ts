export interface Course {
    id: string;
    name: string;
    shortname: string;
    length: string;
    description: string;
    totalLessons: number;
    lessonsCompleted?: number;
    lessons: Lesson[];
  };

  export interface Lesson {
    name: string;
    words: vocabWord[];
    cards: lessonCard[],
  };

  export interface vocabWord {
    eng: string;
    span: string;
    //falseAlternatives: String[];
  }

  export interface lessonCard {
    id: number,
    wordsIndices: number[],
    correctPrompts: Prompts,
  }

  export interface Prompts {
    title: string,
    translation: string,
    note?: string,
  }

export function removeCourse(courseId: string, arr: Course[]){ 
  const index = arr.findIndex(c => c.id === courseId);
  
  if (index !== -1) {
    arr.splice(index, 1);
  }
  return arr;
}
