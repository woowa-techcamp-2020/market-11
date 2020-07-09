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
