// Функции для тренировки

const checkedThePalindrome = function (stringPalindrome) {

  const string = stringPalindrome.toLowerCase().replaceAll(' ', '');
  const stringReverse = string.split('').reverse().join('');

  return string === stringReverse ? 'true' : 'false';

};

checkedThePalindrome('Лёша на полке клопа нашёл ');


const getTheNumbers = function (stringWithNumbers) {

  const numbers = String(stringWithNumbers).match(/\d+/g);

  return numbers ? Number(numbers.join('')) : 'NaN';

};

getTheNumbers('ECMAScript 2022');
