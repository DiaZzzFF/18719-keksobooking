'use strict';

(function () {
  var myMapWidth = window.utils.myMap.clientWidth;
  var myMapHeight = window.utils.myMap.clientHeight;

  var myPinMain = window.utils.myMap.querySelector('.map__pin--main');
  var myPinHeight = myPinMain.clientHeight;

  var myFormFilter = window.utils.myMap.querySelectorAll('.map__filter');
  var myFormFeatures = window.utils.myMap.querySelector('.map__features');

  var myAdForm = document.querySelector('.ad-form');
  var myAdFormFieldsets = myAdForm.querySelectorAll('fieldset');

  var myButtonReset = myAdForm.querySelector('.ad-form__reset');

  var MyCoordinates = {
    X: Math.round(myMapWidth / 2),
    Y: Math.round((myMapHeight / 2) + (myPinHeight / 2))
  };

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
  var calcAddress = function (coordX, coordY) {
    var myAddress = myAdForm.querySelector('input[name="address"]');

    myAddress.value = coordX + ', ' + coordY;

    return myAddress;
  };

  // Функция для отрисовки (меток на карте) вместе с загруженными данными из сервера.
  var getPins = function () {
    var onLoad = function (data) {
      window.pin.createPinFragment(data);
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

    enableElements(myAdFormFieldsets, myFormFilter, myFormFeatures);

    getPins();

    calcAddress(MyCoordinates.X, MyCoordinates.Y);
  };

  var removeAllPin = function () {
    while (myPinMain.nextElementSibling) {
      myPinMain.nextElementSibling.remove();
    }
  };

  var onMyButtonResetClick = function () {
    var DEFAULT_COORDINATE_X = 570;
    var DEFAULT_COORDINATE_Y = 375;

    window.utils.myMap.classList.add('map--faded');
    myAdForm.classList.add('ad-form--disabled');

    disableElements(myAdFormFieldsets, myFormFilter, myFormFeatures);

    myAdForm.reset();

    myPinMain.style = 'left: ' + DEFAULT_COORDINATE_X + 'px; top: ' + DEFAULT_COORDINATE_Y + 'px;';

    window.utils.closePopup();

    removeAllPin();
  };

  myButtonReset.addEventListener('click', onMyButtonResetClick);

  disableElements(myAdFormFieldsets, myFormFilter, myFormFeatures);

  window.map = {
    activateMyMap: activateMyMap,
    calcAddress: calcAddress,
    MyCoordinates: MyCoordinates,
    myButtonReset: myButtonReset,
    onMyButtonResetClick: onMyButtonResetClick
  };
})();
