'use strict';

(function () {
  // Функция генерации случайных данных.
  var getRandomData = function (arr) {
    var rand = Math.floor(Math.random() * arr.length);

    return arr[rand];
  };

  // Функция генерации случайных данных из диапазона.
  var getRandomDataRange = function (min, max) {
    var rand = min + Math.floor(Math.random() * (max + 1 - min));

    return rand;
  };

  // Функция вызова массива из строк, расположенных в произвольном порядке. (Durstenfeld shuffle algorithm)
  var getRandomArray = function (arr) {
    for (var i = arr.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
    }

    return arr;
  };

  // Функция вызова массива строк случайной длины
  var getRandomLength = function (arr) {
    var arrMax = getRandomDataRange(1, arr.length);
    var myArr = arr.slice(0, arrMax);

    return myArr;
  };

  window.getRandom = {
    getRandomData: getRandomData,
    getRandomDataRange: getRandomDataRange,
    getRandomArray: getRandomArray,
    getRandomLength: getRandomLength
  };
})();
