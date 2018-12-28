'use strict';

(function () {
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
      myPricePerNight.placeholder = '1 000';

    } else if (myTypeOfHousing.value === 'house') {
      myPricePerNight.setAttribute('min', '5000');
      myPricePerNight.placeholder = '5 000';

    } else if (myTypeOfHousing.value === 'palace') {
      myPricePerNight.setAttribute('min', '10000');
      myPricePerNight.placeholder = '10 000';
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
})();