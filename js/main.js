import {showMessageError} from './utils.js';
import {renderGallery} from './gallery.js';
import {getData} from './upload-send-data.js';
import './upload-form.js';

getData()
  .then((photos) => {
    renderGallery(photos);
  })
  .catch((error) => {
    showMessageError(error.message);
  });

