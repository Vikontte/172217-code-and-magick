'use strict';

var REVIEWS_LOAD_URL = '/api/reviews';
var PAGE_SIZE = 3;
var reviewsContainer = document.querySelector('.reviews-list');
var reviewsControlsMore = document.querySelector('.reviews-controls-more');
var filtersContainer = document.querySelector('.reviews-filter');
var activeFilter = 'reviews-all';
var pageNumber = 0;

define([
  './load',
  './review',
], function(load, Review) {
  return function() {
    window.loadReviews = function(filter, currentPageNumber) {
      load(REVIEWS_LOAD_URL, {
        from: currentPageNumber * PAGE_SIZE,
        to: currentPageNumber * PAGE_SIZE + PAGE_SIZE,
        filter: filter
      }, function(reviews) {
        reviews.forEach(function(review) {
          return new Review(review);
        });
      });
    };
    window.loadReviews(activeFilter, pageNumber);
  };
});

reviewsControlsMore.classList.remove('invisible');

var changeFilter = function(filterID) {
  reviewsContainer.innerHTML = '';
  activeFilter = filterID;
  pageNumber = 0;
  window.loadReviews(filterID, pageNumber);
};

reviewsControlsMore.addEventListener('click', function() {
  pageNumber++;
  window.loadReviews(activeFilter, pageNumber);
});

filtersContainer.addEventListener('change', function(evt) {
  changeFilter(evt.target.id);
});
