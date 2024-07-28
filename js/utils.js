const ALERT_SHOW_TIME = 5000;
const BUTTON_TEXT = 'Попробовать ещё раз';

export const isEscapeKey = (evt) => evt.key === 'Escape';

const errorTemplate = document.querySelector('#error').content;
const error = errorTemplate.cloneNode(true);
const output = error.querySelector('output');
const errorEl = error.querySelector('.error');
const errorTitle = error.querySelector('.error__title');
const errorButton = error.querySelector('.error__button');

errorTitle.style.lineHeight = 'normal';

let countDown = ALERT_SHOW_TIME / 1000;

const getCountDown = setInterval(() => {
  output.textContent = --countDown;

  if (countDown === 0) {
    countDown = ALERT_SHOW_TIME / 1000;

    clearInterval(getCountDown);
  }
}, 1000);

export const showMessageError = (message) => {
  errorTitle.textContent = message;
  errorButton.textContent = BUTTON_TEXT;
  output.textContent = countDown;

  document.body.appendChild(error);

  errorButton.addEventListener('click', () => {
    location.reload();
  });

  setTimeout(() => {
    errorEl.remove();
  }, ALERT_SHOW_TIME);
};
