'use strict';

(function () {
  var myMap = document.querySelector('.map');
  var myMapWidth = myMap.clientWidth;
  var myMapHeight = myMap.clientHeight;

  var myPinMain = myMap.querySelector('.map__pin--main');
  var myPinHeight = myPinMain.clientHeight;

  var myFormFilter = myMap.querySelectorAll('.map__filter');
  var myFormFeatures = myMap.querySelector('.map__features');

  var myAdForm = document.querySelector('.ad-form');
  var myAdFormFieldsets = myAdForm.querySelectorAll('fieldset');

  var MyCoordinates = {
    X: Math.round(myMapWidth / 2),
    Y: Math.round((myMapHeight / 2) + (myPinHeight / 2))
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

  // Функция заполнения поля адреса
  var calcAddress = function (coordX, coordY) {
    var myAddress = myAdForm.querySelector('input[name="address"]');

    myAddress.value = coordX + ', ' + coordY;

    return myAddress;
  };

  // Функция активации элементов
  var activateMyMap = function () {
    myMap.classList.remove('map--faded');
    myAdForm.classList.remove('ad-form--disabled');

    enableElements(myAdFormFieldsets, myFormFilter, myFormFeatures);

    window.pin.createPinFragment();

    calcAddress(MyCoordinates.X, MyCoordinates.Y);
  };

  disableElements(myAdFormFieldsets, myFormFilter, myFormFeatures);

  window.map = {
    activateMyMap: activateMyMap,
    calcAddress: calcAddress,
    MyCoordinates: MyCoordinates
  };
})();

