(function() {
  'use strict';

  var ninoValidation = function (ninoInput) {
    // http://www.c-sharpcorner.com/uploadfile/aa04e6/collection-of-regular-expression/
    // ^[A-CEGHJ-PR-TW-Z]{1}[A-CEGHJ-NPR-TW-Z]{1}[0-9]{6}[A-DFM]{0,1}$
    // phil g - '^(?!BG|GB|NK|KN|TN|NT|ZZ)[ABCEGHJ-PRSTW-Z][ABCEGHJ-NPRSTW-Z]\d{6}[A-D]$'
    var ninoRegex   = new RegExp('^(?!BG|GB|NK|KN|TN|NT|ZZ)[A-CEGHJ-PR-TW-Z]{1}[A-CEGHJ-NPR-TW-Z]{1}[0-9]{6}[A-D]{0,1}$', 'ig'),
        ninoEntered = ninoInput.value;

        if (! ninoEntered.match(ninoRegex)) {
          errorMsg('add',ninoInput,'Please enter a National Insurance number in the correct format');
          return false;
        } else {
          errorMsg('remove',ninoInput,'');
          return true;
        }
  };

  var errorMsg = function (action,input,msgText) {
    var msgBox   = document.createElement('div'),
        msgText  = document.createTextNode(msgText),
        ninoForm = document.querySelector('#form-nino');

    if (action === 'add') {
      input.classList.add('invalid');
      input.parentNode.classList.add('invalid');

      if (!document.querySelector('.validation-message')) {
        msgBox.classList.add('validation-message');
        msgBox.appendChild(msgText);
        ninoForm.insertBefore(msgBox,ninoForm.lastChild.previousSibling);
      }
    }
    else {
      input.classList.remove('invalid');

      input.parentNode.classList.remove('invalid');
      document.querySelector('#form-nino').removeChild(document.querySelector('.validation-message'));
    }
  }

  var bindEvents = function () {
    var ninoForm  = document.querySelector('#form-nino'),
        ninoInput = document.querySelector('#input-nino'),
        logout    = document.querySelector('#logout');

    ninoForm.addEventListener('submit', function (e) {
      if(ninoValidation(ninoInput) === false) {
        e.preventDefault();
      }
    });

    logout.addEventListener('click', function (e) {
      if (confirm("Are you sure you want to logout of the View Income System") == true) {
        return true;
      } else {
        ninoInput.focus();
        e.preventDefault();
      }
    });

  };

  return {
      bindEvents : bindEvents()
  };

})();
