'use strict';

(function () {
  var PRICE_LOW = 10000;
  var PRICE_HIGH = 50000;

  var myFilters = window.utils.myMap.querySelector('.map__filters');

  var myHousingType = myFilters.querySelector('#housing-type');
  var myHousingPrice = myFilters.querySelector('#housing-price');
  var myHousingRooms = myFilters.querySelector('#housing-rooms');
  var myHousingGuests = myFilters.querySelector('#housing-guests');
  var myAllFeatures = myFilters.querySelectorAll('.map__checkbox');

  var getHousingType = function (card) {
    switch (myHousingType.value) {
      case 'any':
        return card;

      default:
        return card.offer.type === myHousingType.value;
    }
  };

  var getHousingRooms = function (card) {
    switch (myHousingRooms.value) {
      case 'any':
        return card;

      default:
        return card.offer.rooms === parseInt(myHousingRooms.value, 10);
    }
  };

  var getHousingGuests = function (card) {
    switch (myHousingGuests.value) {
      case 'any':
        return card;

      default:
        return card.offer.guests === parseInt(myHousingGuests.value, 10);
    }
  };

  var getHousingPrice = function (card) {
    switch (myHousingPrice.value) {
      case 'low':
        return card.offer.price <= PRICE_LOW;

      case 'middle':
        return (card.offer.price >= PRICE_LOW) && (card.offer.price <= PRICE_HIGH);

      case 'high':
        return card.offer.price >= PRICE_HIGH;

      default:
        return card;
    }
  };

  var getHousingFeatures = function (card) {
    var myResult = true;

    myAllFeatures.forEach(function (it) {
      if (it.checked && card.offer.features.indexOf(it.value) < 0) {
        myResult = false;
      }
    });

    return myResult;
  };

  // функция фильтрующая объявления
  var getMyFilters = function (arr) {
    var myFiltersArr = arr.filter(function (it) {
      return getHousingType(it) && getHousingPrice(it) && getHousingRooms(it) && getHousingGuests(it) && getHousingFeatures(it);
    });

    return myFiltersArr;
  };

  window.filters = {

  };
})();
