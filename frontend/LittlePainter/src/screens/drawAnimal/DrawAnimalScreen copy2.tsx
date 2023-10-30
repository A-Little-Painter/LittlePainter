// import React, {useCallback, useEffect, useRef, useState} from 'react';
import React, {useEffect, useState, useRef} from 'react';
import {
  StyleSheet,
  Dimensions,
  Text,
  View,
  TouchableOpacity,
  Image,
  Pressable,
  ToastAndroid, // 토스트안드로이드 잠깐 사용
} from 'react-native';
import {GestureResponderEvent} from 'react-native';
import ViewShot from 'react-native-view-shot';
import ImagePicker from 'react-native-image-crop-picker';
import {Svg, Path} from 'react-native-svg';
import type {StackScreenProps} from '@react-navigation/stack';
import {RootStackParams} from '../../navigations/AppNavigator';
import IconFontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import {RootState} from '../../redux/store';
import {useDispatch, useSelector} from 'react-redux';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import DrawLineThicknessModal from '../modals/DrawLineThicknessModal';
import OriginCompareModal from '../modals/OriginCompareModal';
import DrawColorPaletteModal from '../modals/DrawColorPaletteModal';
import DrawScreenshotModal from '../modals/DrawScreenshotModal';
import {
  handleLineThickness,
  handleisOriginCompareModalVisible,
  handleisDrawLineThicknessModalVisible,
  handleisDrawColorPaletteModalVisible,
  handleDrawColorSelect,
  handleIsDrawScreenshotModalVisible,
} from '../../redux/slices/draw/draw';

type DrawAnimalScreenProps = StackScreenProps<
  RootStackParams,
  'DrawAnimalScreen'
