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

const onDialogClick = (evt) => {
  if (evt.target.matches('button')
    || evt.target.hasAttribute('data-dialog-close')) {
    closeDialog();
  }
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

    if (secondsToClose === 0 || !activeDialog) {
      clearInterval(interval);
      if (activeDialog) {
        closeDialog();
      }
    }
  }, UPDATE_INTERVAL);
};

const openDialog = (template) => {
  activeDialog = template.cloneNode(true);

  document.body.appendChild(activeDialog);

  activeDialog.addEventListener('click', onDialogClick);
  document.addEventListener('keydown', onDocumentKeydown, true);
};

const openAlert = (template) => {
  activeDialog = template.cloneNode(true);
  const output = activeDialog.querySelector('output');

  document.body.appendChild(activeDialog);

  closeAfterTimeout(output, SECONDS_TO_CLOSE);

  activeDialog.addEventListener('click', onDialogClick);
};

export const showSuccessDialog = () => openDialog(successDialogTemplate);

export const showErrorDialog = () => openDialog(errorDialogTemplate);

export const showErrorAlert = () => openAlert(errorAlertTemplate);
