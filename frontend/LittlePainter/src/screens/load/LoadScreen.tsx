import React, {useEffect, useState, useMemo} from 'react';
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

type LoadScreenProp = StackScreenProps<RootStackParams, 'LoadScreen'>;

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function LoadScreen({navigation}: LoadScreenProp) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const fadeInAnimation = useMemo(() => new Animated.Value(0), []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      navigation.reset({
        index: 0,
        routes: [
          {
            name: 'MainScreen',
            params: {},
          },
        ],
      });
    }, 3000);

    return () => clearTimeout(timeout);
  }, [navigation]);

  const dataList = [
    require('../../assets/profile/bear.png'),
    require('../../assets/profile/cat.png'),
    require('../../assets/profile/deer.png'),
    require('../../assets/profile/dinosaur.png'),
    require('../../assets/profile/dog.png'),
    require('../../assets/profile/frog.png'),
    require('../../assets/profile/giraffe.png'),
    require('../../assets/profile/monkey.png'),
    require('../../assets/profile/panda.png'),
    require('../../assets/profile/penguin.png'),
    require('../../assets/profile/rabbit.png'),
    require('../../assets/profile/tiger.png'),
    require('../../assets/profile/whale.png'),
  ];

  useEffect(() => {
    const randomImageIndex = Math.floor(Math.random() * dataList.length); //랜덤 인덱스
    const imageChangeInterval = setInterval(() => {
      const nextImageIndex = randomImageIndex % dataList.length; // 이미지 선택

      // 페이드 아웃 애니메이션 적용
      Animated.timing(fadeInAnimation, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }).start(() => {
        setCurrentImageIndex(nextImageIndex);

        // 페이드 인 애니메이션 적용
        Animated.timing(fadeInAnimation, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }).start();
      });
    }, 3000);

    return () => clearInterval(imageChangeInterval);
  }, [currentImageIndex, dataList.length, fadeInAnimation]);

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
            <Animated.Image
              source={dataList[currentImageIndex]}
              style={[
                styles.loadImage,
                {
                  opacity: fadeInAnimation,
                },
              ]}
            />
            <Text style={styles.loadtext}>잠시만 기다려 주세요.</Text>
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
  },
});
