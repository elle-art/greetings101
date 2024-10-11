// Functions for different lesson states
const getMatchCard = (req, res) => {
    res.json({ component: "MatchCard", courseId: req.query.courseId, lessonNo: req.query.lessonNo });
  };
  
  const getTranslatePhraseCard = (req, res) => {
    res.json({ component: "TranslatePhraseCard", courseId: req.query.courseId, lessonNo: req.query.lessonNo });
  };
  
  const getEndOfLesson = (req, res) => {
    res.json({ component: "EndOfLesson", courseId: req.query.courseId, lessonNo: req.query.lessonNo });
  };

// array holding lesson card information
const courseStateFunctions = {
  span101: {
    lesson0: {
      0: getMatchCard,
      1: getTranslatePhraseCard,
      2: getMatchCard, //replace
      3: getTranslatePhraseCard,
      4: getMatchCard,
      5: getTranslatePhraseCard,
      6: getMatchCard, //replace
      7: getTranslatePhraseCard,
      8: getTranslatePhraseCard,
      9: getMatchCard,
      10: getEndOfLesson,
    },
    lesson1: {
      0: getTranslatePhraseCard,
      1: getTranslatePhraseCard,
      2: getMatchCard,
      3: getTranslatePhraseCard,
      4: getMatchCard, //replace
      5: getMatchCard,
      6: getTranslatePhraseCard,
      7: getTranslatePhraseCard,
      8: getEndOfLesson,
    },
    lesson2: {
      0: getMatchCard,
      1: getTranslatePhraseCard,
      2: getTranslatePhraseCard,
      3: getMatchCard,
      4: getTranslatePhraseCard,
      5: getTranslatePhraseCard,
      6: getMatchCard,
      7: getEndOfLesson,
    },
    lesson3: {
      0: getMatchCard, //replace
      1: getMatchCard,
      2: getTranslatePhraseCard,
      3: getTranslatePhraseCard,
      4: getMatchCard,
      5: getTranslatePhraseCard,
      6: getEndOfLesson,
    },
    lesson4: {
      0: getTranslatePhraseCard,
      1: getMatchCard,
      2: getTranslatePhraseCard,
      3: getTranslatePhraseCard,
      4: getEndOfLesson,
    },
  },
  asl101: {
    lesson1: {},
  },
};

module.exports = courseStateFunctions;