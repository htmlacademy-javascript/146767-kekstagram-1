import {createGalleryData} from './gallery.js';
import {isEscapeKey} from './utils.js';

const body = document.querySelector('body');
const bigPicture = document.querySelector('.big-picture');
const commentCount = document.querySelector('.social__comment-count');
const commentsLoader = document.querySelector('.comments-loader');
const buttonClose = document.querySelector('.big-picture__cancel');

const renderChosenPicture = (evt) => {
  bigPicture.querySelector('img').src = evt.url;
  bigPicture.querySelector('.likes-count').textContent = evt.likes;
  bigPicture.querySelector('.comments-count').textContent = evt.comments.length;
  bigPicture.querySelector('.social__caption').textContent = evt.description;
};

const renderComment = ({avatar, name, message}) => {
  const commentItem = document.querySelector('.social__comment').cloneNode(true);
  const commentText = commentItem.querySelector('.social__text');
  const commentPicture = commentItem.querySelector('.social__picture');

  commentPicture.src = avatar;
  commentPicture.alt = name;
  commentText.textContent = message;

  return commentItem;
};

const renderComments = (commentsArr) => {
  const commentsWrapper = document.querySelector('.social__comments');
  const fragment = document.createDocumentFragment();

  commentsArr.forEach((comment) => {
    fragment.appendChild(renderComment(comment));
  });

  commentsWrapper.innerHTML = '';
  commentsWrapper.appendChild(fragment);
};

const renderBigPicture = (evt) => {
  const currentData = createGalleryData.find(({id}) => id === +evt.target.dataset.id);

  renderChosenPicture(currentData);
  renderComments(currentData.comments);
};

const openBigPicture = (evt) => {
  body.classList.add('modal-open');
  bigPicture.classList.remove('hidden');
  commentCount.classList.add('hidden');
  commentsLoader.classList.add('hidden');

  renderBigPicture(evt);

  buttonClose.addEventListener('click', onButtonCloseClick);
  document.addEventListener('keydown', onDocumentKeydown);
};

const closeBigPicture = () => {
  body.classList.remove('modal-open');
  bigPicture.classList.add('hidden');
  commentCount.classList.remove('hidden');
  commentsLoader.classList.remove('hidden');

  buttonClose.removeEventListener('click', onButtonCloseClick);
  document.removeEventListener('keydown', onDocumentKeydown);
};

function onDocumentKeydown (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
}

function onButtonCloseClick () {
  closeBigPicture();
}

const onPictureClick = (evt) => {
  if (evt.target.matches('.picture__img')) {
    openBigPicture(evt);
  }
};

const galleryWrapper = document.querySelector('.pictures');

galleryWrapper.addEventListener('click', onPictureClick);
