const DEFAULT_SCALE = 100;
const MIN_SCALE = 25;
const MAX_SCALE = 100;
const SCALE_STEP = 25;

let scaleValue = DEFAULT_SCALE;

const form = document.querySelector('#upload-select-image');
const scaleField = form.querySelector('.scale__control--value');
const imgUploadPreview = form.querySelector('img');
const imgUploadScale = form.querySelector('.img-upload__scale');

const changeScaleValue = (value) => {
  scaleField.value = `${value}%`;
  imgUploadPreview.style.transform = `scale(${value / 100})`;
};

const onButtonZoomClick = (evt) => {
  const reduce = evt.target.classList.contains('scale__control--smaller');
  const increase = evt.target.classList.contains('scale__control--bigger');

  switch (true) {
    case reduce && scaleValue > MIN_SCALE:
      scaleValue = scaleValue - SCALE_STEP;
      break;
    case increase && scaleValue < MAX_SCALE:
      scaleValue = scaleValue + SCALE_STEP;
      break;
  }

  changeScaleValue(scaleValue);
};

export const resetScaleValue = () => {
  scaleValue = DEFAULT_SCALE;
  changeScaleValue(scaleValue);
};

imgUploadScale.addEventListener('click', onButtonZoomClick);
