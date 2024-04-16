module.exports = function getCorrectWordForm(
  number,
  oneForm,
  twoForm,
  fiveForm
) {
  number = Math.abs(number);
  number %= 100;
  if (number >= 5 && number <= 20) {
    return fiveForm;
  }
  number %= 10;
  if (number === 1) {
    return oneForm;
  }
  if (number >= 2 && number <= 4) {
    return twoForm;
  }
  return fiveForm;
};
