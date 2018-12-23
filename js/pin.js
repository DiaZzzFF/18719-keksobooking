'use strict';

(function () {
  var myMap = document.querySelector('.map');
  var myPins = myMap.querySelector('.map__pins');

  // Функция создания DOM-элемента (метки на карте).
  var createPin = function (pin) {
    var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
    var pinElement = pinTemplate.cloneNode(true);

    pinElement.style = 'left: ' + pin.location.x + 'px; top: ' + pin.location.y + 'px;';
    pinElement.querySelector('img').src = pin.author.avatar;
    pinElement.querySelector('img').alt = pin.offer.title;

    // Обработчик для открытия (объявления)
    pinElement.addEventListener('click', function () {
      window.popup.openPopup(pin);
    });

    return pinElement;
  };

  // Функция вставки созданных DOM-элементов (метки на карте) в блок.
  var createPinFragment = function () {
    var myArr = window.data.createCards();
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < myArr.length; i++) {
      fragment.appendChild(createPin(myArr[i]));
    }

    myPins.appendChild(fragment);
  };

  window.pin = {
    createPinFragment: createPinFragment
  };
})();
