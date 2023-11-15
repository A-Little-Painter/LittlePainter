/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState, useRef} from 'react';
import {
  StyleSheet,
  Dimensions,
  Text,
  View,
  TouchableOpacity,
  ToastAndroid, // 토스트안드로이드 잠깐 사용
  BackHandler,
  Image,
  ImageBackground,
} from 'react-native';
import ViewShot from 'react-native-view-shot';
import type {StackScreenProps} from '@react-navigation/stack';
import {RootStackParams} from '../../navigations/AppNavigator';
import IconFontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import {
  handleisSaveDrawnToLoginModalVisible,
  handleHavingGifUrl,
} from '../../redux/slices/draw/draw';
import {RootState} from '../../redux/store';
import {useDispatch, useSelector} from 'react-redux';
import {animalSaveToMypage} from '../../apis/draw/draw';
import SaveDrawnToLoginModal from '../modals/SaveDrawnToLoginModal';
import {handleSoundEffect} from '../../redux/slices/music/music';
import {handleLoreUrl} from '../../redux/slices/draw/draw';
type CompleteDrawAnimalScreenProps = StackScreenProps<
  RootStackParams,
  'CompleteDrawAnimalScreen'
>;

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

var Sound = require('react-native-sound');
Sound.setCategory('Playback');

