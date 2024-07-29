import {isEscapeKey, showAlertMessage} from './utils.js';
import {resetEffects} from './effects.js';
import {resetScaleValue} from './scale.js';
import {sendData, SuccessText, ErrorText} from './upload-send-data.js';

const MAX_DESCRIPTION_LENGTH = 140;
const DESCRIPTION_ERROR_TEXT = `Комментарий не обязателен.
  Максимальная длина комментария ${MAX_DESCRIPTION_LENGTH} символов`;
const MAX_TAGS_COUNT = 5;
const TAG_PATTERN = /^#[a-zа-яё0-9]{1,19}$/i;
const TAGS_ERROR_TEXT = `Хэш-теги необязательны! Пример хэш-тега: #ХэшТег
  (длина 1го хэш-тега не более 20 символов, не более 5 хэш-тегов под фотографией).`;

const SubmitButtonText = {
  IDLE: 'Сохранить',
  SENDING: 'Сохраняю...'
};

const form = document.querySelector('#upload-select-image');
const imgUploadForm = form.querySelector('.img-upload__overlay');
const imgUploadButton = form.querySelector('.img-upload__input');
const buttonClose = form.querySelector('.img-upload__cancel');
const descriptionField = form.querySelector('.text__description');
const hashtagsField = form.querySelector('.text__hashtags');
const submitButton = form.querySelector('.img-upload__submit');

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__error-text',
});

const openUploadForm = () => {
  document.body.classList.add('modal-open');
  imgUploadForm.classList.remove('hidden');

  buttonClose.addEventListener('click', onButtonCloseClick);
  document.addEventListener('keydown', onDocumentKeydown);
};

export const closeUploadForm = () => {
  document.body.classList.remove('modal-open');
  imgUploadForm.classList.add('hidden');

  form.reset();
  pristine.reset();
  resetEffects();
  resetScaleValue();

  buttonClose.removeEventListener('click', onButtonCloseClick);
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

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = SubmitButtonText.SENDING;
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = SubmitButtonText.IDLE;
};

export const setUserFormSubmit = (onSuccess) => {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const isValid = pristine.validate();

    if (isValid) {
      blockSubmitButton();
      sendData(new FormData(evt.target))
        .then(onSuccess)
        .then(() => {
          showAlertMessage(SuccessText.SEND_DATA, SuccessText.STATUS);
        })
        .catch(() => {
          showAlertMessage(ErrorText.SEND_DATA, ErrorText.STATUS);
        })
        .finally(unblockSubmitButton);
    }
  });
};
