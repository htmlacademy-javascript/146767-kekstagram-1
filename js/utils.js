export const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
};

export const getRandomArrElement = (array) =>
  array[getRandomInteger(0, array.length - 1)];

export const isEscapeKey = (evt) => evt.key === 'Escape';
