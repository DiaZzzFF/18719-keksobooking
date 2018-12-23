'use strict';

(function () {
  var myMap = document.querySelector('.map');
  var myMapWidth = myMap.clientWidth;

  var myPinMain = myMap.querySelector('.map__pin--main');
  var myPinWidth = myPinMain.clientWidth;

  // Функция 'Drag-and-Drop' для главного маркера
  var onMyPinMainMousedown = function (evt) {
    evt.preventDefault();

    if (myMap.classList.contains('map--faded')) {
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

        window.map.MyCoordinates.X = myNewAddress.x;
      }

      if ((myNewAddress.y >= myMinY) && (myNewAddress.y <= myMaxY)) {
        myPinMain.style.top = myNewAddress.y + 'px';

        window.map.MyCoordinates.Y = myNewAddress.y;
      }

      window.map.calcAddress(window.map.MyCoordinates.X, window.map.MyCoordinates.Y);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      window.map.calcAddress(window.map.MyCoordinates.X, window.map.MyCoordinates.Y);

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
