'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var colorText = '#000000';
var currentBarColor = 'rgba(255, 0, 0, 1)'; // Цвет статистики - игрок "Вы"
// var otherBarColor = 'rgba(0, 0, 255, 1)'; // Цвет статистики остальных игроков
var STARTING_POINTS_ELEM_X = 150; // Начальная точка отрисовки объектов
var WIDTH_BAR = 40; // Ширина колонок
var HEIGHT_BAR_MAX = 150; // Максимальная высота колонки
// var HEIGHT_BAR_MIN = 30; // Минимальная высота колонки
var GAP = 50; // Отступ между колонками
var FONT_GAP = 40; // Шрифтовый отступ между колонками
var positionTimeY = 82; // Начальная точка времени игрока по Y
var positionNameY = 260; // Начальная точка имён по Y
var positionStatY = 90; // Начальная точка статистики по Y
// var positionStatYMin = 210; //  Минимальная точка статистики по Y


var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

// посчитаем максимальный элемент массива и вернём его из функции.
// Для этого нам нужно будет воспользоваться циклом: пометим первый элемент как максимальный,
// а потом переберём все оставшиеся элементы массива и будем сравнивать их с максимальным элементом.

var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

// Тоже самое делаем с минимальным элементом

// var getMinElement = function (arr) {
//   var minElement = arr[0];

//   for (var i = 0; i < arr.length; i++) {
//     if (arr[i] < minElement) {
//       minElement = arr[i];
//     }
//   }

//   return minElement; // Определяем минимальную высоту колонки
// };

window.renderStatistics = function (ctx, names, times) {

  renderCloud(ctx, 110, 20, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, 100, 10, '#ffffff');

  ctx.fillStyle = colorText;
  ctx.fillText('Ура вы победили!', 120, 40);
  ctx.fillText('Список результатов:', 120, 60);

  // Определяем минимальную и максимальную высоту времени
  var maxTime = getMaxElement(times);
  // var minTime = getMinElement(times);
  var minTime = 1000;

  // цикл дублирования статичных колонок с подписями
  for (var i = 0; i < names.length; i++) {
    ctx.fillStyle = colorText;
    // Создадим в этом условии -  условие, которое в зависимости от высоты от "MAX" до "MIN" будет менять положение очков
    ctx.fillText(Math.round(times[i]), STARTING_POINTS_ELEM_X + (FONT_GAP + GAP) * i, positionTimeY + HEIGHT_BAR_MAX - (HEIGHT_BAR_MAX * times[i]) / maxTime);// Цикл смещения временнЫх результатов
    ctx.fillText(names[i], STARTING_POINTS_ELEM_X + (WIDTH_BAR + GAP) * i, positionNameY); // Цикл смещения имён

    // Переопределим цвет и насыщенность текущей колонки
    // Создаем условие покраса шкалы статистики
    if (names[i] === 'Вы') {
      ctx.fillStyle = currentBarColor;
    } else {
      // console.log(Math.round(255 * times[i] / maxTime));
      ctx.fillStyle = 'rgba(' + Math.round(170 - 170 * (times[i] - minTime) / (maxTime - minTime)) + ', ' + Math.round(170 - 170 * (times[i] - minTime) / (maxTime - minTime)) + ' , 170 , 1)';
    }
    // Цикл смещения прямоугольников
    // Если составить пропорцию, то длину столбца можно посчитать умножив максимальную ширину
    // столбца (barWidth) на время игрока, которое мы хотим отобразить в столбце (times[i])
    // и разделить результат на максимальное время.
    ctx.fillRect(
        STARTING_POINTS_ELEM_X + (WIDTH_BAR + GAP) * i,
        positionStatY + HEIGHT_BAR_MAX - (HEIGHT_BAR_MAX * times[i]) / maxTime,
        GAP,
        HEIGHT_BAR_MAX * times[i] / maxTime
    );
  }
};
