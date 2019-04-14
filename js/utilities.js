'use strict';
(function () {
  var ESC_KEYCODE = 27;
  window.isEscClicked = function (keycode) {
    return keycode === ESC_KEYCODE;
  };
})();

