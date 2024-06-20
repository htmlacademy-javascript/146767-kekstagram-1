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
import {openBigPicture} from './big-picture.js';

const pictureTemplate = document.querySelector('#picture').content;
const gallery = document.querySelector('.pictures');

const createComment = (id) => ({
  id,
  avatar: `img/avatar-${getRandomInteger(1, AVATAR_COUNT)}.svg`,
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

const createPictureEl = ({id, url, likes, comments}) => {
  const picture = pictureTemplate.cloneNode(true);
  const pictureSrc = picture.querySelector('.picture__img');
  const pictureLikes = picture.querySelector('.picture__likes');
  const pictureComments = picture.querySelector('.picture__comments');

  pictureSrc.src = url;
  pictureSrc.dataset.id = id;
  pictureLikes.textContent = likes;
  pictureComments.textContent = comments.length;

  return picture;
};

const renderGallery = (photos) => {
  const fragment = document.createDocumentFragment();

  photos.forEach((photo) => {
    fragment.appendChild(createPictureEl(photo));
  });

  gallery.appendChild(fragment);
};

const createGalleryData = createGallery();

renderGallery(createGalleryData);

const onGalleryClick = (evt) => {
  const imgEl = evt.target.matches('.picture__img');

  if (!imgEl) {
    return;
  }

  const currentData = createGalleryData.find(({id}) => id === +evt.target.dataset.id);

  openBigPicture(currentData);
};

gallery.addEventListener('click', onGalleryClick);
