const inputId = document.getElementById('id');
const inputPassword = document.getElementById('password');
const inputPasswordCheck = document.getElementById('password-check');
const inputEmailId = document.getElementById('email-id');
const inputEmailSite = document.getElementById('email-site');
const inputName = document.getElementById('name');
const inputPhone = document.getElementById('phone');
const inputAgreement = document.getElementById('essential-terms');

const errorId = document.getElementById('error-id');
const errorPassword = document.getElementById('error-password');
const errorPasswordCheck = document.getElementById('error-password-check');
const errorEmail = document.getElementById('error-email');
const errorName = document.getElementById('error-name');
const errorPhone = document.getElementById('error-phone');

const inputValidateInputList = [
  [inputId, validateInputId],
  [inputPassword, validateInputPassword],
  [inputPasswordCheck, validateInputPasswordCheck],
  [inputEmailId, validateInputEmailId],
  [inputEmailSite, validateInputEmailSite],
  [inputName, validateInputName],
  [inputPhone, validateInputPhone],
];

inputId.addEventListener('blur', function (event) {
  const id = event.target.value;
  validateInputId(id);
});

async function validateInputId(id) {
  const message = await validateId(id);
  handleErrorMessage(errorId, message);
  handleBorderColor(inputId, message);
  if (message === '') {
    errorId.innerText = '입력하신 아이디로 사용이 가능합니다.';
    errorId.className = errorId.className.replace(/\bhidden\b/g, ''); // Cross-Browser 고려한 remove class name
    errorId.classList.add('valid-id');
  } else {
    errorId.className = errorId.className.replace(/\bvalid-id\b/g, ''); // Cross-Browser 고려한 remove class name
  }
}

inputPassword.addEventListener('blur', function (event) {
  const password = event.target.value;
  validateInputPassword(password);
});

function validateInputPassword(password) {
  const message = validatePassword(password);
  handleErrorMessage(errorPassword, message);
  handleBorderColor(inputPassword, message);
}

inputPasswordCheck.addEventListener('blur', function (event) {
  const passwordCheck = event.target.value;
  validateInputPasswordCheck(passwordCheck);
});

function validateInputPasswordCheck(passwordCheck) {
  const password = inputPassword.value;
  const message = validatePasswordCheck(password, passwordCheck);
  handleErrorMessage(errorPasswordCheck, message);
  handleBorderColor(inputPasswordCheck, message);
}

inputEmailId.addEventListener('blur', function (event) {
  const emailId = event.target.value;
  validateInputEmailId(emailId);
});

function validateInputEmailId(emailId) {
  const message = validateEmailId(emailId);
  handleErrorMessage(errorEmail, message);
  handleBorderColor(inputEmailId, message);
}

inputEmailSite.addEventListener('blur', function (event) {
  const emailSite = event.target.value;
  validateInputEmailSite(emailSite);
});

function validateInputEmailSite(emailSite) {
  const message = validateEmailSite(emailSite);
  handleErrorMessage(errorEmail, message);
  handleBorderColor(inputEmailSite, message);
}

inputName.addEventListener('blur', function (event) {
  const name = event.target.value;
  validateInputName(name);
});

function validateInputName(name) {
  const message = validateName(name);
  handleErrorMessage(errorName, message);
  handleBorderColor(inputName, message);
}

inputPhone.addEventListener('blur', function (event) {
  const phone = event.target.value;
  validateInputPhone(phone);
});

function validateInputPhone(phone) {
  const message = validatePhone(phone);
  handleErrorMessage(errorPhone, message);
  handleBorderColor(inputPhone, message);
}

/**
 * 에러 메세지가 있을 경우 에러 영역에 메세지 추가하고 hidden 속성 제거
 * 에러 메세지가 없을 경우 hidden 속성 추가하여 에러메세지 가림
 * @param {DOM} errorLabel
 * @param {string} id
 */
function handleErrorMessage(errorLabel, message) {
  if (message !== '') {
    errorLabel.innerText = message;
    errorLabel.className = errorLabel.className.replace(/\bhidden\b/g, ''); // Cross-Browser 고려한 remove class name
  } else {
    errorLabel.classList.add('hidden');
  }
}

/**
 * 에러 메세지가 있을 경우 인풋 테두리를 빨간색으로 설정
 * @param {DOM} inputDom
 * @param {string} message
 */
function handleBorderColor(inputDom, message) {
  if (message !== '') {
    inputDom.classList.add('error-input');
  } else {
    inputDom.className = inputDom.className.replace(/\berror-input\b/g, ''); // Cross-Browser 고려한 remove class name
  }
}

/**
 * @param {string} id
 * @returns {string} 유효한 ID면 빈 문자열, 아닌 경우 에러 문자열 반환
 */
