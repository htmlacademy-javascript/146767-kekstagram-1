import {isEscapeKey} from './utils.js';

const ALERT_SHOW_TIME = 5;

let countDown = ALERT_SHOW_TIME;
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

const closeAfterTimeout = (counter) => {
  counter.textContent = `(${countDown})`;

  const interval = setInterval(() => {
    countDown--;
    counter.textContent = `(${countDown})`;

    if (countDown === 0) {
      clearInterval(interval);
      activeDialog.remove();
    }
  }, 1000);
};

const openDialog = (template) => {
  const dialogItem = template.cloneNode(true);
  const button = dialogItem.querySelector('button');

  document.body.appendChild(dialogItem);
  activeDialog = dialogItem;

  button.addEventListener('click', () => closeDialog());
  document.addEventListener('keydown', onDocumentKeydown, true);
};

const openAlert = (template) => {
  const alertItem = template.cloneNode(true);
  const output = alertItem.querySelector('output');

  document.body.appendChild(alertItem);
  activeDialog = alertItem;

  closeAfterTimeout(output);
};

export const showSuccessDialog = () => openDialog(successDialogTemplate);

export const showErrorDialog = () => openDialog(errorDialogTemplate);

export const showErrorAlert = () => openAlert(errorAlertTemplate);
