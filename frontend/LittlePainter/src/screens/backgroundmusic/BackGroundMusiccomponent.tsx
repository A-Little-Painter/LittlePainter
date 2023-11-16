// BackgroundMusic.js
import {useEffect, useRef} from 'react';
import {useAppSelector} from '../../redux/hooks';
var Sound = require('react-native-sound');
Sound.setCategory('Playback');

const BackgroundMusic = () => {
  const volume = useAppSelector(state => state.music.isVolume);
  const music = useAppSelector(state => state.music.isMusic);
  const isLoop = useAppSelector(state => state.music.isLoop);
  console.log(music);

  useEffect(() => {
    console.log('바뀌었나', isLoop);
  }, [isLoop]);
  // useRef를 사용하여 whoosh를 참조
  const whooshRef = useRef(null);

  useEffect(() => {
    // whoosh를 초기화
    if (whooshRef.current) {
      // 이미 로드된 음악이 있다면 중지하고 해제
      whooshRef.current.stop(() => {
        whooshRef.current.release();
      });
    }

    // whoosh를 초기화하여 새로운 음악 파일을 로드
    whooshRef.current = new Sound(music, null, (error: any) => {
      if (error) {
        console.log('failed to load the sound', error);
        return;
      }
      // loaded successfully
      console.log(
        'duration in seconds: ' +
          whooshRef.current.getDuration() +
          'number of channels: ' +
          whooshRef.current.getNumberOfChannels(),
      );

      // 무한 루프 설정
      whooshRef.current.setNumberOfLoops(isLoop);

      whooshRef.current.setVolume(volume);

      // 0.01초 후에 새로운 음악을 재생
      setTimeout(() => {
        whooshRef.current.play((success: any) => {
          if (success) {
            console.log('successfully finished playing');
          } else {
            console.log('playback failed due to audio decoding errors');
          }
        });
      }, 100);
    });
  }, [music]);

  useEffect(() => {
    // 볼륨 설정
    if (whooshRef.current) {
      whooshRef.current.setVolume(volume);
    }
  }, [volume]);

  // 반환 함수를 사용하여 컴포넌트가 언마운트될 때 정리
  useEffect(() => {
    return () => {
      if (whooshRef.current) {
        whooshRef.current.stop(() => {
          whooshRef.current.release();
        });
      }
    };
  }, []);

  return null;
};

export default BackgroundMusic;