async function validateId(id) {
  if (id.length === 0) {
    return '아이디를 입력해주세요.';
  }
  let message = await isIdDuplicated(id).then(function (idDuplication) {
    if (idDuplication) {
      return '이미 사용중인 아이디 입니다. 다른 아이디를 입력해 주세요.';
    }
    const regExp = /^[a-zA-Z0-9_-]{4,20}$/;
    if (regExp.test(id)) {
      return '';
    } else {
      return '아이디는 영문과 숫자로 4자~20자 사이로 입력해 주세요.';
    }
  });
  return message;
}

/**
 * 아이디 중복 체크
 * @param {string} id
 * @return {boolean} 중복된 아이디가 있으면 true, 없으면 false 반환
 */
async function isIdDuplicated(id) {
  const body = { userId: id };
  let response = await fetch('./id-duplication', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  let result = await response.json();
  return result.idDuplication;
}

/**
 * @param {string} password
 * @returns {string} 유효한 비밀번호면 빈 문자열, 아닌 경우 에러 문자열 반환
 */
function validatePassword(password) {
  if (password.length === 0) {
    return '비밀번호를 입력해 주세요.';
  }
  const regExp = /^(?=.*\d)(?=.*[a-zA-Z]).{8,20}$/;
  if (regExp.test(password)) {
    return '';
  } else {
    return '비밀번호는 영문과 숫자를 포함하여 8~20자로 입력해 주세요.';
  }
}

/**
 * @param {string} passwordCheck
 * @returns {string} 비밀번호와 일치하면 빈 문자열 아닌 경우 에러 문자열 반환
 */
function validatePasswordCheck(password, passwordCheck) {
  if (passwordCheck.length === 0) {
    return '비밀번호 확인을 위해 한번 더 입력해 주세요.';
  }
  if (password === passwordCheck) {
    return '';
  } else {
    return '위 비밀번호와 일치하지 않습니다. 다시 입력해 주세요.';
  }
}

/**
 * @param {string} emailId
 * @returns {strig} 유효한 이메일 아이디면 빈 문자열, 아닌 경우 에러 문자열 반환
 */
function validateEmailId(emailId) {
  if (emailId.length === 0) {
    return '이메일 주소를 입력해 주세요.';
  }
  const regExp = /^[a-zA-Z0-9_-]+$/;
  if (regExp.test(emailId)) {
    return '';
  } else {
    return '이메일 주소를 확인해 주세요.';
  }
}

/**
 * @param {string} emailSite
 * @returns {strig} 유효한 이메일 사이트면 빈 문자열, 아닌 경우 에러 문자열 반환
 */
function validateEmailSite(emailSite) {
  if (emailSite.length === 0) {
    return '이메일 주소를 입력해 주세요.';
  }
  const regExp = /[a-zA-Z0-9_-]+\.[a-zA-Z0-9_-]+/;
  if (regExp.test(emailSite)) {
    return '';
  } else {
    return '이메일 주소를 확인해 주세요.';
  }
}

/**
 * @param {string} name
 * @returns {strig} 사용자 이름이 유효하면 빈 문자열, 아닌 경우 에러 문자열 반환
 */
function validateName(name) {
  if (name.length === 0) {
    return '이름을 입력해 주세요.';
  }
  if (name.length === 1) {
    return '2자 이상으로 입력해 주세요.';
  }
  const regExp = /^[가-힣a-zA-Z]+$/;
  if (regExp.test(name)) {
    return '';
  } else {
    return '이름에 특수문자, 숫자는 입력하실 수 없습니다. 다시 입력해 주세요.';
  }
}

/**
 * @param {string} phone
 * @returns {strig} 전화번호가 유효하면 빈 문자열, 아닌 경우 에러 문자열 반환
 */
function validatePhone(phone) {
  if (phone.length === 0) {
    return '휴대폰 번호를 입력해 주세요.';
  }
  const regExp = /^01[0-9]{8,9}$/;
  if (regExp.test(phone)) {
    return '';
  } else {
    return '휴대폰 번호를 확인해 주세요.';
  }
}

/**
 * @returns {boolean}
 * 회원 가입 폼 submit 하기 전에 입력 양식을 체크하고
 * 입력 값이 유효하면 true 반환.
 * 입력 값이 유효하지 않은 경우 false 반환.
 * false를 반환받으면 form submit이 동작하지 않음.
 */
function handleFormSubmit() {
  inputValidateInputList.forEach((inputValidateInput) => {
    const inputDOM = inputValidateInput[0];
    const validateInput = inputValidateInput[1];
    const inputText = inputDOM.value;
    validateInput(inputText);
  });
  const errorInputs = document.getElementsByClassName('error-input');
  console.log(inputAgreement.checked);
  if (errorInputs.length > 0) {
    errorInputs[0].focus();
    return false;
  } else if (verifyBtn.textContent !== '인증완료') {
    alert('핸드폰 인증을 완료해주세요.');
    return false;
  } else if (!inputAgreement.checked) {
    alert('약관 필수항목에 동의해주세요.');
    return false;
  } else {
    return true;
  }
}
