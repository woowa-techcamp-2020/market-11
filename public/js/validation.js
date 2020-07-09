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
