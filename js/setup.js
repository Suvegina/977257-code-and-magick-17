//  файл, в котором ведётся работа со всплывающим окном настройки персонажа.
'use strict';

// var userDialog = document.querySelector('.setup');
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
  ],
  fireballColor: [
    '#ee4830',
    '#30a8ee',
    '#5ce6c0',
    '#e848d5',
    '#e6e848'
  ]
};

function getRandomItem(arr) {
  return Math.floor(Math.random() * arr.length);
}

for (var i = 0; i < 4; i++) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = WIZARD_PLAYERS.name[getRandomItem(WIZARD_PLAYERS.name)] + WIZARD_PLAYERS.surname[getRandomItem(WIZARD_PLAYERS.surname)];
  wizardElement.querySelector('.wizard-coat').style.fill = WIZARD_PLAYERS.coatColor[getRandomItem(WIZARD_PLAYERS.coatColor)];
  wizardElement.querySelector('.wizard-eyes').style.fill = WIZARD_PLAYERS.eyesColor[getRandomItem(WIZARD_PLAYERS.eyesColor)];
  // wizardElement.querySelector('.setup-fireball-wrap').style.fill = WIZARD_PLAYERS.fireballColor[getRandomItem(WIZARD_PLAYERS.fireballColor)];
  similarListItem.appendChild(wizardElement);
}

// Заводим константы со значением для кей-кодов ( для доступности с клавиатуры)
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

// Нажатие на элемент .setup-open удаляет класс hidden
// у блока setup. Нажатие на элемент .setup-close, расположенный
// внутри блока setup возвращает ему класс hidden.

var setupOpen = document.querySelector('.setup-open');
var setup = document.querySelector('.setup');
var setupClose = document.querySelector('.setup-close');

var openPopup = function () {
  setup.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};

var closePopup = function () {
  setup.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};

// внутри обработчика добавляем доп. обработчик, который будет проверять:
// "если событие обрабатывается на НЕинпуте
var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    if (evt.target !== userNameInput) {
      event.preventDefault(evt);

      closePopup();
    }
  }
};

setupOpen.addEventListener('click', function () {
  openPopup();
});

setupOpen.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openPopup();
  }
});

// при нажатии на Enter окно настройки персонажа будет закрываться,
// для этого напишем еще 1 обработчик.
setupClose.addEventListener('click', function () {
  closePopup();
});

setupClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup();
  }
});

// а теперь пререйдем к валидации формы:
// если поле невалидно, указать .setCustomValidity сообщение, описывающее проблему.
var userNameInput = setup.querySelector('.setup-user-name');

userNameInput.addEventListener('invalid', function () {
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
userNameInput.addEventListener('input', function (evt) {
  var target = evt.target;
  if (target.value.length < 2) {
    target.setCustomValidity('Имя должно состоять минимум из 2-х символов');
  } else {
    target.setCustomValidity('');
  }
});


// Полей с цветом плаща, глаз и фаерболла у нас нет,
// поэтому для них мы заведём скрытые (hidden) поля, которые будут
// отправляться вместе с формой, но видны пользователю не будут.

// определяем случайный цвет плащу мага
var coatElement = document.querySelector('.setup-wizard .wizard-coat');
coatElement.style.cursor = 'pointer';

var onCoatClick = function () {
  coatElement.style.fill = WIZARD_PLAYERS.coatColor[getRandomItem(WIZARD_PLAYERS.coatColor)];
};
coatElement.addEventListener('click', onCoatClick);


// Изменение цвета глаз персонажа по нажатию.
var eyesElement = document.querySelector('.setup-wizard .wizard-eyes');
eyesElement.style.cursor = 'pointer';

var onEyesClick = function () {
  eyesElement.style.fill = WIZARD_PLAYERS.eyesColor[getRandomItem(WIZARD_PLAYERS.eyesColor)];
};
eyesElement.addEventListener('click', onEyesClick);


// Изменение цвета фаерболов по нажатию
var fireballElement = document.querySelector('.setup-fireball-wrap');
fireballElement.style.cursor = 'pointer';

var onFireballClick = function () {
  fireballElement.style.backgroundColor = WIZARD_PLAYERS.fireballColor[getRandomItem(WIZARD_PLAYERS.fireballColor)];
};
fireballElement.addEventListener('click', onFireballClick);

//  Чтобы форма отправлялась нам нужно указать куда (атрибут action) отправлять форму
//  и как (атрибут method), а также задать тип формы при помощи атрибута enctype="multipart/form-data".
//   Мы будем использовать multipart/form-data, чтобы иметь возможность отправлять файлы из формы.

document.querySelector('.setup-wizard-form').action = 'https://js.dump.academy/code-and-magick';
/*
<form class="setup-wizard-form"
  method="post"
  enctype="multipart/form-data"
  action="https://js.dump.academy/code-and-magick"
  autocomplete="off">
*/