>;

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export default function DrawAnimalScreen({navigation}: DrawAnimalScreenProps) {
  // 캡쳐 변수
  const captureRef = useRef();

  // 그림 그리기 변수
  const [paths, setPaths] = useState<
    {path: string; color: string; strokeWidth: number}[]
  >([]);
  const [tmpPaths, setTmpPaths] = useState<
    {path: string; color: string; strokeWidth: number}[]
  >([]);
  const [currentPath, setCurrentPath] = useState<string>('');
  const [isClearButtonClicked, setClearButtonClicked] =
    useState<boolean>(false);

  const dispatch = useDispatch();
  // 선 굵기 모달을 위한 라인
  const LineThickness = useSelector(
    (state: RootState) => state.draw.LineThickness,
  );
  const isDrawLineThicknessModalVisible = useSelector(
    (state: RootState) => state.draw.isDrawLineThicknessModalVisible,
  );
  const isOriginCompareModalVisible = useSelector(
    (state: RootState) => state.draw.isOriginCompareModalVisible,
  );
  // 선 색깔 및 모달
  const isDrawColorPaletteModalVisible = useSelector(
    (state: RootState) => state.draw.isDrawColorPaletteModalVisible,
  );
  const drawColorSelect = useSelector(
    (state: RootState) => state.draw.drawColorSelect,
  );
  // 스크린샷 관련 모달
  const isDrawScreenshotModalVisible = useSelector(
    (state: RootState) => state.draw.isDrawScreenshotModalVisible,
  );

  // 캡쳐 이미지 조정하기
  const [croppedImage, setCroppedImage] = useState<string>('');
  const cropAndDisplayImage = async (captureUri: string) => {
    try {
      const image = await ImagePicker.openCropper({
        path: captureUri,
        width: 400,
        height: 400,
        cropping: false,
        mediaType: 'photo',
      });
      setCroppedImage(image.path);
      dispatch(handleIsDrawScreenshotModalVisible(true));
    } catch (error) {
      console.error('Image cropping error:', error);
    }
  };

  // 그림 그리기 함수
  const onTouchStart = (event: GestureResponderEvent) => {
    const locationX = event.nativeEvent.locationX;
    const locationY = event.nativeEvent.locationY;
    const point = `M${locationX.toFixed(0)},${locationY.toFixed(0)}`;
    // const point = `M${locationX.toFixed(0)},${locationY.toFixed(
    //   0,
    // )} L${locationX.toFixed(0)},${locationY.toFixed(0)}`;
    setCurrentPath(point);
    setTmpPaths([]);
  };

  const onTouchMove = (event: GestureResponderEvent) => {
    const locationX = event.nativeEvent.locationX;
    const locationY = event.nativeEvent.locationY;
    const newPoint = `L${locationX.toFixed(0)},${locationY.toFixed(0)}`;
    setCurrentPath(prevPath => prevPath + newPoint);
  };

  const [captureImagePath, setCaptureImagePath] = useState<string>('');
  const onTouchEnd = () => {
    if (currentPath) {
      setPaths([
        ...paths,
        {path: currentPath, color: drawColorSelect, strokeWidth: LineThickness},
      ]);
    }
    setCurrentPath('');
    setClearButtonClicked(false);
    captureRef.current.capture().then((uri: string) => {
      console.log('do something with ', uri);
      ToastAndroid.show(`캡쳐가 된당! ${uri}`, ToastAndroid.SHORT);
      setCaptureImagePath(uri);
      cropAndDisplayImage(uri);
    });
  };

  const handleClearButtonClick = () => {
    // setTmpPaths([...tmpPaths, ...paths]);
    setTmpPaths([]);
    setPaths([]);
    setCurrentPath('');
    setClearButtonClicked(true);
    setClearButtonClicked(false);
  };

  const handlePrevButtonClick = () => {
    const tmpPosition:
      | {path: string; color: string; strokeWidth: number}
      | undefined = paths.pop();
    if (tmpPosition) {
      setTmpPaths([...tmpPaths, tmpPosition]);
    }
  };
  const handleNextButtonClick = () => {
    const tmpPosition:
      | {path: string; color: string; strokeWidth: number}
      | undefined = tmpPaths.pop();
    if (tmpPosition) {
      setPaths([...paths, tmpPosition]);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // 화면에 들어올 때 실행될 코드
      dispatch(handleLineThickness(10));
    });

    return unsubscribe; // 컴포넌트가 언마운트 될 때 이벤트 리스너 해제
  }, [dispatch, navigation]);

  return (
    <View style={styles.mainContainer}>
      {/* <View style={styles.subContainer}> */}
      <View style={styles.subContainer}>
        {/* 상단 */}
        <View style={styles.topContainer}>
          {/* 연필 및 지우개 */}
          {/* <View style={styles.topLeft}>
          </View> */}
          <View style={styles.topMiddle}>
            {/* 연필 및 ctrl z, ctrl shift z */}
            <Pressable
              style={styles.pencilImageCircle}
              onPress={() => {
                navigation.navigate('DrawCaptureScreen');
              }}>
              <Image
                style={styles.drawEquipImage}
                source={require('../../assets/images/pencil.png')}
              />
            </Pressable>
            {/* 되돌리기 */}
            <TouchableOpacity
              style={styles.eraserImageCircle}
              disabled={!paths.length}
              onPress={() => {
                handlePrevButtonClick();
              }}>
              <Text>
                <IconFontAwesome
                  name="reply"
                  size={windowWidth * 0.05}
                  color={paths.length ? '#5E9FF9' : 'gray'}
                />
              </Text>
            </TouchableOpacity>
            {/* 되돌리기 취소 */}
            <TouchableOpacity
              style={styles.eraserImageCircle}
              disabled={!tmpPaths.length}
              onPress={() => {
                handleNextButtonClick();
              }}>
              <Text>
                <IconFontAwesome
                  name="share"
                  size={windowWidth * 0.05}
                  color={tmpPaths.length ? '#5E9FF9' : 'gray'}
                />
              </Text>
            </TouchableOpacity>
            {/* 색깔 */}
            <Pressable
              style={[styles.colorCircle, {backgroundColor: '#FF0000'}]}
              onPress={() => {
                dispatch(handleDrawColorSelect('#FF0000'));
              }}
            />
            <Pressable
              style={[styles.colorCircle, {backgroundColor: '#FF7A00'}]}
              onPress={() => {
                dispatch(handleDrawColorSelect('#FF7A00'));
              }}
            />
            <Pressable
              style={[styles.colorCircle, {backgroundColor: '#FAFF00'}]}
              onPress={() => {
                dispatch(handleDrawColorSelect('#FAFF00'));
              }}
            />
            <Pressable
              style={[styles.colorCircle, {backgroundColor: '#05FF00'}]}
              onPress={() => {
                dispatch(handleDrawColorSelect('#05FF00'));
              }}
            />
            <Pressable
              style={[styles.colorCircle, {backgroundColor: '#0500FF'}]}
              onPress={() => {
                dispatch(handleDrawColorSelect('#0500FF'));
              }}
            />
            <Pressable
              style={[styles.colorCircle, {backgroundColor: '#0300AA'}]}
              onPress={() => {
                dispatch(handleDrawColorSelect('#0300AA'));
              }}
            />
            <Pressable
              style={[styles.colorCircle, {backgroundColor: '#9E00FF'}]}
              onPress={() => {
                dispatch(handleDrawColorSelect('#9E00FF'));
              }}
            />
            <Pressable
              style={[styles.colorCircle, {backgroundColor: '#000000'}]}
              onPress={() => {
                dispatch(handleDrawColorSelect('#000000'));
              }}
            />
            <TouchableOpacity
              style={[styles.colorCircle]}
              onPress={() => {
                dispatch(handleisDrawColorPaletteModalVisible(true));
              }}>
              <Image
                style={styles.colorCircle}
                source={require('../../assets/images/colorSelect.png')}
              />
            </TouchableOpacity>
          </View>
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
          style={[styles.middleContainer, {backgroundColor: 'white'}]}
          ref={captureRef}
          options={{
            fileName: 'drawAnimalCapture',
            format: 'jpg',
            quality: 0.9,
          }}>
          <View
            style={{justifyContent: 'flex-end'}}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}>
            <Svg>
              {paths.map((item, index) => (
                <Path
                  key={`path-${index}`}
                  d={item.path}
                  stroke={isClearButtonClicked ? 'transparent' : item.color}
                  fill={'transparent'}
                  strokeWidth={item.strokeWidth}
                  strokeLinejoin={'round'}
                  strokeLinecap={'round'}
                />
              ))}
              <Path
                d={currentPath}
                stroke={isClearButtonClicked ? 'transparent' : drawColorSelect}
                fill={'transparent'}
                strokeWidth={LineThickness}
                strokeLinejoin={'round'}
                strokeLinecap={'round'}
              />
            </Svg>
          </View>
          {/* </View> */}
        </ViewShot>
        {/* 하단 */}
        <View style={styles.bottomContainer}>
          {/* 하단 좌측 */}
          <View style={styles.bottomContainerLeft}>
            <TouchableOpacity
              style={styles.ideaLightView}
              onPress={() => {
                dispatch(handleisOriginCompareModalVisible(true));
              }}>
              <Image
                style={styles.ideaLight}
                source={require('../../assets/images/ideaLight.png')}
                // source={{uri: captureImagePath}}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.lineThicknessView}
              onPress={() => {
                dispatch(handleisDrawLineThicknessModalVisible(true));
              }}>
              <View
                style={[
                  styles.lineThickness,
                  {
                    height: windowWidth * 0.1 * 0.005 * LineThickness,
                    backgroundColor: drawColorSelect,
                  },
                ]}
              />
            </TouchableOpacity>
            <View style={styles.bottomContainerLeftRight} />
          </View>
          {/* 하단 중앙 */}
          <View style={styles.bottomContainerMiddle}>
            <TouchableOpacity
              style={styles.clearButton}
              onPress={handleClearButtonClick}>
              <Text style={styles.clearButtonText}>모두 지우기</Text>
            </TouchableOpacity>
          </View>
          {/* 하단 우측 */}
          <View style={styles.bottomContainerRight}>
            <TouchableOpacity style={styles.doneButton} onPress={() => {}}>
              <Text style={styles.doneButtonText}>완성하기</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {isDrawLineThicknessModalVisible ? (
        <DrawLineThicknessModal selectColor={drawColorSelect} />
      ) : null}
      {isOriginCompareModalVisible ? <OriginCompareModal /> : null}
      {isDrawColorPaletteModalVisible ? <DrawColorPaletteModal /> : null}
      {isDrawScreenshotModalVisible ? (
        // <DrawScreenshotModal captureUri={captureImagePath} />
        <DrawScreenshotModal captureUri={croppedImage} />
      ) : null}
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
    paddingHorizontal: windowWidth * 0.01,
    flex: 0.1,
    flexDirection: 'row',
    width: '100%',
    alignSelf: 'center',
    borderBottomWidth: 1,
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
    width: windowWidth * 0.04,
    height: windowWidth * 0.04,
    borderRadius: windowWidth * 0.04 * 0.5,
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
    paddingHorizontal: windowWidth * 0.01,
    flex: 0.1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopWidth: 1,
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
