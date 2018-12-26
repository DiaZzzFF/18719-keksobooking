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
    window.utils.myMap.classList.remove('map--faded');
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
