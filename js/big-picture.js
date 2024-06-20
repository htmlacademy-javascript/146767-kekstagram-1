import {isEscapeKey} from './utils.js';

const bigPicture = document.querySelector('.big-picture');
const commentCount = document.querySelector('.social__comment-count');
const commentsLoader = document.querySelector('.comments-loader');
const buttonClose = document.querySelector('.big-picture__cancel');
const commentsWrapper = document.querySelector('.social__comments');
const commentTemplate = document.querySelector('#social-comment').content;

const renderPictureData = (data) => {
  bigPicture.querySelector('img').src = data.url;
  bigPicture.querySelector('.likes-count').textContent = data.likes;
  bigPicture.querySelector('.comments-count').textContent = data.comments.length;
  bigPicture.querySelector('.social__caption').textContent = data.description;
};

const createCommentEl = ({avatar, name, message}) => {
  const commentItem = commentTemplate.cloneNode(true);
  const commentText = commentItem.querySelector('.social__text');
  const commentPicture = commentItem.querySelector('.social__picture');

  commentPicture.src = avatar;
  commentPicture.alt = name;
  commentText.textContent = message;

  return commentItem;
};

const renderComments = (comments) => {
  const fragment = document.createDocumentFragment();

  comments.forEach((comment) => {
    fragment.appendChild(createCommentEl(comment));
  });

  commentsWrapper.innerHTML = '';
  commentsWrapper.appendChild(fragment);
};

export const openBigPicture = (currentData) => {
  document.body.classList.add('modal-open');
  bigPicture.classList.remove('hidden');
  commentCount.classList.add('hidden');
  commentsLoader.classList.add('hidden');

  renderPictureData(currentData);
  renderComments(currentData.comments);

  buttonClose.addEventListener('click', onButtonCloseClick);
  document.addEventListener('keydown', onDocumentKeydown);
};

const closeBigPicture = () => {
  document.body.classList.remove('modal-open');
  bigPicture.classList.add('hidden');
  commentCount.classList.remove('hidden');
  commentsLoader.classList.remove('hidden');

  buttonClose.removeEventListener('click', onButtonCloseClick);
  document.removeEventListener('keydown', onDocumentKeydown);
};

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
}

function onButtonCloseClick() {
  closeBigPicture();
}
