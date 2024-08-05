const courses = [
  {
    id: "span101",
    name: "Spanish 101: The Basics",
    shortname: "SPAN 101",
    length: "30 min",
    description: "A-B-C! Easy as 1-2-3!",
    totalLessons: 10, //eventually replace with lessons.length in front end code
    lessons: [
      { //lesson  1
        name: "Greetings",
        words: [
        { eng: "Hello", span: "Hola" }, {eng: "Goodbye", span: "Adiós"}, {eng: "What’s your name?", span: "¿Cómo te llamas?"}, {eng: "What’s your name?", span: "¿Cómo se llama?"}, {eng: "My name is ___", span: "Me llamo ___"}, {eng: "Good morning", span: "Buenos dias"}, {eng: "Good afternoon", span: "Buenas tardes"}, {eng: "Good evening", span: "Buenas noches"}, {eng: "Have a good day!", span: "¡Que tengas un buen día!"}
        ],
        cards: [
          {
            id: 1,
            wordsIndices: [0, 1],
            correctPrompts: {
              title: "¡Muy bien!",
              translation: "Very good!",
            }
          }
        ]
      },
      {
        name: "Simple answers",
        words: [
        { eng: "Hello", span: "Hola" }, {eng: "Goodbye", span: "Adiós"},
        ],
      },
      {
        name: "Mind your Ps and Qs!",
        words: [
        { eng: "Hello", span: "Hola" }, {eng: "Goodbye", span: "Adiós"},
        ],
      },
    ],
  },
  {
    id: "asl101",
    name: "ASL 101: The Basics",
    shortname: "ASL 101",
    length: "30 min",
    description: "A-B-C! Easy as 1-2-3!",
    totalLessons: 10,
    lessons: [],
  },
  {
    id: "asl102",
    name: "ASL 102: The Alphabet",
    shortname: "ASL 102",
    length: "30 min",
    description: "A-B-C! Easy as 1-2-3!",
    totalLessons: 10,
    lessons: [],

  },
  {
    id: "asl103",
    name: "ASL 103: Numbers",
    shortname: "ASL 103",
    length: "10 min",
    description: "A-B-C! Easy as 1-2-3!",
    totalLessons: 10,
    lessons: [],

  },
  {
    id: "span102",
    name: "Spanish 102: Numbers",
    shortname: "SPAN 102",
    length: "20 min",
    description: "A-B-C! Easy as 1-2-3!",
    totalLessons: 10,
    lessons: [],

  },
];

module.exports = courses;
