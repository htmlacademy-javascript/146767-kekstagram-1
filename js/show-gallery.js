import {createGallery} from './data.js';

const galleryWrapper = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content;
const fragment = document.createDocumentFragment();

export const showGallery = createGallery();

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
