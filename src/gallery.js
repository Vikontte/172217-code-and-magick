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

      this.onControlLeftClick = this.onControlLeftClick.bind(this);
      this.onControlRightClick = this.onControlRightClick.bind(this);
      this.onCloseElementClick = this.onCloseElementClick.bind(this);
    };

    Gallery.prototype.show = function(number) {
      this.activePicture = number;
      this.controlRight.addEventListener('click', this.onControlRightClick);
      this.controlLeft.addEventListener('click', this.onControlLeftClick);
      this.closeElement.addEventListener('click', this.onCloseElementClick);

      this.galleryContainer.classList.remove('invisible');
      this.setActivePicture();
    };

    Gallery.prototype.onControlLeftClick = function() {
      this.activePicture--;
      if (this.activePicture < 0) {
        this.activePicture = 0;
      }
      this.setActivePicture();
    };

    Gallery.prototype.onControlRightClick = function() {
      this.activePicture++;
      if (this.activePicture > 5) {
        this.activePicture = 5;
      }
      this.setActivePicture();
    };

    Gallery.prototype.hide = function() {
      this.controlRight.removeEventListener('click', this.onControlRightClick);
      this.controlLeft.removeEventListener('click', this.onControlLeftClick);
      this.closeElement.removeEventListener('click', this.onCloseElementClick);

      this.galleryContainer.classList.add('invisible');
      this.imageContainer.removeChild(this.galleryImage);
    };

    Gallery.prototype.setActivePicture = function() {
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

    Gallery.prototype.onCloseElementClick = function() {
      this.hide();
    };

    return Gallery;
  };
});
