'use strict';

define([
  './form',
], function(form) {
  window.form = form();
});
define([
  './game',
], function(game) {
  window.Game = game();
});
define([
  './reviews',
], function(reviews) {
  window.onload = reviews();
});
define([
  './gallery',
], function(gallery) {
  window.Gallery = gallery();
});


(function() {
  var nodePhotogallery = document.querySelector('.photogallery');
  var srcScreenshots = [];
  nodePhotogallery.querySelectorAll('img').forEach(function(img, i) {
    srcScreenshots[i] = img.src;
  });
  srcScreenshots.shift();

  var gallery = new window.Gallery(srcScreenshots);
  nodePhotogallery.querySelectorAll('.photogallery-image').forEach(function(link, i) {
    link.onclick = function() {
      gallery.show(i);
    };
  });

  var game = new window.Game(document.querySelector('.demo'));
  game.initializeLevelAndStart();
  game.setGameStatus(window.Game.Verdict.INTRO);

  var formOpenButton = document.querySelector('.reviews-controls-new');

  /** @param {MouseEvent} evt */
  formOpenButton.onclick = function(evt) {
    evt.preventDefault();

    window.form.open(function() {
      game.setGameStatus(window.Game.Verdict.PAUSE);
      game.setDeactivated(true);
    });
  };

  window.form.onClose = function() {
    game.setDeactivated(false);
  };
})();
