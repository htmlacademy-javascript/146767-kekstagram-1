import {isEscapeKey} from './utils.js';
import {onEffectsChange, resetEffects} from './effects.js';
import {onButtonZoomClick, resetScaleValue} from './scale.js';

const MAX_DESCRIPTION_LENGTH = 140;
const DESCRIPTION_ERROR_TEXT = `Комментарий не обязателен.
  Максимальная длина комментария ${MAX_DESCRIPTION_LENGTH} символов`;
const MAX_TAGS_COUNT = 5;
const TAG_PATTERN = /^#[a-zа-яё0-9]{1,19}$/i;
const TAGS_ERROR_TEXT = `Хэш-теги необязательны! Пример хэш-тега: #ХэшТег
  (длина 1го хэш-тега не более 20 символов, не более 5 хэш-тегов под фотографией).`;

const form = document.querySelector('#upload-select-image');
const imgUploadForm = form.querySelector('.img-upload__overlay');
const imgUploadButton = form.querySelector('.img-upload__input');
const imgUploadScale = form.querySelector('.img-upload__scale');
const buttonClose = form.querySelector('.img-upload__cancel');
const effectsFilters = form.querySelector('.effects');
const descriptionField = form.querySelector('.text__description');
const hashtagsField = form.querySelector('.text__hashtags');

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__error-text',
});

const openUploadForm = () => {
  document.body.classList.add('modal-open');
  imgUploadForm.classList.remove('hidden');

  buttonClose.addEventListener('click', onButtonCloseClick);
  imgUploadScale.addEventListener('click', onButtonZoomClick);
  effectsFilters.addEventListener('click', onEffectsChange);
  document.addEventListener('keydown', onDocumentKeydown);
};

const closeUploadForm = () => {
  document.body.classList.remove('modal-open');
  imgUploadForm.classList.add('hidden');

  form.reset();
  pristine.reset();
  resetEffects();
  resetScaleValue();

  buttonClose.removeEventListener('click', onButtonCloseClick);
  imgUploadScale.removeEventListener('click', onButtonZoomClick);
  effectsFilters.removeEventListener('click', onEffectsChange);
  document.removeEventListener('keydown', onDocumentKeydown);
};

const onFileInputChange = () => {
  openUploadForm();
};

imgUploadButton.addEventListener('change', onFileInputChange);

function onButtonCloseClick() {
  closeUploadForm();
}

const isFieldFocused = () =>
  document.activeElement === hashtagsField ||
  document.activeElement === descriptionField;

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt) && !isFieldFocused()) {
    evt.preventDefault();
    closeUploadForm();
  }
}

form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});

const isDescriptionValid = (description) => description.length <= MAX_DESCRIPTION_LENGTH;

const normalizeTags = (tags) => tags.trim().split(' ').filter((tag) => tag.trim().length);

const isSymbolsValid = (tags) => !tags.length ? true : tags.every((tag) => TAG_PATTERN.test(tag));

const isTagsCountValid = (tags) => tags.length <= MAX_TAGS_COUNT;

const isTagsUnique = (tags) => {
  const lowerCaseArr = tags.map((tag) => tag.toLowerCase());

  return lowerCaseArr.length === new Set(lowerCaseArr).size;
};

const isTagsValid = (tags) => {
  const tagsArr = normalizeTags(tags);

  return isSymbolsValid(tagsArr) && isTagsCountValid(tagsArr) && isTagsUnique(tagsArr);
};

pristine.addValidator(
  descriptionField,
  isDescriptionValid,
  DESCRIPTION_ERROR_TEXT
);

pristine.addValidator(
  hashtagsField,
  isTagsValid,
  TAGS_ERROR_TEXT
);
