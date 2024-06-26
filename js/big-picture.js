import {isEscapeKey} from './utils.js';

const DEFAULT_COMMENTS_COUNT = 0;
const RENDER_COMMENTS_COUNT = 5;

let commentsCount = DEFAULT_COMMENTS_COUNT;
let activeComments = [];

const bigPicture = document.querySelector('.big-picture');
const buttonClose = document.querySelector('.big-picture__cancel');
const commentsWrapper = document.querySelector('.social__comments');
const commentTemplate = document.querySelector('#social-comment').content;
const commentsLoader = document.querySelector('.social__comments-loader');
const showCommentsCount = document.querySelector('.show-comments-count');
const allCommentsCount = document.querySelector('.comments-count');

const renderPictureData = (data) => {
  bigPicture.querySelector('img').src = data.url;
  allCommentsCount.textContent = data.comments.length;
  bigPicture.querySelector('.likes-count').textContent = data.likes;
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

const resetComments = () => {
  allCommentsCount.textContent = DEFAULT_COMMENTS_COUNT;
  showCommentsCount.textContent = DEFAULT_COMMENTS_COUNT;

  commentsCount = DEFAULT_COMMENTS_COUNT;
  activeComments = [];

  commentsWrapper.innerHTML = '';
};

const renderComments = () => {
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < RENDER_COMMENTS_COUNT; i++) {
    commentsWrapper.appendChild(createCommentEl(activeComments[commentsCount]));
    commentsCount++;

    if (commentsCount === activeComments.length) {
      commentsLoader.classList.add('hidden');
      break;
    }
  }

  showCommentsCount.textContent = commentsCount;
  commentsWrapper.appendChild(fragment);
};

const onCommentsLoaderClick = () => {
  renderComments();
};

export const openBigPicture = (currentData) => {
  document.body.classList.add('modal-open');
  bigPicture.classList.remove('hidden');

  renderPictureData(currentData);

  if (currentData.comments.length) {
    activeComments = currentData.comments;
    renderComments(activeComments);
    commentsLoader.addEventListener('click', onCommentsLoaderClick);
  } else {
    commentsLoader.classList.add('hidden');
  }

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

  resetComments();
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
