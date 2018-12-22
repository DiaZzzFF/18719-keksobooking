'use strict';

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

var ESC_KEYCODE = 27;

var myMap = document.querySelector('.map');
var myMapWidth = myMap.clientWidth;
var myMapHeight = myMap.clientHeight;

var myPins = myMap.querySelector('.map__pins');
var myPinMain = myPins.querySelector('.map__pin--main');
var myPinWidth = myPinMain.clientWidth;
var myPinHeight = myPinMain.clientHeight;

var myFormFilter = myMap.querySelectorAll('.map__filter');
var myFormFeatures = myMap.querySelector('.map__features');

var myAdForm = document.querySelector('.ad-form');
var myAdFormFieldsets = myAdForm.querySelectorAll('fieldset');

var myHeadline = myAdForm.querySelector('#title');
var myTypeOfHousing = myAdForm.querySelector('#type');
var myPricePerNight = myAdForm.querySelector('#price');
var myTimeIn = myAdForm.querySelector('#timein');
var myTimeOut = myAdForm.querySelector('#timeout');
var myNumbersOfRooms = myAdForm.querySelector('#room_number');
var myNumberOfSeats = myAdForm.querySelector('#capacity');

var myAddress = myAdForm.querySelector('input[name="address"]');

var myCoordinate = {
  X: Math.round(myMapWidth / 2),
  Y: Math.round((myMapHeight / 2) + (myPinHeight / 2))
};

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

// Функция создания массива, состоящая из сгенерированных JS объектов.
var createCards = function () {
  var myCards = [];

  for (var i = 0; i < NUMBER_OF_CARDS; i++) {
    var locationX = getRandomDataRange(0, myMapWidth - myPinWidth);
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
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var pinElement = pinTemplate.cloneNode(true);

  pinElement.style = 'left: ' + pin.location.x + 'px; top: ' + pin.location.y + 'px;';
  pinElement.querySelector('img').src = pin.author.avatar;
  pinElement.querySelector('img').alt = pin.offer.title;

  // Обработчик для открытия (объявления)
  pinElement.addEventListener('click', function () {
    openPopup(pin);
  });

  return pinElement;
};

// Функция вставки созданных DOM-элементов (метки на карте) в блок.
var createPinFragment = function () {
  var myArr = createCards();
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < myArr.length; i++) {
    fragment.appendChild(createPin(myArr[i]));
  }

  myPins.appendChild(fragment);
};

// Функция превращения текста (TYPE) англ >> рус
var transformType = function (type) {
  var myText = '';

  switch (type) {
    case 'palace':
      myText = 'Дворец';
      break;

    case 'flat':
      myText = 'Квартира';
      break;

    case 'bungalo':
      myText = 'Бунгало';
      break;

    case 'house':
      myText = 'Дом';
      break;

    default:
      break;
  }

  return myText;
};

// Функция вставки созданных DOM-элементов (features) в >>>> createCard()
var createFeatureFragment = function (features) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < features.length; i++) {
    var myFeatures = document.createElement('li');

    myFeatures.className = 'popup__feature popup__feature--' + features[i];

    fragment.appendChild(myFeatures);
  }

  return fragment;
};

// Функция вставки созданных DOM-элементов (photos) в >>>> createCard()
var createPhotoFragment = function (photos) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < photos.length; i++) {
    var myPhotos = document.createElement('img');

    myPhotos.src = photos[i];
    myPhotos.classList.add('popup__photo');
    myPhotos.width = 45;
    myPhotos.height = 40;
    myPhotos.alt = 'Фотография жилья';

    fragment.appendChild(myPhotos);
  }

  return fragment;
};

// Функция создания DOM-элемента (объявления).
var createCard = function (card) {
  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
  var cardElement = cardTemplate.cloneNode(true);

  cardElement.querySelector('.popup__title').textContent = card.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = card.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = card.offer.price + ' ₽/ночь';
  cardElement.querySelector('.popup__type').textContent = transformType(card.offer.type);
  cardElement.querySelector('.popup__text--capacity').textContent = card.offer.rooms + ' комнаты для ' + card.offer.guests + ' гостей';
  cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + card.offer.checkin + ' , выезд до ' + card.offer.checkout;
  cardElement.replaceChild(createFeatureFragment(card.offer.features), cardElement.querySelector('.popup__features'));
  cardElement.querySelector('.popup__description').textContent = card.offer.description;
  cardElement.replaceChild(createPhotoFragment(card.offer.photos), cardElement.querySelector('.popup__photos'));
  cardElement.querySelector('.popup__avatar').src = card.author.avatar;

  // Обработчик для закрытия (объявления)
  cardElement.querySelector('.popup__close').addEventListener('click', closePopup);

  return cardElement;
};

// Функция для неактивного состояния страницы
var disableElements = function (element) {
  for (var i = 0; i < element.length; i++) {
    element[i].setAttribute('disabled', '');
  }
};

// Функция для активного состояния страницы
var enableElements = function (element) {
  for (var i = 0; i < element.length; i++) {
    element[i].removeAttribute('disabled');
  }
};

var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closePopup();
  }
};

var closePopup = function () {
  var myPopup = myMap.querySelector('.popup');

  if (myPopup) {
    myPopup.remove();
  }

  document.removeEventListener('keydown', onPopupEscPress);
};

var openPopup = function (forPin) {
  closePopup();

  var myFormFiltersContainer = myMap.querySelector('.map__filters-container');

  myMap.insertBefore(createCard(forPin), myFormFiltersContainer);

  document.addEventListener('keydown', onPopupEscPress);
};

