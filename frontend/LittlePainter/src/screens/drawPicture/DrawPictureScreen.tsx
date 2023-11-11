/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
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
  BackHandler,
  ImageBackground,
} from 'react-native';
import {GestureResponderEvent} from 'react-native';
import ViewShot from 'react-native-view-shot';
import {Svg, Path} from 'react-native-svg';
import type {StackScreenProps} from '@react-navigation/stack';
import {RootStackParams} from '../../navigations/AppNavigator';
import IconFontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import {RootState} from '../../redux/store';
import {useDispatch, useSelector} from 'react-redux';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import DrawLineThicknessModal from '../modals/DrawLineThicknessModal';
import OriginPictureModal from '../modals/OriginPictureModal';
import DrawColorPaletteModal from '../modals/DrawColorPaletteModal';
import {
  handleLineThickness,
  handleisOriginPictureModalVisible,
  handleDrawColorSelect,
  handleisTestDrawCompareModalVisible, // 그림 임시 비교 모달
} from '../../redux/slices/draw/draw';
import {
  friendsPictureBorder,
  friendsPictureSimilarity,
} from '../../apis/draw/draw';
import TestDrawCompareModal from '../modals/TestDrawCompareModal';
// 웹소켓 연결하기
import SockJS from 'sockjs-client';
import {CompatClient, Stomp} from '@stomp/stompjs';

type DrawPictureScreenProps = StackScreenProps<
  RootStackParams,
  'DrawPictureScreen'
>;

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const fastcolorData = [
  '#FF0000',
  '#FF7A00',
  '#FAFF00',
  '#05FF00',
  '#0500FF',
  '#0300AA',
  '#9E00FF',
  '#000000',
];

