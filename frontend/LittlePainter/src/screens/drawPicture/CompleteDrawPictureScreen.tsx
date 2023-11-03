import React, {useEffect, useState, useRef} from 'react';
import {
  StyleSheet,
  Dimensions,
  Text,
  View,
  TouchableOpacity,
  ToastAndroid, // 토스트안드로이드 잠깐 사용
  BackHandler,
  ImageBackground,
} from 'react-native';
import ViewShot from 'react-native-view-shot';
import type {StackScreenProps} from '@react-navigation/stack';
import {RootStackParams} from '../../navigations/AppNavigator';
import IconFontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import {handleisSaveDrawnToLoginModalVisible} from '../../redux/slices/draw/draw';
import {RootState} from '../../redux/store';
import {useDispatch, useSelector} from 'react-redux';
import DrawScreenshotModal from '../modals/DrawScreenshotModal';
import SaveDrawnToLoginModal from '../modals/SaveDrawnToLoginModal';

type CompleteDrawPictureScreenProps = StackScreenProps<
  RootStackParams,
  'CompleteDrawPictureScreen'
>;

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function CompleteDrawPictureScreen({
  route,
  navigation,
}: CompleteDrawPictureScreenProps) {
  const [completeDrawUri] = useState(route.params.completeDrawUri);
  // 뒤로가기 변수
  const [backHandleNum, setBackHandleNum] = useState<number>(0);
  // 캡쳐 변수
  const captureRef = useRef();

  const dispatch = useDispatch();
  const isSaveDrawnToLoginModalVisible = useSelector(
    (state: RootState) => state.draw.isSaveDrawnToLoginModalVisible,
  );
  // 스크린샷 관련 모달
  const isDrawScreenshotModalVisible = useSelector(
    (state: RootState) => state.draw.isDrawScreenshotModalVisible,
  );
  const [captureImagePath, setCaptureImagePath] =
    useState<string>(completeDrawUri);

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
          navigation.navigate('SelectPictureScreen');
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
      {/* <View style={styles.subContainer}> */}
      <View style={styles.subContainer}>
        {/* 상단 */}
        <View style={styles.topContainer}>
          <View style={styles.topMiddle} />
          {/* X버튼 */}
          <View style={styles.topRight}>
            <TouchableOpacity
              onPress={() => {
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
        <ViewShot
          // style={[styles.middleContainer, {backgroundColor: 'white'}]}
          style={[styles.middleContainer]}
          ref={captureRef}
          options={{
            fileName: 'drawAnimalCapture',
            format: 'jpg',
            quality: 0.9,
          }}>
          <ImageBackground
            // source={require('../../assets/images/animalImage/deerTest1.png')}
            source={{uri: completeDrawUri}}
            // style={{backgroundColor: 'white'}}
            resizeMode="contain">
            {/* <Image
              style={{
                position: 'absolute',
                width: windowWidth,
                height: windowHeight * 0.8,
                resizeMode: 'contain',
              }}
              source={{uri: completeDrawUri}}
            /> */}
            <View style={{width: '100%', height: '100%'}} />
          </ImageBackground>
          {/* </View> */}
        </ViewShot>
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
              style={[styles.doneButton]}
              onPress={() => {
                dispatch(handleisSaveDrawnToLoginModalVisible(true));
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
    // borderWidth: 1,
  },
  bottomContainer: {
    // marginHorizontal: windowWidth * 0.01,
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
  },
});
