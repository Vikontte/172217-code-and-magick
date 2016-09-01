'use strict';

define([
  './load',
  './review',
], function(createCallback, Review) {
  return function() {
    createCallback('//localhost:1506/api/reviews', function(reviews) {
      reviews.forEach(function(review) {
        return new Review(review);
      });
    });
  };
});
