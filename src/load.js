'use strict';

define(function() {
  return function(src, callbackFn) {
    var callbackName = 'cb' + Date.now();
    window[callbackName] = callbackFn;
    var scriptEl = document.createElement('script');
    scriptEl.src = src + '?callback=' + callbackName;
    document.body.appendChild(scriptEl);
  };
});
