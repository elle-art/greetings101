// API functions for backend courses data
const courses = require("../courses");
const courseStateFunctions = require('./courseStateFunctions');

// Get courses array
const getCourses = (req, res) => {
  res.json(courses);
};

// Get component state data for a lesson of a given course
const getCourseData = (req, res) => {
  const { courseId, lessonNo, state } = req.query;
  const lessonStates = courseStateFunctions[courseId]?.[`lesson${lessonNo}`];
  const stateFunction = lessonStates?.[state];

  if (stateFunction) {
    stateFunction(req, res);
  } else {
    res.status(404).json({ message: 'Invalid course, lesson, or state' });
  }
};

module.exports = {
  getCourses,
  getCourseData
};
