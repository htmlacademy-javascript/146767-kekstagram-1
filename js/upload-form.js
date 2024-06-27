import {isEscapeKey} from './utils.js';

const form = document.querySelector('#upload-select-image');
const imgUploadForm = form.querySelector('.img-upload__overlay');
const buttonClose = form.querySelector('.img-upload__cancel');
const textField = form.querySelector('.text__description');
const hashtagsField = form.querySelector('.text__hashtags');

const openUploadForm = () => {
  document.body.classList.add('modal-open');
  imgUploadForm.classList.remove('hidden');

  buttonClose.addEventListener('click', onButtonCloseClick);
  document.addEventListener('keydown', onDocumentKeydown);
  textField.addEventListener('keydown', onDocumentKeydownCancel);
  hashtagsField.addEventListener('keydown', onDocumentKeydownCancel);
};

const closeUploadForm = () => {
  document.body.classList.remove('modal-open');
  imgUploadForm.classList.add('hidden');

  form.reset();

  buttonClose.removeEventListener('click', onButtonCloseClick);
  document.removeEventListener('keydown', onDocumentKeydown);
  textField.removeEventListener('keydown', onDocumentKeydownCancel);
  hashtagsField.removeEventListener('keydown', onDocumentKeydownCancel);
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
