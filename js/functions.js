// Функции для тренировки

const getPalindromeCheck = (stringPalindrome) => {

  const string = stringPalindrome.toLowerCase().replaceAll(' ', '');
  const stringReverse = string.split('').reverse().join('');

  return string === stringReverse;

};

getPalindromeCheck('Лёша на полке клопа нашёл ');


// Альтернативный вариант решения задачи, является ли строка палиндромом
const checkedPalindrome = (checkString) => {

  const normalizedString = checkString.replaceAll(' ','').toUpperCase();
  let invertedString = '';

  for (let i = normalizedString.length; i > 0; i--) {
    invertedString += normalizedString[i - 1];
  }

  return invertedString === normalizedString;
};

checkedPalindrome('Лёша на полке клопа нашёл ');


const getTheNumbers = (stringWithNumbers) => {

  const numbers = String(stringWithNumbers).match(/\d+/g);

  return numbers ? Number(numbers.join('')) : 'NaN';

};

getTheNumbers('ECMAScript 2022');


const getModifiedString = (originalString, minLength, paddingString) => {

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

getModifiedString('1', 2, '0');


const getCheckLengthString = (checkString, valideLength) => {
  checkString = String(checkString).length;
  return checkString <= valideLength;
};

getCheckLengthString('проверяемая строка', 20);
