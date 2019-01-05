'use strict';

(function () {
  var myMain = document.querySelector('main');
  var myAdForm = document.querySelector('.ad-form');
  var myHeadline = myAdForm.querySelector('#title');
  var myTypeOfHousing = myAdForm.querySelector('#type');
  var myPricePerNight = myAdForm.querySelector('#price');
  var myTimeIn = myAdForm.querySelector('#timein');
  var myTimeOut = myAdForm.querySelector('#timeout');
  var myNumbersOfRooms = myAdForm.querySelector('#room_number');
  var myNumberOfSeats = myAdForm.querySelector('#capacity');

  // Функция валидации 'Заголовок объявления'
  var onMyHeadlineInvalid = function () {
    if (myHeadline.validity.tooShort) {
      myHeadline.setCustomValidity('Заголовок объявления должен состоять минимум из 30 символов');

    } else if (myHeadline.validity.tooLong) {
      myHeadline.setCustomValidity('Заголовок объявления не должен превышать 100 символов');

    } else if (myHeadline.validity.valueMissing) {
      myHeadline.setCustomValidity('Обязательное поле');

    } else {
      myHeadline.setCustomValidity('');
    }
  };

  myHeadline.addEventListener('invalid', onMyHeadlineInvalid);

  // Функция, где поле «Тип жилья» влияет на минимальное значение поля «Цена за ночь»
  var onMyTypeOfHousingChange = function () {
    if (myTypeOfHousing.value === 'bungalo') {
      myPricePerNight.setAttribute('min', '0');
      myPricePerNight.placeholder = '0';

    } else if (myTypeOfHousing.value === 'flat') {
      myPricePerNight.setAttribute('min', '1000');
      myPricePerNight.placeholder = '1000';

    } else if (myTypeOfHousing.value === 'house') {
      myPricePerNight.setAttribute('min', '5000');
      myPricePerNight.placeholder = '5000';

    } else if (myTypeOfHousing.value === 'palace') {
      myPricePerNight.setAttribute('min', '10000');
      myPricePerNight.placeholder = '10000';
    }
  };

  myTypeOfHousing.addEventListener('change', onMyTypeOfHousingChange);

  // Поля «Время заезда» и «Время выезда» синхронизированы
  myTimeIn.addEventListener('change', function () {
    if (myTimeIn.value !== myTimeOut.value) {
      myTimeOut.value = myTimeIn.value;
    }
  });
  myTimeOut.addEventListener('change', function () {
    if (myTimeOut.value !== myTimeIn.value) {
      myTimeIn.value = myTimeOut.value;
    }
  });

  // Поле «Количество комнат» синхронизировано с полем «Количество мест»
  var connectsRoomsAndSeats = function () {
    if (myNumbersOfRooms.value === '1' && myNumberOfSeats.value !== '1') {
      myNumberOfSeats.setCustomValidity('Возможные варианты: «для 1 гостя»');

    } else if (myNumbersOfRooms.value === '2' && (myNumberOfSeats.value === '3' || myNumberOfSeats.value === '0')) {
      myNumberOfSeats.setCustomValidity('Возможные варианты: «для 2 гостей» или «для 1 гостя»');

    } else if (myNumbersOfRooms.value === '3' && myNumberOfSeats.value === '0') {
      myNumberOfSeats.setCustomValidity('Возможные варианты: «для 3 гостей», «для 2 гостей» или «для 1 гостя»');

    } else if (myNumbersOfRooms.value === '100' && myNumberOfSeats.value !== '0') {
      myNumberOfSeats.setCustomValidity('Возможные варианты: «не для гостей»');

    } else {
      myNumberOfSeats.setCustomValidity('');
    }
  };

  myNumbersOfRooms.addEventListener('change', connectsRoomsAndSeats);
  myNumberOfSeats.addEventListener('change', connectsRoomsAndSeats);

  // ----------------------------------------------------------------------------------------------------------
  // ----------------------------------------------------------------------------------------------------------

  var successHandler = function () {
    var successTemplate = document.querySelector('#success').content.querySelector('.success');
    var successElement = successTemplate.cloneNode(true);

    myMain.appendChild(successElement);
  };

  var errorHandler = function () {
    var errorTemplate = document.querySelector('#error').content.querySelector('.error');
    var errorElement = errorTemplate.cloneNode(true);

    myMain.appendChild(errorElement);
  };

  var onLoad = function () {
    successHandler();
    openMessagePopup();

    window.map.onMyButtonResetClick();
  };

  var onError = function () {
    errorHandler();
    openMessagePopup();

    window.map.onMyButtonResetClick();
  };

  var onMyAdFormSubmit = function (evt) {
    evt.preventDefault();

    window.backend.upload(new FormData(myAdForm), onLoad, onError);
  };

  myAdForm.addEventListener('submit', onMyAdFormSubmit);

  var onMessagePopupEscPress = function (evt) {
    if (evt.keyCode === window.utils.ESC_KEYCODE) {
      closeMessagePopup();
    }

    document.removeEventListener('keydown', onMessagePopupEscPress);
  };

  var closeMessagePopup = function () {
    var mySuccessPopup = document.querySelector('.success');
    var myErrorPopup = document.querySelector('.error');

    if (mySuccessPopup) {
      mySuccessPopup.remove();

    } else if (myErrorPopup) {
      myErrorPopup.remove();
    }

    document.removeEventListener('click', closeMessagePopup);
    window.map.myButtonReset.removeEventListener('click', window.map.onMyButtonResetClick);
  };

  var openMessagePopup = function () {
    document.addEventListener('keydown', onMessagePopupEscPress);
    document.addEventListener('click', closeMessagePopup);
  };
})();
