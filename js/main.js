// Генерация данных

const MIN_VALUE = 1;
const MAX_VALUE = 25;

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
};

console.log(getRandomInteger(MIN_VALUE, MAX_VALUE));
