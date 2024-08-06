import {openBigPicture} from './big-picture.js';

let photosDataArr = [];

const pictureTemplate = document.querySelector('#picture').content;
const gallery = document.querySelector('.pictures');

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

export const initGallery = (photos) => {
  photosDataArr = photos;

  renderGallery(photosDataArr);
};

const onGalleryClick = (evt) => {
  const imgEl = evt.target.matches('.picture__img');

  if (!imgEl) {
    return;
  }

  const currentData = photosDataArr.find(({id}) => id === +evt.target.dataset.id);

  openBigPicture(currentData);
};

gallery.addEventListener('click', onGalleryClick);
