'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var myMap = document.querySelector('.map');

  var DEBOUNCE_INTERVAL = 500; // ms

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

    myMap.insertBefore(window.card.createCard(forPin), myFormFiltersContainer);

    document.addEventListener('keydown', onPopupEscPress);
  };

  // Функция «устранение дребезга» (debounce).
  var debounce = function (cb) {
    var lastTimeout = null;

    return function () {
      var parameters = arguments;

      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }

      lastTimeout = window.setTimeout(function () {
        cb.apply(null, parameters);
      }, DEBOUNCE_INTERVAL);
    };
  };

  window.utils = {
    ESC_KEYCODE: ESC_KEYCODE,
    myMap: myMap,
    closePopup: closePopup,
    openPopup: openPopup,
    debounce: debounce
  };
})();
