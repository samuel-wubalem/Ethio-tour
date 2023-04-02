/* eslint-disable*/
import axios from 'axios';
import { showAlert } from './alerts';

const signinForm = document.querySelector('.formsign');

export const signup = async (email,password,name,passwordConfirm) => {
   try {
    const res = await axios({
      method: 'POST',
      url: 'http://127.0.0.1:8000/api/v1/users/signup',
      data: {
        email,
        password,
        name,
        passwordConfirm,
      },
    });
    if (res.data.status === 'success') {
      showAlert('success', 'Signed up succussfuly');
      window.setTimeout(() => {
        location.assign('/');
      }, 1500);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
}

 
