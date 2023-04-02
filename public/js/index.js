/* eslint-disable */
import { updateSetting } from './updateSetting';
import { bookTour } from './stripe';
import {login,logout} from './login'
import { displayMap } from './mapbox';
import { signup } from './signup';

const bookBtn = document.getElementById('book-tour');
const userDataForm = document.querySelector('.form-user-data');
const userPasswordForm = document.querySelector('.form-user-password');
const loginForm = document.querySelector('.formlog');
const logoutbtn = document.querySelector('.nav__el--logout');
const mapbox = document.getElementById('map');
const signinForm = document.querySelector('.formsign');


if (mapbox) {
  const locations = JSON.parse(mapbox.dataset.locations);
  displayMap(locations)
}

if (signinForm) {
  signinForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const name = document.getElementById('name').value;
    const passwordConfirm = document.getElementById('passwordconfirm').value;
    signup(email, password, name, passwordConfirm);
  })
}

if (loginForm) {
  loginForm.addEventListener('submit', async (e) => { 
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    login(email,password)
  })
}

if (userDataForm) {
  userDataForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append('email', document.getElementById('email').value);
    form.append('name', document.getElementById('name').value);
    form.append('photo', document.getElementById('photo').files[0]);

    seter.src = updateSetting(form, 'data');
  });
}

if (userPasswordForm) {
  userPasswordForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    document.querySelector('.btn--save-password').textContent = 'Updating...';

    const passwordConfirm = document.getElementById('password-confirm').value;
    const passwordCurrent = document.getElementById('password-current').value;
    const password = document.getElementById('password').value;

    await updateSetting(
      { passwordCurrent, password, passwordConfirm },
      'password'
    );
  });

  document.querySelector('.btn--save-password').textContent = 'Save Password';
  document.getElementById('password-current').value = '';
  document.getElementById('password-confirm').value = '';
  document.getElementById('password').value = '';
}

if (bookBtn) {
  bookBtn.addEventListener('click', (e) => {
    e.target.textContent = 'Processing....';
    const { tourId } = e.target.dataset;
    bookTour(tourId);
  });
}

if(logoutbtn) logoutbtn.addEventListener('click',logout)