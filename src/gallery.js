'use strict';

define(function() {
  return function() {
    var Gallery = function(pictures) {
      this.galleryContainer = document.querySelector('.overlay-gallery');
      this.closeElement = this.galleryContainer.querySelector('.overlay-gallery-close');
      this.numberCurrent = this.galleryContainer.querySelector('.preview-number-current');
      this.numberTotal = this.galleryContainer.querySelector('.preview-number-total');
      this.controlLeft = this.galleryContainer.querySelector('.overlay-gallery-control-left');
      this.controlRight = this.galleryContainer.querySelector('.overlay-gallery-control-right');
      this.imageContainer = this.galleryContainer.querySelector('.overlay-gallery-preview');

      this.pictures = pictures;
      this.activePicture = 0;
    };

    // Методы
    Gallery.prototype.show = function(number) {
      var self = this;
      this.controlRight.onclick = function() {
        number++;
        if (number > 5) {
          number = 5;
        }
        self.onControlClick(number);
      };
      this.controlLeft.onclick = function() {
        number--;
        if (number < 0) {
          number = 0;
        }
        self.onControlClick(number);
      };
      this.closeElement.onclick = function() {
        self.onCloseElementClick();
      };
      this.galleryContainer.classList.remove('invisible');
      this.setActivePicture(number);
    };

    Gallery.prototype.hide = function() {
      this.closeElement.onclick = null;
      this.controlRight.onclick = null;
      this.controlLeft.onclick = null;

      this.galleryContainer.classList.add('invisible');
      this.imageContainer.removeChild(this.galleryImage);
    };

    Gallery.prototype.setActivePicture = function(number) {
      this.activePicture = number;
      this.galleryImage = new Image();
      this.galleryImage.src = this.pictures[this.activePicture];
      var previousImage = this.imageContainer.querySelector('img');
      if (!previousImage) {
        this.imageContainer.appendChild(this.galleryImage);
      } else {
        this.imageContainer.replaceChild(this.galleryImage, previousImage);
      }
      this.imageContainer.querySelector('.preview-number-current').textContent = this.activePicture + 1;

    };
    // События
    Gallery.prototype.onControlClick = function(number) {
      this.setActivePicture(number);
    };

    Gallery.prototype.onCloseElementClick = function() {
      this.hide();
    };

    return Gallery;
  };
});
