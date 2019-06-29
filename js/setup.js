//  файл, в котором ведётся работа со всплывающим окном настройки персонажа.
'use strict';

var userDialog = document.querySelector('.setup');
// userDialog.classList.remove('hidden');

document.querySelector('.setup-similar').classList.remove('hidden');

var similarListItem = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template')
  .content
  .querySelector('.setup-similar-item');

var WIZARD_PLAYERS = {
  name: [
    'Иван',
    'Хуан Себастьян',
    'Мария',
    'Кристоф',
    'Виктор',
    'Юлия',
    'Люпита',
    'Вашингтон'
  ],
  surname: [
    ' да Марья',
    ' Верон',
    ' Мирабелла',
    ' Вальц',
    ' Онопко',
    ' Топольницкая',
    ' Нионго',
    ' Ирвинг'
  ],
  coatColor: [
    'rgb(101, 137, 164)',
    'rgb(241, 43, 107)',
    'rgb(146, 100, 161)',
    'rgb(56, 159, 117)',
    'rgb(215, 210, 55)',
    'rgb(0, 0, 0)'
  ],
  eyesColor: [
    'black',
    'red',
    'blue',
    'yellow',
    'green'
  ]
};

function getRandomItem(arr) {
  return Math.floor(Math.random() * arr.length);
};

for (var i = 0; i < 4; i++) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = WIZARD_PLAYERS.name[getRandomItem(WIZARD_PLAYERS.name)] + WIZARD_PLAYERS.surname[getRandomItem(WIZARD_PLAYERS.surname)];
  wizardElement.querySelector('.wizard-coat').style.fill = WIZARD_PLAYERS.coatColor[getRandomItem(WIZARD_PLAYERS.coatColor)];
  wizardElement.querySelector('.wizard-eyes').style.fill = WIZARD_PLAYERS.eyesColor[getRandomItem(WIZARD_PLAYERS.eyesColor)];
  similarListItem.appendChild(wizardElement);
};

// Заводим константы со значением для кей-кодов ( для доступности с клавиатуры)
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

// Нажатие на элемент .setup-open удаляет класс hidden
// у блока setup. Нажатие на элемент .setup-close, расположенный
// внутри блока setup возвращает ему класс hidden.

var setupOpen = document.querySelector('.setup-open');
var setup = document.querySelector('.setup');
var setupClose = document.querySelector('.setup-close');

var onPopupEscPress = function(evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closePopup();
  }
};

var openPopup = function() {
  setup.classList.remove('hidden');
  document.addEventListener('keyDown', onPopupEscPress);
};

var closePopup = function() {
  setup.classList.add('hidden');
  document.removeEventListener('keyDown', onPopupEscPress);
};

setupOpen.addEventListener('click', function() {
  openPopup();
});

setupOpen.addEventListener('keyDown', function(evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openPopup();
  }
});

// Теперь, если поставить фокус на крестике,
// при нажатии на Enter окно настройки персонажа будет закрываться,
// для этого напишем еще 1 обработчик.
setupClose.addEventListener('click', function() {
  closePopup();
});

setupClose.addEventListener('keyDown', function(evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup();
  }
});

// а теперь преейдем к валидации формы:
// если поле невалидно, указать .setCustomValidity сообщение, описывающее проблему.
var userNameInput = setup.querySelector('.setup-user-name');

userNameInput.add ('invalid', function(evt) {
  if (userNameInput.validity.tooShort) {
    userNameInput.setCustomValidity('Имя должно состоять минимум из 2-х символов');
  } else if (userNameInput.validity.tooLong) {
    userNameInput.setCustomValidity('Имя не должно превышать 25-ти символов');
  } else if (userNameInput.validity.valueMissing) {
    userNameInput.setCustomValidity('Обязательное поле');
  } else {
    // Самое главное при работе с обработчиками валидации — не забыть сбросить
    // значение поля, если это значение стало корректно.
    userNameInput.setCustomValidity('');
  }
});

// добавим свои собственные обработчики форм 'target'.
userNameInput.addEventListener('input', function(evt) {
  var target = evt.target;
  if (target.value.length < 2) {
    target.setCustomValidity('Имя должно состоять минимум из 2-х символов');
  } else {
    target.setCustomValidity('');
  }
});

// добавим доступности закрывающему крестику
