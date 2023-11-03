import React, {useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import type {StackScreenProps} from '@react-navigation/stack';
import {RootStackParams} from '../../navigations/AppNavigator';
import {useAppSelector} from '../../redux/hooks';
import {animalTypeListApi} from '../../apis/uploadPicture/uploadPicture';
import AntDesign from 'react-native-vector-icons/AntDesign';

type UploadPicture4ScreenProps = StackScreenProps<
  RootStackParams,
  'UploadPicture4Screen'
>;

const windowWidth = Dimensions.get('window').width;
// const windowHeight = Dimensions.get('window').height;

export default function UploadPicture4Screen({
  navigation,
}: UploadPicture4ScreenProps) {
  const border_image = useAppSelector(
    state => state.uploadPicture.border_image,
  );

  const getRandomColor = () => {
    // 랜덤한 RGB 색상 생성
    const red = Math.floor(Math.random() * 256);
    const green = Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random() * 256);
    return `rgb(${red}, ${green}, ${blue})`;
  };

  const callAnimals = () => {
    animalTypeListApi();
  };

  useEffect(() => {
    callAnimals();
  });

  return (
    <View style={styles.mainContainer}>
      <View style={styles.subContainer}>
        {/* 상단 */}
        <View style={styles.middleContainer}>
          <Image source={{uri: border_image}} style={styles.image} />
          <View style={styles.arrow}>
            <Text>동물을 선택해주세요!</Text>
            <AntDesign
              name="arrowdown"
              size={windowWidth * 0.03}
              color={'#FF9800'}
            />
          </View>
        </View>
        <View style={styles.bot}>
          <TouchableOpacity
            style={[styles.button, {backgroundColor: getRandomColor()}]}>
            <Text style={styles.buttontext}>개</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, {backgroundColor: getRandomColor()}]}>
            <Text style={styles.buttontext}>소</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, {backgroundColor: getRandomColor()}]}>
            <Text style={styles.buttontext}>말</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, {backgroundColor: getRandomColor()}]}>
            <Text style={styles.buttontext}>양</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, {backgroundColor: getRandomColor()}]}>
            <Text style={styles.buttontext}>새</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.bot}>
          <TouchableOpacity
            style={[styles.button, {backgroundColor: getRandomColor()}]}>
            <Text style={styles.buttontext}>뱀</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, {backgroundColor: getRandomColor()}]}>
            <Text style={styles.buttontext}>닭</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, {backgroundColor: getRandomColor()}]}>
            <Text style={styles.buttontext}>쥐</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, {backgroundColor: getRandomColor()}]}>
            <Text style={styles.buttontext}>맥</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, {backgroundColor: getRandomColor()}]}>
            <Text style={styles.buttontext}>꿩</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, {backgroundColor: getRandomColor()}]}>
            <Text style={styles.buttontext}>기타</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#BAC0CA',
  },
  subContainer: {
    alignItems: 'center',
    flex: 1,
    width: '95%',
  },
  middleContainer: {
    flex: 1,
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: windowWidth * 0.03,
    flexDirection: 'row',
  },
  image: {
    marginLeft: windowWidth * 0.15,
    height: windowWidth * 0.3,
    width: windowWidth * 0.3,
  },
  arrow: {
    alignItems: 'center',
    marginLeft: windowWidth * 0.05,
    marginTop: windowWidth * 0.15,
  },
  text: {
    marginTop: windowWidth * 0.03,
    fontSize: windowWidth * 0.03,
  },
  bot: {
    flex: 0.2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button: {
    width: windowWidth * 0.12,
    height: windowWidth * 0.05,
    borderRadius: windowWidth * 0.005,
    marginHorizontal: windowWidth * 0.01,
    justifyContent: 'center',
  },
  buttontext: {
    fontSize: windowWidth * 0.02,
    color: '#FFFFFF',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
});
