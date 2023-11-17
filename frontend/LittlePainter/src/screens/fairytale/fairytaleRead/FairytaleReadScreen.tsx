/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  // Image,
  ImageBackground,
  View,
  Dimensions,
  Text,
  TouchableOpacity,
  Animated,
  ToastAndroid,
  BackHandler,
  Easing,
} from 'react-native';
import type {StackScreenProps} from '@react-navigation/stack';
import {RootStackParams} from '../../../navigations/AppNavigator';
import IconFontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import {RootState} from '../../../redux/store';
import {useDispatch, useSelector} from 'react-redux';
import {
  handleisTalePageScriptModalVisible,
  handleisFairytaleEndingPageVisible,
  handlePageNum,
  handleIsDrawReadDone,
  handleIsReReading,
  handleTaleDrawedImageInitial,
  // handleTaleDrawedImage,
} from '../../../redux/slices/tale/tale';
import {
  handleisSaveDrawnToLoginModalVisible,
  handleHavingGifUrl,
} from '../../../redux/slices/draw/draw';
import {talePageListInquiry, taleSaveToMypage} from '../../../apis/draw/draw';
import TalePageScriptModal from '../../modals/TalePageScriptModal';
import SaveDrawnToLoginModal from '../../modals/SaveDrawnToLoginModal';
import FairytaleEndingPage from './FairytaleEndingPage';
import {
  FairytaleReadScreenType,
  FairyTaleInfoType,
  CharactersInfoType,
} from '../fairytaleType';
import Tts from 'react-native-tts';
import {
  handleBGMMusic,
  handleIsLoop,
  handleSoundEffect,
} from '../../../redux/slices/music/music';
import {AppState} from 'react-native';
type FairytaleReadScreenProps = StackScreenProps<
  RootStackParams,
  'FairytaleReadScreen'
>;

const windowWidth: number = Dimensions.get('window').width;
const windowHeight: number = Dimensions.get('window').height;

Tts.setDefaultLanguage('ko-KR');
Tts.setDefaultRate(0.5);
Tts.setDefaultVoice('ko-KR-SMTf00');

