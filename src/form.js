'use strict';

window.form = (function() {
  var formContainer = document.querySelector('.overlay-container');
  var formElement = formContainer.querySelector('.review-form');
  var formCloseButton = document.querySelector('.review-form-close');
  var textLabel = formContainer.querySelector('.review-fields-text');
  var formSubmitButton = formContainer.querySelector('.review-submit');

  var form = {
    onClose: null,

    /**
     * @param {Function} cb
     */
    open: function(cb) {
      formContainer.classList.remove('invisible');
      this.check();
      cb();
    },

    close: function() {
      formContainer.classList.add('invisible');

      if (typeof this.onClose === 'function') {
        this.onClose();
      }
    },
    checkFields: function() {
      var name = formElement['review-name'].value;
      var text = formElement['review-text'].value;
      var mark = +formElement['review-mark'].value;
      var nameLabel = formContainer.querySelector('.review-fields-name');
      nameLabel.classList.add('invisible');
      textLabel.classList.add('invisible');

      var state = true;
      if (mark < 3 && !text.length) {
        textLabel.classList.remove('invisible');
        state = false;
      }
      if (!name.length) {
        nameLabel.classList.remove('invisible');
        state = false;
      }
      return state;
    },
    check: function() {
      var res = form.checkFields();

      if (res) {
        formSubmitButton.removeAttribute('disabled');

      } else {
        formSubmitButton.setAttribute('disabled', 'disabled');
      }
    }
  };

  formElement['review-name'].oninput = form.check;
  formElement['review-text'].oninput = form.check;
  formElement['review-mark'].forEach(function(input) {
    input.onclick = form.check;
  });

  formCloseButton.onclick = function(evt) {
    evt.preventDefault();
    form.close();
  };

  return form;
})();
