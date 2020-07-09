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

let modal = document.getElementById('modal');
let elementLayer = document.getElementById('layer');
let closeBtn = document.getElementById('close-layer-btn');

function closeModal(e) {
  modal.style.display = 'none';
}

function execDaumPostcode() {
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

      modal.style.display = 'none';
    },
    width: '100%',
    height: '100%',
    maxSuggestItems: 5,
  }).embed(elementLayer);

  elementLayer.style.display = 'block';

  initLayerPosition();
}

function initLayerPosition() {
  let width = 300;
  let height = 400;
  let borderWidth = 5;

  elementLayer.style.width = width + 'px';
  elementLayer.style.height = height + 'px';
  elementLayer.style.border = borderWidth + 'px solid';

  elementLayer.style.left =
    ((window.innerWidth || document.documentElement.clientWidth) - width) / 2 - borderWidth + 'px';
  elementLayer.style.top =
    ((window.innerHeight || document.documentElement.clientHeight) - height) / 2 -
    borderWidth +
    'px';
}

const openModal = (e) => {
  if (e.target.className.includes('enable')) {
    modal.style.display = 'block';
    execDaumPostcode();
  }
};

optionInfo.addEventListener('click', openModal);
closeBtn.addEventListener('click', closeModal);
modal.addEventListener('click', closeModal);
