// courses []

const courses = [
  {
    id: "span101",
    name: "Spanish 101: The Basics",
    shortname: "SPAN 101",
    length: "30 min",
    description: "A-B-C! Easy as 1-2-3!",
    lessons: [
      {
        //lesson  1
        name: "Greetings",
        words: [
          { eng: "Hello", span: "Hola" },
          { eng: "Goodbye", span: "Adiós" },
          { eng: "What’s your name? (informal)", span: "¿Cómo te llamas?" },
          { eng: "What’s your name? (formal)", span: "¿Cómo se llama?" },
          { eng: "My name is ___", span: "Me llamo ___" },
          { eng: "Good morning", span: "Buenos dias" },
          { eng: "Good afternoon", span: "Buenas tardes" },
          { eng: "Good evening", span: "Buenas noches" },
          { eng: "Have a good day!", span: "¡Que tengas un buen día!" },
          { eng: "sir", span: "señor" },
          { eng: "ma'am", span: "señora" },
          { eng: "friend", span: "amigo" },
          { eng: "friends", span: "amigos" },
        ],
        cards: [
          {
            wordsIndices: [0, 1],
            correctPrompts: {
              title: "¡Muy bien!",
              translation: "Very good!",
            },
          },
          {
            phrase: "Hola! ¿Cómo te llamas?",
            options: ["Hello", "What's", "your", "name", "how", "me"],
            correctTranslation: "Hello What's your name",
            correctPrompts: {
              title: "¡Muy bien!",
              translation: "Very good!",
            },
          },
          {
            //replace with te vs se
            wordsIndices: [0, 1],
            correctPrompts: {
              title: "¡Muy bien!",
              translation: "Very good!",
            },
          },
          {
            phrase: "My name is John.",
            options: ["Me", "llamo", "John", "Hola", "siento", "dia"],
            correctTranslation: "Me llamo John",
            correctPrompts: {
              title: "¡Muy bien!",
              translation: "Very good!",
            },
          },
          {
            wordsIndices: [0, 1, 5, 6, 7],
            correctPrompts: {
              title: "¡Muy bien!",
              translation: "Very good!",
            },
          },
          {
            phrase: "Good evening, my name is Juan",
            options: [
              "Buenos",
              "noches",
              "me",
              "llamo",
              "Juan",
              "dias",
              "tardes",
              "beun",
            ],
            correctTranslation: "Buenos noches me llamo Juan",
            correctPrompts: {
              title: "¡Muy bien!",
              translation: "Very good!",
            },
          },
          { //replace have a good day learn
            wordsIndices: [0, 1],
            correctPrompts: {
              title: "¡Muy bien!",
              translation: "Very good!",
            },
          },
          {
            phrase: "Buenos dias señora. ¿Cómo se llama?",
            options: [
              "Good",
              "morning",
              "ma'am",
              "What's",
              "your",
              "name",
              "afternoon",
              "day",
              "sir",
            ],
            correctTranslation: "Good morning ma'am What's your name",
            correctPrompts: {
              title: "¡Muy bien!",
              translation: "Very good!",
            },
          },
          {
            phrase: "Good afternoon friends! Have a good day!",
            options: [
              "Buenas",
              "tardes",
              "amigos",
              "Que",
              "tengas",
              "un",
              "buen",
              "dia",
              "beunos",
              "dias",
              "señor",
              "llama",
              "adiós",
            ],
            correctTranslation: "Buenas tardes amigos Que tengas un buen dia",
            correctPrompts: {
              title: "¡Muy bien!",
              translation: "Very good!",
              note: [
                "amigo means friend (masculine)",
                "amiga means friend (feminine)",
                "Plural forms: amigos, amigas",
              ],
            },
          },
          {
            wordsIndices: [9, 10, 11, 12],
            correctPrompts: {
              title: "¡Muy bien!",
              translation: "Very good!",
            },
          },
        ],
      },
      {
        name: "Simple answers",
        words: [
          { eng: "Hello", span: "Hola" },
          { eng: "Goodbye", span: "Adiós" },
        ],
        cards: [],
      },
      {
        name: "Mind your Ps and Qs!",
        words: [
          { eng: "Hello", span: "Hola" },
          { eng: "Goodbye", span: "Adiós" },
        ],
      },
    ],
  },
  {
    id: "asl101",
    name: "American Sign Language 101: The Basics",
    shortname: "ASL 101",
    length: "30 min",
    description: "A-B-C! Easy as 1-2-3!",
    lessons: [],
  },
  {
    id: "asl102",
    name: "American Sign Language 102: The Alphabet",
    shortname: "ASL 102",
    length: "30 min",
    description: "A-B-C! Easy as 1-2-3!",
    lessons: [],
  },
  {
    id: "asl103",
    name: "American Sign Language 103: Numbers",
    shortname: "ASL 103",
    length: "10 min",
    description: "A-B-C! Easy as 1-2-3!",
    lessons: [],
  },
  {
    id: "span102",
    name: "Spanish 102: Numbers",
    shortname: "SPAN 102",
    length: "20 min",
    description: "A-B-C! Easy as 1-2-3!",
    lessons: [],
  },
];

module.exports = courses;
