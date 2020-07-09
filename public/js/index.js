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
