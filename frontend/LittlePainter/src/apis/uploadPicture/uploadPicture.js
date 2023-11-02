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

export const uploadPictureApi = async addFriendsAnimalReqDto => {
  try {
    const token = await loadATokenFromKeychain();
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const response = await axios.get(
      `${BASE_URL}/draws/friends`,
      addFriendsAnimalReqDto,
      {headers},
    );
    const data = response.data;
    console.log(data);
    return data;
  } catch (error) {
    console.log('fall');
    console.log(error);
    const response = error.response;
    return response;
  }
};
