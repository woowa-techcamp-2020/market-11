const inputId = document.getElementById('id');
const inputPassword = document.getElementById('password');
const inputIdSave = document.getElementById('id-save');

/**
 * @returns {boolean}
 * 로그인 submit 하기 전에 입력 양식을 체크하고
 * 입력 값이 유효하면 true 반환.
 * 입력 값이 유효하지 않은 경우 false 반환.
 * false를 반환받으면 form submit이 동작하지 않음.
 */
function handleFormSubmit() {
  const error = document.getElementById('error-id-password');
  let message = validateId(inputId.value);
  handleErrorMessage(error, message);
  if (message !== '') {
    return false;
  }
  message = validatePassword(inputPassword.value);
  handleErrorMessage(error, message);
  if (message !== '') {
    return false;
  }
  if (inputIdSave.checked) {
    document.cookie = 'user_id=' + inputId.value + '; expires=Fri, 31 Dec 2100 23:59:59 GMT';
  } else {
    document.cookie = 'user_id=' + inputId.value + '; max-age=0';
  }
  return true;
}

/**
 * @param {string} id
 * @returns {string} ID를 입력했으면 빈 문자열, 아닌 경우 에러 문자열 반환
 */
function validateId(id) {
  if (id.length === 0) {
    return '아이디를 입력해 주세요.';
  } else {
    return '';
  }
}

/**
 * @param {string} password
 * @returns {string} 비밀번호를 입력했으면 빈 문자열, 아닌 경우 에러 문자열 반환
 */
function validatePassword(password) {
  if (password.length === 0) {
    return '비밀번호를 입력해 주세요.';
  } else {
    return '';
  }
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
    errorLabel.className = errorLabel.className.replace(/\binvisible\b/g, ''); // Cross-Browser 고려한 remove class name
  } else {
    errorLabel.classList.add('invisible');
  }
}

var getCookie = function (name) {
  var value = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
  return value ? value[2] : null;
};

function init() {
  const userId = getCookie('user_id');
  if (userId) {
    inputId.value = userId;
    inputIdSave.checked = true;
  }
}

init();
