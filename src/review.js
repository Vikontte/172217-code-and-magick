'use strict';

var reviewsContainer = document.querySelector('.reviews-list');
var templateElement = document.querySelector('template');
var elementToClone;

if ('content' in templateElement) {
  elementToClone = templateElement.content.querySelector('.review');
} else {
  elementToClone = templateElement.querySelector('.review');
}
var IMAGE_LOAD_TIMEOUT = 10000;

define(function() {
  return function(data, container) {
    container = reviewsContainer;
    var element = elementToClone.cloneNode(true);
    element.querySelector('.review-rating').classList.add('invisible');
    element.querySelector('.review-text').textContent = data.description;
    container.appendChild(element);

    var authorImage = new Image();
    var nodeImage = element.querySelector('img');
    var authorImageLoadTimeout;

    authorImage.onload = function(event) {
      clearTimeout(authorImageLoadTimeout);
      nodeImage.src = event.target.src;
      nodeImage.width = 124;
      nodeImage.height = 124;
    };

    authorImage.onerror = function() {
      clearTimeout(authorImageLoadTimeout);
      element.classList.add('review-load-failure');
    };
    authorImage.src = data.author.picture;

    authorImageLoadTimeout = setTimeout(function() {
      authorImage.src = '';
      element.classList.add('review-load-failure');
    }, IMAGE_LOAD_TIMEOUT);

    return element;
  };
});
