'use strict';

define(function() {
  return function(src, params, callbackFn) {
    var xhr = new XMLHttpRequest();

    xhr.onload = function(evt) {
      var loadedData = JSON.parse(evt.target.response);
      callbackFn(loadedData);
    };

    xhr.open('GET', src +
      '?from=' + (params.from || 0) +
      '&to=' + (params.to || Infinity) +
      '&filter=' + (params.filter || 'reviews-all'));
    xhr.send();
  };
});
