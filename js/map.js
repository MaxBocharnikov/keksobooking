'use strict';

(function () {
  window.mainPin = document.querySelector('.map__pin--main'); //  Главная метка
  window.map = document.querySelector('.map'); //  Карта объявления
  var isActive = false; // отрисованы ли данные

  //  На этапе загрузки страницы - Букинг должен быть неактивен. Дизейблим форму создания объявления
  window.disableNotice();

  //  Значение поля адрес должно быть заполнено всегда, даже если букинг неактивен
  window.setInActiveFormAddress();

  //  При отпускание главного маркера - удаляем старые метки, отрисовываем метки объвлений на карте, а также убираем дизейбл формы создания объявлений
  //  Также обрабатываем перемещение по странице
  var mouseDownHandler = function (downEvt) {
    downEvt.preventDefault();
    if (!isActive) {
      window.map.classList.remove('map--faded');
      window.removeAdverts();
      window.showAdverts();
      window.enableNotice();
      isActive = true;
    }

    var currentCoords = {
      x: downEvt.clientX,
      y: downEvt.clientY
    };
    var mouseMoveHandler = function (moveEvt) {
      moveEvt.preventDefault();
      var shifted = {
        x: moveEvt.clientX - currentCoords.x,
        y: moveEvt.clientY - currentCoords.y
      };
      currentCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };
      window.mainPin.style.top = window.mainPin.offsetTop + shifted.y + 'px';
      window.mainPin.style.left = window.mainPin.offsetLeft + shifted.x + 'px';
      window.setActiveFormAddress();

    };

    var mouseUpHandler = function (upEvt) {
      upEvt.preventDefault();
      window.mainPin.removeEventListener('mouseup', mouseUpHandler);
      window.map.removeEventListener('mousemove', mouseMoveHandler);
      window.setActiveFormAddress();
    };

    window.map.addEventListener('mousemove', mouseMoveHandler);
    window.map.addEventListener('mouseup', mouseUpHandler);
  };
  window.mainPin.addEventListener('mousedown', mouseDownHandler);
})();


