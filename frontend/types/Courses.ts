export interface Course {
    id: string;
    name: string;
    shortname: string;
    length: string;
    description: string;
    totalLessons: number;
    lessonsCompleted?: number;
  };

export const courses = [ //eventually need to switch to  the array stored in the backend
    {
      id: "span101",
      name: "Spanish 101: The Basics",
      shortname: "SPAN 101",
      length: "30 min",
      description: "A-B-C! Easy as 1-2-3!",
      totalLessons: 10,
    },
    {
        id: "asl101",
        name: "ASL 101: The Basics",
        shortname: "ASL 101",
        length: "30 min",
        description: "A-B-C! Easy as 1-2-3!",
        totalLessons: 10,
      },
      {
        id: "asl102",
        name: "ASL 102: The Alphabet",
        shortname: "ASL 102",
        length: "30 min",
        description: "A-B-C! Easy as 1-2-3!",
        totalLessons: 10,
      }, 
      {
          id: "asl103",
          name: "ASL 103: Numbers",
          shortname: "ASL 103",
          length: "10 min",
          description: "A-B-C! Easy as 1-2-3!",
          totalLessons: 10,
      },
      {
        id: "span102",
        name: "Spanish 102: Numbers",
        shortname: "SPAN 102",
        length: "20 min",
        description: "A-B-C! Easy as 1-2-3!",
        totalLessons: 10,
      }, 
];

export function removeCourse(courseId: string, arr: Course[]){ 
  const index = arr.findIndex(c => c.id === courseId);
  
  if (index !== -1) {
    arr.splice(index, 1);
  }
  return arr;
}
