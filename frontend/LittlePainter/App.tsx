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
import {LogBox, AppState, useEffect} from 'react-native';
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
  error => {
    if (error.response.status === 401) {
      refreshAccessToken();
    }
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
