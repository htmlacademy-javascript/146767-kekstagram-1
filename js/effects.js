import {resetScaleValue} from './scale.js';

const EFFECTS = {
  none: {
    style: 'none',
    min: 0,
    max: 100,
    step: 1,
    unit: ''
  },
  chrome: {
    style: 'grayscale',
    min: 0,
    max: 1,
    step: 0.1,
    unit: ''
  },
  sepia: {
    style: 'sepia',
    min: 0,
    max: 1,
    step: 0.1,
    unit: ''
  },
  marvin: {
    style: 'invert',
    min: 0,
    max: 100,
    step: 1,
    unit: '%'
  },
  phobos: {
    style: 'blur',
    min: 0,
    max: 3,
    step: 0.1,
    unit: 'px'
  },
  heat: {
    name: 'heat',
    style: 'brightness',
    min: 1,
    max: 3,
    step: 0.1,
    unit: ''
  }
};
const DEFAULT_EFFECT = EFFECTS.none;

let activeEffect = DEFAULT_EFFECT;

const form = document.querySelector('#upload-select-image');
const slider = form.querySelector('.effect-level__slider');
const sliderWrapper = form.querySelector('.effect-level');
const effectsFilters = form.querySelector('.effects');
const effectValue = form.querySelector('.effect-level__value');
const imgUploadPreview = form.querySelector('img');

const isDefault = () => activeEffect === DEFAULT_EFFECT;

const toggleSliderVisiability = (isVisible) =>
  isVisible
    ? sliderWrapper.classList.add('hidden')
    : sliderWrapper.classList.remove('hidden');

const updateSlider = () => {
  slider.noUiSlider.updateOptions({
    range: {
      min: activeEffect.min,
      max: activeEffect.max,
    },
    start: activeEffect.max,
    step: activeEffect.step,
  });
};

export const resetEffects = () => {
  activeEffect = DEFAULT_EFFECT;

  imgUploadPreview.style.filter = `${DEFAULT_EFFECT.style}`;

  updateSlider();
  toggleSliderVisiability(isDefault);
};

const onEffectsChange = (evt) => {
  if (!evt.target.classList.contains('effects__radio')) {
    return;
  }

  const effect = evt.target.value;

  activeEffect = EFFECTS[effect] ?? EFFECTS.none;
  imgUploadPreview.className = `effects__preview--${effect}`;

  if (activeEffect === DEFAULT_EFFECT) {
    resetEffects();
    resetScaleValue();
    return;
  }

  updateSlider();
  toggleSliderVisiability(false);
};

const onSliderUpdate = () => {
  const sliderValue = slider.noUiSlider.get();

  imgUploadPreview.style.filter = `${activeEffect.style}(${sliderValue}${activeEffect.unit})`;
  effectValue.value = sliderValue;
};

noUiSlider.create(slider, {
  range: {
    min: DEFAULT_EFFECT.min,
    max: DEFAULT_EFFECT.max,
  },
  start: DEFAULT_EFFECT.max,
  step: DEFAULT_EFFECT.step,
  connect: 'lower',
});

effectsFilters.addEventListener('click', onEffectsChange);
effectsFilters.addEventListener('change', onEffectsChange);
slider.noUiSlider.on('update', onSliderUpdate);
