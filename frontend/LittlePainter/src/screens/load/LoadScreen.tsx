import React, {useEffect} from 'react';
import {
  Dimensions,
  StyleSheet,
  View,
  ImageBackground,
  Image,
  Text,
} from 'react-native';
import {RootStackParams} from '../../navigations/AppNavigator';
import type {StackScreenProps} from '@react-navigation/stack';
import Swiper from 'react-native-swiper';

type LoadScreenProp = StackScreenProps<RootStackParams, 'LoadScreen'>;

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function LoadScreen({navigation}: LoadScreenProp) {
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

  return (
    <View style={styles.mainContainer}>
      <ImageBackground
        source={require('../../assets/bgImage/initialBg.png')}
        resizeMode="cover"
        style={styles.backgroundImage}>
        {/* 상단 */}
        <View />
        {/* 중단 */}
        <View style={styles.middleContainer}>
          <View style={styles.load}>
            {/* 속도를 느리게 할수는 없답니다. */}
            {/* 참조 */}
            {/* https://github.com/leecade/react-native-swiper/issues/364 */}
            {/* https://github.com/leecade/react-native-swiper/issues/1230 */}
            <Swiper
              showsButtons={false}
              autoplay={true}
              autoplayTimeout={3}
              showsPagination={false}
              scrollEnabled={false}
              style={styles.swiper}>
              <View>
                <Image
                  source={require('../../assets/profile/bear.png')}
                  style={styles.loadImage}
                />
              </View>
              <View>
                <Image
                  source={require('../../assets/profile/cat.png')}
                  style={styles.loadImage}
                />
              </View>
              <View>
                <Image
                  source={require('../../assets/profile/deer.png')}
                  style={styles.loadImage}
                />
              </View>
              <View>
                <Image
                  source={require('../../assets/profile/dinosaur.png')}
                  style={styles.loadImage}
                />
              </View>
              <View>
                <Image
                  source={require('../../assets/profile/dog.png')}
                  style={styles.loadImage}
                />
              </View>
              <View>
                <Image
                  source={require('../../assets/profile/frog.png')}
                  style={styles.loadImage}
                />
              </View>
              <View>
                <Image
                  source={require('../../assets/profile/giraffe.png')}
                  style={styles.loadImage}
                />
              </View>
              <View>
                <Image
                  source={require('../../assets/profile/monkey.png')}
                  style={styles.loadImage}
                />
              </View>
              <View>
                <Image
                  source={require('../../assets/profile/panda.png')}
                  style={styles.loadImage}
                />
              </View>
              <View>
                <Image
                  source={require('../../assets/profile/penguin.png')}
                  style={styles.loadImage}
                />
              </View>
              <View>
                <Image
                  source={require('../../assets/profile/rabbit.png')}
                  style={styles.loadImage}
                />
              </View>
              <View>
                <Image
                  source={require('../../assets/profile/tiger.png')}
                  style={styles.loadImage}
                />
              </View>
              <View>
                <Image
                  source={require('../../assets/profile/whale.png')}
                  style={styles.loadImage}
                />
              </View>
            </Swiper>
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
  swiper: {
    height: windowWidth * 0.1,
    // 여기에 width를 주면 고장납니다.
    alignSelf: 'center',
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
