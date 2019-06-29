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
}

for (var i = 0; i < 4; i++) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = WIZARD_PLAYERS.name[getRandomItem(WIZARD_PLAYERS.name)] + WIZARD_PLAYERS.surname[getRandomItem(WIZARD_PLAYERS.surname)];
  wizardElement.querySelector('.wizard-coat').style.fill = WIZARD_PLAYERS.coatColor[getRandomItem(WIZARD_PLAYERS.coatColor)];
  wizardElement.querySelector('.wizard-eyes').style.fill = WIZARD_PLAYERS.eyesColor[getRandomItem(WIZARD_PLAYERS.eyesColor)];
  similarListItem.appendChild(wizardElement);
}

// Нажатие на элемент .setup-open удаляет класс hidden
// у блока setup. Нажатие на элемент .setup-close, расположенный
// внутри блока setup возвращает ему класс hidden.

var setupOpen = document.querySelector('.setup-open');
var setup = document.querySelector('.setup');
var setupClose = document.querySelector('.setup-close');

setupOpen.addEventListener('click', function() {
  setup.classList.remove('hidden');
  // Обработчик закрытия окна по ESC стоит добавлять
  // только тогда, когда окно появляется на странице.
  document.addEventListener('keyDown', function() {
    if (evt.keyDown === 27) {
      setup.classList.add('hidden');
    }
  });
});

// Теперь, на элемент .setup-open можно поставить фокус с клавиатуры,
// сделаем так, чтобы нажатие на Enter (keyCode === 13) на этом элементе открывало попап.
// Для этого нужно добавить еще один обработчик события.
setupOpen.addEventListener('keyDown', function(evt) {
  if (evt.keyCode === 13) {
    setup.classList.remove('hidden');
  }
})

setupClose.addEventListener('click', function() {
  setup.classList.add('hidden');
});

// Теперь, если поставить фокус на крестике,
// при нажатии на Enter окно настройки персонажа будет закрываться,
// для этого напишем еще 1 обработчик.
setupClose.addEventListener('keyDown', function(evt) {
  if (keyCode === 13) {
    setup.classList.add('hidden');
  }
})

var userNameInput = setup.querySelector('.setup-user-name');
// если поле невалидно, указать .setCustomValidity сообщение, описывающее проблему.

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
