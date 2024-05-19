// Генерация данных

const MIN_VALUE = 1;
const MAX_VALUE = 25;
const MIN_LIKES = 15;
const MAX_LIKES = 200;
const MIN_COMMENTS = 5;
const MAX_COMMENTS = 20;
const PHOTO_DESCRIPTIONS = [
  'Котик',
  'Вы',
  'Показывают',
  'Интересное',
  'Продаёте',
  'Рыбов'
];
const NAMES = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон',
];
const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
};

const getNotRepeatValues = (minValue, maxValue) => {
  const arrayValues = [];

  const getNotRepeatValue = (value) => {
    while (arrayValues.includes(value)) {
      value = getRandomInteger(minValue, maxValue);
    }

    arrayValues.push(value);

    return value;
  };

  return getNotRepeatValue;
};

const getNotRepeatId = getNotRepeatValues(MIN_VALUE, MAX_VALUE);
const getNotRepeatUrl = getNotRepeatValues(MIN_VALUE, MAX_VALUE);
const getNotRepeatCommentId = getNotRepeatValues(1, 500);

const getComment = () => ({
  id: getNotRepeatCommentId(getRandomInteger(1, 500)),
  avatar: `avatars/${getRandomInteger(1, 6)}.jpg`,
  message: getRandomInteger(1, 2) === 1 ? MESSAGES[getRandomInteger(0, MESSAGES.length - 1)] : `${MESSAGES[getRandomInteger(0, MESSAGES.length - 1)]} ${ MESSAGES[getRandomInteger(0, MESSAGES.length - 1)]}`,
  name: NAMES[getRandomInteger(0, NAMES.length - 1)],
});

const getArrayComments = () => {
  const arrayComments = [];
  const maxComments = getRandomInteger(MIN_COMMENTS, MAX_COMMENTS);

  for (let i = 0; i < maxComments; i++) {
    arrayComments.push(getComment());
  }

  return arrayComments;
};

const getObject = () => ({
  id: getNotRepeatId(getRandomInteger(MIN_VALUE, MAX_VALUE)),
  url: `photos/${getNotRepeatUrl(getRandomInteger(MIN_VALUE, MAX_VALUE))}.jpg`,
  description: PHOTO_DESCRIPTIONS[getRandomInteger(0, PHOTO_DESCRIPTIONS.length - 1)],
  likes: getRandomInteger(MIN_LIKES, MAX_LIKES),
  comments: getArrayComments(),
});

const getArrayObjects = () => {
  const arrayObjects = [];

  for (let i = 0; i < MAX_VALUE; i++) {
    arrayObjects.push(getObject());
  }

  return arrayObjects;
};

console.log(getArrayObjects());
