//  файл, в котором ведётся работа со всплывающим окном настройки персонажа.
'use strict';

var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');

document.querySelector('.setup-similar').classList.remove('hidden');

var similarListItem = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template')
  .content
  .querySelector('.setup-similar-item');

var WIZARD_NAMES = {
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
  female: [
    ' да Марья',
    ' Верон',
    ' Мирабелла',
    ' Вальц',
    ' Онопко',
    ' Топольницкая',
    ' Нионго',
    ' Ирвинг'
  ]
};

var wizards = [
  {
    name: WIZARD_NAMES.name[0] + WIZARD_NAMES.female[0],
    coatColor: 'rgb(101, 137, 164)',
    eyesColor: 'black'
  },
  {
    name: WIZARD_NAMES.name[1] + WIZARD_NAMES.female[1],
    coatColor: 'rgb(241, 43, 107)',
    eyesColor: 'red'
  },
  {
    name: WIZARD_NAMES.name[2] + WIZARD_NAMES.female[2],
    coatColor: 'rgb(146, 100, 161)',
    eyesColor: 'blue'
  },
  {
    name: WIZARD_NAMES.name[3] + WIZARD_NAMES.female[3],
    coatColor: 'rgb(56, 159, 117)',
    eyesColor: 'yellow'
  },
  {
    name: WIZARD_NAMES.name[4] + WIZARD_NAMES.female[4],
    coatColor: 'rgb(215, 210, 55)',
    eyesColor: 'green'
  },
  {
    name: WIZARD_NAMES.name[5] + WIZARD_NAMES.female[5],
    coatColor: 'rgb(0, 0, 0)',
    eyesColor: 'black'
  }
];

for (var i = 0; i < 4; i++) {
  var wizardElement = similarWizardTemplate.cloneNode(true);
  wizardElement.querySelector('.setup-similar-label').textContent = wizards[i].name + wizards[i].female;
  wizardElement.querySelector('.wizard-coat').style.fill = wizards[i].coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizards[i].eyesColor;
  similarListItem.appendChild(wizardElement);
}


//     coatColor: [
//       'rgb(101, 137, 164)',
//       'rgb(241, 43, 107)',
//       'rgb(146, 100, 161)',
//       'rgb(56, 159, 117)',
//       'rgb(215, 210, 55)',
//       'rgb(0, 0, 0)'
//     ],

//     eyesColor: [
//       'black',
//       'red',
//       'blue',
//       'yellow',
//       'green'
//     ]

// var WIZARD_COAT = document.querySelector('.wizard-coat')fillStyle = 'coatColor';
// var WIZARD_EYES = document.querySelector('.wizard-eyes')fillStyle = 'eyesColor';
