import axios from 'axios';
import {DRAW_URL} from '../baseUrl';
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

export const uploadPictureApi = async image => {
  try {
    const token = await loadATokenFromKeychain();
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    };
    const response = await axios.post(`${DRAW_URL}/draws/upload`, image, {
      headers,
    });
    const data = response.data;
    console.log(data);
    return response;
  } catch (error) {
    console.log('fall');
    console.error(error);
    return error.response;
  }
};

export const animalTypeListApi = async () => {
  try {
    const response = await axios.get(`${DRAW_URL}/draws/animal-types`);
    const data = response.data;
    console.log(data);
    return data;
  } catch (error) {
    console.log('fall');
    console.error(error);
    return error.response;
  }
};
