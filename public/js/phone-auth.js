const phoneInput = document.getElementById('phone');
const verifyBtn = document.querySelector('.verify-btn');
const authContainer = document.getElementById('auth-container');
const authInput = document.getElementById('auth');
const authBtn = authContainer.lastChild;

let timeout = 120;

const resetTimeout = () => {
  timeout = 120;
};

let timeCount = () => {
  setInterval(() => {
    timeout--;
    const min = parseInt(timeout / 60);
    const sec = timeout % 60;
    let timeString = `0${min}:${sec > 10 ? sec : `0${sec}`}`;
    displayTime(timeString);
    if (timeout === 0) {
      timeover();
    }
  }, 1000);
};
const isValidPhoneNumber = (e) => {
  let input = e.target.value;
  phoneInput.value = input.replace(/([^0-9])/g, '');
  if (phoneInput.value.length > 11) {
    phoneInput.value = phoneInput.value.substr(0, 11);
  }
  if (phoneInput.value) {
    verifyBtn.classList.remove('disable');
    verifyBtn.classList.add('enable');
    verifyBtn.removeAttribute('disabled');
  } else {
    verifyBtn.classList.remove('enable');
    verifyBtn.classList.add('disable');
    verifyBtn.setAttribute('disabled', '');
  }
};

const checkPhoneLength = () => {
  if (phoneInput.value.length < 10) {
    return false;
  }
  return true;
};

const authPhone = () => {
  if (!checkPhoneLength()) {
    return;
  }
  const verifyNum = sendNumber();
  popUpNotice();
  changeButton();
  insertAuthContainer(verifyNum);
  createTimer();
  resetTimeout();
  timeCount();
};

const zeroPad = (num, places) => String(num).padStart(places, '0');

const sendNumber = () => {
  let randomNumber = parseInt(Math.random() * 1000000);
  const verifyNum = zeroPad(randomNumber, 6);
  alert(`인증 번호는 ${verifyNum} 입니다.`);
  return verifyNum;
};

const popUpNotice = () => {
  let modal = createModal();
  let layer = insertLayer(modal);
  layer.setAttribute('class', 'notice');
  insertNotice(layer);

  modal.style.display = 'block';
  modal.addEventListener('click', removeModal);
};

const insertNotice = (layer) => {
  let noticeContent = document.createElement('div');
  noticeContent.setAttribute('class', 'notice-content');
  layer.appendChild(noticeContent);

  let noticeTitle = document.createElement('strong');
  noticeTitle.innerText = '인증번호를 발송했습니다.';
  noticeContent.appendChild(noticeTitle);

  let br = document.createElement('br');
  noticeContent.appendChild(br);

  let desc = document.createTextNode('휴대폰 SMS 발송된 인증번호를 확인해 주세요.');
  noticeContent.appendChild(desc);

  let noticeBtn = document.createElement('button');
  noticeBtn.setAttribute('class', 'notice-btn');
  noticeBtn.innerText = '확인';
  layer.appendChild(noticeBtn);
};

const changeButton = () => {
  verifyBtn.textContent = '재전송';
};

const resetButton = () => {
  verifyBtn.textContent = '인증받기';
};

const completeButton = () => {
  verifyBtn.textContent = '인증완료';
};

const insertAuthContainer = (number) => {
  authContainer.style.display = 'flex';
  authContainer.value = number;
};

const authNumberCheck = () => {
  if (authContainer.value === authInput.value) {
    authContainer.style.display = 'none';

    phoneInput.setAttribute('readonly', '');
    phoneInput.classList.remove('enable');
    phoneInput.classList.add('completed');

    authInput.setAttribute('disabled', '');
    verifyBtn.setAttribute('disabled', '');
    verifyBtn.classList.remove('enable');
    verifyBtn.classList.add('completed');
    completeButton();
  } else {
    alert('인증 실패');
  }
};

const createTimer = () => {
  const prevTimer = document.querySelector('.timer');
  if (prevTimer) {
    prevTimer.remove();
  }

  const timer = document.createElement('span');
  timer.classList.add('timer');
  authContainer.appendChild(timer);
};

const displayTime = (time) => {
  const timer = document.querySelector('.timer');
  timer.innerText = time;
};

const timeover = () => {
  authContainer.style.display = 'none';
  const timer = document.querySelector('.timer');
  timer.remove();
  resetButton();
};

phoneInput.addEventListener('input', isValidPhoneNumber);
verifyBtn.addEventListener('click', authPhone);
authBtn.addEventListener('click', authNumberCheck);
