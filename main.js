//update length of the slider//
const lengthSlider = document.querySelector('.pass-length input');
options = document.querySelectorAll('.option input');
copyIcon = document.querySelector('.input-box span');
passwordInput = document.querySelector('.input-box input');
passIndicator = document.querySelector('.pass-indicator');
generateBtn = document.querySelector('.generate-btn');
//character objects//
const characters = {
  lowercase: 'abcdefghijklmnopqrstuvwxyz',
  uppercase: 'ABCDEFGHIJKLMNOPQURSTUVWXYZ',
  numbers: '0123456789',
  symbols: '^!$&|[](){}:;.,*+-#@<>~',
};

const generatePassword = () => {
  let staticPassword = '';
  randomPassword = '';
  excludeDuplicate = false;
  passLength = lengthSlider.value;

  //loop through each option's checkbox//

  options.forEach((option) => {
    //if checkebox is checked//
    if (option.checked) {
      if (option.id !== 'exc-duplicate' && option.id !== 'spaces') {
        //adding key values from character objects to staticPassword//
        staticPassword += characters[option.id];
        //if checkbox ID is 'spaces'//
      } else if (option.id === 'spaces') {
        //add spaces at start and finish of 'staticPassword'
        staticPassword += `$(staticPassword)`;
      } else {
        //pass the value to the excludeDuplicate//
        excludeDuplicate = true;
      }
    }
  });

  //randomly arrange chracters according to the slider length//
  for (number = 0; number < passLength; number++) {
    let randomChar =
      staticPassword[Math.floor(Math.random() * staticPassword.length)];
    //if excludeDuplicate is ticked//
    if (excludeDuplicate) {
      //randomPass doesnt contain current RandomChar or randomChar is == a space, add randomChar to randomPass
      //else decrease by 1//
      !randomPassword.includes(randomChar) || randomChar == ''
        ? (randomPassword += randomChar)
        : number--;
      //else add randomChar to randomPass//
    } else {
      randomPassword += randomChar;
    }
  }
  //passing randomPassword into passwordInput//
  passwordInput.value = randomPassword;
};

const updatePassIndicator = () => {
  passIndicator.id =
    lengthSlider.value <= 8
      ? 'weak'
      : lengthSlider.value <= 16
      ? 'medium'
      : 'strong';
};

const upadteSlider = () => {
  //displaying current value as text//
  document.querySelector('.pass-length span').innerText = lengthSlider.value;
  generatePassword();
  updatePassIndicator();
};
upadteSlider();

const copyPassword = () => {
  //writeText() passes the text to the system clipboard//
  navigator.clipboard.writeText(passwordInput.value);
  //once clipboard is clicked, change text to a tick symbol//
  copyIcon.innerText = 'check';
  //after 1500ms, change text back to copy symbol//
  setTimeout(() => {
    copyIcon.innerText = 'copy_all';
  }, 1200);
};

copyIcon.addEventListener('click', copyPassword);
lengthSlider.addEventListener('input', upadteSlider);
generateBtn.addEventListener('click', generatePassword);
