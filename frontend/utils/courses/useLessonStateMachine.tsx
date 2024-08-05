// utils/courses/useLessonStateMachine.js
import { useState } from 'react';

const useLessonStateMachine = (): [number, () => void] => {
  const [state, setState] = useState(0);

  const advanceState = () => {
    setState(prevState => prevState + 1);
  };

  return [state, advanceState];
};

export default useLessonStateMachine;
