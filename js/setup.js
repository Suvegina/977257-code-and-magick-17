//  файл, в котором ведётся работа со всплывающим окном настройки персонажа.
'use strict';

var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');

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
