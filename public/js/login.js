/* eslint-disable */
import '@babel/polyfill'
import axios from 'axios';
import { showAlert } from './alerts';

const loginForm = document.querySelector('.formlog');
const logoutbtn = document.querySelector('.nav__el--logout')


export const login = async (email,password)=>{
  try {
    const res = await axios({
      method: 'POST',
      url: 'http://127.0.0.1:8000/api/v1/users/login',
      data: {
        email,
        password,
      },
    });

    if (res.data.status === 'success') {
      showAlert('success', 'Logged in succussfuly');
      window.setTimeout(() => {
        location.assign('/');
      }, 1500);
    }
  } catch (err) {
    showAlert('error', 'Error logging out! Try again');
  }
};

/* A function that is called when the logout button is clicked. */
export const logout = async () => {
  try {
    const res = await axios({
      method: 'GET',
      url: 'http://127.0.0.1:8000/api/v1/users/logout',
    });
    if ((res.data.status = 'success')) {
      location.reload(true);
    }
  } catch (err) {
    showAlert('error', 'Error logging out! Try again');
  }
};