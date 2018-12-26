'use strict';

(function () {
  // Количество сгенерированных JS объектов.
  var NUMBER_OF_CARDS = 8;

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

  var myMapWidth = window.utils.myMap.clientWidth;
  var myPinMain = window.utils.myMap.querySelector('.map__pin--main');
  var myPinWidth = myPinMain.clientWidth;

  // Функция создания массива (photos).
  var getPhotos = function () {
    var myArr = [];

    for (var i = 0; i < 3; i++) {
      myArr[i] = 'http://o0.github.io/assets/images/tokyo/hotel' + (i + 1) + '.jpg';
    }

    return myArr;
  };

  // Функция создания массива, состоящая из сгенерированных JS объектов.
  var createCards = function () {
    var myCards = [];

    for (var i = 0; i < NUMBER_OF_CARDS; i++) {
      var locationX = window.utils.getRandomDataRange(0, myMapWidth - myPinWidth);
      var locationY = window.utils.getRandomDataRange(130, 630);

      myCards[i] = {
        author: {
          avatar: 'img/avatars/user0' + (i + 1) + '.png'
        },

        offer: {
          title: window.utils.getRandomData(TITLE),
          address: locationX + ', ' + locationY,
          price: window.utils.getRandomDataRange(1000, 1000000),
          type: window.utils.getRandomData(TYPE),
          rooms: window.utils.getRandomDataRange(1, 5),
          guests: window.utils.getRandomDataRange(1, 8),
          checkin: window.utils.getRandomData(PERIOD),
          checkout: window.utils.getRandomData(PERIOD),
          features: window.utils.getRandomLength(FEATURES),
          description: '',
          photos: window.utils.getRandomArray(getPhotos())
        },

        location: {
          x: locationX,
          y: locationY
        }
      };
    }

    return myCards;
  };

  window.data = {
    createCards: createCards
  };
})();
