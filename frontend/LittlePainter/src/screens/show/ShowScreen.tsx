import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  ImageBackground,
  Animated,
  Easing,
  Image,
  TouchableOpacity,
} from 'react-native';
import {callShowListApi} from '../../apis/show/showApi';
import {RootStackParams} from '../../navigations/AppNavigator';
import type {StackScreenProps} from '@react-navigation/stack';
import {useAppDispatch} from '../../redux/hooks';
import {handleBGMMusic} from '../../redux/slices/music/music';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

type AnimatedValue = Animated.ValueXY;
type ShowScreenProps = StackScreenProps<RootStackParams, 'ShowScreen'>;

export default function ShowScreen({navigation}: ShowScreenProps) {
  const [animatedValues, setAnimatedValues] = useState<AnimatedValue[]>([]);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [moving, setMoving] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(
      handleBGMMusic(
        'https://littlepainter.s3.ap-northeast-2.amazonaws.com/sound/bgm/BG_playground.mp3',
      ),
    );
    console.log('1');
    // 이미지 목록을 가져오는 비동기 함수
    const fetchImageUrls = async () => {
      try {
        // 이미지 URL 목록을 가져옴 (예: API 요청 또는 로컬 데이터베이스 조회)
        const response = await callShowListApi();

        // 랜덤으로 10개의 이미지 선택
        const randomImageUrls = response
          .sort(() => Math.random() - 0.5) // 이미지 배열을 랜덤으로 섞음
          .slice(0, 20); // 배열의 처음 10개의 요소 선택

        // 이미지 URL 목록을 설정
        setImageUrls(randomImageUrls);
      } catch (error) {
        console.error('Error fetching image URLs: ', error);
      }
    };

    fetchImageUrls();
  }, []);

  useEffect(() => {
    console.log('2');
    // 이미지 개수에 따라 Animated.ValueXY 생성
    const values: AnimatedValue[] = imageUrls.map(() => {
      return new Animated.ValueXY({
        x: Math.random() * windowWidth,
        y: Math.random() * windowHeight,
      });
    });
    setAnimatedValues(values);
    setMoving(!moving);
  }, [imageUrls]);

  // startAnimation 함수 수정
  const startAnimation = () => {
    const customToValueArray = imageUrls.map(() => {
      return {
        x: Math.random() * windowWidth,
        y: Math.random() * windowHeight,
      };
    });

    // 각 애니메이션의 시작 간격을 늘리고 지속 시간을 줄임
    Animated.stagger(
      100,
      animatedValues.map((animatedValue, index) =>
        Animated.timing(animatedValue, {
          toValue: customToValueArray[index],
          duration: 3000,
          easing: Easing.linear,
          useNativeDriver: false,
        }),
      ),
    ).start();
  };

  // 페이지 랜더링 시 애니메이션 자동 실행
  useEffect(() => {
    console.log('3');

    startAnimation();

    // 애니메이션 끝나면 다시 실행
    const interval = setInterval(() => {
      startAnimation();
    }, 4000);

    return () => {
      clearInterval(interval); // 컴포넌트 언마운트 시 인터벌 제거
    };
  }, [moving]);

  return (
    <View style={styles.mainContainer}>
      {/* 배경 이미지 */}
      <ImageBackground
        source={require('../../assets/bgImage/showBg.png')}
        resizeMode="cover"
        style={styles.backgroundImage}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('MainScreen');
          }}
          style={styles.goHomeArea}>
          <Image
            source={require('../../assets/images/YVector.png')}
            style={styles.goHome}
          />
        </TouchableOpacity>
        <View style={styles.subContainer}>
          <View style={styles.middleContainer}>
            {animatedValues.map((animatedValue, index) => (
              // 각 이미지에 애니메이션 적용
              <Animated.View
                key={index}
                style={[
                  styles.image,
                  {
                    // translateX 및 translateY를 사용하여 위치 변경
                    transform: [
                      {translateX: animatedValue.x},
                      {translateY: animatedValue.y},
                    ],
                  },
                ]}>
                {imageUrls[index] ? (
                  <Image
                    style={{width: 300, height: 300}}
                    source={{uri: imageUrls[index]}}
                  />
                ) : null}
              </Animated.View>
            ))}
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  subContainer: {
    alignSelf: 'center',
    flex: 1,
    width: '100%',
  },
  middleContainer: {
    flex: 1,
    width: '100%',
  },
  image: {
    width: 100,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
  },
  goHomeArea: {
    marginLeft: windowWidth * 0.9,
    marginTop: windowWidth * 0.03,
  },
  goHome: {
    height: windowWidth * 0.05,
    width: windowWidth * 0.05,
  },
});
