'use strict';

(function () {
  var URL_LOAD = 'https://js.dump.academy/keksobooking/data';
  var URL_UPLOAD = 'https://js.dump.academy/keksobooking';

  var xhr = new XMLHttpRequest();
  xhr.responseType = 'json';

  var getDuplicateCode = function (onLoad, onError) {
    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);

      } else {
        onError('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = 10000; // 10s
  };

  // Функция получения (load) данных с сервера
  var load = function (onLoad, onError) {
    getDuplicateCode(onLoad, onError);

    xhr.open('GET', URL_LOAD);
    xhr.send();
  };

  // Функция отправки (upload) данных на сервер
  var upload = function (data, onLoad, onError) {
    getDuplicateCode(onLoad, onError);

    xhr.open('POST', URL_UPLOAD);
    xhr.send(data);
  };

  window.backend = {
    load: load,
    upload: upload
  };
})();
