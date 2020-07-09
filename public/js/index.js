const allTerms = document.getElementById('all-terms');
const essentialTerms = document.getElementById('essential-terms');
const optionTerms = document.getElementById('option-terms');

const checkAll = (e) => {
  essentialTerms.checked = e.target.checked;
  optionTerms.checked = e.target.checked;
};

const updateCheckBox = () => {
  if (essentialTerms.checked && optionTerms.checked) {
    allTerms.checked = true;
  } else {
    allTerms.checked = false;
  }
};

allTerms.addEventListener('click', checkAll);
essentialTerms.addEventListener('click', updateCheckBox);
optionTerms.addEventListener('click', updateCheckBox);

const optionInfo = document.getElementById('option-info');
const optionInfoCheck = document.getElementById('option-info-check');

const toggleAddress = (e) => {
  let status = e.target.checked ? 'disable' : 'enable';
  let optionElements = optionInfo.getElementsByClassName(status);

  if (e.target.checked) {
    Array.from(optionElements).forEach((el) => {
      el.classList.remove('disable');
      el.classList.add('enable');
      el.removeAttribute('disabled');
    });
  } else {
    Array.from(optionElements).forEach((el) => {
      el.classList.remove('enable');
      el.classList.add('disable');
      el.setAttribute('disabled', '');
    });
  }
};

optionInfoCheck.addEventListener('click', toggleAddress);

const findAddressBtn = document.getElementById('find-address');

const createModal = () => {
  let modal = document.createElement('div');
  modal.setAttribute('id', 'modal');
  document.body.appendChild(modal);
  modal.addEventListener('click', removeModal);

  return modal;
};

const insertLayer = (el) => {
  let elementLayer = document.createElement('div');
  elementLayer.setAttribute('id', 'layer');
  el.appendChild(elementLayer);

  return elementLayer;
};

const insertCloseBtn = (el) => {
  let closeBtn = document.createElement('img');
  closeBtn.setAttribute('id', 'close-layer-btn');
  closeBtn.setAttribute('src', '//t1.daumcdn.net/postcode/resource/images/close.png');
  closeBtn.setAttribute('alt', '닫기 버튼');
  closeBtn.addEventListener('click', removeModal);

  return closeBtn;
};

function removeModal(e) {
  if (e.target.tagName === 'STRONG') return;
  if (e.target.className === 'notice-content') return;
  document.getElementById('modal').remove();
}

function execDaumPostcode(modal, layer) {
  new daum.Postcode({
    oncomplete: function (data) {
      let addr = '';
      let extraAddr = '';

      if (data.userSelectedType === 'R') {
        addr = data.roadAddress;
      } else {
        addr = data.jibunAddress;
      }

      document.getElementById('zipcode').value = data.zonecode;
      document.getElementById('address').value = addr;
      document.getElementById('address-detail').focus();

      modal.remove();
    },
    width: '100%',
    height: '100%',
    maxSuggestItems: 5,
  }).embed(layer);

  layer.style.display = 'block';

  initLayerPosition(layer);
}

function initLayerPosition(layer) {
  let width = 300;
  let height = 400;
  let borderWidth = 5;

  layer.style.width = width + 'px';
  layer.style.height = height + 'px';
  layer.style.border = borderWidth + 'px solid';

  layer.style.left =
    ((window.innerWidth || document.documentElement.clientWidth) - width) / 2 - borderWidth + 'px';
  layer.style.top =
    ((window.innerHeight || document.documentElement.clientHeight) - height) / 2 -
    borderWidth +
    'px';
}

const openAddressModal = (e) => {
  if (e.target.className.includes('enable')) {
    let modal = createModal();
    let layer = insertLayer(modal);
    insertCloseBtn(layer);
    modal.style.display = 'block';
    execDaumPostcode(modal, layer);
  }
};

optionInfo.addEventListener('click', openAddressModal);

const phoneInput = document.getElementById('phone');
const verifyBtn = phoneInput.nextSibling;
const authContainer = document.getElementById('auth-container');
const authInput = document.getElementById('auth');
const authBtn = authInput.nextSibling;

const isValidPhoneNumber = (e) => {
  let input = e.target.value;
  phoneInput.value = input.replace(/[^0-9]/g, '');
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

const authPhone = () => {
  const verifyNum = sendNumber();
  popUpNotice();
  changeButton();
  insertAuthContainer(verifyNum);
};

const sendNumber = () => {
  const zeroPad = (num, places) => String(num).padStart(places, '0');
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

const insertAuthContainer = (number) => {
  authContainer.style.display = 'flex';
  authContainer.value = number;
};

const authNumberCheck = () => {
  if (authContainer.value === authInput.value) {
    alert('인증 성공');
  } else {
    alert('인증 실패');
  }
};

phoneInput.addEventListener('input', isValidPhoneNumber);
verifyBtn.addEventListener('click', authPhone);
authBtn.addEventListener('click', authNumberCheck);

const emailSelect = document.getElementById('email-site-select');
const emailSite = document.getElementById('email-site');

const inputEmail = (e) => {
  if (e.target.value === 'etc') {
    emailSite.removeAttribute('disabled');
    emailSite.setAttribute('placeholder', '이메일 뒷자리*');
  } else if (e.target.value === 'noSelected') {
    emailSite.setAttribute('disabled', '');
  } else {
    emailSite.value = '';
    emailSite.setAttribute('disabled', '');
    emailSite.setAttribute('placeholder', e.target.value);
  }
};

emailSelect.addEventListener('change', inputEmail);
