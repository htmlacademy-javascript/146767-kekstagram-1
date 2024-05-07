// Функции для тренировки

const checkedThePalindrome = (stringPalindrome) => {

  const string = stringPalindrome.toLowerCase().replaceAll(' ', '');
  const stringReverse = string.split('').reverse().join('');

  return string === stringReverse;

};

checkedThePalindrome('Лёша на полке клопа нашёл ');


const getTheNumbers = (stringWithNumbers) => {

  const numbers = String(stringWithNumbers).match(/\d+/g);

  return numbers ? Number(numbers.join('')) : 'NaN';

};

getTheNumbers('ECMAScript 2022');


const padString = (originalString, minLength, paddingString) => {

  if (minLength <= originalString.length) {
    return originalString;
  }

  const paddingCount = minLength - originalString.length;

  paddingString = paddingString.substring(0, paddingCount);

  let newPaddingString = '';
  let sumOriginPaddingString = '';

  for (let i = 0; sumOriginPaddingString.length < minLength; i++) {

    if (paddingString.length > i) {
      newPaddingString += paddingString[i];
      sumOriginPaddingString = newPaddingString + originalString;
    } else {
      sumOriginPaddingString = paddingString[0] + sumOriginPaddingString;
    }

  }

  return sumOriginPaddingString;
};

padString('1', 2, '0');


const checkedLengthString = (checkString, valideLength) => {
  checkString = String(checkString).length;
  return checkString <= valideLength;
};

checkedLengthString('проверяемая строка', 20);
