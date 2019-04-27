'use strict';
(function () {
  var ESC_KEYCODE = 27;
  window.isEscClicked = function (keycode) {
    return keycode === ESC_KEYCODE;
  };

  // Функция устраняет "Дребезги"
  window.debounce = function (func, wait) {
    if (lastTimeOut) {
      window.clearTimeout(lastTimeOut);
    }
    var lastTimeOut = window.setTimeout(function () {
      func();
    }, wait);
  };
})();

