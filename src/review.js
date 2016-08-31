'use strict';

define(function() {
  return function(data) {
    return new Review(data);
  };
});

var reviewsContainer = document.querySelector('.reviews-list');

var Review = function(data) {
  this.container = reviewsContainer;
  this.data = data;
  this.element = window.getReviewElement(this.data);
  this.reviewQuiz = this.element.querySelector('.review-quiz');
  this.container.appendChild(this.element);
  var self = this;

  this.reviewQuiz.onclick = function(evt) {
    if (evt.target.classList.contains('review-quiz-answer')) {
      self.onQuizAnswerClick(evt.target);
    }
  };

  Review.prototype.onQuizAnswerClick = function(activeElement) {
    var previosReviewQuizAnswer = this.element.querySelector('.review-quiz-answer-active');
    if (previosReviewQuizAnswer) {
      previosReviewQuizAnswer.classList.remove('review-quiz-answer-active');
    }
    activeElement.classList.add('review-quiz-answer-active');
  };

  Review.prototype.remove = function() {
    this.reviewQuiz.onclick = null;
  };
};

(function() {
  var templateElement = document.querySelector('template');
  var elementToClone;

  var IMAGE_LOAD_TIMEOUT = 10000;

  if ('content' in templateElement) {
    elementToClone = templateElement.content.querySelector('.review');
  } else {
    elementToClone = templateElement.querySelector('.review');
  }

  window.getReviewElement = function(data) {
    var element = elementToClone.cloneNode(true);
    element.querySelector('.review-rating').classList.add('invisible');
    element.querySelector('.review-text').textContent = data.description;

    var authorImage = new Image();
    var nodeImage = element.querySelector('img');
    var authorImageLoadTimeout;

    authorImage.onload = function(evt) {
      clearTimeout(authorImageLoadTimeout);
      nodeImage.src = evt.target.src;
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
})();
