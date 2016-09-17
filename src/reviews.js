'use strict';

define([
  './load',
  './review',
], function(load, Review) {
  return function() {
    var REVIEWS_LOAD_URL = '/api/reviews';
    var PAGE_SIZE = 3;
    var reviewsContainer = document.querySelector('.reviews-list');
    var reviewsControlsMore = document.querySelector('.reviews-controls-more');
    var filtersContainer = document.querySelector('.reviews-filter');
    var filtersItem = document.getElementsByName('reviews');
    var activeFilter = localStorage.getItem('lastFilter') || 'all reviews';
    var pageNumber = 0;

    var loadReviews = function(filter, currentPageNumber) {
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

    reviewsControlsMore.classList.remove('invisible');
    loadReviews(activeFilter, pageNumber);
    Array.prototype.forEach.call(filtersItem, function(item) {
      if (item.id === activeFilter) {
        item.setAttribute('checked', 'checked');
      }
    });

    var changeFilter = function(filterID) {
      reviewsContainer.innerHTML = '';
      activeFilter = filterID;
      localStorage.setItem('lastFilter', filterID);
      pageNumber = 0;
      loadReviews(filterID, pageNumber);
    };

    reviewsControlsMore.addEventListener('click', function() {
      pageNumber++;
      loadReviews(activeFilter, pageNumber);
    });

    filtersContainer.addEventListener('change', function(evt) {
      changeFilter(evt.target.id);
    });
  };
});
