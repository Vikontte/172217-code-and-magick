'use strict';

var formContainer = document.querySelector('.overlay-container');
var formElement = formContainer.querySelector('.review-form');
var formCloseButton = document.querySelector('.review-form-close');
var textLabel = formContainer.querySelector('.review-fields-text');
var formSubmitButton = formContainer.querySelector('.review-submit');
var browserCookies = require('browser-cookies');


define(function() {
  return function() {
    var form = {
      onClose: null,

      /**
       * @param {Function} cb
       */
      open: function(cb) {
        formContainer.classList.remove('invisible');
        this.pasteCookies();
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
      },
      countExpiringTime: function() {
        var now = new Date();
        var currentYear = now.getFullYear();
        var GraceBirthDay = new Date(currentYear, 11, 9);
        if (now - GraceBirthDay < 0) {
          GraceBirthDay = new Date(currentYear - 1, 11, 9);
        }
        return (now - GraceBirthDay) / (1000 * 60 * 60 * 24);
      },
      saveCookies: function() {
        var cookieName = formElement['review-name'].value;
        var cookieMark = formElement['review-mark'].value;
        var cookieTime = form.countExpiringTime();
        browserCookies.set('review-mark', cookieMark, {
          expires: cookieTime
        });
        browserCookies.set('review-name', cookieName, {
          expires: cookieTime
        });
      },
      pasteCookies: function() {
        formElement['review-name'].value = browserCookies.get('review-name');
        formElement['review-mark'].value = browserCookies.get('review-mark');
      }
    };

    formElement['review-name'].oninput = form.check;
    formElement['review-text'].oninput = form.check;
    Array.prototype.forEach.call(formElement['review-mark'], function(input) {
      input.onclick = form.check;
    });
    formElement.onsubmit = form.saveCookies;

    formCloseButton.onclick = function(evt) {
      evt.preventDefault();
      form.close();
    };

    return form;
  };
});
