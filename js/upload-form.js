import {isEscapeKey} from './utils.js';

const MAX_DESCRIPTION_LENGTH = 140;
const DESCRIPTION_ERROR_TEXT = 'Комментарий не обязателен. Максимальная длина комментария 140 символов';
const MAX_TAGS_COUNT = 5;
const TAGS_COUNT_ERROR_TEXT = 'Нельзя указывать больше пяти хэш-тегов';
const VALID_SYMBOLS = /^#[a-zа-яё0-9]{1,19}$/i;
const VALID_SYMBOLS_ERROR_TEXT = `Обратите внимание, что хэш-теги необязательны!
  Хеш-тег должен начинаться с символа #,
  не может состоять только из одной решётки
  и должен содержать только латинские буквы и цифры.
  Хэш-теги должны разделяться пробелами.
  Максимальная длина одного хэш-тега 20 символов, включая решётку.`;
const UNIQUE_TAGS_ERROR_TEXT = 'Есть повторяющиеся теги';

const form = document.querySelector('#upload-select-image');
const imgUploadForm = form.querySelector('.img-upload__overlay');
const buttonClose = form.querySelector('.img-upload__cancel');
const descriptionField = form.querySelector('.text__description');
const hashtagsField = form.querySelector('.text__hashtags');

const pristine = new Pristine (form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__error-text',
});

const openUploadForm = () => {
  document.body.classList.add('modal-open');
  imgUploadForm.classList.remove('hidden');

  buttonClose.addEventListener('click', onButtonCloseClick);
  document.addEventListener('keydown', onDocumentKeydown);
  hashtagsField.addEventListener('keydown', onDocumentKeydownCancel);
  descriptionField.addEventListener('keydown', onDocumentKeydownCancel);
};

const closeUploadForm = () => {
  document.body.classList.remove('modal-open');
  imgUploadForm.classList.add('hidden');

  form.reset();
  pristine.reset();

  buttonClose.removeEventListener('click', onButtonCloseClick);
  document.removeEventListener('keydown', onDocumentKeydown);
  hashtagsField.removeEventListener('keydown', onDocumentKeydownCancel);
  descriptionField.removeEventListener('keydown', onDocumentKeydownCancel);
};

export const onFileInputChange = () => {
  openUploadForm();
};

function onButtonCloseClick() {
  closeUploadForm();
}

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeUploadForm();
  }
}

function onDocumentKeydownCancel(evt) {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
  }
}

form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});

const isValidDescription = (description) => description.length <= MAX_DESCRIPTION_LENGTH;

const getTagsArr = (tags) => tags.trim().split(' ').filter((tag) => tag.trim().length);

const isValidTags = (tags) => {
  const tagsArr = getTagsArr(tags);

  if (tagsArr.length === 0) {
    return true;
  }

  return tagsArr.every((tag) => VALID_SYMBOLS.test(tag));
};

const isValidCount = (tags) => {
  const tagsArr = getTagsArr(tags);

  return tagsArr.length <= MAX_TAGS_COUNT;
};

const isUniqueTags = (tags) => {
  const tagsArr = getTagsArr(tags);
  const lowerCaseArr = tagsArr.map((tag) => tag.toLowerCase());

  return lowerCaseArr.length === new Set(lowerCaseArr).size;
};

pristine.addValidator(
  descriptionField,
  isValidDescription,
  DESCRIPTION_ERROR_TEXT
);

pristine.addValidator(
  hashtagsField,
  isValidTags,
  VALID_SYMBOLS_ERROR_TEXT
);

pristine.addValidator(
  hashtagsField,
  isValidCount,
  TAGS_COUNT_ERROR_TEXT
);

pristine.addValidator(
  hashtagsField,
  isUniqueTags,
  UNIQUE_TAGS_ERROR_TEXT
);
