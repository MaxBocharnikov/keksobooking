'use strict';

(function () {
  var MAIN_PIN_WIDTH = 65;
  var MAIN_PIN_HEIGHT = 65;

  var adForm = document.querySelector('.ad-form');
  var adFieldsets = adForm.querySelectorAll('fieldset'); // Поля добавления объявления
  var roomQuantity = adForm.querySelector('#room_number');
  var capacity = adForm.querySelector('#capacity');
  var adFormSubmit = adForm.querySelector('.ad-form__submit');
  var formAddress = document.querySelector('#address'); //  Поле адреса из формы
  //  Функция дизейблит поля формы объявления
  window.disableNotice = function () {
    for (var i = 0; i < adFieldsets.length; i++) {
      adFieldsets[i].setAttribute('disabled', 'disabled');
    }
  };

  //  Функция передает значение полю Адрес в форме заполнения объявления, относительно от координат главного маркера (неактивное состояние)
  window.setInActiveFormAddress = function () {
    formAddress.value = (parseInt(window.mainPin.style.left, 10) + Math.round(MAIN_PIN_WIDTH / 2)) + ' '
      + (parseInt(window.mainPin.style.top, 10) + Math.round(MAIN_PIN_HEIGHT / 2));
  };


  //  Функция передает значение полю Адрес в форме заполнения объявления, относительно от координат главного маркера (активное состояние)
  window.setActiveFormAddress = function () {
    formAddress.value = (parseInt(window.mainPin.style.left, 10) + Math.round(MAIN_PIN_WIDTH / 2)) + ' '
      + (parseInt(window.mainPin.style.top, 10) + MAIN_PIN_HEIGHT);
  };

  //  Функция раздизейблит поля формы объявления
  window.enableNotice = function () {
    adForm.classList.remove('ad-form--disabled');
    for (var i = 0; i < adFieldsets.length; i++) {
      adFieldsets[i].removeAttribute('disabled');
    }
  };
  //  Проверяем соответсвие кол-ва гостей и кол-ва комнат перед отправкой формы
  adFormSubmit.addEventListener('click', function () {
    if (parseInt(roomQuantity.value, 10) < parseInt(capacity.value, 10)) {
      roomQuantity.setCustomValidity('Количества комнат должно быть больше либо равно количестку гостей');
    } else {
      roomQuantity.setCustomValidity('');
    }
  });
})();

