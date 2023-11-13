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
import {talePageListInquiry} from '../../../apis/draw/draw';
import TalePageScriptModal from '../../modals/TalePageScriptModal';
import FairytaleEndingPage from './FairytaleEndingPage';
import {FairytaleReadScreenType, FairyTaleInfoType, CharactersInfoType} from '../fairytaleType';


type FairytaleReadScreenProps = StackScreenProps<
  RootStackParams,
  'FairytaleReadScreen'
>;

const windowWidth: number = Dimensions.get('window').width;
const windowHeight: number = Dimensions.get('window').height;

export default function FairytaleReadScreen({
  navigation,
  route,
}: FairytaleReadScreenProps) {
  ///////////////////////////

  ///////////////////////////

  const dispatch = useDispatch();
  const isTalePageScriptModalVisible = useSelector(
    (state: RootState) => state.tale.isTalePageScriptModalVisible,
  );
  const isFairytaleEndingPageVisible = useSelector(
    (state: RootState) => state.tale.isFairytaleEndingPageVisible,
  );
  const pageNum = useSelector(
    (state: RootState) => state.tale.pageNum,
  );
  const isDrawReadDone = useSelector(
    (state: RootState) => state.tale.isDrawReadDone,
  );
  const isReReading = useSelector(
    (state: RootState) => state.tale.isReReading,
  );
  const taleDrawedImage = useSelector(
    (state: RootState) => state.tale.taleDrawedImage,
  );
  const [fairytaleTitle] = useState<FairytaleReadScreenType['title']>(route.params.title);
  const [taleId] = useState<FairytaleReadScreenType['taleId']>(route.params.taleId);
  const [contentLines, setContentLines] = useState<string[]>([]);

  const [fairytaleData, setFairytaleData] = useState<FairyTaleInfoType[]>([]);
  const [maxPage, setMaxPage] = useState<number>(1);
  const [charactersInfo, setCharactersInfo] = useState<CharactersInfoType[]>([]);

  const handleTalePageListInquiry = async () => {
    try {
      dispatch(handleTaleDrawedImageInitial([]));
      const response = await talePageListInquiry(taleId);
      if (response.status === 200) {
        // console.log('동화 페이지 전체 데이터 조회하기 성공', response.data);
        console.log('동화 페이지 전체 데이터 조회하기 성공');
        setFairytaleData(response.data);
        console.log(response.data[0].characters);
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

  useEffect(() => {
    dispatch(handleIsDrawReadDone(false));
    dispatch(handleIsReReading(false));
    handleTalePageListInquiry();
  }, []);

  useEffect(() => {
    if (fairytaleData.length !== 0) {
      setCharactersInfo(fairytaleData[pageNum - 1].characters);
      // 자막
      const lineChunks: string[] =
        fairytaleData[pageNum - 1].narration.split('\n');
      const initialLines: string[] = lineChunks.slice(0, 1);
      setContentLines(initialLines);
      let lineIndex: number = 1;
      let interval: NodeJS.Timeout | undefined;
      interval = setInterval(() => {
        if (lineIndex < lineChunks.length) {
          const newLines = lineChunks.slice(lineIndex, lineIndex + 1);
          setContentLines(newLines);
          lineIndex += 1;
        } else {
          clearInterval(interval);
        }
      }, 5000);
      return () => {
        clearInterval(interval);
      };
    }
  }, [pageNum, fairytaleData]);

  useEffect(() => {
    return () => {
      dispatch(handleisFairytaleEndingPageVisible(false));
    };
  }, [dispatch]);

  // 움직이게 하기
  const imageMoving = (startX:number, startY:number, endX:number, endY:number) => {
    let moveX = new Animated.Value(startX);
    let moveY = new Animated.Value(startY);
    Animated.loop(
      Animated.sequence([
        Animated.timing(moveX, {
          toValue: endX,
          duration: 3000,
          useNativeDriver: true,
        }),
        Animated.timing(moveX, {
          toValue: startX,
          duration: 3000,
          useNativeDriver: true,
        }),
      ])
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(moveY, {
          toValue: endY,
          duration: 3000,
          useNativeDriver: true,
        }),
        Animated.timing(moveY, {
          toValue: startY,
          duration: 3000,
          useNativeDriver: true,
        }),
      ])
    ).start();

    return [moveX, moveY];
  };

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
                ) : null }
              {charactersInfo.map((item, index) => {
                // 탐색할 taleDrawedImage 객체를 찾는다.
                const matchedImage = taleDrawedImage.find(drawnItem => drawnItem.characterName === item.characterName);
                const [moveX, moveY] = imageMoving(item.startX, item.startY, item.endX, item.endY);
                // const [moveX, moveY] = imageMoving(-windowWidth / 4, 0, windowWidth / 5, -windowHeight / 4);
                return (
                  isDrawReadDone && matchedImage ?
                  // 만약 isDrawReadDone이 true이고, 위에서 찾은 객체가 존재하면 그 객체의 gifUri를 사용한다.
                  <Animated.Image
                    key={index}
                    source={{uri: matchedImage.contentUri.gifUri}}
                    style={styles.fairytaleImage}
                  />
                  :
                  // 그렇지 않다면 기존의 로직을 따른다.
                  <Animated.Image
                    key={index}
                    source={{uri: item.urlGif ? item.urlGif : item.urlOriginal}}
                    style={[
                      styles.fairytaleImage,
                      {transform: [{translateX: moveX}, {translateY: moveY}]},
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
                      if (isDrawReadDone && isReReading) {
                          // 다 그리고, 읽기 중이라면
                          if (maxPage > pageNum){
                            dispatch(handlePageNum(pageNum + 1));
                          } else if (maxPage === pageNum){
                            dispatch(handleisFairytaleEndingPageVisible(true));
                          }
                      } else if (isDrawReadDone && !isReReading){
                          // 다 그리고, 읽기 중이 아니라면
                          if (maxPage > pageNum){
                            dispatch(handlePageNum(pageNum + 1));
                          } else if (maxPage === pageNum){
                            dispatch(handleIsDrawReadDone(true));
                            dispatch(handleIsReReading(true));
                            dispatch(handlePageNum(1));
                          }
                      } else if (!isDrawReadDone && !isReReading){
                          // 다 그리지도 않고, 읽기 중도 아니라면
                          if (fairytaleData[pageNum - 1].drawing) {
                            navigation.navigate(
                              'DrawFairytaleScreen',
                              { charactersInfo, fairytaleTitle: fairytaleTitle }
                            );
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
            {isFairytaleEndingPageVisible ?
              (isDrawReadDone && !isReReading)
                ?
                (<View style={styles.bottomContainerEndingToRereading}>
                  {/* 다시보기 */}
                  <TouchableOpacity
                    style={styles.endingBoxToRereading}
                    onPress={() => {
                      dispatch(handleIsReReading(true));
                      dispatch(handlePageNum(1));
                      dispatch(handleisFairytaleEndingPageVisible(false));
                    }}>
                    <Text style={styles.endingBoxTextToRereading}>내가 그린 그림으로 다시보기</Text>
                  </TouchableOpacity>
                </View>)
                :
                (<View style={styles.bottomContainerEnding}>
                  {/* 다시보기 */}
                  <TouchableOpacity
                    style={styles.endingBox}
                    onPress={() => {
                      dispatch(handlePageNum(1));
                      dispatch(handleisFairytaleEndingPageVisible(false));
                    }}>
                    <Text style={styles.endingBoxText}>다시보기</Text>
                  </TouchableOpacity>
                  {/* 저장하기 */}
                  <TouchableOpacity style={styles.endingBox} onPress={() => {}}>
                    <Text style={styles.endingBoxText}>저장하기</Text>
                  </TouchableOpacity>
                </View>)
               : (
              <View style={styles.bottomContainer}>
                <View style={styles.bottomTextContainer}>
                  <Text style={styles.subtitles1}>{contentLines[0]}</Text>
                  {/* <Text style={styles.subtitles2}>{contentLines[1]}</Text> */}
                </View>
                <View style={styles.bottomScriptContainer}>
                  <TouchableOpacity
                    onPress={() => {
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
    alignItems: 'center',
  },
  middleCenterContainer: {
    flex: 0.8,
    alignItems: 'center',
  },
  fairytaleImage: {
    // backgroundColor: 'red',
    position: 'absolute',
    height: windowHeight * 0.65 * 0.35,
    width: windowHeight * 0.65 * 0.35,
    resizeMode: 'contain',
  },
  // fairytaleImage: {
  //   height: '100%',
  //   width: '100%',
  //   resizeMode: 'contain',
  // },
  middleRightContainer: {
    flex: 0.1,
    alignItems: 'center',
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
    fontSize: windowHeight * 0.04,
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
