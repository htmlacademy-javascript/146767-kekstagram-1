import {renderGallery} from './gallery.js';
import {getData} from './upload-send-data.js';
import './upload-form.js';

getData()
  .then((photos) => {
    renderGallery(photos);
  })
  .catch((error) => {
    console.log(error);
  });

