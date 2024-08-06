import {getData} from './api.js';
import {showErrorAlert} from './dialogs.js';
import {initGallery} from './gallery.js';
import './upload-form.js';

getData()
  .then((photos) => {
    initGallery(photos);
  })
  .catch(() => {
    showErrorAlert();
  });
