'use strict';

(function () {
  var myMapWidth = window.utils.myMap.clientWidth;

  var myPinMain = window.utils.myMap.querySelector('.map__pin--main');
  var myPinWidth = myPinMain.clientWidth;

  // Функция 'Drag-and-Drop' для главного маркера
  var onMyPinMainMousedown = function (evt) {
    evt.preventDefault();

    if (window.utils.myMap.classList.contains('map--faded')) {
      window.map.activateMyMap();
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
      }

      if ((myNewAddress.y >= myMinY) && (myNewAddress.y <= myMaxY)) {
        myPinMain.style.top = myNewAddress.y + 'px';
      }

      window.map.getMyPinMainCoordPassive();
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      window.map.getMyPinMainCoordPassive();

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

  myPinMain.addEventListener('mousedown', onMyPinMainMousedown);
})();
