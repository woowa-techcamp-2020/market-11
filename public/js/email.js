const emailSelect = document.getElementById('email-site-select');
const emailSite = document.getElementById('email-site');

const updateEmailSite = (e) => {
  if (e.target.value === 'etc') {
    enableEmailSite();
  } else if (e.target.value === 'noSelected') {
    keepEmailSite();
  } else {
    setEmailSite(e.target.value);
  }
};

const enableEmailSite = () => {
  emailSite.value = '';
  emailSite.classList.remove('disable');
  emailSite.removeAttribute('disabled');
  emailSite.setAttribute('placeholder', '이메일 뒷자리*');
};

const keepEmailSite = () => {
  emailSite.setAttribute('disabled', '');
};

const setEmailSite = (site) => {
  emailSite.value = site;
  emailSite.classList.add('disable');
  emailSite.setAttribute('disabled', '');
  emailSite.setAttribute('placeholder', emailSite);
};

emailSelect.addEventListener('change', updateEmailSite);
