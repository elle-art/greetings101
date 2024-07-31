'use client'
export interface User {
    id: number;
    name: string;
    email: string;
    yearJoined: number;
    preferences: {
        darkModePref: 'light' | 'dark';
        pfpId: string;
        pfColor: string;
    };
    courses: {
        "activeCourses": [
          {
            id: string;
            lessonsCompleted: number;
          }
        ],
        "coursesCompleted": [
            id: string,
        ]
      };
}