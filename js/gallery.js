import {debounce} from './utils.js';
import {openBigPicture} from './big-picture.js';

const RANDOM_PHOTOS_COUNT = 10;
const FILTER_UPDATE_TIME = 500;

const Filters = {
  FILTER_RANDOM: 'filter-random',
  FILTER_DISCUSSED: 'filter-discussed',
};

let galleryData = [];

const pictureTemplate = document.querySelector('#picture').content;
const galleryContainer = document.querySelector('.gallery');
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

  galleryContainer.appendChild(fragment);
};

const onFilterClick = (evt) => {
  let sortedPhotos = [];

  if (!evt.target.matches('button')) {
    return;
  }

  switch (evt.target.id) {
    case Filters.FILTER_RANDOM:
      sortedPhotos = galleryData
        .toSorted(() => Math.random() - 0.5)
        .slice(0, RANDOM_PHOTOS_COUNT);
      break;
    case Filters.FILTER_DISCUSSED:
      sortedPhotos = galleryData
        .toSorted((a, b) => b.comments.length - a.comments.length);
      break;
    default:
      sortedPhotos = galleryData;
      break;
  }

  galleryContainer.innerHTML = '';
  renderGallery(sortedPhotos);
};

export const initGallery = (photos) => {
  galleryData = photos;

  imgFilters.classList.remove('img-filters--inactive');
  imgFiltersForm.addEventListener('click', debounce(onFilterClick, FILTER_UPDATE_TIME));

  renderGallery(galleryData);
};

const onGalleryClick = (evt) => {
  const imgEl = evt.target.matches('.picture__img');

  if (!imgEl) {
    return;
  }

  const currentData = galleryData.find(({id}) => id === +evt.target.dataset.id);

  openBigPicture(currentData);
};

galleryContainer.addEventListener('click', onGalleryClick);
