import {isEscapeKey} from './utils.js';

const RESET_COMMENTS_COUNT = 0;

let commentsCount = RESET_COMMENTS_COUNT;
let commentsArr = [];

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

const resetComments = (resetParameter) => {
  showCommentsCountEl.textContent = resetParameter;

  commentsCount = resetParameter;
  commentsArr = [];

  commentsWrapper.innerHTML = '';
};

const renderComments = (comments) => {
  for (let i = 0; i < 5; i++) {
    commentsWrapper.appendChild(createCommentEl(comments[commentsCount]));

    if (commentsCount < comments.length) {
      commentsCount++;
      showCommentsCountEl.textContent = commentsCount;
    }

    if (commentsCount === comments.length) {
      commentsLoader.classList.add('hidden');
      return;
    }
  }
};

const onCommentsLoaderClick = () => {
  renderComments(commentsArr);
};

export const openBigPicture = (currentData) => {
  commentsArr = currentData.comments;

  document.body.classList.add('modal-open');
  bigPicture.classList.remove('hidden');

  renderPictureData(currentData);
  renderComments(commentsArr);

  commentsLoader.addEventListener('click', onCommentsLoaderClick);
  buttonClose.addEventListener('click', onButtonCloseClick);
  document.addEventListener('keydown', onDocumentKeydown);
};

const closeBigPicture = () => {
  document.body.classList.remove('modal-open');
  bigPicture.classList.add('hidden');
  commentsLoader.classList.remove('hidden');

  commentsLoader.removeEventListener('click', onCommentsLoaderClick);
  buttonClose.removeEventListener('click', onButtonCloseClick);
  document.removeEventListener('keydown', onDocumentKeydown);

  resetComments(RESET_COMMENTS_COUNT);
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
