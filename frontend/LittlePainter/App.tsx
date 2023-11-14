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
LogBox.ignoreLogs(['new NativeEventEmitter']); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications.

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
  useEffect(() => {
    var whoosh = new Sound(
      'https://littlepainter.s3.ap-northeast-2.amazonaws.com/sound/bgm/BG_main.mp3',
      null,
      (error: any) => {
        if (error) {
          console.log('failed to load the sound', error);
          return;
        }
        // loaded successfully
        console.log(
          'duration in seconds: ' +
            whoosh.getDuration() +
            'number of channels: ' +
            whoosh.getNumberOfChannels(),
        );

        // 무한 루프 설정
        whoosh.setNumberOfLoops(-1);

        // 4초 후에 오디오 재생
        setTimeout(() => {
          whoosh.play((success: any) => {
            if (success) {
              console.log('successfully finished playing');
            } else {
              console.log('playback failed due to audio decoding errors');
            }
          });
        }, 4000); // 4초 (4000ms) 지연
      },
    );

    // 반환 함수를 사용하여 컴포넌트가 언마운트될 때 정리
    return () => {
      if (whoosh) {
        whoosh.stop(() => {
          whoosh.release();
        });
      }
    };
  }, []);

  const customTextProps = {
    style: {
      fontFamily: 'TmoneyRoundWindRegular',
    },
  };
  setCustomText(customTextProps);

  return (
    <Provider store={store}>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </Provider>
  );
}

export default App;
