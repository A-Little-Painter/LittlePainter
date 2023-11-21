import {Provider} from 'react-redux';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';
import store from './src/redux/store';
import axios from 'axios';
import {refreshAccessToken} from './src/apis/baseUrl';
import AppNavigator from './src/navigations/AppNavigator';
import {setCustomText} from 'react-native-global-props';
import {TextEncoder, TextDecoder} from 'text-encoding';
import Tts from 'react-native-tts';
import {LogBox} from 'react-native';
import BackGroundMusic from './src/screens/backgroundmusic/BackGroundMusiccomponent';
import SoundEffect from './src/screens/backgroundmusic/SpundEffect';
LogBox.ignoreLogs(['new NativeEventEmitter']); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

Tts.setDefaultLanguage('ko-KR');
Tts.setDefaultRate(0.5);
Tts.setDefaultVoice('ko-KR-SMTf00');
Tts.speak('꼬마화가');

// Axios 인터셉터 설정
axios.interceptors.response.use(
  response => response,
  async error => {
    if (error.response.status === 401) {
      console.log('Token refresh needed. Refreshing access token...');
      try {
        await refreshAccessToken();
        console.log('Token refreshed. Retrying the original request...');
        // 토큰이 성공적으로 리프레시되었다면, 원래의 요청을 다시 시도
        const originalRequest = error.config;
        return axios(originalRequest);
      } catch (refreshError) {
        console.error(
          'Token refresh failed. Redirect to login page.',
          refreshError,
        );
        // 토큰 리프레시에 실패한 경우, 로그인 페이지로 리다이렉트 또는 다른 에러 처리
        return Promise.reject(refreshError);
      }
    }
    console.log('Error:', error);
    return Promise.reject(error);
  },
);

var Sound = require('react-native-sound');
Sound.setCategory('Playback');

function App(): JSX.Element {
  // 스플래쉬스크린 추가를 위한 코드
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 1000); //스플래시 활성화 시간
  });

  const customTextProps = {
    style: {
      fontFamily: 'TmoneyRoundWindRegular',
    },
  };
  setCustomText(customTextProps);

  return (
    <Provider store={store}>
      <NavigationContainer>
        <BackGroundMusic />
        <SoundEffect />
        <AppNavigator />
      </NavigationContainer>
    </Provider>
  );
}

export default App;
