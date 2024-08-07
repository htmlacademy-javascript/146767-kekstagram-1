import {debounce} from './utils.js';
import {openBigPicture} from './big-picture.js';

const FILTER_UPDATE_TIME = 500;

let photosDataArr = [];

const pictureTemplate = document.querySelector('#picture').content;
const gallery = document.querySelector('.pictures');
const imgFilters = document.querySelector('.img-filters');
const imgFiltersForm = document.querySelector('.img-filters__form');

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

const onFilterClick = (evt) => {
  const filter = evt.target.id;
  const photosFilterArr = photosDataArr.slice();

  gallery
    .querySelectorAll('.picture')
    .forEach((picture) => picture.remove());

  switch (filter) {
    case 'filter-default':
      renderGallery(photosFilterArr);
      break;
    case 'filter-random':
      renderGallery(photosFilterArr.sort(() => Math.random() - 0.5).slice(0, 10));
      break;
    case 'filter-discussed':
      renderGallery(photosFilterArr.sort((a, b) => b.comments.length - a.comments.length));
      break;
  }
};

export const initGallery = (photos) => {
  photosDataArr = photos;

  imgFilters.classList.remove('img-filters--inactive');
  imgFiltersForm.addEventListener('click', debounce(onFilterClick, FILTER_UPDATE_TIME));

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
