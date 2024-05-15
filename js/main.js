// Генерация данных

const MIN_VALUE = 1;
const MAX_VALUE = 25;
const MIN_LIKES = 15;
const MAX_LIKES = 200;
const PHOTO_DESCRIPTIONS = ['Котик', 'Вы', 'Показывают', 'Интересное', 'Продаёте', 'Рыбов'];

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
};

const getObject = () => {
  const id = getRandomInteger(MIN_VALUE, MAX_VALUE);
  const url = `photos/${getRandomInteger(MIN_VALUE, MAX_VALUE)}.jpg`;

  return {
    id,
    url,
    description: PHOTO_DESCRIPTIONS[getRandomInteger(0, PHOTO_DESCRIPTIONS.length - 1)],
    likes: getRandomInteger(MIN_LIKES, MAX_LIKES),
  };

};

console.log(getObject());
