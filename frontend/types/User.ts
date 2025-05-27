// Interface for user type
export interface User {
  id: number;
  name: string;
  email: string;
  yearJoined: number;
  pfp: number;
  preferences: {
    darkModePref: 'light' | 'dark';
    pfColor: string;
  };
  courses: {
    "active_courses": {
      id: string;
      lessons_completed: number;
      "missed_words": any[],
      "missed_cards": any[],
    }[];
    "completed_courses": {
      id: string;
      lessons_completed: number;
      "missed_words": any[],
      "missed_cards": any[],
    }[];
  };
}

export interface Picture {
  id: number;
  url: string;
  description: string;
}