export default function DrawPictureScreen({
  route,
  navigation,
}: DrawPictureScreenProps) {
  //웹소켓
  ////////////////////////////
  // WebSocket 및 STOMP 클라이언트 설정
  const MAX_RECONNECT_ATTEMPTS = 5; // 최대 재연결 시도 횟수
  const RECONNECT_INTERVAL = 5000; // 재연결 간격 (밀리초)
  const reconnectAttemptsRef = useRef(0);
  const [client, setClient] = useState<CompatClient | null>(null);
  const [socketLinked, setSocketLinked] = useState<boolean>(false);
  const [similarityMessage, setSimilarityMessage] = useState<string>('');
  const [similarityState, setSimilarityState] = useState<string>('');
  const [similarityValue, setSimilarityValue] = useState<string>('');
  useEffect(() => {
    let newClient: CompatClient;

    const connectAndSetupListeners = () => {
      newClient = Stomp.over(() => new SockJS('http://k9d106.p.ssafy.io:8300/ws/draws/comm-similarity'));

      newClient.onConnect = frame => {
        console.log('연결됨');
        // console.log('Connected: ' + frame);
        setClient(newClient); // 연결 후 client 상태 업데이트
        setSocketLinked(true);
      };

      newClient.onWebSocketClose = () => {
        console.log('웹소켓 연결 끊김.');
        if (reconnectAttemptsRef.current < MAX_RECONNECT_ATTEMPTS) {
          // 최대 재연결 시도 횟수를 초과하지 않았다면 재연결 시도
          reconnectAttemptsRef.current += 1;
          setTimeout(() => {
            console.log('재연결 중...');
            connectAndSetupListeners();
          }, RECONNECT_INTERVAL);
        } else if ((reconnectAttemptsRef.current = 100)) {
          console.log('유저가 나감');
        } else {
          console.log(
            '최대 재연결 시도 횟수에 도달했습니다. 재연결 시도를 중단합니다.',
          );
        }
      };

      newClient.activate(); // 웹소켓 연결 활성화
    };

    connectAndSetupListeners();

    return () => {
      if (newClient && newClient.connected) {
        clearTimeout(reconnectAttemptsRef.current); // 이미 예약된 재연결 타임아웃을 취소합니다.
        reconnectAttemptsRef.current = 100; // 재연결 타임아웃 ID를 리셋합니다.
        newClient.deactivate(); // 웹소켓 연결 종료
        setSocketLinked(false);
      }
    };
  }, []);
  useEffect(() => {
    if (client) {
      client.subscribe('/sub/room/a', (message) => {
        const messageContent = JSON.parse(message.body);
        console.log('되나',messageContent);
        setSimilarityMessage(messageContent.message);
        setSimilarityState(messageContent.similarState);
        setSimilarityValue(messageContent.similarValue);
      });
    }
  }, [client]);
  useEffect(() => {
    if (similarityMessage === '유사도 연결에 성공하셨습니다.') {
      if (similarityState === 'END') {
        console.log('유사도: ', similarityValue);
        handleGoColoring();
      }
    } else if (similarityMessage === '유사도 측정에 실패했습니다.') {
      console.log('유사도: 0');
    }
  }, [similarityMessage, similarityState]);

  //////////////////////////////////////////////////////////////////////////////
  // 캡쳐 변수
  const drawCaptureRef = useRef(null); //테두리 그리기 캡쳐
  const originCaptureRef = useRef(null); //원본이미지 캡쳐
  // 임시 이미지 비교 변수
  const isTestDrawCompareModalVisible = useSelector(
    (state: RootState) => state.draw.isTestDrawCompareModalVisible,
  );
  const [pictureId] = useState<number>(
    route.params.friendsAnimalInfo.friendsAnimalId,
  );
  const [pictureOriginImageUri] = useState<string>(
    route.params.friendsAnimalInfo.originalImageUrl,
  );
  const [pictureTitle] = useState<string>(route.params.friendsAnimalInfo.title);
  const [animalType] = useState<string>(route.params.friendsAnimalInfo.animalType);
  const [pictureBorderURI, setPictureBorderURI] = useState<string>('');
  const [pictureExplanation, setPictureExplanation] = useState<string>('');
  const [captureImagePath, setCaptureImagePath] = useState<string>('');
  const [captureBorderImagePath, setCaptureBorderImagePath] =
    useState<string>('');
  const [canDrawCapture, setCanDrawCapture] = useState<boolean>(false);
  // 뒤로가기 변수
  const [backHandleNum, setBackHandleNum] = useState<number>(0);

  // 그림 그리기 변수
  const [paths, setPaths] = useState<
    {path: string; color: string; strokeWidth: number}[]
  >([]);
  const [tmpPaths, setTmpPaths] = useState<
    {path: string; color: string; strokeWidth: number}[]
  >([]);
  const [currentPath, setCurrentPath] = useState<string>('');

  const dispatch = useDispatch();
  // 선 굵기 모달을 위한 라인
  const LineThickness = useSelector(
    (state: RootState) => state.draw.LineThickness,
  );
  const isDrawLineThicknessModalVisible = useSelector(
    (state: RootState) => state.draw.isDrawLineThicknessModalVisible,
  );
  const isOriginPictureModalVisible = useSelector(
    (state: RootState) => state.draw.isOriginPictureModalVisible,
  );
  // 선 색깔 및 모달
  const isDrawColorPaletteModalVisible = useSelector(
    (state: RootState) => state.draw.isDrawColorPaletteModalVisible,
  );
  const drawColorSelect = useSelector(
    (state: RootState) => state.draw.drawColorSelect,
  );

  // 서버 통신
  const handleFriendsPictureBorder = async () => {
    try {
      const response = await friendsPictureBorder(pictureId);
      if (response.status === 200) {
        console.log(
          '다른 사람이 올린 사진 테두리 가져오기 성공',
          response.data,
        );
        setPictureBorderURI(response.data.urlTrace);
        setPictureExplanation(response.data.detail);
        handleOriginCapture();
      } else {
        console.log(
          '다른 사람이 올린 사진 테두리 가져오기 실패',
          response.status,
        );
      }
    } catch (error) {
      console.log('다른 사람이 올린 사진 테두리 가져오기 실패', error);
    }
  };
  const handlefriendsPictureSimilarity = async (compareImagePath: string) => {
    // const randomInt = Math.floor(Math.random() * (100 - 1 + 1) + 1);
    try {
      const response = await friendsPictureSimilarity(
        // `abc${randomInt}`,
        'a',
        captureBorderImagePath,
        compareImagePath,
      );
      if (response.status === 200 || response.status === 404) {
        console.log('유사도 검사 성공', response.data);
      } else {
        console.log('유사도 검사 실패', response.status);
      }
    } catch (error) {
      console.log('유사도 검사 체크 실패', error);
    }
  };

  async function handleDrawCapture() {
    try {
      setCanDrawCapture(true);
      const uri = await drawCaptureRef.current.capture();
      setCaptureImagePath(uri);
      setCanDrawCapture(false);
      await handlefriendsPictureSimilarity(uri);
    } catch (error) {
      setCanDrawCapture(false);
      console.error('캡쳐 에러 발생: ', error);
    }
  }
  async function handleOriginCapture() {
    try {
      const uri = await originCaptureRef.current.capture();
      setCaptureBorderImagePath(uri);
    } catch (error) {
      console.error('원본 이미지 캡쳐 에러 발생: ', error);
    }
  }

  // 초기 테두리 원본 캡쳐
  useEffect(() => {
    setTimeout(() => {
      handleOriginCapture();
    }, 500);
  }, [pictureBorderURI]);

  useEffect(() => {
    handleFriendsPictureBorder();
  }, []);

  // 그림 그리기 함수
  const onTouchStart = (event: GestureResponderEvent) => {
    const locationX = event.nativeEvent.locationX;
    const locationY = event.nativeEvent.locationY;
    const point = `M${locationX.toFixed(0)},${locationY.toFixed(0)}`;
    setCurrentPath(point);
    setTmpPaths([]);
  };

  const onTouchMove = (event: GestureResponderEvent) => {
    const locationX = event.nativeEvent.locationX;
    const locationY = event.nativeEvent.locationY;
    const newPoint = `L${locationX.toFixed(0)},${locationY.toFixed(0)}`;
    setCurrentPath(prevPath => prevPath + newPoint);
  };

  const onTouchEnd = () => {
    if (currentPath) {
      setPaths([
        ...paths,
        {path: currentPath, color: drawColorSelect, strokeWidth: LineThickness},
      ]);
    }
    setCurrentPath('');
  };

  const handleClearButtonClick = () => {
    setTmpPaths([]);
    setPaths([]);
    setCurrentPath('');
  };

  const handlePrevButtonClick = () => {
    const tmpPosition:
      | {path: string; color: string; strokeWidth: number}
      | undefined = paths.pop();
    if (tmpPosition) {
      setTmpPaths([...tmpPaths, tmpPosition]);
      handleDrawCapture();
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

  // 화면 캡쳐 동작 useEffect
  useEffect(() => {
    if (captureBorderImagePath !== '') {
      handleDrawCapture();
    }
  }, [paths]);

  useEffect(() => {
    dispatch(handleDrawColorSelect('#000000'));
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // 화면에 들어올 때 실행될 코드
      // dispatch(handleLineThickness(10));
      dispatch(handleLineThickness(5));
    });

    return unsubscribe; // 컴포넌트가 언마운트 될 때 이벤트 리스너 해제
  }, [dispatch, navigation]);

  //뒤로가기 2번시 뒤로가기
  useEffect(() => {
    const backAction = () => {
      if (navigation.isFocused()) {
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
          navigation.goBack();
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

  // 테두리 그리기 완료 후
  const handleGoColoring = () => {
    navigation.navigate('ColoringPictureScreen', {
      pictureId: pictureId,
      pictureTitle: pictureTitle,
      completeLine: paths,
      pictureBorderURI: pictureBorderURI,
      pictureExplanation: pictureExplanation,
      pictureOriginImageUri: pictureOriginImageUri,
      animalType: animalType,
    });
  };
  return (
    <View style={styles.mainContainer}>
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
                dispatch(handleisTestDrawCompareModalVisible(true));
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
            {fastcolorData.map((color, index) => (
              <Pressable
                key={index}
                style={[styles.colorCircle, {backgroundColor: color}]}
                onPress={() => {
                  ToastAndroid.show(
                    '테두리 그리기에서는 색을 고를 수 없어요.',
                    ToastAndroid.SHORT,
                  );
                }}
              />
            ))}
            <TouchableOpacity
              style={[styles.colorCircle]}
              onPress={() => {
                ToastAndroid.show(
                  '테두리 그리기에서는 색을 고를 수 없어요.',
                  ToastAndroid.SHORT,
                );
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
        <ViewShot
          style={styles.middleContainer}
          ref={originCaptureRef}
          options={{
            fileName: 'originImageCapture',
            format: 'png',
            quality: 1,
          }}>
          {pictureBorderURI === '' ? null : (
            <ImageBackground
              source={{uri: pictureBorderURI}}
              // source={{uri: 'https://littlepainter.s3.ap-northeast-2.amazonaws.com/bf8169aa1ed346d7b90eaa98767e2902_trace.png'}}
              // source={require('../../assets/images/animalImage/ovalTest.png')}
              style={styles.pictureBorderImageBackground}
              imageStyle={styles.backgroundImageOpacity}
              resizeMode="contain">
              {/* <View style={{position:'absolute', width: 500, height: 500, backgroundColor:'red'}} /> */}
              {captureBorderImagePath !== '' && socketLinked ? (
                <ViewShot
                  ref={drawCaptureRef}
                  options={{
                    fileName: 'drawCapture',
                    format: 'png',
                    quality: 1,
                  }}
                  style={[
                    styles.pathViewShot,
                    // eslint-disable-next-line react-native/no-inline-styles
                    {backgroundColor: canDrawCapture ? '#FFFFFF' : 'transparent'},
                  ]}>
                  <View
                    style={styles.pathView}
                    onTouchStart={onTouchStart}
                    onTouchMove={onTouchMove}
                    onTouchEnd={onTouchEnd}>
                    <Svg>
                      {paths.map((item, index) => (
                        <Path
                          key={`path-${index}`}
                          d={item.path}
                          stroke={item.color}
                          fill={'transparent'}
                          strokeWidth={item.strokeWidth}
                          strokeLinejoin={'round'}
                          strokeLinecap={'round'}
                        />
                      ))}
                      <Path
                        d={currentPath}
                        stroke={drawColorSelect}
                        fill={'transparent'}
                        strokeWidth={LineThickness}
                        strokeLinejoin={'round'}
                        strokeLinecap={'round'}
                      />
                    </Svg>
                  </View>
                </ViewShot>
              ) : null}
            </ImageBackground>
          )}
          {/* </View> */}
        </ViewShot>
        {/* 하단 */}
        <View style={styles.bottomContainer}>
          {/* 하단 좌측 */}
          <View style={styles.bottomContainerLeft}>
            <TouchableOpacity
              style={styles.ideaLightView}
              onPress={() => {
                dispatch(handleisOriginPictureModalVisible(true));
              }}>
              <Image
                style={styles.ideaLight}
                source={require('../../assets/images/ideaLight.png')}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.lineThicknessView}
              onPress={() => {
                ToastAndroid.show(
                  '테두리 그리기에서는 선의 굵기를 바꿀 수 없어요.',
                  ToastAndroid.SHORT,
                );
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
              onPress={() => {
                handleClearButtonClick();
              }}>
              <Text style={styles.clearButtonText}>모두 지우기</Text>
            </TouchableOpacity>
          </View>
          {/* 하단 우측 */}
          <View style={styles.bottomContainerRight}>
            <TouchableOpacity
              style={[
                styles.doneButton,
                // eslint-disable-next-line react-native/no-inline-styles
                {
                  backgroundColor:
                    captureImagePath === '' || paths.length === 0
                      ? 'gray'
                      : '#A8CEFF',
                },
              ]}
              onPress={() => {
                handleGoColoring();
              }}
              disabled={captureImagePath === '' || paths.length === 0}>
              <Text style={styles.doneButtonText}>테두리완성</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {isDrawLineThicknessModalVisible ? (
        <DrawLineThicknessModal selectColor={drawColorSelect} />
      ) : null}
      {isOriginPictureModalVisible ? (
        <OriginPictureModal
          pictureTitle={pictureTitle}
          pictureBorderURI={pictureBorderURI}
          pictureOriginImageUri={pictureOriginImageUri}
          pictureExplanation={pictureExplanation}
        />
      ) : null}
      {isDrawColorPaletteModalVisible ? <DrawColorPaletteModal /> : null}
      {/* 유사도 검사 작동시 삭제할 예정 */}
      {isTestDrawCompareModalVisible ? (
        <TestDrawCompareModal
          originImageURI={captureBorderImagePath}
          compareImageURI={captureImagePath}
        />
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
    flex: 0.1,
    flexDirection: 'row',
    borderBottomWidth: 1,
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
    width: '100%',
    backgroundColor: 'white',
  },
  pictureBorderImageBackground: {
    width: '100%',
    height: '100%',
  },
  backgroundImageOpacity: {
    opacity: 0.3,
  },
  pathViewShot: {
    width: '100%',
    height: '100%',
    // borderWidth: 1,
  },
  pathView: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
  },
  borderImage: {
    position: 'absolute',
    width: windowWidth,
    height: windowHeight * 0.8,
    resizeMode: 'contain',
  },
  bottomContainer: {
    borderTopWidth: 1,
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
