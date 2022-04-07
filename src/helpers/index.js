const handleClassName = (answer, hasClickedAnAnswer, correctAnswer) => {
  switch (true) {
  case hasClickedAnAnswer && answer === correctAnswer:
    return 'correct';
  case hasClickedAnAnswer && answer !== correctAnswer:
    return 'wrong';
  default:
    return null;
  }
};

export default handleClassName;
