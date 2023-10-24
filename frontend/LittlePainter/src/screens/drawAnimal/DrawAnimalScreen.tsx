import React, {useState} from 'react';
import {
  StyleSheet,
  Dimensions,
  Text,
  View,
  TouchableOpacity,
  Image,
  Pressable,
  Alert,
} from 'react-native';
import {Svg, Path} from 'react-native-svg';
import type {StackScreenProps} from '@react-navigation/stack';
import {RootStackParams} from '../../navigations/AppNavigator';
import IconFontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import DrawLineThicknessModal from '../modals/DrawLineThicknessModal';
import {RootState} from '../../redux/store';
import {useDispatch, useSelector} from 'react-redux';
import {
  handleLineThickness,
  handleisDrawLineThicknessModalVisible,
} from '../../redux/slices/draw/draw';

type DrawAnimalScreenProps = StackScreenProps<
  RootStackParams,
  'DrawAnimalScreen'
>;

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export default function DrawAnimalScreen({navigation}: DrawAnimalScreenProps) {
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
  const [selectColor, setSelectColor] = useState<string>('black');
  // const [lineWidth, setLineWidth] = useState<number>(5);

  const dispatch = useDispatch();
  // 선 굵기 모달을 위한 라인
  const LineThickness = useSelector(
    (state: RootState) => state.draw.LineThickness,
  );
  const isDrawLineThicknessModalVisible = useSelector(
    (state: RootState) => state.draw.isDrawLineThicknessModalVisible,
  );

  // 그림 그리기 함수
  const onTouchStart = event => {
    setClearButtonClicked(false);
    const locationX = event.nativeEvent.locationX;
    const locationY = event.nativeEvent.locationY;
    // const point = `M${locationX.toFixed(0)},${locationY.toFixed(0)}`;
    const point = `M${locationX.toFixed(0)},${locationY.toFixed(
      0,
    )} L${locationX.toFixed(0)},${locationY.toFixed(0)}`;
    setCurrentPath(point);
    setTmpPaths([]);
  };

  const onTouchMove = event => {
    if (currentPath === '') {
      // If there's no current path, start a new one with a "M" command
      const locationX = event.nativeEvent.locationX;
      const locationY = event.nativeEvent.locationY;
      const newPoint = `M${locationX.toFixed(0)},${locationY.toFixed(0)}`;
      setCurrentPath(newPoint);
    } else {
      const locationX = event.nativeEvent.locationX;
      const locationY = event.nativeEvent.locationY;
      const newPoint = `L${locationX.toFixed(0)},${locationY.toFixed(0)}`;
      setCurrentPath(prevPath => prevPath + newPoint);
    }
  };

  const onTouchEnd = () => {
    if (currentPath) {
      // Only save the path if there are points in it
      setPaths([
        ...paths,
        {path: currentPath, color: selectColor, strokeWidth: LineThickness},
      ]);
    }
    setCurrentPath('');
    setClearButtonClicked(false);
  };

  const handleClearButtonClick = () => {
    // setTmpPaths([...tmpPaths, ...paths]);
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
            <Pressable style={styles.pencilImageCircle} onPress={() => {}}>
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
                setSelectColor('#FF0000');
              }}
            />
            <Pressable
              style={[styles.colorCircle, {backgroundColor: '#FF7A00'}]}
              onPress={() => {
                setSelectColor('#FF7A00');
              }}
            />
            <Pressable
              style={[styles.colorCircle, {backgroundColor: '#FAFF00'}]}
              onPress={() => {
                setSelectColor('#FAFF00');
              }}
            />
            <Pressable
              style={[styles.colorCircle, {backgroundColor: '#05FF00'}]}
              onPress={() => {
                setSelectColor('#05FF00');
              }}
            />
            <Pressable
              style={[styles.colorCircle, {backgroundColor: '#0500FF'}]}
              onPress={() => {
                setSelectColor('#0500FF');
              }}
            />
            <Pressable
              style={[styles.colorCircle, {backgroundColor: '#0300AA'}]}
              onPress={() => {
                setSelectColor('#0300AA');
              }}
            />
            <Pressable
              style={[styles.colorCircle, {backgroundColor: '#9E00FF'}]}
              onPress={() => {
                setSelectColor('#9E00FF');
              }}
            />
            <Pressable
              // style={[styles.colorCircle, {backgroundColor: '#BA4300'}]}
              style={[styles.colorCircle, {backgroundColor: 'black'}]}
              onPress={() => {
                // setSelectColor('#BA4300');
                setSelectColor('black');
              }}
            />
            <Pressable
              style={[styles.colorCircle]}
              onPress={() => {
                // setSelectColor('#FF0000');
              }}>
              <Image
                style={styles.colorCircle}
                source={require('../../assets/images/colorSelect.png')}
              />
            </Pressable>
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
        <View style={styles.middleContainer}>
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
                stroke={isClearButtonClicked ? 'transparent' : selectColor}
                fill={'transparent'}
                strokeWidth={LineThickness}
                strokeLinejoin={'round'}
                strokeLinecap={'round'}
              />
            </Svg>
          </View>
        </View>
        {/* 하단 */}
        <View style={styles.bottomContainer}>
          <TouchableOpacity
            style={styles.ideaLightView}
            onPress={() => {
              Alert.alert('', '메롱');
            }}>
            <Image
              style={styles.ideaLight}
              source={require('../../assets/images/ideaLight.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.lineThicknessView}
            onPress={() => {
              // 이 부분 차후 모달에서 rage slide로 가능하게 해야함.
              // dispatch(handleLineThickness(5));
              dispatch(handleisDrawLineThicknessModalVisible(true));
            }}>
            <View style={styles.lineThickness} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.clearButton}
            onPress={handleClearButtonClick}>
            <Text style={styles.clearButtonText}>모두 지우기</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.doneButton} onPress={() => {}}>
            <Text style={styles.doneButtonText}>완성하기</Text>
          </TouchableOpacity>
        </View>
      </View>
      {isDrawLineThicknessModalVisible ? <DrawLineThicknessModal /> : null}
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
    // backgroundColor: 'green',
  },
  ideaLightView: {
    // position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    width: '5%',
    height: '100%',
  },
  ideaLight: {
    resizeMode: 'contain',
    width: windowWidth * 0.04,
  },
  topContainer: {
    flex: 0.1,
    flexDirection: 'row',
    width: '95%',
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
    borderWidth: 1,
  },
  bottomContainer: {
    marginHorizontal: windowWidth * 0.01,
    flex: 0.1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  lineThicknessView: {
    width: '8%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  lineThickness: {
    backgroundColor: 'black',
    width: '100%',
    height: '15%',
    borderRadius: windowHeight * 0.1 * 0.15 * 0.5,
  },
  clearButton: {
    backgroundColor: '#F6F6F6',
    // borderWidth: 1,
    // width: '5%',
    // height: '80%',
    padding: windowHeight * 0.02,
    borderRadius: windowWidth * 0.05 * 0.2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  clearButtonText: {
    color: 'black',
    fontSize: windowHeight * 0.02,
  },
  doneButton: {
    backgroundColor: '#A8CEFF',
    width: '15%',
    height: '80%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: windowWidth * 0.2 * 0.07,
  },
  doneButtonText: {
    color: 'black',
    fontSize: windowHeight * 0.04,
  },
});
