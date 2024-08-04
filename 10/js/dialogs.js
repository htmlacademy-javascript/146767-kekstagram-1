import {isEscapeKey} from './utils.js';

export const ERROR_CLASS = 'error';
export const SUCCESS_CLASS = 'success';
export const BUTTON_ERROR_TEXT = 'Закрыть окно';
export const BUTTON_SUCCESS_TEXT = 'Круто! <3';

export const errorTemplate = document.querySelector('#error').content;
export const successTemplate = document.querySelector('#success').content;

let alertEl = undefined;

export const showAlertMessage = (message, buttonText, template, status) => {
  const templateEl = template.cloneNode(true);
  alertEl = templateEl.querySelector(`.${status}`);
  const title = templateEl.querySelector(`.${status}__title`);
  const button = templateEl.querySelector(`.${status}__button`);

  title.style.lineHeight = 'normal';
  title.textContent = message;
  button.textContent = buttonText;

  document.body.appendChild(templateEl);

  button.addEventListener('click', () => {
    alertEl.remove();
    alertEl = undefined;
  });

};

document.addEventListener('keydown', (evt) => {
  if (isEscapeKey(evt) && (alertEl !== undefined)) {
    evt.stopImmediatePropagation();

    alertEl.remove();
  }

  alertEl = undefined;
});
