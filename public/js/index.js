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
