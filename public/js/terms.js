const allTerms = document.getElementById('all-terms');
const essentialTerms = document.getElementById('essential-terms');
const optionTerms = document.getElementById('option-terms');

const checkAll = (e) => {
  essentialTerms.checked = e.target.checked;
  optionTerms.checked = e.target.checked;
};

const updateCheckBox = () => {
  allTerms.checked = essentialTerms.checked && optionTerms.checked;
};

allTerms.addEventListener('click', checkAll);
essentialTerms.addEventListener('click', updateCheckBox);
optionTerms.addEventListener('click', updateCheckBox);
