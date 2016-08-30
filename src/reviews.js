'use strict';

define([
  './load',
  './review',
], function(createCallback, getReviewElement) {
  return function() {
    createCallback('//localhost:1506/api/reviews', function(reviews) {
      reviews.forEach(function(review) {
        getReviewElement(review);
      });
    });
  };
});
