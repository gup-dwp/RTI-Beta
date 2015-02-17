(function() {

  var ninoValidation = function (ninoInput) {
    // http://stackoverflow.com/questions/10204378/regular-expression-to-validate-uk-national-insurance-number
    // ^\s*([a-zA-Z]){2}\s*([0-9]){1}\s*([0-9]){1}\s*([0-9]){1}\s*([0-9]){1}\s*([0-9]){1}\s*([0-9]){1}\s*([a-zA-Z]){1}?$
    // phil - '^(?!BG|GB|NK|KN|TN|NT|ZZ)[ABCEGHJ-PRSTW-Z][ABCEGHJ-NPRSTW-Z]\d{6}[A-D]$'
    var ninoRegex   = new RegExp('(^\s*([a-zA-Z]){2}\s*([0-9]){1}\s*([0-9]){1}\s*([0-9]){1}\s*([0-9]){1}\s*([0-9]){1}\s*([0-9]){1}\s*([a-zA-Z]){1}?$)', 'g'),
        ninoEntered = ninoInput.value,
        ninoSubmit  = document.querySelector('#submit-nino');

        if (ninoEntered.match(ninoRegex)) {
          errorMsg('remove',ninoInput);
          ninoSubmit.disabled = false;
        }
        else if (! ninoInput.classList.contains('error')){
          errorMsg('add',ninoInput,'You have entered an incorrect National Insurance Number');
          ninoSubmit.disabled = true;
        }
  };

  var errorMsg = function (action,input,msgText) {
    var msgBox  = document.createElement('div'),
        msgText = document.createTextNode(msgText);

    if (action === 'add') {
      input.classList.add('error');
      msgBox.classList.add('error-msg');
      msgBox.appendChild(msgText);
      input.parentNode.appendChild(msgBox);
    }
    else if (input.classList.contains('error')){
      input.classList.remove('error');
      input.parentNode.removeChild(document.querySelector('.error-msg'));
    }
  }

  var bindEvents = function () {
    var ninoForm  = document.querySelector('#form-nino'),
        ninoInput = document.querySelector('#input-nino'),
        logout    = document.querySelector('#logout');

    ninoInput.addEventListener('blur', function (e) {
      ninoValidation(this);
    })

    //ninoForm.addEventListener('submit', function (e) {

    //});

    logout.addEventListener('click', function (e) {
      if (confirm("I'm sure I want to logout of the View Income System?") == true) {
        return true;
      } else {
        ninoInput.focus();
        errorMsg('remove',ninoInput)
        e.preventDefault();
      }
    });
  };

  return {
      bindEvents : bindEvents()
  };

})();
