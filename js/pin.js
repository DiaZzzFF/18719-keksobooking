'use strict';

(function () {
  // Количество отрисованных (меток на карте).
  var NUMBER_OF_PINS = 5;

  var myPins = window.utils.myMap.querySelector('.map__pins');

  // Функция создания DOM-элемента (метки на карте).
  var createPin = function (pin) {
    var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
    var pinElement = pinTemplate.cloneNode(true);

    if (pin.offer) {
      pinElement.style = 'left: ' + pin.location.x + 'px; top: ' + pin.location.y + 'px;';
      pinElement.querySelector('img').src = pin.author.avatar;
      pinElement.querySelector('img').alt = pin.offer.title;
    }

    // Обработчик для открытия (объявления)
    pinElement.addEventListener('click', function () {
      window.utils.openPopup(pin);
    });

    return pinElement;
  };

  // Функция вставки созданных DOM-элементов (метки на карте) в блок.
  var createPinFragment = function (arr) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < Math.min(arr.length, NUMBER_OF_PINS); i++) {
      fragment.appendChild(createPin(arr[i]));
    }

    myPins.appendChild(fragment);
  };

  window.pin = {
    createPinFragment: createPinFragment
  };
})();
