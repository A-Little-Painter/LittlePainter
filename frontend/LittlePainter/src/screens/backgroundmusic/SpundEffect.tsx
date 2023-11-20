import {useEffect, useRef} from 'react';
import {useAppSelector, useAppDispatch} from '../../redux/hooks';
import Sound from 'react-native-sound';
import {handleSoundEffect} from '../../redux/slices/music/music';

Sound.setCategory('Playback');

const BackgroundMusic = () => {
  const effect = useAppSelector(state => state.music.isEffect);
  const dispatch = useAppDispatch();

  const whooshRef = useRef<Sound | null>(null);

  // 상수로 정의된 preload 경로
  const PRELOAD_EFFECT =
    'https://d36iq79hai056s.cloudfront.net/sound/bgm/ButtonSounds.mp3';

  // 초기화 시에 음원을 로딩하는 함수
  const initSound = async () => {
    try {
      // 이미 로딩된 사운드가 있는 경우 release
      if (whooshRef.current) {
        whooshRef.current.release();
      }

      // 사운드 미리 로딩
      whooshRef.current = new Sound(PRELOAD_EFFECT, null, (error: any) => {
        if (error) {
          console.log('사운드를 로딩하는 데 실패했습니다', error);
        } else {
          console.log('사운드 로딩 완료');
        }
      });
    } catch (error) {
      console.error('사운드 초기화 중 오류:', error);
    }
  };

  useEffect(() => {
    // 컴포넌트 마운트 시 음원 초기화
    initSound();

    // 언마운트 시 리소스 해제
    return () => {
      if (whooshRef.current) {
        whooshRef.current.stop(() => {
          whooshRef.current!.release();
        });
      }
    };
  }, []);

  useEffect(() => {
    // effect가 변경될 때마다 사운드 재생
    if (effect !== '') {
      console.log('이벤트에 따라 사운드 재생');
      if (whooshRef.current) {
        whooshRef.current.play((success: boolean) => {
          if (success) {
            console.log('사운드 재생 완료');
          } else {
            console.log('사운드 재생 실패: 오디오 디코딩 오류');
          }
        });
        dispatch(handleSoundEffect(''));
      }
    }
  }, [effect]);

  return null;
};

export default BackgroundMusic;
