import {showAlertMessage} from './utils.js';
import {renderGallery} from './gallery.js';
import {getData, ErrorText} from './upload-send-data.js';
import {setUserFormSubmit, closeUploadForm} from './upload-form.js';

getData()
  .then((photos) => {
    renderGallery(photos);
  })
  .catch(() => {
    showAlertMessage(ErrorText.GET_DATA, ErrorText.STATUS);
  });

setUserFormSubmit(closeUploadForm);
