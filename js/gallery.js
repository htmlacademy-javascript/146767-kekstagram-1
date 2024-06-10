import {getRandomInteger, getRandomArrElement} from './utils.js';
import {
  MIN_LIKES,
  MAX_LIKES,
  MIN_COMMENTS,
  MAX_COMMENTS,
  PICTURE_COUNT,
  AVATAR_COUNT,
  MESSAGES,
  PHOTO_DESCRIPTIONS,
  NAMES
} from './data.js';

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

export const createGallery = () =>
  Array.from({ length: PICTURE_COUNT }, (_, pictureIndex) =>
    createPicture(pictureIndex + 1)
  );

const galleryWrapper = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content;
const fragment = document.createDocumentFragment();

const showGallery = createGallery();

showGallery.forEach(({url, likes, comments}) => {
  const picture = pictureTemplate.cloneNode(true);
  const pictureSrc = picture.querySelector('.picture__img');
  const pictureLikes = picture.querySelector('.picture__likes');
  const pictureComments = picture.querySelector('.picture__comments');

  pictureSrc.src = url;
  pictureLikes.textContent = likes;
  pictureComments.textContent = comments.length;

  fragment.appendChild(picture);
});

galleryWrapper.appendChild(fragment);
