'use strict';

(function () {
  var mapPins = document.querySelector('.map__pins'); //  Карта
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin'); // Шаблон отрисовки метки

  //  Функция отрисовывает метку
  var renderMark = function (advert, template) {
    var pin = template.cloneNode(true);
    var img = pin.querySelector('img');

    pin.style.left = advert.location.x + 'px';
    pin.style.top = advert.location.y + 'px';
    img.src = advert.author.avatar;
    img.alt = advert.offer.title;
    return pin;
  };

  // Функция указывает реальные координаты с учетом ширины элемента
  var countRealLocation = function (pin) {
    if (!pin.classList.contains('map__pin--main')) {
      pin.style.left = parseInt(pin.style.left, 10) - Math.round((pin.offsetWidth / 2)) + 'px';
      pin.style.top = parseInt(pin.style.top, 10) - pin.offsetHeight + 'px';
    }
    return pin;
  };

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

  //  Функция выполняет полный цикл гегерации и отрисовки объявлений
  window.showAdverts = function () {
    var adverts = window.generateRandomAdverts(8);
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < adverts.length; i++) {
      var renderedPin = renderMark(adverts[i], pinTemplate);
      fragment.appendChild(renderedPin);
    }
    mapPins.appendChild(fragment);
    // Перерисовываем согласно реальным координатам
    var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    for (var j = 0; j < pins.length; j++) {
      fragment.appendChild(countRealLocation(pins[j]));
      window.pinCartClickHandler(adverts[j], pins[j]); // Добавляем обработчик на клик по метке
    }
    mapPins.appendChild(fragment);
  };
})();
