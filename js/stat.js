'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var colorText = '#000000';
var currentBarColor = 'rgba(255, 0, 0, 1)'; // Цвет статистики - игрок "Вы"
var otherBarColor = 'rgba(0, 0, 255, 1)'; // Цвет статистики остальных игроков
var STARTING_POINTS_ELEM_X = 150; // Начальная точка отрисовки объектов
var WIDTH_BAR = 40; // Ширина колонок
var HEIGHT_BAR_MAX = 100; // Максимальная высота колонки
// var HEIGHT_BAR_MIN = 30; // Минимальная высота колонки
var GAP = 50; // Отступ между колонками
var FONT_GAP = 40; // Шрифтовый отступ между колонками
var positionTimeY = 90; // Начальная точка времени игрока по Y
var positionNameY = 260; // Начальная точка имён по Y
var positionStatY = 140; // Начальная точка статистики по Y
// var positionStatYMin = 210; //  Минимальная точка статистики по Y


var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

// посчитаем максимальный элемент массива и вернём его из функции.
// Для этого нам нужно будет воспользоваться циклом: пометим первый элемент как максимальный,
// а потом переберём все оставшиеся элементы массива и будем сравнивать их с максимальным элементом.

var getMaxElement = function(arr) {
  var maxElement = arr[0];

  for (var i = 0; i < arr.length; i++) { 
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

// var getMinElement = function(down) {
//   var minElement = down[0];

//   for (var i = 0; i < down.length; i++) {
//     if (down[i] > minElement) {
//       minElement
//     }
//   }
// }

window.renderStatistics = function (ctx, names, times) {

  renderCloud(ctx, 110, 20, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, 100, 10, '#ffffff');

  ctx.fillStyle = colorText;
  ctx.fillText('Ура вы победили!', 120, 40);
  ctx.fillText('Список результатов:', 120, 60);

  // names = ['Вы', 'Кекс', 'Катя', 'Игорь'];

  // отрисовка отдельного прямоугольника с именем
  // ctx.fillText('Вы', 150, 260);
  // ctx.fillText('2725', 150, 130);
  // ctx.fillStyle = currentBarColor;
  // ctx.fillRect(150, 140, 40, 100);

  var maxTime = getMaxElement(times);

  // цикл дублирования статичных колонок с подписями
  for (var i = 0; i < names.length; i++) {
    ctx.fillText(Math.round(times[i]), STARTING_POINTS_ELEM_X + (FONT_GAP + GAP) * i, positionTimeY);// Цикл смещения временнЫх результатов
    ctx.fillText(names[i], STARTING_POINTS_ELEM_X + (WIDTH_BAR + GAP) * i, positionNameY); // Цикл смещения имён
    ctx.fillRect(STARTING_POINTS_ELEM_X + (WIDTH_BAR + GAP) * i, (HEIGHT_BAR_MAX * times[i]) / maxTime, GAP, positionStatY);// Цикл смещения прямоугольников
  }

  // ctx.fillRect(names['']) = {
  //   ctx.fillStyle = otherBarColor;
  // }

  // ctx.fillRect(names['Вы']) = {
  //   ctx.fillStyle = currentBarColor;
  // }

// Если составить пропорцию, то длину столбца можно посчитать умножив максимальную ширину
// столбца (barWidth) на время игрока, которое мы хотим отобразить в столбце (times[i])
// и разделить результат на максимальное время.

  // Пример на понятных цифрах (вместо переменных)
  // ctx.fillText(times[i], 150 + (50 + 40) * i, 90);// Цикл смещения временнЫх результатов
  // ctx.fillRect(150 + (50 + 40) * i, 100, 40, 140);// Цикл смещения прямоугольников
  // ctx.fillText(names[i], 150 + (50 + 40) * i, 260); // Цикл смещения имён

  // for (var j = names.length[i] - 1; j >= 0; j--) {
  //   Things[i]
  // }


  // Переопределим цвет всех колонок
  // ctx.fillStyle = otherBarColor;
  // ctx.fillRect(i);

  // Создадим условие которое будет менять длину и положение колонок в зависимости от максимальной высоты,
  // так же в условии можно создать минимальную высоту колонки, и в зависимости от высоты от "MAX" до "MIN"
  // будет варьироваться насыщенность от 100% до 10%

  // Создадим в этом условии -  условие, которое в зависимости от высоты от "MAX" до "MIN" будет менять положение очков

  // Переопределим цвет и насыщенность текущей колонки "Вы"
  // names['Вы'] {
  //   ctx.fillStyle = currentBarColor;
  //   ctx.fillRect;
  // }; // методы не работают
};
