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

const openModal = (e) => {
  if (e.target.className.includes('enable')) {
    let modal = createModal();
    let layer = insertLayer(modal);
    insertCloseBtn(layer);
    modal.style.display = 'block';
    execDaumPostcode(modal, layer);
  }
};

optionInfo.addEventListener('click', openModal);