// Функция заполнения поля адреса
var calcAddress = function (coordX, coordY) {
  myAddress.value = coordX + ', ' + coordY;

  return myAddress;
};

// Функция активации элементов
var activateMyMap = function () {
  myMap.classList.remove('map--faded');
  myAdForm.classList.remove('ad-form--disabled');

  enableElements(myAdFormFieldsets, myFormFilter, myFormFeatures);

  createPinFragment();

  calcAddress(myCoordinate.X, myCoordinate.Y);
};

// Функция 'Drag-and-Drop' для главного маркера
var onMyPinMainMousedown = function (evt) {
  evt.preventDefault();

  if (myMap.classList.contains('map--faded')) {
    activateMyMap();
  }

  var startCoords = {
    x: evt.clientX,
    y: evt.clientY
  };

  var dragged = false;

  var onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();

    dragged = true;

    var shift = {
      x: startCoords.x - moveEvt.clientX,
      y: startCoords.y - moveEvt.clientY
    };

    startCoords = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    };

    var myMinX = 0;
    var myMaxX = myMapWidth - myPinWidth;

    var myMinY = 130;
    var myMaxY = 630;

    var myNewAddress = {
      x: myPinMain.offsetLeft - shift.x,
      y: myPinMain.offsetTop - shift.y
    };

    if ((myNewAddress.x >= myMinX) && (myNewAddress.x <= myMaxX)) {
      myPinMain.style.left = myNewAddress.x + 'px';

      myCoordinate.X = myNewAddress.x;
    }

    if ((myNewAddress.y >= myMinY) && (myNewAddress.y <= myMaxY)) {
      myPinMain.style.top = myNewAddress.y + 'px';

      myCoordinate.Y = myNewAddress.y;
    }

    calcAddress(myCoordinate.X, myCoordinate.Y);
  };

  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();

    calcAddress(myCoordinate.X, myCoordinate.Y);

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);

    if (dragged) {
      var onClickPreventDefault = function (evtD) {
        evtD.preventDefault();

        myPinMain.removeEventListener('click', onClickPreventDefault);
      };

      myPinMain.addEventListener('click', onClickPreventDefault);
    }
  };

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
};

// Функция валидации 'Заголовок объявления'
var onMyHeadlineInvalid = function () {
  if (myHeadline.validity.tooShort) {
    myHeadline.setCustomValidity('Заголовок объявления должен состоять минимум из 30 символов');

  } else if (myHeadline.validity.tooLong) {
    myHeadline.setCustomValidity('Заголовок объявления не должен превышать 100 символов');

  } else if (myHeadline.validity.valueMissing) {
    myHeadline.setCustomValidity('Обязательное поле');

  } else {
    myHeadline.setCustomValidity('');
  }
};

myHeadline.addEventListener('invalid', onMyHeadlineInvalid);

// Функция, где поле «Тип жилья» влияет на минимальное значение поля «Цена за ночь»
var onMyTypeOfHousingChange = function () {
  if (myTypeOfHousing.value === 'bungalo') {
    myPricePerNight.setAttribute('min', '0');
    myPricePerNight.placeholder = '0';

  } else if (myTypeOfHousing.value === 'flat') {
    myPricePerNight.setAttribute('min', '1000');
    myPricePerNight.placeholder = '1 000';

  } else if (myTypeOfHousing.value === 'house') {
    myPricePerNight.setAttribute('min', '5000');
    myPricePerNight.placeholder = '5 000';

  } else if (myTypeOfHousing.value === 'palace') {
    myPricePerNight.setAttribute('min', '10000');
    myPricePerNight.placeholder = '10 000';
  }
};

myTypeOfHousing.addEventListener('change', onMyTypeOfHousingChange);

// Поля «Время заезда» и «Время выезда» синхронизированы
myTimeIn.addEventListener('change', function () {
  if (myTimeIn.value !== myTimeOut.value) {
    myTimeOut.value = myTimeIn.value;
  }
});
myTimeOut.addEventListener('change', function () {
  if (myTimeOut.value !== myTimeIn.value) {
    myTimeIn.value = myTimeOut.value;
  }
});

// Поле «Количество комнат» синхронизировано с полем «Количество мест»
var connectsRoomsAndSeats = function () {
  if (myNumbersOfRooms.value === '1' && myNumberOfSeats.value !== '1') {
    myNumberOfSeats.setCustomValidity('Возможные варианты: «для 1 гостя»');

  } else if (myNumbersOfRooms.value === '2' && (myNumberOfSeats.value === '3' || myNumberOfSeats.value === '0')) {
    myNumberOfSeats.setCustomValidity('Возможные варианты: «для 2 гостей» или «для 1 гостя»');

  } else if (myNumbersOfRooms.value === '3' && myNumberOfSeats.value === '0') {
    myNumberOfSeats.setCustomValidity('Возможные варианты: «для 3 гостей», «для 2 гостей» или «для 1 гостя»');

  } else if (myNumbersOfRooms.value === '100' && myNumberOfSeats.value !== '0') {
    myNumberOfSeats.setCustomValidity('Возможные варианты: «не для гостей»');

  } else {
    myNumberOfSeats.setCustomValidity('');
  }
};

myPinMain.addEventListener('mousedown', onMyPinMainMousedown);

myNumbersOfRooms.addEventListener('change', connectsRoomsAndSeats);
myNumberOfSeats.addEventListener('change', connectsRoomsAndSeats);

disableElements(myAdFormFieldsets, myFormFilter, myFormFeatures);
