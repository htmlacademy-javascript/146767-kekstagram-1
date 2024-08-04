import {getData, ErrorText} from './api.js';
import {
  showAlertMessage,
  BUTTON_ERROR_TEXT,
  errorTemplate,
  ERROR_CLASS} from './dialogs.js';
import {initGallery} from './gallery.js';
import './upload-form.js';

getData()
  .then((photos) => {
    initGallery(photos);
  })
  .catch(() => {
    showAlertMessage(
      ErrorText.GET_DATA,
      BUTTON_ERROR_TEXT,
      errorTemplate,
      ERROR_CLASS);
  });
