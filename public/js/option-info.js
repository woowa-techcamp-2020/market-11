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
      el.value = '';
      el.classList.remove('enable');
      el.classList.add('disable');
      el.setAttribute('disabled', '');
    });
  }
};

optionInfoCheck.addEventListener('click', toggleAddress);
