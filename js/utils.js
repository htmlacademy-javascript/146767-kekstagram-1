const ALERT_SHOW_TIME = 5000;
const BUTTON_ERROR_TEXT = 'Обновить страницу';
const BUTTON_SUCCESS_TEXT = 'Круто!';

const errorTemplate = document.querySelector('#error').content;
const successTemplate = document.querySelector('#success').content;

export const showAlertMessage = (message, status) => {
  let countDown = ALERT_SHOW_TIME / 1000;
  let template;
  let output;
  let alertEl;
  let title;
  let button;

  if (status === false) {
    template = errorTemplate.cloneNode(true);
    output = template.querySelector('output');
    alertEl = template.querySelector('.error');
    title = template.querySelector('.error__title');
    button = template.querySelector('.error__button');

    button.textContent = BUTTON_ERROR_TEXT;

    button.addEventListener('click', () => {
      location.reload();
    });
  }

  if (status === true) {
    let degrees = 0;

    template = successTemplate.cloneNode(true);
    output = template.querySelector('output');
    alertEl = template.querySelector('.success');
    title = template.querySelector('.success__title');
    button = template.querySelector('.success__button');

    button.textContent = BUTTON_SUCCESS_TEXT;

    button.addEventListener('click', () => {
      button.style.transform = `rotateY(${degrees += 180}deg)`;
      button.style.transition = 'transform 1s ease-in-out';
    });
  }

  title.style.lineHeight = 'normal';
  title.textContent = message;
  output.textContent = `(${countDown})`;

  document.body.appendChild(template);

  const interval = setInterval(() => {
    countDown -= 1;
    output.textContent = `(${countDown})`;

    if (countDown === 0) {
      clearInterval(interval);
      alertEl.remove();
    }
  }, 1000);
};

export const isEscapeKey = (evt) => evt.key === 'Escape';
