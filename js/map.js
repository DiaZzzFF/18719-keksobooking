'use strict';

var AVATAR = [
  'img/avatars/user01.png',
  'img/avatars/user02.png',
  'img/avatars/user03.png',
  'img/avatars/user04.png',
  'img/avatars/user05.png',
  'img/avatars/user06.png',
  'img/avatars/user07.png',
  'img/avatars/user08.png'
];

var TITLE = [
  'Большая уютная квартира',
  'Маленькая неуютная квартира',
  'Огромный прекрасный дворец',
  'Маленький ужасный дворец',
  'Красивый гостевой домик',
  'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря',
  'Неуютное бунгало по колено в воде'
];

var TYPE = [
  'palace',
  'flat',
  'house',
  'bungalo'
];

var PERIOD = [
  '12:00',
  '13:00',
  '14:00'
];

var FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];

var PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];

var mapWidth = document.querySelector('.map').clientWidth;
var pinWidth = document.querySelector('.map__pin').clientWidth;

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

// Функция генерации случайных данных без повторений.
// var getUniqueRandomData = function (arr)

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

// Функция создания массива, состоящая из 8 сгенерированных JS объектов.
var createCards = function () {
  var myCards = [];

  for (var i = 0; i < 8; i++) {
    myCards[i] = {
      author: {
        avarar: ''
      },

      offer: {
        title: '',
        address: location.x + ', ' + location.y,
        price: getRandomDataRange(1000, 1000000),
        type: getRandomData(TYPE),
        rooms: getRandomDataRange(1, 5),
        guests: getRandomDataRange(1, 8),
        checkin: getRandomData(PERIOD),
        checkout: getRandomData(PERIOD),
        features: getRandomLength(FEATURES),
        description: '',
        photos: getRandomArray(PHOTOS)
      },

      location: {
        x: getRandomDataRange(pinWidth, mapWidth),
        y: getRandomDataRange(130, 630)
      }
    };
  }

  return myCards;
};

var mapMode = document.querySelector('.map');
mapMode.classList.remove('map--faded');
