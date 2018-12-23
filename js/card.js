'use strict';

(function () {
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
    cardElement.querySelector('.popup__close').addEventListener('click', window.popup.closePopup);

    return cardElement;
  };

  window.card = {
    createCard: createCard
  };
})();
