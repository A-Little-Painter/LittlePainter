import axios from 'axios';
import * as Keychain from 'react-native-keychain';

export const BASE_URL = 'https://k9d106.p.ssafy.io:9001/api/v1';
export const DRAW_URL = 'http://k9d106.p.ssafy.io:8300/api/v1';

const loadATokenFromKeychain = async () => {
  try {
    const credentials = await Keychain.getGenericPassword({
      service: 'accessTokens',
    });
    if (credentials) {
      const token = credentials.password;
      console.log(token);
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
      service: 'refreshTokens',
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

export const refreshAccessToken = async () => {
  try {
    console.log('log');
    const refreshToken = loadRTokenFromKeychain();
    const response = await axios(`${BASE_URL}/temp`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    });

    if (response.status === 200) {
      const data = await response.json();
      const accessToken = data.newAccessToken; // 새로운 엑세스 토큰 갱신
      Keychain.setGenericPassword('accessToken', accessToken, {
        service: 'accessTokens',
      });
      loadATokenFromKeychain();
    } else {
      console.error('토큰 갱신 실패');
    }
  } catch (error) {
    console.error('토큰 갱신 요청 중 에러 발생', error);
  }
};
