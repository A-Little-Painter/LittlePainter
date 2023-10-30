import axios from 'axios';
import {BASE_URL} from '../baseUrl';

export const signUp = async data => {
  console.log(data);
  try {
    const response = await axios.post(`${BASE_URL}/auth/signup`, data);
    console.log('success');
    return response;
  } catch (error) {
    console.log('fail');
    console.log(error);
    const response = error.response;
    return response;
  }
};

export const confirmCodeSend = async data => {
  console.log(data);
  try {
    const response = await axios.post(`${BASE_URL}/auth/signup-email`, data);
    console.log('success');
    return response;
  } catch (error) {
    console.log('fail');
    const response = error.response;
    return response;
  }
};

export const emailDuplication = async (data, setDuplication) => {
  console.log(data);
  try {
    const response = await axios.get(`${BASE_URL}/auth/email/${data}`);
    console.log('success');
    setDuplication(false);
    return response;
  } catch (error) {
    console.log('fail');
    console.log(error);
    const response = error.response;
    setDuplication(true);
    return response;
  }
};

export const authCode = async (data, setCodeConfirm) => {
  console.log(data);
  try {
    const response = await axios.post(`${BASE_URL}/auth/auth-code`, data);
    console.log('success');
    setCodeConfirm(true);
    return response;
  } catch (error) {
    console.log('fail');
    const response = error.response;
    setCodeConfirm(false);
    return response;
  }
};
