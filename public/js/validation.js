const inputId = document.getElementById('id');
const inputPassword = document.getElementById('password');
const inputPasswordCheck = document.getElementById('password-check');
const inputEmailId = document.getElementById('email-id');
const inputEmailSite = document.getElementById('email-site');
const inputName = document.getElementById('name');
const inputPhone = document.getElementById('phone');

const errorId = document.getElementById('error-id');
const errorPassword = document.getElementById('error-password');
const errorPasswordCheck = document.getElementById('error-password-check');
const errorEmail = document.getElementById('error-email');
const errorName = document.getElementById('error-name');
const errorPhone = document.getElementById('error-phone');

inputId.addEventListener('blur', function(event){
    const id = event.target.value;
    const message = validateId(id);
    handleErrorMessage(errorId, message);
});
inputPassword.addEventListener('blur', function(event){
    const password = event.target.value;
    const message = validatePassword(password);
    handleErrorMessage(errorPassword, message);
});
inputPasswordCheck.addEventListener('blur', function(event){
    const password = inputPassword.value;
    const passwordCheck = event.target.value;
    const message = validatePasswordCheck(password, passwordCheck);
    handleErrorMessage(errorPasswordCheck, message);
});
inputEmailId.addEventListener('blur', function(event){
    const emailId = event.target.value;
    const message = validateEmailId(emailId);
    handleErrorMessage(errorEmail, message);
});
inputEmailSite.addEventListener('blur', function(event){
    const emailSite = event.target.value;
    const message = validateEmailSite(emailSite);
    handleErrorMessage(errorEmail, message);
});
inputName.addEventListener('blur', function(event){
    const name = event.target.value;
    const message = validateName(name);
    handleErrorMessage(errorName, message);
});
/**
 * 에러 메세지가 있을 경우 에러 영역에 메세지 추가하고 hidden 속성 제거
 * 에러 메세지가 없을 경우 hidden 속성 추가하여 에러메세지 가림
 * @param {DOM} errorLabel
 * @param {string} id 
 */
function handleErrorMessage(errorLabel, message){
    if(message !== ''){
        errorLabel.innerText = message;
        errorLabel.className = errorLabel.className.replace(/\bhidden\b/g, ''); // Cross-Browser 고려한 remove class name
    }else{
        errorLabel.classList.add('hidden');
    }
}

/**
 * @param {string} id 
 * @returns {string} 유효한 ID면 빈 문자열, 아닌 경우 에러 문자열 반환
 */
function validateId(id){
    if(id.length === 0){
        return '아이디를 입력해주세요.';
    }
    const regExp = /^[a-zA-Z0-9_-]{4,20}$/;
    if(regExp.test(id)){
        return '';
    }else{
        return '아이디는 영문과 숫자로 4자~20자 사이로 입력해 주세요.';
    }
}

/**
 * @param {string} password 
 * @returns {string} 유효한 비밀번호면 빈 문자열, 아닌 경우 에러 문자열 반환
 */
function validatePassword(password){
    if(password.length === 0){
        return '비밀번호를 입력해 주세요.';
    }
    const regExp = /^(?=.*\d)(?=.*[a-zA-Z]).{8,20}$/;
    if(regExp.test(password)){
        return '';
    }else{
        return '비밀번호는 영문과 숫자를 포함하여 8~20자로 입력해 주세요.';
    }
}

/**
 * @param {string} passwordCheck
 * @returns {string} 비밀번호와 일치하면 빈 문자열 아닌 경우 에러 문자열 반환
 */
function validatePasswordCheck(password, passwordCheck){
    if(passwordCheck.length === 0){
        return '비밀번호 확인을 위해 한번 더 입력해 주세요.';
    }
    if(password === passwordCheck){
        return '';
    }else{
        return '위 비밀번호와 일치하지 않습니다. 다시 입력해 주세요.';
    }
}

/**
 * @param {string} emailId
 * @returns {strig} 유효한 이메일 아이디면 빈 문자열, 아닌 경우 에러 문자열 반환
 */
function validateEmailId(emailId){
    if(emailId.length === 0){
        return '이메일 주소를 입력해 주세요.';
    }
    const regExp = /^[a-zA-Z0-9_-]+$/;
    if(regExp.test(emailId)){
        return '';
    }else{
        return '이메일 주소를 확인해 주세요.';
    }
}

/**
 * @param {string} emailSite
 * @returns {strig} 유효한 이메일 사이트면 빈 문자열, 아닌 경우 에러 문자열 반환
 */
function validateEmailSite(emailSite){
    if(emailSite.length === 0){
        return '이메일 주소를 입력해 주세요.';
    }
    const regExp = /[a-zA-Z0-9_-]+.[a-zA-Z0-9_-]+/;
    if(regExp.test(emailSite)){
        return '';
    }else{
        return '이메일 주소를 확인해 주세요.';
    }
}


/**
 * @param {string} name
 * @returns {strig} 사용자 이름이 유효하면 빈 문자열, 아닌 경우 에러 문자열 반환
 */
function validateName(name){
    if(name.length === 0){
        return '이름을 입력해 주세요.';
    }
    if(name.length === 1){
        return '2자 이상으로 입력해 주세요.';
    }
    const regExp = /^[가-힣a-zA-Z]+$/;
    if(regExp.test(name)){
        return '';
    }else{
        return '이름에 특수문자, 숫자는 입력하실 수 없습니다. 다시 입력해 주세요.';
    }
}
