'use strict';

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

var myMap = document.querySelector('.map');
var mapWidth = myMap.clientWidth;

var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
var myPin = document.querySelector('.map__pins');
var pinWidth = myPin.querySelector('.map__pin').clientWidth;
var filtersContainer = document.querySelector('.map__filters-container');

// Функция создания массива (photos).
var getPhotos = function () {
  var myArr = [];

  for (var i = 0; i < 3; i++) {
    myArr[i] = 'http://o0.github.io/assets/images/tokyo/hotel' + (i + 1) + '.jpg';
  }

  return myArr;
};

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

// Функция создания массива, состоящая из 8 сгенерированных JS объектов.
var createCards = function () {
  var myCards = [];

  for (var i = 0; i < 8; i++) {
    var locationX = getRandomDataRange(0, mapWidth - pinWidth);
    var locationY = getRandomDataRange(130, 630);

    myCards[i] = {
      author: {
        avatar: 'img/avatars/user0' + (i + 1) + '.png'
      },

      offer: {
        title: getRandomData(TITLE),
        address: locationX + ', ' + locationY,
        price: getRandomDataRange(1000, 1000000),
        type: getRandomData(TYPE),
        rooms: getRandomDataRange(1, 5),
        guests: getRandomDataRange(1, 8),
        checkin: getRandomData(PERIOD),
        checkout: getRandomData(PERIOD),
        features: getRandomLength(FEATURES),
        description: '',
        photos: getRandomArray(getPhotos())
      },

      location: {
        x: locationX,
        y: locationY
      }
    };
  }

  return myCards;
};

// Функция создания DOM-элемента (метки на карте).
var createPin = function (pin) {
  var pinElement = pinTemplate.cloneNode(true);

  pinElement.style = 'left: ' + pin.location.x + 'px; top: ' + pin.location.y + 'px;';
  pinElement.querySelector('img').src = pin.author.avatar;
  pinElement.querySelector('img').alt = pin.offer.title;

  return pinElement;
};

// Функция вставки созданных DOM-элементов (метки на карте) в блок.
var createPinFragment = function () {
  var myArr = createCards();
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < myArr.length; i++) {
    fragment.appendChild(createPin(myArr[i]));
  }

  return fragment;
};

// Функция превращения текста (TYPE) англ >> рус
var transformType = function (type) {
  var myText = '';

  if (type === 'palace') {
    myText = 'Дворец';

  } else if (type === 'flat') {
    myText = 'Квартира';

  } else if (type === 'bungalo') {
    myText = 'Бунгало';

  } else if (type === 'house') {
    myText = 'Дом';
  }

  return myText;
};

// Функция вставки созданных DOM-элементов (features) в >>>> createCard()
var createFeatureFragment = function (features) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < features.length; i++) {
    var myLi = document.createElement('li');

    myLi.className = 'popup__feature popup__feature--' + features[i];

    fragment.appendChild(myLi);
  }

  return fragment;
};

// Функция создания DOM-элемента (объявления).
var createCard = function (card) {
  var cardElement = cardTemplate.cloneNode(true);

  cardElement.querySelector('.popup__title').textContent = card.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = card.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = card.offer.price + '₽/ночь';
  cardElement.querySelector('.popup__type').textContent = transformType(card.offer.type);
  cardElement.querySelector('.popup__text--capacity').textContent = card.offer.rooms + ' комнаты для ' + card.offer.guests + ' гостей';
  cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + card.offer.checkin + ' , выезд до ' + card.offer.checkout;
  cardElement.replaceChild(createFeatureFragment(card.offer.features), cardElement.querySelector('.popup__features'));
  cardElement.querySelector('.popup__description').textContent = card.offer.description;
  cardElement.querySelector('.popup__avatar').src = card.author.avatar;
  cardElement.querySelector('.popup__photos').innerHTML = '';

  // Выводит все фотографии из списка (offer.photos) в (popup__photos)
  for (var i = 0; i < card.offer.photos.length; i++) {
    var myImg = document.createElement('img');

    myImg.src = card.offer.photos[i];
    myImg.classList.add('popup__photo');
    myImg.width = 45;
    myImg.height = 40;
    myImg.alt = 'Фотография жилья';

    cardElement.querySelector('.popup__photos').appendChild(myImg);
  }

  return cardElement;
};

// Функция вставки созданных DOM-элементов (объявления) в блок.
var createCardFragment = function () {
  var myArr = createCards();
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < myArr.length; i++) {
    fragment.appendChild(createCard(myArr[i]));
  }

  myMap.insertBefore(fragment, filtersContainer);
};

myMap.classList.remove('map--faded');
myPin.appendChild(createPinFragment());
createCardFragment();
