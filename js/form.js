'use strict';

(function () {
  var MAIN_PIN_WIDTH = 65;
  var MAIN_PIN_HEIGHT = 65;

  var adForm = document.querySelector('.ad-form');
  var adFieldsets = adForm.querySelectorAll('fieldset'); // Поля добавления объявления
  var roomQuantity = adForm.querySelector('#room_number');
  var capacity = adForm.querySelector('#capacity');
  var adFormSubmit = adForm.querySelector('.ad-form__submit');
  var formAddress = adForm.querySelector('#address'); //  Поле адреса из формы
  var fileForm = adForm.querySelector('.ad-form__field input[type=file]');
  var preview = adForm.querySelector('.ad-form-header__preview img');
  var FILE_TYPES = ['jpg', 'png', 'jpeg', 'svg', 'gif'];

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

  //  Колбэк на успешную отправку формы
  var onSubmitSuccess = function () {
    var template = document.querySelector('#error').content.cloneNode(true);
    var error = template.querySelector('.error');
    var errorMessage = error.querySelector('.error__message');
    var gotit = error.querySelector('.error__button');
    errorMessage.textContent = 'Данные успешно отправлены';
    gotit.textContent = 'Понятно';
    gotit.addEventListener('click', function () {
      window.map.removeChild(error);
    });
    window.map.appendChild(error);
    adForm.reset();
  };

  //  Коллбэк на ошибочную отправку формы
  var onSubmitError = function (message) {
    var template = document.querySelector('#error').content.cloneNode(true);
    var error = template.querySelector('.error');
    var errorMessage = error.querySelector('.error__message');
    var tryAgain = error.querySelector('.error__button');
    errorMessage.textContent = message;
    tryAgain.addEventListener('click', function () {
      window.map.removeChild(error);
    });
    window.map.appendChild(error);
  };

  //  Проверяем соответсвие кол-ва гостей и кол-ва комнат перед отправкой формы
  adFormSubmit.addEventListener('click', function () {
    if (parseInt(roomQuantity.value, 10) < parseInt(capacity.value, 10)) {
      roomQuantity.setCustomValidity('Количества комнат должно быть больше либо равно количестку гостей');
    } else {
      roomQuantity.setCustomValidity('');
    }
  });

  // На изменение в инпуте-файле подгружаем превью
  fileForm.addEventListener('change', function () {
    var file = fileForm.files[0];
    var fileName = file.name.toLowerCase();
    var marches = FILE_TYPES.some(function (type) {
      return fileName.endsWith(type);
    });

    if (marches) {
      var reader = new FileReader();
      reader.addEventListener('load', function () {
        preview.src = reader.result;
      });
      reader.readAsDataURL(file);
    }
  });

  adForm.addEventListener('submit', function (e) {
    e.preventDefault();
    window.save(new FormData(adForm), onSubmitSuccess, onSubmitError);
  });

})();

