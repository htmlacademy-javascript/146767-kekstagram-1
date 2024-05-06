// Функции для тренировки

const checkedThePalindrome = function (stringPalindrome) {
  const string = stringPalindrome.toLowerCase().replaceAll(' ', '');
  const stringReverse = string.split('').reverse().join('');
  return string === stringReverse ? 'true' : 'false';
};

checkedThePalindrome('Лёша на полке клопа нашёл ');
// console.log(checkedThePalindrome('Лёша на полке клопа нашёл '));
