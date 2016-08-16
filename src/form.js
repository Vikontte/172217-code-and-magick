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
      formSubmitButton.setAttribute('disabled', 'disabled');
      textLabel.classList.add('invisible');
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

      if (mark < 3 && !text.length) {
        textLabel.classList.remove('invisible');
        if (!name.length) {
          nameLabel.classList.remove('invisible');
        } else {
          nameLabel.classList.add('invisible');
        }
        return false;
      }
      if (!name.length) {
        nameLabel.classList.remove('invisible');
        textLabel.classList.add('invisible');
        return false;
      }
      nameLabel.classList.add('invisible');
      textLabel.classList.add('invisible');
      return true;
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
