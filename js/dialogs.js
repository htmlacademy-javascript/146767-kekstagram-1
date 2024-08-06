import {isEscapeKey} from './utils.js';

const ALERT_SHOW_TIME = 5000;

let countDown = ALERT_SHOW_TIME / 1000;
let activeDialog = null;

const errorDialogTemplate =
  document
    .querySelector('#error')
    .content
    .cloneNode(true)
    .querySelector('.error');
const successDialogTemplate =
  document
    .querySelector('#success')
    .content
    .cloneNode(true)
    .querySelector('.success');
const errorAlertTemplate =
  document
    .querySelector('#alert')
    .content
    .cloneNode(true)
    .querySelector('.alert');

const closeDialog = () => {
  activeDialog.remove();
  activeDialog = null;

  document.removeEventListener('keydown', onDocumentKeydown, true);
};

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt) && activeDialog) {
    evt.stopPropagation();

    closeDialog();
  }
}

const closeAfterTimeout = (counter) => {
  counter.textContent = `(${countDown})`;

  const interval = setInterval(() => {
    countDown -= 1;
    counter.textContent = `(${countDown})`;

    if (countDown === 0) {
      clearInterval(interval);
      if (activeDialog) {
        activeDialog.remove();
      }
    }
  }, 1000);
};

const renderTemplate = (template) => {
  document.body.appendChild(template);
  activeDialog = template;
};

const openDialog = (template) => {
  const button = template.querySelector('button');

  renderTemplate(template);

  button.addEventListener('click', closeDialog);
  document.addEventListener('keydown', onDocumentKeydown, true);
};

const openAlert = (template) => {
  const button = template.querySelector('button');
  const output = template.querySelector('output');

  renderTemplate(template);

  closeAfterTimeout(output);

  button.addEventListener('click', () => (location.reload()));
  document.addEventListener('keydown', onDocumentKeydown, true);
};

export const showSuccessDialog = () => openDialog(successDialogTemplate);

export const showErrorDialog = () => openDialog(errorDialogTemplate);

export const showErrorAlert = () => openAlert(errorAlertTemplate);
