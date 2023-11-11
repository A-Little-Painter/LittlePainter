/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  ImageBackground,
  View,
  Dimensions,
  Text,
  TouchableOpacity,
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
  handleisDrawnFairytale,
  handleNumberOfCharactersTodraw,
  handleDrawingWaitingNumber,
} from '../../../redux/slices/tale/tale';
import {talePageListInquiry} from '../../../apis/draw/draw';
import TalePageScriptModal from '../../modals/TalePageScriptModal';
// import FairytaleEndingPage from './FairytaleEndingPage';

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
  const dispatch = useDispatch();
  const isTalePageScriptModalVisible = useSelector(
    (state: RootState) => state.tale.isTalePageScriptModalVisible,
  );
  const isFairytaleEndingPageVisible = useSelector(
    (state: RootState) => state.tale.isFairytaleEndingPageVisible,
  );
  const isDrawnFairytale = useSelector(
    (state: RootState) => state.tale.isDrawnFairytale,
  );
  const numberOfCharactersTodraw = useSelector(
    (state: RootState) => state.tale.numberOfCharactersTodraw,
  );
  const [fairytaleTitle] = useState<string>(route.params.title);
  const [taleId] = useState<number>(route.params.taleId);
  const [contentLines, setContentLines] = useState<string[]>([]);

  const [fairytaleData, setFairytaleData] = useState(null);
  const [pageNum, setPageNum] = useState<number>(1);
  const [maxPage, setMaxPage] = useState<number>(1);

  const handleTalePageListInquiry = async () => {
    try {
      const response = await talePageListInquiry(taleId);
      if (response.status === 200) {
        console.log('동화 페이지 전체 데이터 조회하기 성공', response.data);
        setFairytaleData(response.data);
        setMaxPage(response.data.length);
        console.log(response.data[0].characters);
      } else {
        console.log('동화 페이지 전체 데이터 조회하기 실패', response.status);
      }
    } catch (error) {
      console.log('동화 페이지 전체 데이터 조회하기 실패', error);
    }
  };

  useEffect(() => {
    handleTalePageListInquiry();
  }, []);

  useEffect(() => {
    if (fairytaleData) {
      // 그려야 할 대상의 대기 번호변경
      dispatch(handleDrawingWaitingNumber(0));
      // 그려야 할 페이지 수 계산
      const numToDraw = fairytaleData[pageNum - 1].characters.length;
      console.log('그려야할 페이지 수', numToDraw);
      dispatch(handleNumberOfCharactersTodraw(numToDraw));
      // 자막
      const lineChunks: string[] =
        fairytaleData[pageNum - 1].narration.split('\n');
      const initialLines: string[] = lineChunks.slice(0, 1);
      setContentLines(initialLines);
      let lineIndex = 1;
      const interval = setInterval(() => {
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

  return (
    <View style={styles.mainContainer}>
      {fairytaleData ? (
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
                        setPageNum(pageNum - 1);
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
                {/* {isFairytaleEndingPageVisible ? (
                <FairytaleEndingPage fairytaleTitle={tmptaleData[2].title} />
              ) : (
                <Image
                  // source={fairytaleData[pageNum-1].imgUrl}
                  source={fairytaleData[pageNum - 1].imgUrl}
                  style={styles.fairytaleImage}
                />
              )} */}
              </View>
              {/* 중단 우측 */}
              <View style={styles.middleRightContainer}>
                {isFairytaleEndingPageVisible ? null : (
                  <TouchableOpacity
                    onPress={() => {
                      // if (
                      //   !isDrawnFairytale &&
                      //   fairytaleData[pageNum - 1].drawing
                      // ) {
                      //   navigation.navigate('DrawFairytaleScreen');
                      // } else if (maxPage > pageNum) {
                      if (maxPage > pageNum) {
                        dispatch(handleisDrawnFairytale(false));
                        setPageNum(pageNum + 1);
                      } else if (maxPage === pageNum) {
                        dispatch(handleisFairytaleEndingPageVisible(true));
                        dispatch(handleisDrawnFairytale(false));
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
              <View style={styles.bottomContainerEnding}>
                {/* 다시보기 */}
                <TouchableOpacity
                  style={styles.endingBox}
                  onPress={() => {
                    setPageNum(1);
                    dispatch(handleisFairytaleEndingPageVisible(false));
                  }}>
                  <Text style={styles.endingBoxText}>다시보기</Text>
                </TouchableOpacity>
                {/* 저장하기 */}
                <TouchableOpacity style={styles.endingBox} onPress={() => {}}>
                  <Text style={styles.endingBoxText}>저장하기</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View style={styles.bottomContainer}>
                <View style={styles.bottomTextContainer}>
                  <Text style={styles.subtitles1}>{contentLines[0]}</Text>
                  <Text style={styles.subtitles2}>{contentLines[1]}</Text>
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

      {fairytaleData && isTalePageScriptModalVisible ? (
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
    // justifyContent: 'center',
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
    // backgroundColor: 'green',
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
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
  },
  middleRightContainer: {
    flex: 0.1,
    alignItems: 'center',
  },
  bottomContainer: {
    flex: 0.2,
    flexDirection: 'row',
    alignSelf: 'center',
    width: '95%',
  },
  bottomContainerEnding: {
    flex: 0.2,
    flexDirection: 'row',
    alignSelf: 'center',
    width: '95%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  endingBox: {
    justifyContent: 'center',
    width: windowWidth * 0.2,
    height: windowHeight * 0.12,
    backgroundColor: '#EAFFBA',
    borderRadius: windowHeight * 0.12 * 0.25,
  },
  endingBoxText: {
    fontSize: windowHeight * 0.06,
    color: 'black',
    textAlign: 'center',
  },
  bottomTextContainer: {
    borderRadius: windowHeight * 0.12 * 0.25,
    backgroundColor: '#FFFFFF',
    flex: 0.95,
    justifyContent: 'center',
  },
  subtitles1: {
    paddingHorizontal: windowWidth * 0.01,
    fontSize: windowHeight * 0.04,
    color: '#000000',
  },
  subtitles2: {
    paddingHorizontal: windowWidth * 0.01,
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