export default function FairytaleReadScreen({
  navigation,
  route,
}: FairytaleReadScreenProps) {
  ///////////////////////////
  // 뒤로가기 변수
  // 뒤로가기 변수
  const [backHandleNum, setBackHandleNum] = useState<number>(0);
  //뒤로가기 2번시 뒤로가기
  useEffect(() => {
    const backAction = () => {
      if (navigation.isFocused()) {
        if (backHandleNum === 0) {
          setBackHandleNum(1);
          ToastAndroid.show(
            '뒤로가기를 한 번 더 누르면 동화 선택 페이지로 돌아갑니다.',
            ToastAndroid.SHORT,
          );
          setTimeout(() => {
            setBackHandleNum(0);
          }, 1000);
          return true; // 뒤로가기 이벤트 무시하지 않도록 설정
        } else if (backHandleNum === 1) {
          dispatch(handlePageNum(1));
          navigation.navigate('SelectFairytaleScreen');
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
  ///////////////////////////

  const dispatch = useDispatch();
  const isTalePageScriptModalVisible = useSelector(
    (state: RootState) => state.tale.isTalePageScriptModalVisible,
  );
  const isFairytaleEndingPageVisible = useSelector(
    (state: RootState) => state.tale.isFairytaleEndingPageVisible,
  );
  const pageNum = useSelector((state: RootState) => state.tale.pageNum);
  const isDrawReadDone = useSelector(
    (state: RootState) => state.tale.isDrawReadDone,
  );
  const isReReading = useSelector((state: RootState) => state.tale.isReReading);
  const taleDrawedImage = useSelector(
    (state: RootState) => state.tale.taleDrawedImage,
  );
  const isSaveDrawnToLoginModalVisible = useSelector(
    (state: RootState) => state.draw.isSaveDrawnToLoginModalVisible,
  );
  const [isSavedImage, setIsSavedImage] = useState<boolean>(false);
  const isLogin = useSelector((state: RootState) => state.user.isLogin);
  const [fairytaleTitle] = useState<FairytaleReadScreenType['title']>(
    route.params.title,
  );
  const [taleId] = useState<FairytaleReadScreenType['taleId']>(
    route.params.taleId,
  );
  const [contentLines, setContentLines] = useState<string[]>([]);

  const [fairytaleData, setFairytaleData] = useState<FairyTaleInfoType[]>([]);
  const [maxPage, setMaxPage] = useState<number>(1);
  const [charactersInfo, setCharactersInfo] = useState<CharactersInfoType[]>(
    [],
  );

  const handleTalePageListInquiry = async () => {
    try {
      dispatch(handleTaleDrawedImageInitial([]));
      const response = await talePageListInquiry(taleId);
      if (response.status === 200) {
        // console.log('동화 페이지 전체 데이터 조회하기 성공', response.data);
        console.log('동화 페이지 전체 데이터 조회하기 성공');
        setFairytaleData(response.data);
        // console.log(response.data);
        // console.log(response.data[0].characters);
        // console.log(response.data);
        if (response.data.length) {
          setMaxPage(response.data.length);
        }
      } else {
        console.log('동화 페이지 전체 데이터 조회하기 실패', response.status);
      }
    } catch (error) {
      console.log('동화 페이지 전체 데이터 조회하기 실패', error);
    }
  };

  function handlePressSaving() {
    if (isLogin && !isSavedImage) {
      handleTaleSaveToMypage();
    } else if (isLogin && isSavedImage) {
      ToastAndroid.show(
        '내가 그린 그림은 이미 저장되었어요🐣',
        ToastAndroid.SHORT,
      );
    } else {
      dispatch(handleisSaveDrawnToLoginModalVisible(true));
    }
  }

  const handleTaleSaveToMypage = async () => {
    try {
      const response = await taleSaveToMypage(taleId, taleDrawedImage);
      if (response.status === 200) {
        console.log('동화 그림 마이페이지에 저장하기 저장', response.data);
        ToastAndroid.show(
          '내가 그린 동화 친구들이 저장되었어요🐇',
          ToastAndroid.SHORT,
        );
        setIsSavedImage(true);
        dispatch(handleHavingGifUrl(false));
      } else {
        console.log('동화 그림 마이페이지에 저장하기 실패', response.status);
      }
    } catch (error) {
      console.log('동화 그림 마이페이지에 저장하기 실패', error);
    }
  };
  // useEffect(() => {
  //   return () => {
  //     dispatch(handleHavingGifUrl(false));
  //   };
  // }, []);

  useEffect(() => {
    dispatch(handleIsDrawReadDone(false));
    dispatch(handleIsReReading(false));
    handleTalePageListInquiry();
    return () => {
      dispatch(handleHavingGifUrl(false));
    };
  }, []);
  useEffect(() => {
    dispatch(handleIsLoop(0));
    return () => {
      dispatch(handleIsLoop(-1));
    };
  }, [pageNum]);

  useEffect(() => {
    if (fairytaleData.length) {
      dispatch(handleBGMMusic(fairytaleData[pageNum - 1].urlSound));
    }
    return () => {};
  }, [pageNum, fairytaleData]);

  useEffect(() => {
    if (fairytaleData.length !== 0) {
      try {
        setCharactersInfo(fairytaleData[pageNum - 1].characters);
        Tts.stop();

        // 자막 & tts
        const lineChunks: string[] =
          fairytaleData[pageNum - 1].narration.split('\n');
        const initialLines: string[] = lineChunks.slice(0, 1);
        setContentLines(initialLines);
        console.log(initialLines[0]);
        Tts.speak(initialLines[0], {
          androidParams: {
            KEY_PARAM_VOLUME: 1,
          },
        });

        let lineIndex: number = 1;

        const speakNextLine = () => {
          if (lineIndex < lineChunks.length) {
            const newLines = lineChunks.slice(lineIndex, lineIndex + 1);
            setContentLines(newLines);
            console.log(newLines);
            Tts.speak(newLines[0]);
            lineIndex += 1;
          }
        };

        const ttsFinishListener = Tts.addEventListener('tts-finish', event => {
          // TTS 읽기 완료 시 실행될 코드
          console.log('TTS finished');
          console.log('TTS finished');
          speakNextLine();
        });

        // speakNextLine();

        return () => {
          Tts.stop();
          ttsFinishListener.remove();
        };
      } catch {
        setCharactersInfo(fairytaleData[pageNum - 1].characters);
        // 자막
        const lineChunks: string[] =
          fairytaleData[pageNum - 1].narration.split('\n');
        const initialLines: string[] = lineChunks.slice(0, 1);
        setContentLines(initialLines);
        console.log(initialLines[0]);
        let lineIndex: number = 1;
        let interval: NodeJS.Timeout | undefined;
        interval = setInterval(() => {
          if (lineIndex < lineChunks.length) {
            const newLines = lineChunks.slice(lineIndex, lineIndex + 1);
            setContentLines(newLines);
            console.log(newLines);
            lineIndex += 1;
          } else {
            clearInterval(interval);
          }
        }, 5000);
        return () => {
          clearInterval(interval);
        };
      }
    }
  }, [pageNum, fairytaleData]);

  useEffect(() => {
    // AppState를 사용하여 앱 상태 변화 감지
    const subscription = AppState.addEventListener(
      'change',
      handleAppStateChange,
    ); // 이벤트 리스너 추가
    return () => {
      subscription(); // 이벤트 리스너 해제
    };
  }, []);

  const handleAppStateChange = nextAppState => {
    if (nextAppState === 'inactive' || nextAppState === 'background') {
      Tts.stop();
    }
  };

  // useEffect(() => {
  //   if (fairytaleData.length !== 0) {
  //     setCharactersInfo(fairytaleData[pageNum - 1].characters);
  //     Tts.stop();
  //     // 자막
  //     const lineChunks: string[] =
  //       fairytaleData[pageNum - 1].narration.split('\n');
  //     const initialLines: string[] = lineChunks.slice(0, 1);
  //     setContentLines(initialLines);
  //     console.log(initialLines[0]);
  //     Tts.speak(initialLines[0]);
  //     let lineIndex: number = 1;
  //     let interval: NodeJS.Timeout | undefined;
  //     interval = setInterval(() => {
  //       if (lineIndex < lineChunks.length) {
  //         const newLines = lineChunks.slice(lineIndex, lineIndex + 1);
  //         setContentLines(newLines);
  //         console.log(newLines);
  //         Tts.speak(newLines[0]);
  //         lineIndex += 1;
  //       } else {
  //         clearInterval(interval);
  //       }
  //     }, 5000);
  //     return () => {
  //       Tts.stop();
  //       clearInterval(interval);
  //     };
  //   }
  // }, [pageNum, fairytaleData]);

  useEffect(() => {
    return () => {
      dispatch(handleisFairytaleEndingPageVisible(false));
    };
  }, [dispatch]);

  // 움직이게 하기
  const imageMoving = (
    characterName: string,
    startX: number,
    startY: number,
    endX: number,
    endY: number,
    toEndDurationValue: number,
    toStartDurationValue: number,
  ) => {
    // let moveX = new Animated.Value(startX);
    // let moveY = new Animated.Value(startY);
    let ySizeValue: number = 0.2;
    if (
      characterName === '총각' ||
      characterName === '아줌마' ||
      characterName === '방망이' ||
      characterName === '새우2'
    ) {
      ySizeValue = 0.4;
    } else if (characterName === '새우1') {
      ySizeValue = 1.3 * 0.5;
    }
    const tmpstartX = 0 + windowWidth * startX;
    const tmpstartY = -windowHeight * 0.65 * ySizeValue + windowHeight * startY;
    const tmpendX = 0 + windowWidth * endX;
    const tmpendY = -windowHeight * 0.65 * ySizeValue + windowHeight * endY;
    let moveX = new Animated.Value(tmpstartX);
    let moveY = new Animated.Value(tmpstartY);
    // let toEndDurationValue: number = 1000;
    // let toStartDurationValue: number = 1000;

    // if (characterName === '방망이'){
    //   toEndDurationValue = 2000;
    //   toStartDurationValue = 2000;
    // }
    Animated.loop(
      Animated.sequence([
        Animated.timing(moveX, {
          // toValue: endX,
          toValue: tmpendX,
          duration: toEndDurationValue,
          useNativeDriver: false,
        }),
        Animated.timing(moveX, {
          // toValue: startX,
          toValue: tmpstartX,
          duration: toStartDurationValue,
          useNativeDriver: false,
        }),
      ]),
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(moveY, {
          // toValue: endY,
          toValue: tmpendY,
          duration: toEndDurationValue,
          useNativeDriver: false,
        }),
        Animated.timing(moveY, {
          // toValue: startY,
          toValue: tmpstartY,
          duration: toStartDurationValue,
          useNativeDriver: false,
        }),
      ]),
    ).start();
    return [moveX, moveY];
  };
  const fadeIn = (fadeAnim, fadeinDurationValue) => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: fadeinDurationValue,
      useNativeDriver: false,
    }).start();
  };

  const fadeOut = (fadeAnim, fadeoutDurationValue) => {
    // Will change fadeAnim value to 0 in 3 seconds
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: fadeoutDurationValue,
      useNativeDriver: false,
    }).start();
  };

  ////// 회전 애니메이션
  const [rotation] = useState(new Animated.Value(0));
  useEffect(() => {
    const rotateImage = () => {
      Animated.timing(rotation, {
        toValue: 360,
        duration: 1000, // 회전에 걸리는 시간 (밀리초)
        easing: Easing.linear,
        useNativeDriver: false, // 필요에 따라 변경
      }).start(() => {
        rotation.setValue(0); // 애니메이션이 끝나면 초기 각도로 돌아감
        rotateImage();
      });
    };
    rotateImage();
  }, []);

  const spin = rotation.interpolate({
    inputRange: [0, 360],
    outputRange: ['0deg', '360deg'],
  });
  ////////////

  return (
    <View style={styles.mainContainer}>
      {fairytaleData.length ? (
        <ImageBackground
          // source={require('../../../assets/bgImage/taleBackground.png')}
          source={{uri: fairytaleData[pageNum - 1].urlBackground}}
          resizeMode="cover"
          style={styles.backgroundImage}>
          <View style={styles.subContainer}>
            {/* 상단 */}
            <View style={styles.topContainer}>
              <View>
                <Text style={styles.fairytaleTitle}>{fairytaleTitle}</Text>
              </View>
              {/* X버튼 */}
              <TouchableOpacity
                onPress={() => {
                  dispatch(handlePageNum(1));
                  dispatch(handleSoundEffect('btn'));
                  navigation.navigate('MainScreen');
                }}
                style={styles.xCircle}>
                <Text style={styles.xText}>
                  <IconFontAwesome6
                    name="x"
                    size={windowHeight * 0.05}
                    color={'#A6D934'}
                  />
                </Text>
              </TouchableOpacity>
            </View>
            {/* 중단 */}
            <View style={styles.middleContainer}>
              {/* 중단 좌측 */}
              <View style={styles.middleLeftContainer}>
                {pageNum === 1 ? null : (
                  <TouchableOpacity
                    onPress={() => {
                      dispatch(handleSoundEffect('btn'));
                      if (isFairytaleEndingPageVisible) {
                        dispatch(handleisFairytaleEndingPageVisible(false));
                      } else if (pageNum > 1) {
                        dispatch(handlePageNum(pageNum - 1));
                      }
                    }}
                    style={styles.xCircle}>
                    <Text style={styles.xText}>
                      <IconAntDesign
                        name="caretleft"
                        size={windowHeight * 0.05}
                        color={'#A6D934'}
                      />
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
              {/* 중단 중앙 */}
              <View style={styles.middleCenterContainer}>
                {isFairytaleEndingPageVisible ? (
                  <FairytaleEndingPage fairytaleTitle={fairytaleTitle} />
                ) : null}
                {charactersInfo.map((item, index) => {
                  // 탐색할 taleDrawedImage 객체를 찾는다.
                  const matchedImage = taleDrawedImage.find(
                    drawnItem => drawnItem.characterName === item.characterName,
                  );
                  let toEndDurationValue = 1000;
                  let toStartDurationValue = 1000;
                  if (pageNum === 9 && item.characterName === '방망이') {
                    toEndDurationValue = 2000;
                    toStartDurationValue = 2000;
                  }
                  const [moveX, moveY] = imageMoving(
                    item.characterName,
                    item.startX,
                    item.startY,
                    item.endX,
                    item.endY,
                    toEndDurationValue,
                    toStartDurationValue,
                  );
                  let fadeinDurationValue = 500;
                  let fadeoutDurationValue = 0;
                  let fadeAnim =
                    (pageNum === 7 && item.characterName === '방망이') ||
                    (pageNum === 9 && item.characterName === '새우2')
                      ? new Animated.Value(0)
                      : new Animated.Value(1);
                  if (isFairytaleEndingPageVisible) {
                    fadeinDurationValue = 0;
                    fadeOut(fadeAnim, fadeoutDurationValue);
                  } else if (
                    (pageNum === 7 && item.characterName === '방망이') ||
                    (pageNum === 9 && item.characterName === '새우2')
                  ) {
                    fadeinDurationValue = 100;
                    if (pageNum === 9 && item.characterName === '새우2') {
                      setTimeout(() => {
                        fadeIn(fadeAnim, fadeinDurationValue);
                      }, 2000);
                    } else {
                      fadeIn(fadeAnim, fadeinDurationValue);
                    }
                  } else if (
                    pageNum === 9 &&
                    (item.characterName === '방망이' ||
                      item.characterName === '새우1')
                  ) {
                    fadeoutDurationValue = 0;
                    setTimeout(() => {
                      fadeOut(fadeAnim, fadeoutDurationValue);
                    }, 2000);
                  }

                  // const [moveX, moveY] = imageMoving(-windowWidth / 4, 0, windowWidth / 5, -windowHeight / 4);
                  return isDrawReadDone && matchedImage ? (
                    // 만약 isDrawReadDone이 true이고, 위에서 찾은 객체가 존재하면 그 객체의 gifUri를 사용한다.
                    <Animated.Image
                      key={index}
                      source={{uri: matchedImage.contentUri.gifUri}}
                      style={[
                        item.characterName === '총각' ||
                        item.characterName === '아줌마' ||
                        (item.characterName === '방망이' && pageNum !== 8) ||
                        item.characterName === '새우2'
                          ? styles.fairytaleImage
                          : item.characterName === '새우1'
                          ? styles.fairytaleImageShirmp1
                          : styles.fairytaleImageLittle,
                        {
                          transform: [{translateX: moveX}, {translateY: moveY}],
                          opacity: fadeAnim,
                        },
                        // {transform: [{translateX: moveX}, {translateY: moveY}, {rotate: (item.characterName === '방망이' && pageNum !== 7) ? spin : '0deg'}], opacity: fadeAnim},
                      ]}
                    />
                  ) : (
                    // 그렇지 않다면 기존의 로직을 따른다.
                    <Animated.Image
                      key={index}
                      source={{
                        uri: item.urlGif ? item.urlGif : item.urlOriginal,
                      }}
                      style={[
                        item.characterName === '총각' ||
                        item.characterName === '아줌마' ||
                        (item.characterName === '방망이' && pageNum !== 8) ||
                        item.characterName === '새우2'
                          ? styles.fairytaleImage
                          : item.characterName === '새우1'
                          ? styles.fairytaleImageShirmp1
                          : styles.fairytaleImageLittle,
                        {
                          transform: [
                            {translateX: moveX},
                            {translateY: moveY},
                            {
                              rotate:
                                item.characterName === '방망이' && pageNum !== 7
                                  ? spin
                                  : '0deg',
                            },
                          ],
                          opacity: fadeAnim,
                        },
                        // {transform: [{translateX: moveX}, {translateY: moveY}], opacity: fadeAnim},
                      ]}
                    />
                  );
                })}
              </View>
              {/* 중단 우측 */}
              <View style={styles.middleRightContainer}>
                {isFairytaleEndingPageVisible ? null : (
                  <TouchableOpacity
                    onPress={() => {
                      dispatch(handleSoundEffect('btn'));
                      if (isDrawReadDone && isReReading) {
                        // 다 그리고, 읽기 중이라면
                        if (maxPage > pageNum) {
                          dispatch(handlePageNum(pageNum + 1));
                        } else if (maxPage === pageNum) {
                          dispatch(handleisFairytaleEndingPageVisible(true));
                        }
                      } else if (isDrawReadDone && !isReReading) {
                        // 다 그리고, 읽기 중이 아니라면
                        if (maxPage > pageNum) {
                          dispatch(handlePageNum(pageNum + 1));
                        } else if (maxPage === pageNum) {
                          dispatch(handleIsDrawReadDone(true));
                          dispatch(handleIsReReading(true));
                          dispatch(handlePageNum(1));
                        }
                      } else if (!isDrawReadDone && !isReReading) {
                        // if (maxPage > pageNum){
                        //   dispatch(handlePageNum(pageNum + 1));
                        // } else if (maxPage === pageNum){
                        //   dispatch(handleIsDrawReadDone(true));
                        //   dispatch(handleIsReReading(true));
                        //   dispatch(handlePageNum(1));
                        // }
                        // 다 그리지도 않고, 읽기 중도 아니라면
                        if (fairytaleData[pageNum - 1].drawing) {
                          const characterPageId =
                            fairytaleData[pageNum - 1].talePageId;
                          navigation.navigate('DrawFairytaleScreen', {
                            charactersInfo,
                            fairytaleTitle: fairytaleTitle,
                            characterPageId,
                          });
                        } else if (maxPage > pageNum) {
                          dispatch(handlePageNum(pageNum + 1));
                        } else if (maxPage === pageNum) {
                          dispatch(handleIsDrawReadDone(true));
                          dispatch(handleisFairytaleEndingPageVisible(true));
                        }
                      }
                    }}
                    style={styles.xCircle}>
                    <Text style={styles.xText}>
                      <IconAntDesign
                        name="caretright"
                        size={windowHeight * 0.05}
                        color={'#A6D934'}
                      />
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
            {/* 하단 */}
            {isFairytaleEndingPageVisible ? (
              isDrawReadDone && !isReReading ? (
                <View style={styles.bottomContainerEndingToRereading}>
                  {/* 다시보기 */}
                  <TouchableOpacity
                    style={styles.endingBoxToRereading}
                    onPress={() => {
                      dispatch(handleSoundEffect('btn'));
                      dispatch(handleIsReReading(true));
                      dispatch(handlePageNum(1));
                      dispatch(handleisFairytaleEndingPageVisible(false));
                    }}>
                    <Text style={styles.endingBoxTextToRereading}>
                      내가 그린 그림으로 다시보기
                    </Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <View style={styles.bottomContainerEnding}>
                  {/* 다시보기 */}
                  <TouchableOpacity
                    style={styles.endingBox}
                    onPress={() => {
                      dispatch(handleSoundEffect('btn'));
                      dispatch(handlePageNum(1));
                      dispatch(handleisFairytaleEndingPageVisible(false));
                    }}>
                    <Text style={styles.endingBoxText}>다시보기</Text>
                  </TouchableOpacity>
                  {/* 저장하기 */}
                  <TouchableOpacity
                    style={styles.endingBox}
                    onPress={() => {
                      handlePressSaving();
                      dispatch(handleSoundEffect('btn'));
                    }}>
                    <Text style={styles.endingBoxText}>저장하기</Text>
                  </TouchableOpacity>
                </View>
              )
            ) : (
              <View style={styles.bottomContainer}>
                <View style={styles.bottomTextContainer}>
                  <Text style={styles.subtitles1}>{contentLines[0]}</Text>
                  {/* <Text style={styles.subtitles2}>{contentLines[1]}</Text> */}
                </View>
                <View style={styles.bottomScriptContainer}>
                  <TouchableOpacity
                    onPress={() => {
                      dispatch(handleSoundEffect('btn'));
                      dispatch(handleisTalePageScriptModalVisible(true));
                    }}>
                    <IconIonicons
                      name="document-text-outline"
                      size={windowHeight * 0.075}
                      color={'#000000'}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </View>
        </ImageBackground>
      ) : null}

      {fairytaleData.length !== 0 && isTalePageScriptModalVisible ? (
        <TalePageScriptModal
          pageContent={fairytaleData[pageNum - 1].narration.split('\n')}
        />
      ) : null}
      {isSaveDrawnToLoginModalVisible ? <SaveDrawnToLoginModal /> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
  },
  subContainer: {
    alignSelf: 'center',
    flex: 1,
    width: '95%',
  },
  topContainer: {
    flex: 0.15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  fairytaleTitle: {
    fontSize: windowHeight * 0.055,
    fontWeight: '600',
    color: '#000000',
    letterSpacing: windowHeight * 0.003,
  },
  xCircle: {
    justifyContent: 'center',
    borderRadius: windowHeight * 0.08 * 0.5,
    backgroundColor: 'white',
    width: windowHeight * 0.08,
    height: windowHeight * 0.08,
    borderColor: '#A6D934',
    borderWidth: 2,
  },
  xText: {
    textAlign: 'center',
  },
  middleContainer: {
    flex: 0.65,
    flexDirection: 'row',
    alignItems: 'center',
  },
  middleLeftContainer: {
    flex: 0.1,
    alignItems: 'flex-start',
  },
  middleCenterContainer: {
    flex: 0.8,
    alignItems: 'center',
  },
  fairytaleImage: {
    // backgroundColor: 'red',
    position: 'absolute',
    height: windowHeight * 0.65 * 0.8,
    width: windowHeight * 0.65 * 0.8,
    resizeMode: 'contain',
  },
  fairytaleImageLittle: {
    // backgroundColor: 'red',
    position: 'absolute',
    height: windowHeight * 0.65 * 0.3,
    width: windowHeight * 0.65 * 0.3,
    resizeMode: 'contain',
  },
  fairytaleImageShirmp1: {
    // backgroundColor: 'red',
    position: 'absolute',
    height: windowHeight * 0.65 * 1.3,
    width: windowHeight * 0.65 * 1.3,
    resizeMode: 'contain',
  },
  // fairytaleImage: {
  //   height: '100%',
  //   width: '100%',
  //   resizeMode: 'contain',
  // },
  middleRightContainer: {
    flex: 0.1,
    alignItems: 'flex-end',
  },
  bottomContainer: {
    flex: 0.2,
    flexDirection: 'row',
    alignSelf: 'center',
    width: '100%',
  },
  bottomContainerEnding: {
    flex: 0.2,
    flexDirection: 'row',
    alignSelf: 'center',
    width: '95%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bottomContainerEndingToRereading: {
    flex: 0.2,
    flexDirection: 'row',
    alignSelf: 'center',
    width: '95%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  endingBox: {
    justifyContent: 'center',
    width: windowWidth * 0.2,
    height: windowHeight * 0.12,
    backgroundColor: '#EAFFBA',
    borderRadius: windowHeight * 0.12 * 0.25,
  },
  endingBoxToRereading: {
    justifyContent: 'center',
    width: windowWidth * 0.7,
    height: windowHeight * 0.12,
    backgroundColor: '#EAFFBA',
    borderRadius: windowHeight * 0.12 * 0.25,
  },
  endingBoxText: {
    fontSize: windowHeight * 0.06,
    color: '#000000',
    textAlign: 'center',
  },
  endingBoxTextToRereading: {
    fontSize: windowHeight * 0.06,
    color: '#000000',
    textAlign: 'center',
  },
  bottomTextContainer: {
    borderRadius: windowHeight * 0.12 * 0.25,
    backgroundColor: '#FFFFFF',
    flex: 0.95,
    height: windowHeight * 0.2 * 0.9,
    justifyContent: 'center',
  },
  subtitles1: {
    textAlign: 'center',
    paddingHorizontal: windowWidth * 1 * 0.95 * 0.005,
    // fontSize: windowHeight * 0.04,
    fontSize: windowHeight * 0.06,
    color: '#000000',
  },
  subtitles2: {
    fontSize: windowHeight * 0.04,
    color: '#000000',
    alignSelf: 'flex-end',
  },
  bottomScriptContainer: {
    flex: 0.05,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
