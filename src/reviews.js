'use strict';

// JSONP запрос
var createCallback = (function() {
  return function(src, callbackFn) {
    var callbackName = 'cb' + Date.now();
    window[callbackName] = callbackFn;
    var scriptEl = document.createElement('script');
    scriptEl.src = src + '?callback=' + callbackName;
    document.body.appendChild(scriptEl);
  };
})();

// Создание DOM-элементов
var reviewsContainer = document.querySelector('.reviews-list');
var templateElement = document.querySelector('template');
var elementToClone;

if ('content' in templateElement) {
  elementToClone = templateElement.content.querySelector('.review');
} else {
  elementToClone = templateElement.querySelector('.review');
}
var IMAGE_LOAD_TIMEOUT = 10000;

var getReviewElement = function(data, container) {
  var element = elementToClone.cloneNode(true);
  element.querySelector('.review-rating').classList.add('invisible');
  element.querySelector('.review-text').textContent = data.description;
  container.appendChild(element);

  var authorImage = new Image();
  var nodeImage = element.querySelectorAll('img');
  var authorImageLoadTimeout;

  authorImage.onload = function(event) {
    clearTimeout(authorImageLoadTimeout);

    // консоль выдает ошибку
    // reviews.js:42 Uncaught TypeError: nodeImage.setAttribute is not a function

    nodeImage.setAttribute('src', event.target.src);

    console.log(nodeImage);
  };
  authorImage.onerror = function() {
    element.classList.add('review-load-failure');
  };
  authorImage.src = data.author.picture;

  authorImageLoadTimeout = setTimeout(function() {
    authorImage.src = '';
    element.classList.add('review-load-failure');
  }, IMAGE_LOAD_TIMEOUT);

  return element;
};

// Отрисовка отзывов при загрузке страницы
window.onload = function() {
  createCallback('http://localhost:1506/api/reviews', function(data) {
    var reviews = data;
    document.querySelector('.reviews-filter').classList.add('invisible');
    console.log('invisible');
    reviews.forEach(function(review) {
      getReviewElement(review, reviewsContainer);
    });
    document.querySelector('.reviews-filter').classList.remove('invisible');
    console.log('visible');
    console.log(reviews);
  });
};
