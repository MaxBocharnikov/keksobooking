'use strict';

(function () {
  var mapPins = document.querySelector('.map__pins'); //  Карта
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin'); // Шаблон отрисовки метки

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
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < adverts.length; i++) {
      var renderedPin = renderMark(adverts[i], pinTemplate);
      fragment.appendChild(renderedPin);
      window.pinCartClickHandler(adverts[i], renderedPin); // Добавляем обработчик на клик по метке
    }
    mapPins.appendChild(fragment);
  };

  var onLoadError = function (message) {
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
})();
