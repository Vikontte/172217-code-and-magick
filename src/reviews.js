'use strict';

var createCallback = (function() {
  return function(src, callbackFn) {
    var callbackName = 'cb' + Date.now();
    window[callbackName] = callbackFn;
    var scriptEl = document.createElement('script');
    scriptEl.src = src + '?callback=' + callbackName;
    document.body.appendChild(scriptEl);
  };
})();

window.onload = function() {
  createCallback('http://localhost:1506/api/reviews', function(data) {
    var reviews = data;
    console.log(reviews);
  });
};
