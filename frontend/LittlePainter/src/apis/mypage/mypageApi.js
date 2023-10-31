import axios from 'axios';
import {BASE_URL} from '../baseUrl';
import {Alert} from 'react-native';
import * as Keychain from 'react-native-keychain';

const loadATokenFromKeychain = async () => {
  try {
    const credentials = await Keychain.getGenericPassword({
      service: 'accessTokens',
    });
    if (credentials) {
      const token = credentials.password;
      return token;
    } else {
      console.error('저장된 토큰이 없습니다.');
      return null;
    }
  } catch (error) {
    console.error('토큰 불러오기에 실패했습니다.', error);
    return null;
  }
};

const loadRTokenFromKeychain = async () => {
  try {
    const credentials = await Keychain.getGenericPassword({
      service: 'refreshTofens',
    });
    console.log(credentials);
    if (credentials) {
      const token = credentials.password;
      return token;
    } else {
      console.error('저장된 토큰이 없습니다.');
      return null;
    }
  } catch (error) {
    console.error('토큰 불러오기에 실패했습니다.', error);
    return null;
  }
};

export const callUserData = async () => {
  try {
    const token = await loadATokenFromKeychain();
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const response = await axios.get(`${BASE_URL}/user/child`, {headers});
    console.log('log');
    return response.data;
  } catch (error) {
    console.log('fall');
    console.log(error);
    const response = error.response;
    return response;
  }
};

export const addUserChild = async data => {
  console.log(data);
  try {
    const token = await loadATokenFromKeychain();
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    console.log(headers);
    const response = await axios.post(`${BASE_URL}/user/child`, data, {
      headers,
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log('fall');
    console.error(error);
    const response = error.response;
    return response;
  }
};
