import React, {useEffect} from 'react';
import {
  Dimensions,
  StyleSheet,
  View,
  ImageBackground,
  Image,
  Text,
  // TouchableOpacity,
} from 'react-native';
import {RootStackParams} from '../../navigations/AppNavigator';
import type {StackScreenProps} from '@react-navigation/stack';
// import {useAppSelector, useAppDispatch} from '../../redux/hooks';
// import {
//   increment,
//   decrement,
//   incrementByAmount,
//   decrementPracticeValue,
// } from '../../redux/slices/user/user';

type InitialScreenProps = StackScreenProps<RootStackParams, 'InitialScreen'>;

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function InitialScreen({navigation}: InitialScreenProps) {
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
    }, 2000);

    return () => clearTimeout(timeout);
  }, [navigation]);

  return (
    <View style={styles.mainContainer}>
      {/* <ImageBackground
        source={require('../../assets/bgImage/initialBg.png')}
        resizeMode="cover"
        style={styles.backgroundImage}> */}
      <View style={styles.backgroundImage}>
        {/* 상단 */}
        <View />
        {/* 중단 */}
        <View style={styles.middleContainer}>
          <View
            style={{
              width: '100%',
              height: '100%',
              backgroundColor: 'black',
              justifyContent: 'center',
              // alignItems: 'center',
            }}>
            <Text
              style={{
                textAlign: 'center',
                fontWeight: '700',
                fontSize: 24,
                color: 'white',
              }}>
              해당 앱은 인터넷 연결이 필수입니다.
            </Text>
          </View>
          {/* <Image
            resizeMode="contain"
            style={styles.logoRabbitImage}
            source={require('../../assets/logo/littlePainterRabbit.png')}
          />
          <Image
            resizeMode="contain"
            style={styles.logoTextImage}
            source={require('../../assets/logo/littlePainterTextLogo.png')}
          /> */}
        </View>
        {/* 하단 */}
        <View />
      </View>
      {/* </ImageBackground> */}
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
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    // alignSelf: 'center',
  },
  logoRabbitImage: {
    justifyContent: 'center',
    alignSelf: 'center',
    margin: windowWidth * 0.01,
    width: windowWidth * 0.2,
    height: windowHeight * 0.455,
  },
  logoTextImage: {
    justifyContent: 'center',
    alignSelf: 'center',
    margin: windowWidth * 0.01,
    width: windowWidth * 0.42,
    height: windowHeight * 0.18,
  },
});