export default function CompleteDrawAnimalScreen({
  route,
  navigation,
}: CompleteDrawAnimalScreenProps) {
  const [animalId] = useState<number>(route.params.animalId);
  // const [animalType] = useState<string>(route.params.animalType);
  const [completeDrawUri] = useState<string>(route.params.completeDrawUri); // 완성된 Uri(gif파일 아님)
  const [animatedGif] = useState<string>(route.params.animatedGif);
  const [originDrawUri] = useState<string>(route.params.originDrawUri);
  const [isSavedImage, setIsSavedImage] = useState<boolean>(false);
  const [translateX, setTranslateX] = useState(0); // 초기값은 0

  const isLogin = useSelector((state: RootState) => state.user.isLogin);
  // const selectName = useSelector((state: RootState) => state.user.selectName);
  // const selectImage = useSelector((state: RootState) => state.user.selectImage);
  const isLore = useSelector((state: RootState) => state.draw.lore);
  const dispatch = useDispatch();
  const isSaveDrawnToLoginModalVisible = useSelector(
    (state: RootState) => state.draw.isSaveDrawnToLoginModalVisible,
  );
  // 뒤로가기 변수
  const [backHandleNum, setBackHandleNum] = useState<number>(0);
  // 캡쳐 변수
  const captureRef = useRef(null);

  // function handlePressSaving(params:type) {
  function handlePressSaving() {
    if (isLogin && !isSavedImage) {
      handleAnimalSaveToMypage();
    } else if (isLogin && isSavedImage) {
      ToastAndroid.show(
        '내가 그린 그림은 이미 저장되었어요🐣',
        ToastAndroid.SHORT,
      );
    } else {
      dispatch(handleisSaveDrawnToLoginModalVisible(true));
    }
  }

  const handleAnimalSaveToMypage = async () => {
    try {
      console.log(completeDrawUri);
      console.log(animatedGif);
      console.log(originDrawUri);
      // let sendUri = animatedGif;
      // if (animatedGif === ''){
      //   sendUri = originDrawUri;
      // }
      // const response = await animalSaveToMypage(animalId, completeDrawUri, sendUri);
      const response = await animalSaveToMypage(
        animalId,
        completeDrawUri,
        animatedGif,
      );
      if (response.status === 201) {
        console.log('완성된 동물 마이페이지에 저장 성공', response.data);
        ToastAndroid.show(
          '내가 그린 그림이 저장되었어요🐇',
          ToastAndroid.SHORT,
        );
        setIsSavedImage(true);
        dispatch(handleHavingGifUrl(false));
      } else {
        console.log('완성된 동물 마이페이지에 저장 실패', response.status);
      }
    } catch (error) {
      console.log('완성된 동물 마이페이지에 저장 실패', error);
    }
  };
  useEffect(() => {
    return () => {
      dispatch(handleHavingGifUrl(false));
    };
  }, []);

  //뒤로가기 2번시 뒤로가기
  useEffect(() => {
    const backAction = () => {
      if (navigation.isFocused()) {
        // Check if the MainScreen is focused
        if (backHandleNum === 0) {
          setBackHandleNum(1);
          ToastAndroid.show(
            '뒤로가기를 한 번 더 누르면 선택화면으로 돌아갑니다.',
            ToastAndroid.SHORT,
          );
          setTimeout(() => {
            setBackHandleNum(0);
          }, 1000);
          return true; // 뒤로가기 이벤트 무시하지 않도록 설정
        } else if (backHandleNum === 1) {
          navigation.navigate('SelectAnimalScreen');
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

  useEffect(() => {
    console.log('moving', translateX);
    // 타이머를 이용하여 일정 간격마다 이미지를 오른쪽으로 이동
    const intervalId = setInterval(() => {
      if (translateX >= 1100) {
        setTranslateX(-100);
      } else {
        // console.log('go');
        // setTranslateX(prevTranslateX => prevTranslateX + 100); // 10포인트씩 이동
      }
    }, 1865); // 1000밀리초(1초) 간격으로 실행

    return () => {
      // 컴포넌트가 언마운트될 때 타이머 해제
      clearInterval(intervalId);
    };
  }, [translateX]);

  const lore = () => {
    console.log(isLore);
    var whoosh = new Sound(isLore, null, (error: any) => {
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
      whoosh.setNumberOfLoops(0);

      whoosh.play((success: any) => {
        if (success) {
          console.log('successfully finished playing');
        } else {
          console.log('playback failed due to audio decoding errors');
        }
      });
    });
  };

  return (
    <View style={styles.mainContainer}>
      {/* <View style={styles.subContainer}> */}
      <View style={styles.subContainer}>
        {/* 상단 */}
        <View style={styles.topContainer}>
          <View style={styles.topMiddle} />
          {/* X버튼 */}
          <View style={styles.topRight}>
            <TouchableOpacity
              onPress={() => {
                dispatch(handleSoundEffect('btn'));
                dispatch(handleLoreUrl('grr'));
                navigation.navigate('MainScreen');
              }}
              style={styles.xCircle}>
              <Text style={styles.xText}>
                <IconFontAwesome6
                  name="x"
                  size={windowWidth * 0.03}
                  color={'#5E9FF9'}
                />
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* 중단 */}
        {/* <View style={styles.middleContainer}> */}
        <TouchableOpacity
          style={[styles.middleContainer]}
          onPress={() => {
            lore();
          }}>
          <ViewShot
            // style={[styles.middleContainer, {backgroundColor: 'white'}]}
            ref={captureRef}
            options={{
              fileName: 'drawAnimalCapture',
              format: 'jpg',
              quality: 0.9,
            }}>
            {animatedGif === '' ||
            animatedGif === undefined ||
            animatedGif === null ? (
              <ImageBackground
                style={styles.imageBackgroundSize}
                source={{
                  uri:
                    animatedGif === '' ||
                    animatedGif === undefined ||
                    animatedGif === null
                      ? completeDrawUri === '' ||
                        completeDrawUri === undefined ||
                        completeDrawUri === null
                        ? originDrawUri
                        : completeDrawUri
                      : animatedGif,
                }}
                resizeMode="contain">
                {/* <View style={{width: '100%', height: '100%'}} /> */}
              </ImageBackground>
            ) : (
              <View style={{transform: [{translateX}]}}>
                <Image
                  style={styles.imageSize}
                  source={{
                    uri:
                      animatedGif === '' ||
                      animatedGif === undefined ||
                      animatedGif === null
                        ? completeDrawUri === '' ||
                          completeDrawUri === undefined ||
                          completeDrawUri === null
                          ? originDrawUri
                          : completeDrawUri
                        : animatedGif,
                  }}
                  resizeMode="contain">
                  {/* <View style={{width: '100%', height: '100%'}} /> */}
                </Image>
              </View>
            )}
            {/* </View> */}
          </ViewShot>
        </TouchableOpacity>
        {/* 하단 */}
        <View style={styles.bottomContainer}>
          {/* 하단 좌측 */}
          <View style={styles.bottomContainerLeft}>
            <View style={styles.bottomContainerLeftRight} />
          </View>
          {/* 하단 중앙 */}
          <View style={styles.bottomContainerMiddle} />
          {/* 하단 우측 */}
          <View style={styles.bottomContainerRight}>
            <TouchableOpacity
              style={[
                styles.doneButton,
                {backgroundColor: animatedGif === '' ? 'gray' : '#A8CEFF'},
              ]}
              disabled={animatedGif === ''}
              onPress={() => {
                dispatch(handleLoreUrl('grr'));
                dispatch(handleSoundEffect('btn'));
                handlePressSaving();
              }}>
              <Text style={styles.doneButtonText}>저장하기</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {isSaveDrawnToLoginModalVisible ? <SaveDrawnToLoginModal /> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  subContainer: {
    alignSelf: 'center',
    flex: 1,
    width: '100%',
  },
  topContainer: {
    flex: 0.1,
    flexDirection: 'row',
    // width: '95%',
    paddingHorizontal: windowWidth * 0.025,
    alignSelf: 'center',
  },
  topLeft: {
    flexDirection: 'row',
    flex: 0.2,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  pencilImageCircle: {
    // backgroundColor: '#ECECEC',
    width: windowWidth * 0.07,
    height: windowWidth * 0.07,
    borderRadius: windowWidth * 0.07 * 0.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  eraserImageCircle: {
    // backgroundColor: '#ECECEC',
    width: windowWidth * 0.07,
    height: windowWidth * 0.07,
    borderRadius: windowWidth * 0.07 * 0.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  drawEquipImage: {
    height: windowWidth * 0.07 * 0.6,
    width: windowWidth * 0.07 * 0.6,
    resizeMode: 'stretch',
  },
  topMiddle: {
    flex: 0.9,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  colorCircle: {
    width: windowHeight * 0.07,
    height: windowHeight * 0.07,
    borderRadius: windowHeight * 0.07 * 0.5,
    overflow: 'hidden',
  },
  topRight: {
    flex: 0.1,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  xCircle: {
    justifyContent: 'center',
    borderRadius: windowWidth * 0.05 * 0.5,
    backgroundColor: 'white',
    width: windowWidth * 0.05,
    height: windowWidth * 0.05,
    borderColor: '#5E9FF9',
    borderWidth: 2,
  },
  xText: {
    textAlign: 'center',
  },
  middleContainer: {
    flex: 0.8,
  },
  imageSize: {
    width: windowHeight * 0.5,
    height: '100%',
  },
  imageBackgroundSize: {
    width: '100%',
    height: '100%',
  },
  bottomContainer: {
    paddingHorizontal: windowWidth * 0.01,
    flex: 0.1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  bottomContainerLeft: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    flex: 0.4,
    height: '100%',
  },
  ideaLightView: {
    justifyContent: 'center',
    flex: 0.3,
  },
  ideaLight: {
    resizeMode: 'contain',
    height: windowHeight * 0.07,
  },
  lineThicknessView: {
    flex: 0.4,
    height: '100%',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  lineThickness: {
    width: windowWidth * 0.4 * 0.4,
    // height: windowWidth * 0.1 * 0.1,
    borderRadius: windowHeight * 0.1 * 0.15,
  },
  bottomContainerLeftRight: {
    flex: 0.3,
  },
  bottomContainerMiddle: {
    flex: 0.2,
  },
  clearButton: {
    backgroundColor: '#F6F6F6',
    height: windowHeight * 0.1 * 0.7,
    width: '80%',
    borderRadius: windowWidth * 0.05 * 0.2,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  clearButtonText: {
    color: 'black',
    fontSize: windowHeight * 0.02,
  },
  bottomContainerRight: {
    flex: 0.4,
  },
  doneButton: {
    backgroundColor: '#A8CEFF',
    width: '40%',
    height: '80%',
    alignItems: 'center',
    alignSelf: 'flex-end',
    justifyContent: 'center',
    borderRadius: windowWidth * 0.2 * 0.07,
  },
  doneButtonText: {
    color: 'black',
    fontSize: windowHeight * 0.04,
    fontFamily: 'TmoneyRoundWindExtraBold',
  },
});
