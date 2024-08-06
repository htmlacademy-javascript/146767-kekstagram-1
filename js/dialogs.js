import {isEscapeKey} from './utils.js';

const SECONDS_TO_CLOSE = 5;
const UPDATE_INTERVAL = 1000;

let activeDialog = null;

const errorDialogTemplate =
  document
    .querySelector('#error')
    .content
    .querySelector('.error');
const successDialogTemplate =
  document
    .querySelector('#success')
    .content
    .querySelector('.success');
const errorAlertTemplate =
  document
    .querySelector('#alert')
    .content
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

const closeAfterTimeout = (output, secondsToClose) => {
  output.textContent = `(${secondsToClose})`;

  const interval = setInterval(() => {
    secondsToClose--;
    output.textContent = `(${secondsToClose})`;

    if (secondsToClose === 0) {
      clearInterval(interval);
      closeDialog();
    }
  }, UPDATE_INTERVAL);
};

const openDialog = (template) => {
  activeDialog = template.cloneNode(true);
  const button = activeDialog.querySelector('button');

  document.body.appendChild(activeDialog);

  button.addEventListener('click', () => closeDialog());
  document.addEventListener('keydown', onDocumentKeydown, true);
};

const openAlert = (template) => {
  activeDialog = template.cloneNode(true);
  const output = activeDialog.querySelector('output');

  document.body.appendChild(activeDialog);

  closeAfterTimeout(output, SECONDS_TO_CLOSE);
};

export const showSuccessDialog = () => openDialog(successDialogTemplate);

export const showErrorDialog = () => openDialog(errorDialogTemplate);

export const showErrorAlert = () => openAlert(errorAlertTemplate);
