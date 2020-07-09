const optionInfo = document.getElementById('option-info');
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

const removeModal = (e) => {
  if (e.target.tagName === 'STRONG') return;
  if (e.target.className === 'notice-content') return;
  document.getElementById('modal').remove();
};

const execDaumPostcode = (modal, layer) => {
  new daum.Postcode({
    oncomplete: (data) => {
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
};

const initLayerPosition = (layer) => {
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
};

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
