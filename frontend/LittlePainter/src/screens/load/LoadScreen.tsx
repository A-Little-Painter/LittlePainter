import React, {useEffect, useState, useMemo, useRef} from 'react';
import {
  Dimensions,
  StyleSheet,
  View,
  ImageBackground,
  Text,
  Animated,
} from 'react-native';
import {RootStackParams} from '../../navigations/AppNavigator';
import type {StackScreenProps} from '@react-navigation/stack';
import {useAppSelector} from '../../redux/hooks';
import LottieView from 'lottie-react-native';

type LoadScreenProp = StackScreenProps<RootStackParams, 'LoadScreen'>;

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function LoadScreen({navigation}: LoadScreenProp) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const fadeInAnimation = useMemo(() => new Animated.Value(0), []);
  const isLogin = useAppSelector(state => state.user.isLogin);
  const selectName = useAppSelector(state => state.user.selectName);

  const animationRef = useRef<LottieView>(null);

  const dataList = [
    require('../../assets/lottie/Loading_cat.json'),
    require('../../assets/lottie/Loading_dog.json'),
  ];

  const [randomLottie, setRandomLottie] = useState(dataList[0]);
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * dataList.length);
    setRandomLottie(dataList[randomIndex]);
  }, []);
  return (
    <View style={styles.mainContainer}>
      <ImageBackground
        source={require('../../assets/bgImage/mainBg.png')}
        resizeMode="cover"
        style={styles.backgroundImage}>
        {/* 상단 */}
        <View />
        {/* 중단 */}
        <View style={styles.middleContainer}>
          <View style={styles.load}>
            <View style={styles.overlay}>
              <LottieView
                style={styles.animationView}
                source={randomLottie}
                autoPlay
                loop={true}
              />
            </View>
            {isLogin ? (
              <Text style={styles.loadtext}>
                {selectName}, 잠시만 기다려줘!
              </Text>
            ) : (
              <Text style={styles.loadtext}>잠시만 기다려 주세요.</Text>
            )}
          </View>
        </View>
        {/* 하단 */}
        <View />
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  middleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  load: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '50%',
    marginBottom: '5%',
  },
  loadImage: {
    height: windowWidth * 0.1,
    width: windowWidth * 0.1,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  loadtext: {
    color: '#000000A0',
    fontSize: windowHeight * 0.05,
    fontFamily: 'BMHANNA_11yrs_ttf',
    marginTop: windowHeight * 0.01,
  },
  animationView: {
    height: windowHeight * 0.5,
    width: windowWidth * 0.5,
  },
  overlay: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
