'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var myMap = document.querySelector('.map');

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

  window.utils = {
    ESC_KEYCODE: ESC_KEYCODE,
    myMap: myMap,
    closePopup: closePopup,
    openPopup: openPopup
  };
})();
