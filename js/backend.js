'use strict';
(function () {

  window.load = function(onLoad, onError) {
    var URL = 'https://js.dump.academy/keksobooking/data1';
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = 10000;
    xhr.open('GET', URL);
    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError('Ошибка при загрузки объявлений');
      }
    });

    xhr.addEventListener('timeout', function () {
      onError('Время ожидания истекло');
    });

    xhr.addEventListener('error', function () {
      onError('Проблемы с сетью');
    });

    xhr.send();
  };
})();
