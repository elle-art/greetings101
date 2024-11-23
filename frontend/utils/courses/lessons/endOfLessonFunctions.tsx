// Function to calculate accuracy
export const calculateAccuracy = (correctPredictions: number, totalPredictions: number) => {
  const accuracy = (correctPredictions / totalPredictions) * 100;
  return Math.round(accuracy);
};

// Function to calculate average
export const calculateAverage = (array: number[]) => {
  const avg = array.reduce((acc, num) => acc + num, 0) / array.length;
  return Math.round(avg);
};

// Function to count the total words in string
// Used to calculate accuracy in TranslateCard
export const countWordsInStr = (str :string) => {
  const words = str.trim().split(/\s+/);

  return words.filter(word => word.length > 0).length;
};