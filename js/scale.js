const DEFAULT_SCALE = 100;
const MIN_SCALE = 25;
const MAX_SCALE = 100;
const SCALE_STEP = 25;

let scaleValue = DEFAULT_SCALE;

const form = document.querySelector('#upload-select-image');
const scaleField = form.querySelector('.scale__control--value');
const imgUploadPreview = form.querySelector('img');

const changeScaleValue = (value) => {
  scaleField.value = `${value}%`;
  imgUploadPreview.style.transform = `scale(${value / 100})`;
};

export const onButtonZoomClick = (evt) => {
  if (evt.target.classList.contains('scale__control--smaller') && scaleValue > MIN_SCALE) {
    scaleValue = scaleValue - SCALE_STEP;
    changeScaleValue(scaleValue);
  } else if (evt.target.classList.contains('scale__control--bigger') && scaleValue < MAX_SCALE) {
    scaleValue = scaleValue + SCALE_STEP;
    changeScaleValue(scaleValue);
  }
};

export const resetScaleValue = () => {
  scaleValue = DEFAULT_SCALE;
  changeScaleValue(scaleValue);
};
