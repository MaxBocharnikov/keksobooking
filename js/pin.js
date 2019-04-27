'use strict';

(function () {
  var mapPins = document.querySelector('.map__pins'); //  Карта
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin'); // Шаблон отрисовки метки
  var filterForm = document.querySelector('.map__filters');

  // Фильтр по типу
  var filterType = function (adverts) {
    var housingType = filterForm.querySelector('#housing-type');
    if (housingType.value === 'any') {
      return adverts;
    } else {
      return adverts.filter(function (advert) {
        return (housingType.value === advert.offer.type);
      });
    }
  };

  // Фильтр по цене
  var filterPrice = function (adverts) {
    var housingPrice = filterForm.querySelector('#housing-price');
    var filtered = [];
    switch (housingPrice.value) {
      case 'middle':
        filtered = adverts.filter(function (advert) {
          advert = advert.offer.price;
          return (parseInt(advert, 10) >= 10000 && (parseInt(advert, 10) < 50000));
        });
        break;

      case 'low':
        filtered = adverts.filter(function (advert) {
          advert = advert.offer.price;
          return (parseInt(advert, 10) < 10000);
        });
        break;

      case 'high':
        filtered = adverts.filter(function (advert) {
          advert = advert.offer.price;
          return (parseInt(advert, 10) >= 50000);
        });
        break;
      default:
        filtered = adverts;
    }
    return filtered;
  };

  // Фильтр по кол-ву комнат
  var filterRooms = function (adverts) {
    var housingRooms = filterForm.querySelector('#housing-rooms');
    if (housingRooms.value === 'any') {
      return adverts;
    } else {
      return adverts.filter(function (advert) {
        return (parseInt(housingRooms.value, 10) === advert.offer.rooms);
      });
    }
  };

  // фильтр по гостям
  var filterGuests = function (adverts) {
    var housingGuests = filterForm.querySelector('#housing-guests');
    if (housingGuests.value === 'any') {
      return adverts;
    } else {
      return adverts.filter(function (advert) {
        return (parseInt(housingGuests.value, 10) === advert.offer.guests);
      });
    }
  };

  // Фильтр по фичам
  var filterFeatures = function (adverts) {
    var checkedFeatures = filterForm.querySelectorAll('input[name=features]:checked');
    if (checkedFeatures.length > 0) {
      var checkedValues = [];
      for (var i = 0; i < checkedFeatures.length; i++) {
        checkedValues.push(checkedFeatures[i].value);
      }
      return adverts.filter(function (advert) {
        return checkedValues.every(function (checkedValue) {
          return advert.offer.features.indexOf(checkedValue) >= 0;
        });
      });
    } else {
      return adverts;
    }
  };

  // Общая Функция фильтрации объявления
  var filterAdverts = function (adverts) {
    var filtered = adverts;
    filtered = filterType(filtered);
    filtered = filterPrice(filtered);
    filtered = filterRooms(filtered);
    filtered = filterGuests(filtered);
    filtered = filterFeatures(filtered);
    return filtered;
  };

  //  Функция отрисовывает метку
  var renderMark = function (advert, template) {
    var PIN_WIDTH = 50;
    var PIN_HEIGHT = 70;

    var pin = template.cloneNode(true);
    var img = pin.querySelector('img');

    pin.style.left = advert.location.x - Math.round(PIN_WIDTH / 2) + 'px';
    pin.style.top = advert.location.y - PIN_HEIGHT + 'px';
    img.src = advert.author.avatar;
    img.alt = advert.offer.title;
    return pin;
  };

  //  Функция отрисовывает метки
  var renderMarks = function (adverts) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < adverts.length; i++) {
      var renderedPin = renderMark(adverts[i], pinTemplate);
      fragment.appendChild(renderedPin);
      window.pinCartClickHandler(adverts[i], renderedPin); // Добавляем обработчик на клик по метке
    }
    mapPins.appendChild(fragment);
  }

  //  Функция удаляет объявления из карты
  window.removeAdverts = function () {
    var pins = document.querySelectorAll('.map__pin');
    if (pins.length > 1) {
      for (var i = 0; i < pins.length; i++) {
        if (!pins[i].classList.contains('map__pin--main')) {
          pins[i].remove();
        }
      }
    }
  };

  var onLoadSuccess = function (adverts) {
    window.adverts = adverts;
    renderMarks(adverts);
  };

  var onLoadError = function (message) {
    window.adverts = null;
    var template = document.querySelector('#error').content.cloneNode(true);
    var error = template.querySelector('.error');
    var errorMessage = error.querySelector('.error__message');
    var tryAgain = error.querySelector('.error__button');
    errorMessage.textContent = message;
    tryAgain.addEventListener('click', function () {
      window.map.removeChild(error);
      window.load(onLoadSuccess, onLoadError);
    });
    window.map.appendChild(error);
  };

  //  Функция выполняет полный цикл гегерации и отрисовки объявлений
  window.showAdverts = function () {
    window.load(onLoadSuccess, onLoadError);
  };

  // На любое изменения значения в форме, фильтруем значения
  filterForm.addEventListener('change', function () {
    var filteredAdverts = [];
    window.removeAdverts();
    filteredAdverts = filterAdverts(window.adverts);
    renderMarks(filteredAdverts);
  });
})();
