import axios from 'axios';
import {BASE_URL} from '../baseUrl';
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
    console.log(image._parts);
    const token = await loadATokenFromKeychain();
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    };
    const response = await axios.post(`${BASE_URL}/draws/upload`, image, {
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
    const response = await axios.get(`${BASE_URL}/draws/animal-types`);
    const data = response.data;
    console.log('data');
    console.log(data);
    return data;
  } catch (error) {
    console.log('fall');
    console.error(error);
    return error.response;
  }
};

export const uploadFriendImageApi = async addFriendsAnimalReqDto => {
  try {
    const token = await loadATokenFromKeychain();
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    console.log(addFriendsAnimalReqDto);
    const response = await axios.post(
      `${BASE_URL}/draws/friends`,
      addFriendsAnimalReqDto,
      {
        headers,
      },
    );
    console.log(addFriendsAnimalReqDto);
    const data = response.data;
    console.log(data);
    return response;
  } catch (error) {
    console.log('fall');
    console.error(error);
    return error.response;
  }
};

export const googleSearchApi = async value => {
  try {
    const body = {name: value};
    const response = await axios.post(`${BASE_URL}/draws/search/images`, body);
    const data = response.data;
    return data;
  } catch (error) {
    console.log('fall');
    console.error(error);
    return error.response;
  }
};
