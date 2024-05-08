// Функции для тренировки
const isPalindrome = (str) => {
  const normalizedStr = str.toLowerCase().replaceAll(' ', '');
  const reversedStr = str.split('').reverse().join('');

  return normalizedStr === reversedStr;
};

isPalindrome('Лёша на полке клопа нашёл ');

// Альтернативный вариант решения задачи, является ли строка палиндромом
const canPalindrome = (str) => {
  const normalizedStr = str.replaceAll(' ','').toUpperCase();

  for (let i = 0; normalizedStr.length / 2 > i; i++) {
    if (normalizedStr[i] !== normalizedStr[normalizedStr.length - i - 1]) {
      return false;
    }
  }

  return true;
};

canPalindrome('Д Овод ');

const getNumbers = (stringWithNumbers) => {
  const numbers = String(stringWithNumbers).match(/\d+/g);

  return numbers ? Number(numbers.join('')) : NaN;
};

getNumbers('ECMAScript 2022');

const getModifiedString = (originalStr, minLength, paddingStr) => {
  if (minLength <= originalStr.length) {
    return originalStr;
  }

  const paddingLength = minLength - originalStr.length;

  paddingStr = paddingStr.substring(0, paddingLength);

  let newPaddingStr = '';
  let sumOriginPaddingStr = '';

  for (let i = 0; sumOriginPaddingStr.length < minLength; i++) {
    if (paddingStr.length > i) {
      newPaddingStr += paddingStr[i];
      sumOriginPaddingStr = newPaddingStr + originalStr;
    } else {
      sumOriginPaddingStr = paddingStr[0] + sumOriginPaddingStr;
    }
  }

  return sumOriginPaddingStr;
};

getModifiedString('1', 2, '0');
getModifiedString('1', 20, '2345'); // 22222222222222223451

const isStrLengthValidm = (str, maxLength) => str.length <= maxLength;

isStrLengthValidm('проверяемая строка', 20);
