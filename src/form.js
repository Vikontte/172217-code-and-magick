'use strict';

window.form = (function() {
  var formContainer = document.querySelector('.overlay-container');
  var formCloseButton = document.querySelector('.review-form-close');

  var userName = document.querySelector('#review-name');
  var userNameMarker = document.querySelector('.review-fields-name');
  var reviewText = document.querySelector('#review-text');
  var reviewTextMarker = document.querySelector('.review-fields-text');
  var reviewFormControl = document.querySelector('.review-form-control');
  var reviewMark = document.getElementsByName('review-mark');

// хочу вытащить значение value у radio checked и по нему задать условие
// в итоге условие работает только после того как отправил запрос и вернулся обратно на страницу
  for (var i = 0; i < reviewMark.length; i++) {
    if ((reviewMark[i].checked) && (reviewMark[i].value < 3)) {
      reviewText.setAttribute('required', 'required');
      reviewTextMarker.classList.remove('invisible');
      reviewText.oninput = function() {
        reviewTextMarker.classList.add('invisible');
        reviewFormControl.removeAttribute('disabled', 'disabled');
      };
    } else if ((reviewMark[i].checked) && (reviewMark[i].value > 2)) {
      reviewText.removeAttribute('required', 'required');
      reviewTextMarker.classList.add('invisible');
      reviewFormControl.removeAttribute('disabled', 'disabled');
    }
  }
// в сафари на маке не работает
  reviewText.oninvalid = function() {
    reviewFormControl.setAttribute('disabled', 'disabled');
    reviewTextMarker.classList.remove('invisible');
  };
// в сафари на маке не работает
  userName.oninvalid = function() {
    reviewFormControl.setAttribute('disabled', 'disabled');
    userNameMarker.classList.remove('invisible');
  };
// в сафари на маке не работает
  userName.setAttribute('required', 'required');
  userName.oninput = function() {
    reviewFormControl.removeAttribute('disabled', 'disabled');
    userNameMarker.classList.add('invisible');
  };

  var form = {
    onClose: null,

    /**
     * @param {Function} cb
     */
    open: function(cb) {
      formContainer.classList.remove('invisible');
      cb();
    },

    close: function() {
      formContainer.classList.add('invisible');

      if (typeof this.onClose === 'function') {
        this.onClose();
      }
    }
  };


  formCloseButton.onclick = function(evt) {
    evt.preventDefault();
    form.close();
  };

  return form;
})();
