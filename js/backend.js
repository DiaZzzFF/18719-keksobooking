'use strict';

(function () {
  var URL_LOAD = 'https://js.dump.academy/keksobooking/data';
  var URL_UPLOAD = 'https://js.dump.academy/keksobooking';

  var STATUS_CODE = 200;
  var TIMEOUT = 10000; // 10s

  var getUnifyRequest = function (xhr, onLoad, onError) {
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === STATUS_CODE) {
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

    xhr.timeout = TIMEOUT;

    return xhr;
  };

  // Функция получения (load) данных с сервера.
  var load = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();

    getUnifyRequest(xhr, onLoad, onError);

    xhr.open('GET', URL_LOAD);
    xhr.send();
  };

  // Функция отправки (upload) данных на сервер.
  var upload = function (data, onLoad, onError) {
    var xhr = new XMLHttpRequest();

    getUnifyRequest(xhr, onLoad, onError);

    xhr.open('POST', URL_UPLOAD);
    xhr.send(data);
  };

  window.backend = {
    load: load,
    upload: upload
  };
})();
