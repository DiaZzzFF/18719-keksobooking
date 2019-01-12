'use strict';

(function () {
  var myPinMain = window.utils.myMap.querySelector('.map__pin--main');

  var myFormFeatures = window.utils.myMap.querySelector('.map__features');

  var myAdForm = document.querySelector('.ad-form');
  var myAdFormFieldsets = myAdForm.querySelectorAll('fieldset');
  var myButtonReset = myAdForm.querySelector('.ad-form__reset');
  var myAddress = myAdForm.querySelector('#address');

  var myDataArr = [];

  // Функция для неактивного состояния страницы.
  var disableElements = function (element) {
    for (var i = 0; i < element.length; i++) {
      element[i].setAttribute('disabled', '');
    }
  };

  // Функция для активного состояния страницы.
  var enableElements = function (element) {
    for (var i = 0; i < element.length; i++) {
      element[i].removeAttribute('disabled');
    }
  };

  // Функция заполнения поля адреса.
  var calcMyPinMainCoord = function () {
    return Math.round(myPinMain.offsetLeft) + ', ' + Math.round(myPinMain.offsetTop);
  };

  // Функция заполнения поля адреса (по-умолчанию).
  var resetMyPinMainCoord = function () {
    var DEFAULT_PIN_MAIN_COORDINATE_X = 570;
    var DEFAULT_PIN_MAIN_COORDINATE_Y = 375;

    myPinMain.style = 'left: ' + DEFAULT_PIN_MAIN_COORDINATE_X + 'px; top: ' + DEFAULT_PIN_MAIN_COORDINATE_Y + 'px;';

    myAddress.value = myAddress.placeholder = calcMyPinMainCoord();
  };

  // Функция заполнения поля адреса для неактивного состояния страницы.
  var getMyPinMainCoordPassive = function () {
    myAddress.value = calcMyPinMainCoord();
  };

  // Функция, которая обновляет метки на карте при изменении фильтров.
  var updatePins = function () {
    removeAllPin();

    window.pin.createPinFragment(window.filters.getMyFilters(myDataArr));
  };

  // Функция для отрисовки (меток на карте) вместе с загруженными данными из сервера.
  var getPins = function () {
    var onLoad = function (data) {
      myDataArr = data;

      updatePins();
    };

    var onError = function () {
      window.form.errorHandler();
    };

    window.backend.load(onLoad, onError);
  };

  // Функция активации элементов.
  var activateMyMap = function () {
    window.utils.myMap.classList.remove('map--faded');
    myAdForm.classList.remove('ad-form--disabled');

    enableElements(myAdFormFieldsets, myFormFeatures);
    window.filters.enableMyFilters();

    getPins();

    window.filters.getFiltersAddChange();
  };

  var removeAllPin = function () {
    while (myPinMain.nextElementSibling) {
      myPinMain.nextElementSibling.remove();
    }
  };

  var onMyButtonResetClick = function () {
    window.utils.myMap.classList.add('map--faded');
    myAdForm.classList.add('ad-form--disabled');

    disableElements(myAdFormFieldsets, myFormFeatures);
    window.filters.disableMyFilters();

    window.filters.myFilters.reset();
    myAdForm.reset();

    resetMyPinMainCoord();

    window.filters.getFiltersRemoveChange();

    window.utils.closePopup();

    removeAllPin();
  };

  myButtonReset.addEventListener('click', onMyButtonResetClick);

  disableElements(myAdFormFieldsets, myFormFeatures);
  getMyPinMainCoordPassive();

  window.map = {
    activateMyMap: activateMyMap,
    myButtonReset: myButtonReset,
    onMyButtonResetClick: onMyButtonResetClick,
    updatePins: updatePins,
    getMyPinMainCoordPassive: getMyPinMainCoordPassive
  };
})();
