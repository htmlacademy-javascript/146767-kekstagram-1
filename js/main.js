import {getRandomInteger, getRandomArrElement} from './util.js';

const PICTURE_COUNT = 25;
const AVATAR_COUNT = 6;
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

const createComment = (id) => ({
  id,
  avatar: `avatars/${getRandomInteger(1, AVATAR_COUNT)}.jpg`,
  message: getRandomArrElement(MESSAGES),
  name: getRandomArrElement(NAMES),
});

const createPicture = (id) => ({
  id,
  url: `photos/${id}.jpg`,
  description: getRandomArrElement(PHOTO_DESCRIPTIONS),
  likes: getRandomInteger(MIN_LIKES, MAX_LIKES),
  comments: Array.from(
    { length: getRandomInteger(MIN_COMMENTS, MAX_COMMENTS) },
    (_, comentIndex) =>
      createComment(comentIndex + 1)
  ),
});

const createGallery = () =>
  Array.from({ length: PICTURE_COUNT }, (_, pictureIndex) =>
    createPicture(pictureIndex + 1)
  );

createGallery();
console.log(createGallery());
