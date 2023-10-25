import React, {useState} from 'react';
import {
  StyleSheet,
  Dimensions,
  Text,
  View,
  TouchableOpacity,
  Image,
  Pressable,
} from 'react-native';
import {Svg, Path} from 'react-native-svg';
import type {StackScreenProps} from '@react-navigation/stack';
import {RootStackParams} from '../../navigations/AppNavigator';
import IconFontAwesome6 from 'react-native-vector-icons/FontAwesome6';

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
  const [currentPath, setCurrentPath] = useState<string>('');
  const [isClearButtonClicked, setClearButtonClicked] =
    useState<boolean>(false);
  const [selectColor, setSelectColor] = useState<string>('black');
  const [lineWidth, setLineWidth] = useState<number>(5);
  // 지우개 활성화
  const [isEraserActive, setIsEraserActive] = useState<boolean>(false);

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
        {path: currentPath, color: selectColor, strokeWidth: lineWidth},
      ]);
    }
    setCurrentPath('');
    setClearButtonClicked(false);
  };

  const handleClearButtonClick = () => {
    setPaths([]);
    setCurrentPath('');
    setClearButtonClicked(true);
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.subContainer}>
        {/* 상단 */}
        <View style={styles.topContainer}>
          {/* 연필 및 지우개 */}
          <View style={styles.topLeft}>
            <Pressable
              style={styles.pencilImageCircle}
              onPress={() => setIsEraserActive(false)}>
              <Image
                style={styles.drawEquipImage}
                source={require('../../assets/images/pencil.png')}
              />
            </Pressable>
            <Pressable
              style={styles.eraserImageCircle}
              onPress={() => setIsEraserActive(true)}>
              <Image
                style={styles.drawEquipImage}
                source={require('../../assets/images/eraser.png')}
              />
            </Pressable>
            <Pressable
              style={styles.eraserImageCircle}
              onPress={() => setIsEraserActive(true)}>
              <Image
                style={styles.drawEquipImage}
                source={require('../../assets/images/eraser.png')}
              />
            </Pressable>
          </View>
          {/* 색깔 */}
          <View style={styles.topMiddle}>
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
                strokeWidth={lineWidth}
                strokeLinejoin={'round'}
                strokeLinecap={'round'}
              />
            </Svg>
          </View>
        </View>
        {/* 하단 */}
        <View style={styles.bottomContainer}>
          <TouchableOpacity
            style={styles.clearButton}
            onPress={handleClearButtonClick}>
            <Text style={styles.clearButtonText}>Clear</Text>
          </TouchableOpacity>
        </View>
      </View>
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
    width: '95%',
    // backgroundColor: 'green',
  },
  topContainer: {
    flex: 0.15,
    flexDirection: 'row',
  },
  topLeft: {
    flexDirection: 'row',
    flex: 0.2,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  pencilImageCircle: {
    backgroundColor: '#ECECEC',
    width: windowWidth * 0.07,
    height: windowWidth * 0.07,
    borderRadius: windowWidth * 0.07 * 0.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  eraserImageCircle: {
    backgroundColor: '#ECECEC',
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
    flex: 0.7,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
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
    alignItems: 'center',
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
    flex: 0.78,
  },
  bottomContainer: {
    flex: 0.07,
  },
  clearButton: {
    marginTop: 10,
    backgroundColor: 'black',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  clearButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
