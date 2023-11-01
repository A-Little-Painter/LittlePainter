import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  // Alert,
  Text,
  TouchableOpacity,
  Dimensions,
  Image,
  ImageBackground,
  BackHandler,
  ToastAndroid,
} from 'react-native';
import {RootStackParams} from '../../navigations/AppNavigator';
import type {StackScreenProps} from '@react-navigation/stack';
import {useAppSelector} from '../../redux/hooks';
// import {useAppSelector, useAppDispatch} from '../../redux/hooks';
import IconOcticons from 'react-native-vector-icons/Octicons';
import IconSimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import IconFontAwesome5 from 'react-native-vector-icons/FontAwesome5';

type MainScreenProps = StackScreenProps<RootStackParams, 'MainScreen'>;
type ismuted = boolean;
const windowWidth = Dimensions.get('window').width;
// const windowHeight = Dimensions.get('window').height;

export default function MainScreen({navigation}: MainScreenProps) {
  const [ismuted, setIsmuted] = useState<ismuted>(false);
  const [backHandleNum, setBackHandleNum] = useState<number>(0);
  const isLogin = useAppSelector(state => state.user.isLogin);
  let loginTF: string;

  if (!isLogin) {
    loginTF = '로그인';
  } else {
    loginTF = '뽀송이';
  }

  useEffect(() => {
    const backAction = () => {
      if (navigation.isFocused()) {
        // Check if the MainScreen is focused
        if (backHandleNum === 0) {
          setBackHandleNum(1);
          ToastAndroid.show(
            '뒤로가기를 한 번 더 누르면 앱이 종료됩니다.',
            ToastAndroid.SHORT,
          );
          setTimeout(() => {
            setBackHandleNum(0);
          }, 1000);
          return true; // 뒤로가기 이벤트 무시하지 않도록 설정
        } else if (backHandleNum === 1) {
          BackHandler.exitApp();
        }
        return true;
      }
      return false; // 다른 페이지에서는 뒤로가기 이벤트를 처리하지 않음
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    return () => backHandler.remove();
  }, [backHandleNum, navigation]);

  return (
    <View style={styles.mainContainer}>
      <ImageBackground
        source={require('../../assets/bgImage/mainhomeBg.png')}
        resizeMode="cover"
        style={styles.backgroundImage}>
        <View style={styles.subContainer}>
          {/* 상단 */}
          <View style={styles.topContainer}>
            <View style={styles.topLeftView}>
              <View style={styles.circleBg1}>
                <Image
                  style={styles.tinyLogo}
                  source={require('../../assets/logo/rabbit.png')}
                />
              </View>
              <TouchableOpacity
                style={styles.circleBg2}
                onPress={() => {
                  setIsmuted(!ismuted);
                }}>
                <Text>
                  {ismuted ? (
                    <IconSimpleLineIcons
                      name="volume-off"
                      color={'black'}
                      size={windowWidth * 0.03}
                    />
                  ) : (
                    <IconSimpleLineIcons
                      name="volume-2"
                      color={'black'}
                      size={windowWidth * 0.03}
                    />
                  )}
                </Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              onPress={() => {
                if (!isLogin) {
                  navigation.navigate('LoginScreen');
                } else {
                  navigation.navigate('MypageProfileScreen');
                }
              }}
              style={styles.topRightView}>
              {isLogin ? null : (
                <Image
                  style={styles.userLogo}
                  source={require('../../assets/images/user.png')}
                />
              )}
              <Text style={styles.loginText}> {loginTF} </Text>
            </TouchableOpacity>
          </View>
          {/* 중단 */}
          <View style={styles.middleContainer}>
            <ScrollView horizontal={true}>
              {/* 동물선택카드 */}
              <TouchableOpacity
                style={[styles.cardFrame, {backgroundColor: '#5E9FF9'}]}
                onPress={() => {
                  navigation.navigate('SelectAnimalScreen');
                }}>
                <View style={styles.cardFrame1}>
                  <Text style={styles.cardText}>
                    <Text style={styles.cardTextBold}>동물</Text> 그리기
                  </Text>
                </View>
                <View style={styles.cardFrame2}>
                  <Image
                    style={styles.cardImage}
                    source={require('../../assets/images/orca.png')}
                  />
                </View>
                <TouchableOpacity style={styles.cardFrame3}>
                  <View style={styles.playButtonCircle}>
                    <Text>
                      <IconFontAwesome5
                        name="question"
                        size={windowWidth * 0.03}
                      />
                    </Text>
                  </View>
                </TouchableOpacity>
              </TouchableOpacity>
              {/* 동화선택카드 */}
              <TouchableOpacity
                style={[styles.cardFrame, {backgroundColor: '#A6D934'}]}
                onPress={() => {
                  navigation.navigate('SelectFairytaleScreen');
                }}>
                <View style={styles.cardFrame1}>
                  <Text style={styles.cardText}>
                    <Text style={styles.cardTextBold}>동화</Text> 그리기
                  </Text>
                </View>
                <View style={styles.cardFrame2}>
                  <Image
                    style={styles.cardImage}
                    source={require('../../assets/images/littlePigs.png')}
                  />
                </View>
                <TouchableOpacity style={styles.cardFrame3}>
                  <View style={styles.playButtonCircle}>
                    <Text>
                      <IconFontAwesome5
                        name="question"
                        size={windowWidth * 0.03}
                      />
                    </Text>
                  </View>
                </TouchableOpacity>
              </TouchableOpacity>
              {/* 사진따라그리기카드 */}
              <TouchableOpacity
                style={[styles.cardFrame, {backgroundColor: '#FE7779'}]}
                onPress={() => {
                  navigation.navigate('SelectPictureScreen');
                }}>
                <View style={styles.cardFrame1}>
                  <Text style={styles.cardText1}>친구의 동물</Text>
                  <Text style={styles.cardText2}>그리기</Text>
                </View>
                <View style={styles.cardFrame2}>
                  <Image
                    style={styles.cardImage}
                    source={require('../../assets/images/rabbitPicture.png')}
                  />
                </View>
                <TouchableOpacity style={styles.cardFrame3}>
                  <View style={styles.playButtonCircle}>
                    <Text>
                      <IconFontAwesome5
                        name="question"
                        size={windowWidth * 0.03}
                      />
                    </Text>
                  </View>
                </TouchableOpacity>
              </TouchableOpacity>
              {/* 동물 올리기 */}
              <TouchableOpacity
                style={[styles.cardFrame, {backgroundColor: '#8C80E2'}]}
                onPress={() => {
                  navigation.navigate('UploadPicture1Screen');
                }}>
                <View style={styles.cardFrame1}>
                  <Text style={styles.cardText1}>내 동물 사진</Text>
                  <Text style={styles.cardText2}>올리기</Text>
                </View>
                <View style={styles.cardFrame2}>
                  <Image
                    style={styles.cardImage}
                    source={require('../../assets/images/Group16.png')}
                  />
                </View>
                <TouchableOpacity style={styles.cardFrame3}>
                  <View style={styles.playButtonCircle}>
                    <Text>
                      <IconFontAwesome5
                        name="question"
                        size={windowWidth * 0.03}
                      />
                    </Text>
                  </View>
                </TouchableOpacity>
              </TouchableOpacity>
            </ScrollView>
          </View>
          {/* 하단 */}
          <View style={styles.bottomContainer} />
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  subContainer: {
    flex: 1,
    alignSelf: 'center',
    width: '95%',
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  topContainer: {
    flex: 0.15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  middleContainer: {
    alignSelf: 'center',
    flex: 0.7,
    width: '95%',
  },
  bottomContainer: {
    flex: 0.15,
    justifyContent: 'center',
  },
  topLeftView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  topRightView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  circleBg1: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF4E5',
    borderRadius: 50,
    width: windowWidth * 0.04,
    height: windowWidth * 0.04,
    marginRight: windowWidth * 0.01,
  },
  circleBg2: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 50,
    width: windowWidth * 0.04,
    height: windowWidth * 0.04,
  },
  tinyLogo: {
    width: windowWidth * 0.04,
    height: windowWidth * 0.04,
  },
  userLogo: {
    width: windowWidth * 0.025,
    height: windowWidth * 0.025,
  },
  cardImage: {
    width: windowWidth * 0.3 * 0.7,
    height: windowWidth * 0.3 * 0.7,
  },
  cardText: {
    fontSize: windowWidth * 0.035,
    color: 'white',
  },
  cardTextBold: {
    fontWeight: '600',
  },
  cardText1: {
    fontSize: windowWidth * 0.035,
    color: 'white',
    fontWeight: '600',
  },
  cardText2: {
    fontSize: windowWidth * 0.035,
    color: 'white',
  },
  loginText: {
    fontSize: windowWidth * 0.015,
    color: '#7D7676',
    marginLeft: windowWidth * 0.005,
  },
  cardFrame: {
    width: windowWidth * 0.28,
    marginHorizontal: windowWidth * 0.01,
    borderRadius: 20,
    paddingHorizontal: windowWidth * 0.3 * 0.05,
    // padding: windowWidth * 0.3 * 0.05,
  },
  cardFrame1: {
    flex: 0.3,
    // flexDirection: 'row',
    justifyContent: 'center',
  },
  cardFrame2: {
    flex: 0.52,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardFrame3: {
    flex: 0.18,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  playButtonCircle: {
    width: windowWidth * 0.05,
    height: windowWidth * 0.05,
    borderRadius: 100,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    // paddingLeft: windowWidth * 0.005,
    opacity: 0.75,
  },
  mainOptionButton: {
    textAlign: 'right',
  },
});
