import React from 'react';
import {
  StyleSheet,
  Dimensions,
  Text,
  View,
  TouchableOpacity,
  Image,
  Pressable,
} from 'react-native';
import type {StackScreenProps} from '@react-navigation/stack';
import {RootStackParams} from '../../navigations/AppNavigator';
import IconFontAwesome6 from 'react-native-vector-icons/FontAwesome6';

type DrawAnimalScreenProps = StackScreenProps<
  RootStackParams,
  'DrawAnimalScreen'
>;

const windowWidth = Dimensions.get('window').width;
// const windowHeight = Dimensions.get('window').height;
export default function DrawAnimalScreen({navigation}: DrawAnimalScreenProps) {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.subContainer}>
        {/* 상단 */}
        <View style={styles.topContainer}>
          {/* 연필 지우개 */}
          <View style={styles.topLeft}>
            <View style={styles.pencilImageCircle}>
              <Image
                style={styles.drawEquipImage}
                source={require('../../assets/images/pencil.png')}
              />
            </View>
            <View style={styles.eraserImageCircle}>
              <Image
                style={styles.drawEquipImage}
                source={require('../../assets/images/eraser.png')}
              />
            </View>
          </View>
          {/* 색깔 */}
          <View style={styles.topMiddle}>
            <Pressable
              style={[styles.colorCircle, {backgroundColor: '#FF0000'}]}
              onPress={() => {}}
            />
            <Pressable
              style={[styles.colorCircle, {backgroundColor: '#FF7A00'}]}
              onPress={() => {}}
            />
            <Pressable
              style={[styles.colorCircle, {backgroundColor: '#FAFF00'}]}
              onPress={() => {}}
            />
            <Pressable
              style={[styles.colorCircle, {backgroundColor: '#05FF00'}]}
              onPress={() => {}}
            />
            <Pressable
              style={[styles.colorCircle, {backgroundColor: '#0500FF'}]}
              onPress={() => {}}
            />
            <Pressable
              style={[styles.colorCircle, {backgroundColor: '#0300AA'}]}
              onPress={() => {}}
            />
            <Pressable
              style={[styles.colorCircle, {backgroundColor: '#9E00FF'}]}
              onPress={() => {}}
            />
            <Pressable
              style={[styles.colorCircle, {backgroundColor: '#BA4300'}]}
              onPress={() => {}}
            />
            <Pressable style={[styles.colorCircle]} onPress={() => {}}>
              <Image
                style={styles.colorCircle}
                source={require('../../assets/images/colorSelect.png')}
              />
            </Pressable>
          </View>
          {/* X버튼 */}
          <View style={styles.topRight}>
            <TouchableOpacity style={styles.xCircle}>
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
        <View style={styles.middleContainer} />
        {/* 하단 */}
        <View style={styles.bottomContainer} />
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
});
