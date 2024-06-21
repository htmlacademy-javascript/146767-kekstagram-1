import {isEscapeKey} from './utils.js';
const SHOW_COMMENTS_COUNT = 5;

const bigPicture = document.querySelector('.big-picture');
const buttonClose = document.querySelector('.big-picture__cancel');
const commentsWrapper = document.querySelector('.social__comments');
const commentTemplate = document.querySelector('#social-comment').content;
const commentsLoader = document.querySelector('.social__comments-loader');
const showCommentsCountEl = document.querySelector('.show-comments-count');

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

const hideComments = (showCommentsCount) => {
  const comments = document.querySelectorAll('.social__comment');

  showCommentsCountEl.textContent = showCommentsCount;

  if (showCommentsCount === comments.length) {
    commentsLoader.classList.add('hidden');
  }

  if (showCommentsCount > comments.length) {
    commentsLoader.classList.add('hidden');
    showCommentsCountEl.textContent = comments.length;
  }

  for (showCommentsCount; showCommentsCount < comments.length; showCommentsCount++) {
    comments[showCommentsCount].classList.add('hidden');
  }
};

export const openBigPicture = (currentData) => {
  document.body.classList.add('modal-open');
  bigPicture.classList.remove('hidden');

  renderPictureData(currentData);
  renderComments(currentData.comments);
  hideComments(SHOW_COMMENTS_COUNT);

  buttonClose.addEventListener('click', onButtonCloseClick);
  document.addEventListener('keydown', onDocumentKeydown);
};

const closeBigPicture = () => {
  document.body.classList.remove('modal-open');
  bigPicture.classList.add('hidden');
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
