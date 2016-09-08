'use strict';

module.exports = function(list, filterID) {
  switch(filterID) {
    case 'reviews-all':
      return list;
    case 'reviews-recent':
      return list.sort(function(a, b) {
        return b.created - a.created;
      });
    case 'reviews-good':
      var reviewsGood = list.filter(function(review) {
        return review.rating >= 3;
      });
      return reviewsGood.sort(function(a, b) {
        return b.rating - a.rating;
      });
    case 'reviews-bad':
      var reviewsBad = list.filter(function(review) {
        return review.rating < 3;
      });
      return reviewsBad.sort(function(a, b) {
        return a.rating - b.rating;
      });
    case 'reviews-popular':
      return list.sort(function(a, b) {
        return b.review_usefulness - a.review_usefulness;
      });
  }
  return list;
};
