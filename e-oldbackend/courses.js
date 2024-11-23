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
        // lesson0
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
            options: ["Buenos", "noches", "me", "llamo", "Juan", "dias", "tardes", "beun"],
            correctTranslation: "Buenos noches me llamo Juan",
            correctPrompts: {
              title: "¡Muy bien!",
              translation: "Very good!",
            },
          },
          {
            //replace have a good day learn
            wordsIndices: [0, 1],
            correctPrompts: {
              title: "¡Muy bien!",
              translation: "Very good!",
            },
          },
          {
            phrase: "Buenos dias señora. ¿Cómo se llama?",
            options: ["Good", "morning", "ma'am", "What's", "your", "name", "afternoon", "day", "sir"],
            correctTranslation: "Good morning ma'am What's your name",
            correctPrompts: {
              title: "¡Muy bien!",
              translation: "Very good!",
            },
          },
          {
            phrase: "Good afternoon friends! Have a good day!",
            options: ["Buenas", "tardes", "amigos", "Que", "tengas", "un", "buen", "dia", "beunos", "dias", "señor", "llama", "adiós",],
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
        //lesson1
        name: "Simple answers",
        words: [
          { eng: "How are you?", span: "¿Cómo estás?" },
          { eng: "Do you understand?", span: "¿Entiendes?" },
          { eng: "Yes", span: "Sí" },
          { eng: "No", span: "No " },
          { eng: "I don’t know", span: "No sé" },
          { eng: "Good", span: "Bien" },
          { eng: "Bad", span: "Mal" },
          { eng: "Very good", span: "Muy bien" },
          { eng: "So-so", span: "Más o menos" },
          { eng: "And you?", span: "¿Y tú?" },
        ],
        cards: [
          {
            phrase: "Hola! ¿Cómo estás?",
            options: ["Hello", "have", "you", "are", "How", "day", "my"],
            correctTranslation: "Hello How are you",
            correctPrompts: {
              title: "¡Muy bien!",
              translation: "Very good!",
            },
          },
          {
            phrase: "Very good! And you?",
            options: ["Sí", "Muy", "Y", "tú", "estás", "bien", "buenos"],
            correctTranslation: "Muy bien Y tú",
            correctPrompts: {
              title: "¡Muy bien!",
              translation: "Very good!",
            },
          },
          {
            wordsIndices: [2, 3, 4],
            correctPrompts: {
              title: "¡Muy bien!",
              translation: "Very good!",
            },
          },
          {
            phrase: "¿Entiendes?",
            options: ["Do", "are", "you", "how", "understand"],
            correctTranslation: "Do you understand",
            correctPrompts: {
              title: "¡Muy bien!",
              translation: "Very good!",
            },
          },
          { //replace with type answer
            wordsIndices: [2, 3, 4],
            correctPrompts: {
              title: "¡Muy bien!",
              translation: "Very good!",
            },
          },
          {
            wordsIndices: [2, 3, 4, 5, 6, 7, 8],
            correctPrompts: {
              title: "¡Muy bien!",
              translation: "Very good!",
            },
          },
          {
            phrase: "¡Buenas tardes! ¿Cómo estás?",
            options: ["Good", "bad", "How", "are", "Hello", "day", "my", "afternoon", "very", "you",],
            correctTranslation: "Good afternoon How are you",
            correctPrompts: {
              title: "¡Muy bien!",
              translation: "Very good!",
            },
          },
          {
            phrase: "Me llamo Mark. ¿Entiendes? ¿Sí o no?",
            options: ["My", "name", "is", "Mark", "Do", "you", "understand", "Yes", "or", "no", "please", "thank",],
            correctTranslation: "My name is Mark Do you understand Yes or no",
            correctPrompts: {
              title: "¡Muy bien!",
              translation: "Very good!",
            },
          },
        ],
      },
      {
        //lesson2
        name: "Mind your Ps and Qs!",
        words: [
          { eng: "Please", span: "Por favor" },
          { eng: "Thank you", span: "Gracias" },
          { eng: "Of course", span: "Claro" },
          { eng: "You’re welcome", span: "De nada" },
          { eng: "Pardon me", span: "Perdón" },
          { eng: "I’m sorry", span: "Lo siento" },
          { eng: "Nice to meet you!", span: "¡Mucho gusto!" },
          { eng: "Are you ok? (informal)", span: "¿Estás bien?" },
          { eng: "Can you help me? (formal)", span: "¿Me puede ayudar?" },
          { eng: "Can I help you? (formal)", span: "¿Le puedo ayudar?" },
          { eng: "Excuse me", span: "Disculpe" },
        ],
        cards: [
          {
            wordsIndices: [0, 1, 2, 3],
            correctPrompts: {
              title: "¡Muy bien!",
              translation: "Very good!",
            },
          },
          {
            phrase: "Disculpe. ¿Me puede ayudar?",
            options: ["Excuse", "me", "Can", "you", "help", "me", "my", "day", "how",],
            correctTranslation: "Excuse me Can you help me",
            correctPrompts: {
              title: "¡Muy bien!",
              translation: "Very good!",
            },
          },
          {
            phrase: "Hi! Can I help you?",
            options: ["Hola", "Le", "puedo", "ayudar", "claro", "gracias", "bien", "muy",],
            correctTranslation: "Hola Le puedo ayudar",
            correctPrompts: {
              title: "¡Muy bien!",
              translation: "Very good!",
            },
          },
          {
            wordsIndices: [2, 3, 4, 5, 10],
            correctPrompts: {
              title: "¡Muy bien!",
              translation: "Very good!",
            },
          },
          {
            phrase: "¡Mucho gusto! ¿Cómo se llama?",
            options: ["Nice", "to", "meet", "you", "What's", "your", "name", "thank", "good", "my"],
            correctTranslation: "Nice to meet you What's your name",
            correctPrompts: {
              title: "¡Muy bien!",
              translation: "Very good!",
            },
          },
          {
            phrase: "¿Estás bien?",
            options: ["Are", "you", "ok", "course", "Excuse", "me", "of"],
            correctTranslation: "Are you ok",
            correctPrompts: {
              title: "¡Muy bien!",
              translation: "Very good!",
            },
          },
          {
            wordsIndices: [2, 3, 4, 5, 10],
            correctPrompts: {
              title: "¡Muy bien!",
              translation: "Very good!",
            },
          },
        ],
      },
      {
        //lesson3
        name: "Questions",
        words: [
          { eng: "Who?", span: "¿Quién?" },
          { eng: "What?", span: "¿Qué?" },
          { eng: "When?", span: "¿Cuándo?" },
          { eng: "Where?", span: "¿Dónde?" },
          { eng: "Why?", span: "¿Por qué?" },
          { eng: "How?", span: "¿Cómo?" },
          { eng: "How much?", span: "¿Cuánto?" },
        ],
        cards: [
          { //replace w/ learn card
            wordsIndices: [0, 1, 2, 3],
            correctPrompts: {
              title: "¡Muy bien!",
              translation: "Very good!",
            },
          },
          {
            wordsIndices: [0, 1, 2, 3, 4],
            correctPrompts: {
              title: "¡Muy bien!",
              translation: "Very good!",
            },
          },
          {
            phrase: "¿Cómo estás?",
            options: ["How", "are", "you", "name", "day", "is", "what",],
            correctTranslation: "How are you",
            correctPrompts: {
              title: "¡Muy bien!",
              translation: "Very good!",
            },
          },
          {
            phrase: "¿Cómo se llama?",
            options: ["What's", "your", "you", "name", "day", "are", "How",],
            correctTranslation: "What's your name",
            correctPrompts: {
              title: "¡Muy bien!",
              translation: "Very good!",
              note: "Notice that in this instance cómo translates to what rather than how"
            },
          },
          {
            wordsIndices: [2, 3, 5, 6],
            correctPrompts: {
              title: "¡Muy bien!",
              translation: "Very good!",
            },
          },
          {
            phrase: "¿Cuánto?",
            options: ["How", "much", "When", "where", "why", "you"],
            correctTranslation: "How much",
            correctPrompts: {
              title: "¡Muy bien!",
              translation: "Very good!",
            },
          },
        ],
      },
      {
        //lesson4
        name: "Last one, best one",
        words: [
          { eng: "Where is the bathroom?", span: "¿Dónde está el baño?" },
          { eng: "I don’t know much Spanish", span: "No sé mucho español" },
          { eng: "See you soon!", span: "¡Hasta pronto!" },
          { eng: "See you later!", span: "¡Hasta luego!" },
          { eng: "Nice to meet you!", span: "¡Mucho gusto!" },
          { eng: "Good evening", span: "Buenas noches" },
          { eng: "Have a good day!", span: "¡Que tengas un buen día!" },
        ],
        cards: [
          {
            phrase: "¿Dónde está el baño?",
            options: ["Where", "is", "the", "bathroom", "When", "how", "you", "are"],
            correctTranslation: "Where is the bathroom",
            correctPrompts: {
              title: "¡Muy bien!",
              translation: "Very good!",
            },
          },
          {
            wordsIndices: [2, 3, 4, 5, 6],
            correctPrompts: {
              title: "¡Muy bien!",
              translation: "Very good!",
            },
          },
          {
            phrase: "Sorry. I don’t know much Spanish.",
            options: ["Lo", "siento", "No", "sé", "mucho", "español", "que", "cuánto", "puedo", "por", "muy"],
            correctTranslation: "Lo siento No sé mucho español",
            correctPrompts: {
              title: "¡Muy bien!",
              translation: "Very good!",
            },
          },
          {
            phrase: "¡Muy bien! ¡Hasta luego!",
            options: ["Very", "good", "See", "you", "later", "yes", "How", "have"],
            correctTranslation: "Very good See you later",
            correctPrompts: {
              title: "¡Muy bien!",
              translation: "Very good!",
            },
          },
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
