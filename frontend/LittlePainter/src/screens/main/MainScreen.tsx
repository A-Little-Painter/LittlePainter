import React, {useState, useEffect, useRef} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  Dimensions,
  Image,
  ImageBackground,
  BackHandler,
  ToastAndroid,
  Pressable,
  Modal,
  Animated,
} from 'react-native';
import {RootStackParams} from '../../navigations/AppNavigator';
import type {StackScreenProps} from '@react-navigation/stack';
import {useAppSelector, useAppDispatch} from '../../redux/hooks';
import IconSimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import IconFontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {
  handleBGMVolume,
  handleBGMMusic,
  handleSoundEffect,
  handleIsLoop,
} from '../../redux/slices/music/music';
import {useIsFocused} from '@react-navigation/native';
import Video from 'react-native-video';
import LottieView from 'lottie-react-native';

type MainScreenProps = StackScreenProps<RootStackParams, 'MainScreen'>;
type ismuted = boolean;
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function MainScreen({navigation}: MainScreenProps) {
  const [ismuted, setIsmuted] = useState<ismuted>(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [loginVisible, setLoginVisible] = useState(false);
  const [animalVisible, setAnimalVisible] = useState(false);
  const [fairyVisible, setFairyVisible] = useState(false);
  const [friendVisible, setFriendVisible] = useState(false);
  const [pictureVisible, setPictureVisible] = useState(false);
  const [uploadVisible, setUploadVisible] = useState(false);
  const [backHandleNum, setBackHandleNum] = useState<number>(0);
  const isLogin = useAppSelector(state => state.user.isLogin);
  const selectName = useAppSelector(state => state.user.selectName);
  const selectImage = useAppSelector(state => state.user.selectImage);
  const music = useAppSelector(state => state.music.isMusic);
  const moveAnimation = useRef(new Animated.Value(0)).current;
  const moveAnimation2 = useRef(new Animated.Value(0)).current;
  const animationRef = useRef<LottieView>(null);
  const secondAnimationRef = useRef<LottieView>(null);
  let loginTF: string;

  const dispatch = useAppDispatch();

  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused) {
      dispatch(handleIsLoop(-1));
      dispatch(
        handleBGMMusic(
          'https://littlepainter.s3.ap-northeast-2.amazonaws.com/sound/bgm/BG_main.mp3',
        ),
      );
    }
  }, [isFocused]);
  if (!isLogin) {
    loginTF = '로그인';
  } else {
    loginTF = selectName;
  }

  const goSelcetFriend = () => {
    if (isLogin) {
      dispatch(handleSoundEffect('btn'));
      navigation.navigate('SelectFriendScreen');
    } else {
      setLoginVisible(true);
    }
  };

  const goLogin = () => {
    dispatch(handleSoundEffect('btn'));
    setLoginVisible(false);
    navigation.navigate('LoginScreen');
  };

  useEffect(() => {
    Animated.loop(
      // 애니메이션 시퀀스 정의
      Animated.sequence([
        // 오른쪽 끝까지 이동
        Animated.timing(moveAnimation, {
          toValue: windowWidth,
          duration: 8000,
          useNativeDriver: true,
        }),
        // moveAnimation 값을 0으로 즉시 변경 (애니메이션 없이)
        Animated.timing(moveAnimation, {
          toValue: 0,
          duration: 0,
          useNativeDriver: true,
        }),
      ]),
    ).start();

    Animated.loop(
      // 애니메이션 시퀀스 정의
      Animated.sequence([
        // 오른쪽 끝까지 이동
        Animated.timing(moveAnimation2, {
          toValue: windowWidth,
          duration: 15000,
          useNativeDriver: true,
        }),
        // moveAnimation 값을 0으로 즉시 변경 (애니메이션 없이)
        Animated.timing(moveAnimation2, {
          toValue: 0,
          duration: 0,
          useNativeDriver: true,
        }),
      ]),
    ).start();

    // animationRef.current?.play();

    animationRef.current?.play(30, 110);
    secondAnimationRef.current?.play();
  }, [moveAnimation, moveAnimation2]);

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

  const goSearch = () => {
    dispatch(handleSoundEffect('btn'));
    setModalVisible(!modalVisible);
    navigation.navigate('UploadPicture0Screen');
  };

  const goUpload = () => {
    dispatch(handleSoundEffect('btn'));
    setModalVisible(!modalVisible);
    navigation.navigate('UploadPicture1Screen');
  };

  const goMute = () => {
    setIsmuted(!ismuted);
    if (ismuted === false) {
      dispatch(handleBGMVolume(0));
    } else {
      dispatch(handleBGMVolume(1));
    }
  };

  const goScreen = (value: string) => {
    dispatch(handleSoundEffect('btn'));
    navigation.navigate(value);
  };

  return (
    <View style={styles.mainContainer}>
      <ImageBackground
        source={require('../../assets/bgImage/altBg.png')}
        resizeMode="cover"
        style={styles.backgroundImage}>
        <View style={styles.subContainer}>
          {/* 상단 */}
          <View style={styles.topContainer}>
            <View style={styles.topLeftView}>
              <View style={styles.circleBg1}>
                {isLogin ? (
                  <Image style={styles.tinyLogo} source={{uri: selectImage}} />
                ) : (
                  <Image
                    style={styles.tinyLogo}
                    source={require('../../assets/logo/littlePainterRabbit.png')}
                  />
                )}
              </View>
              <TouchableOpacity
                style={styles.circleBg2}
                onPress={() => {
                  goMute();
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
                  goScreen('LoginScreen');
                } else {
                  goScreen('MypageProfileScreen');
                }
              }}
              style={styles.topRightView}>
              {isLogin ? null : (
                <Image
                  style={styles.userLogo}
                  source={require('../../assets/images/user.png')}
                />
              )}
              <Text style={isLogin ? styles.mypageText : styles.loginText}>
                {' '}
                {loginTF}{' '}
              </Text>
            </TouchableOpacity>
          </View>
          {/* 중단 */}
          <View style={styles.middleContainer}>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}>
              {/* 동물선택카드 */}
              <TouchableOpacity
                style={[styles.cardFrame, {backgroundColor: '#5E9FF9'}]}
                onPress={() => {
                  goScreen('SelectAnimalScreen');
                }}>
                <View style={styles.cardFrame1}>
                  <Text style={styles.cardText}>
                    <Text style={styles.cardTextBold}>동물</Text> 그리기
                  </Text>
                </View>
                <View style={styles.cardFrame2}>
                  <Image
                    style={styles.cardImage}
                    source={require('../../assets/images/main-animal.png')}
                  />
                </View>
                <TouchableOpacity
                  style={styles.cardFrame3}
                  onPress={() => {
                    setAnimalVisible(true);
                  }}>
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
              <Modal
                animationType="slide"
                transparent={true}
                visible={animalVisible}
                onRequestClose={() => {
                  setAnimalVisible(!animalVisible);
                }}>
                <Pressable
                  style={styles.centeredView}
                  onPress={() => setAnimalVisible(!animalVisible)}>
                  <View style={styles.modalView1}>
                    <Video
                      style={{
                        height: windowHeight * 0.09 * 5,
                        width: windowHeight * 0.16 * 5,
                      }}
                      source={{
                        uri: 'https://littlepainter.s3.ap-northeast-2.amazonaws.com/tutorial/animal-tutorial.mp4',
                      }}
                      controls={false}
                      resizeMode="cover"
                      repeat={true}
                    />
                    <View style={styles.modalbtns}>
                      <Pressable
                        style={[styles.Mbutton2]}
                        onPress={() => goScreen('SelectAnimalScreen')}>
                        <Text style={styles.Mbuttontext}>해보기</Text>
                      </Pressable>
                    </View>
                  </View>
                </Pressable>
              </Modal>
              {/* 동화선택카드 */}
              <TouchableOpacity
                style={[styles.cardFrame, {backgroundColor: '#A6D934'}]}
                onPress={() => {
                  goScreen('SelectFairytaleScreen');
                }}>
                <View style={styles.cardFrame1}>
                  <Text style={styles.cardText}>
                    <Text style={styles.cardTextBold}>동화</Text> 그리기
                  </Text>
                </View>
                <View style={styles.cardFrame2}>
                  <Image
                    style={styles.cardImage}
                    source={require('../../assets/images/main-fairy.png')}
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
              {/* 내사진선택카드 */}
              <TouchableOpacity
                style={[styles.cardFrame, {backgroundColor: '#FE7F22'}]}
                onPress={() => {
                  goSelcetFriend();
                }}>
                <View style={styles.cardFrame1}>
                  <Text style={styles.cardText}>
                    <Text style={styles.cardTextBold}>내 친구</Text> 그리기
                  </Text>
                </View>
                <View style={styles.cardFrame2}>
                  <Image
                    style={styles.cardImage}
                    source={require('../../assets/images/main-picture.png')}
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
              <Modal
                animationType="slide"
                transparent={true}
                visible={loginVisible}
                onRequestClose={() => {
                  setLoginVisible(!loginVisible);
                }}>
                <Pressable
                  style={styles.centeredView}
                  onPress={() => setLoginVisible(!loginVisible)}>
                  <View style={styles.modalView}>
                    <View style={styles.Mtexts}>
                      <Text style={styles.modaltext}>
                        내 사진 그리기를 하려면
                      </Text>
                      <Text style={styles.modaltext}>로그인을 해야해요.</Text>
                    </View>
                    <View style={styles.modalbtns}>
                      <Pressable
                        style={[styles.Mbutton2]}
                        onPress={() => goLogin()}>
                        <Text style={styles.Mbuttontext}>로그인 하기</Text>
                      </Pressable>
                    </View>
                  </View>
                </Pressable>
              </Modal>
              {/* 사진따라그리기카드 */}
              <TouchableOpacity
                style={[styles.cardFrame, {backgroundColor: '#FE7779'}]}
                onPress={() => {
                  goScreen('SelectPictureScreen');
                }}>
                <View style={styles.cardFrame1}>
                  <Text style={styles.cardText}>
                    <Text style={styles.cardTextBold}>친구의 동물{'\n'}</Text>
                    그리기
                  </Text>
                  {/* <Text style={styles.cardText1}>친구의 동물{'\n'}그리기</Text> */}
                  {/* <Text style={styles.cardText2}>그리기</Text> */}
                </View>
                <View style={styles.cardFrame2}>
                  <Image
                    style={styles.cardImage}
                    source={require('../../assets/images/main-friend.png')}
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
                  setModalVisible(true);
                }}>
                <View style={styles.cardFrame1}>
                  <Text style={styles.cardText}>
                    <Text style={styles.cardTextBold}>내 동물 사진{'\n'}</Text>
                    올리기
                  </Text>
                  {/* <Text style={styles.cardText1}>내 동물 사진</Text>
                  <Text style={styles.cardText2}>올리기</Text> */}
                </View>
                <View style={styles.cardFrame2}>
                  <Image
                    style={styles.cardImage}
                    source={require('../../assets/images/main-upload.png')}
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
              <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                  setModalVisible(!modalVisible);
                }}>
                <Pressable
                  style={styles.centeredView}
                  onPress={() => setModalVisible(!modalVisible)}>
                  <View style={styles.modalView}>
                    <View style={styles.Mtexts}>
                      <Text style={styles.modaltext}>
                        동물사진을 검색하거나
                      </Text>
                      <Text style={styles.modaltext}>
                        내 사진을 선택할 수 있어요.
                      </Text>
                    </View>
                    <View style={styles.modalbtns}>
                      <Pressable
                        style={[styles.Mbutton]}
                        onPress={() => goSearch()}>
                        <Text style={styles.Mbuttontext}>동물 검색</Text>
                      </Pressable>
                      <Pressable
                        style={[styles.Mbutton]}
                        onPress={() => goUpload()}>
                        <Text style={styles.Mbuttontext}>내 사진 등록</Text>
                      </Pressable>
                    </View>
                  </View>
                </Pressable>
              </Modal>
              {/* 쇼 앤 프루브 */}
              <TouchableOpacity
                style={[styles.cardFrame, {backgroundColor: '#FFBD3A'}]}
                onPress={() => {
                  goScreen('ShowScreen');
                }}>
                <View style={styles.cardFrame1}>
                  {/* <View style={styles.space}> */}
                  <Text style={styles.cardText}>
                    <Text style={styles.cardTextBold}>놀이방</Text>
                  </Text>
                  {/* </View> */}
                </View>
                <View style={styles.cardFrame4}>
                  <Image
                    style={styles.cardImage2}
                    source={require('../../assets/images/main-playroom.png')}
                    resizeMode="stretch"
                  />
                </View>
              </TouchableOpacity>
            </ScrollView>
          </View>
          {/* 하단 */}
          <View style={styles.bottomContainer}>
            <Animated.View
              style={{
                transform: [{translateX: moveAnimation}],
              }}>
              <LottieView
                source={require('../../assets/lottie/test.json')}
                ref={animationRef}
                autoPlay={true}
                loop={true}
                style={styles.lottieStyle}
              />
            </Animated.View>
            <Animated.View
              style={{
                transform: [{translateX: moveAnimation2}],
              }}>
              <LottieView
                source={require('../../assets/lottie/turtle.json')}
                ref={secondAnimationRef}
                autoPlay={true}
                loop={true}
                style={styles.lottieStyle}
              />
            </Animated.View>
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
    marginTop: windowWidth * 0.01,
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
    // backgroundColor: 'red',
    width: windowWidth * 0.3 * 0.85,
    height: windowWidth * 0.3 * 0.75 * 0.85,
    borderRadius: windowWidth * 0.3 * 0.75 * 0.13,
    resizeMode: 'contain',
  },
  cardImage2: {
    // backgroundColor: 'red',
    width: windowWidth * 0.3 * 0.85,
    height: windowWidth * 0.3,
    borderRadius: windowWidth * 0.3 * 0.75 * 0.13,
    // resizeMode: 'contain',
  },
  cardText: {
    // fontSize: windowWidth * 0.035,
    fontSize: windowWidth * 0.033,
    color: 'white',
    paddingTop: windowHeight * 0.03,
    paddingBottom: -windowHeight * 0.03,
    paddingLeft: windowWidth * 0.01,
    fontFamily: 'TmoneyRoundWindRegular',
  },
  cardTextBold: {
    fontWeight: '600',
  },
  // cardText1: {
  //   // fontSize: windowWidth * 0.035,
  //   fontSize: windowWidth * 0.033,
  //   color: 'white',
  //   fontWeight: '600',
  //   paddingTop: windowHeight * 0.03,
  //   paddingBottom: -windowHeight * 0.03,
  //   paddingLeft: windowWidth * 0.01,
  // },
  // cardText2: {
  //   fontSize: windowWidth * 0.033,
  //   color: 'white',
  //   // paddingTop: windowHeight * 0.03,
  //   paddingBottom: -windowHeight * 0.03,
  //   paddingLeft: windowWidth * 0.01,
  // },
  loginText: {
    fontSize: windowWidth * 0.015,
    color: '#7D7676',
    marginLeft: windowWidth * 0.005,
    fontFamily: 'BMHANNA_11yrs_ttf',
    marginTop: windowHeight * 0.01,
  },
  mypageText: {
    fontSize: windowWidth * 0.015,
    color: '#7D7676',
    marginRight: windowWidth * 0.021,
    fontFamily: 'BMHANNA_11yrs_ttf',
    marginTop: windowHeight * 0.01,
  },
  cardFrame: {
    width: windowWidth * 0.28,
    marginHorizontal: windowWidth * 0.01,
    borderRadius: windowWidth * 0.28 * 0.1,
    paddingHorizontal: windowWidth * 0.3 * 0.05,
    // padding: windowWidth * 0.3 * 0.05,
  },
  cardFrame1: {
    flex: 0.3,
    // flexDirection: 'row',
    // justifyContent: 'center',
    // backgroundColor: 'blue',
  },
  space: {
    paddingTop: windowHeight * 0.05,
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
  cardFrame4: {
    flex: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'red',
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
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: windowWidth * 0.137 * 0.1,
    padding: windowHeight * 0.04,
    paddingBottom: windowHeight * 0.01,
    alignItems: 'center',
    elevation: 5,
    height: windowHeight * 0.4,
  },
  modalView1: {
    backgroundColor: 'white',
    borderRadius: windowWidth * 0.137 * 0.1,
    paddingVertical: windowHeight * 0.025,
    alignItems: 'center',
    elevation: 5,
    height: windowHeight * 0.09 * 7,
    width: windowHeight * 0.16 * 7,
  },
  Mtexts: {
    alignItems: 'center',
    paddingTop: windowWidth * 0.02,
  },
  modaltext: {
    fontSize: windowWidth * 0.02,
    fontFamily: 'TmoneyRoundWindRegular',
  },
  modalbtns: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '40%',
    marginTop: windowHeight * 0.05,
  },
  Mbutton: {
    backgroundColor: '#C68AEB',
    justifyContent: 'center',
    alignItems: 'center',
    width: windowWidth * 0.15,
    height: windowWidth * 0.05,
    borderRadius: windowWidth * 0.005,
  },
  Mbutton2: {
    backgroundColor: '#FE7F22',
    justifyContent: 'center',
    alignItems: 'center',
    width: windowWidth * 0.15,
    height: windowWidth * 0.05,
    borderRadius: windowWidth * 0.005,
  },
  Mbuttontext: {
    fontSize: windowWidth * 0.02,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontFamily: 'TmoneyRoundWindExtraBold',
  },
  lottieStyle: {
    width: windowWidth * 0.1,
    height: windowWidth * 0.1,

    position: 'absolute',
    top: windowHeight * -0.1,
  },
});
