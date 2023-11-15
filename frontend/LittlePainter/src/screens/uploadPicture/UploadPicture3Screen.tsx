import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import type {StackScreenProps} from '@react-navigation/stack';
import {RootStackParams} from '../../navigations/AppNavigator';
import {useAppSelector, useAppDispatch} from '../../redux/hooks';
import {handleSoundEffect} from '../../redux/slices/music/music';

type UploadPicture3ScreenProps = StackScreenProps<
  RootStackParams,
  'UploadPicture3Screen'
>;

const windowWidth = Dimensions.get('window').width;
// const windowHeight = Dimensions.get('window').height;

export default function UploadPicture3Screen({
  navigation,
}: UploadPicture3ScreenProps) {
  const animal_type = useAppSelector(state => state.uploadPicture.animal_type);
  const border_image = useAppSelector(
    state => state.uploadPicture.border_image,
  );
  const dispatch = useAppDispatch();
  console.log(animal_type);
  console.log(border_image);

  return (
    <View style={styles.mainContainer}>
      <ImageBackground
        source={require('../../assets/bgImage/upload.png')}
        resizeMode="cover"
        style={styles.backgroundImage}>
        <View style={styles.subContainer}>
          {/* 상단 */}
          <View style={styles.middleContainer}>
            <Image source={{uri: border_image}} style={styles.image} />
            <Text style={styles.text}>{animal_type} 이(가) 맞나요?</Text>
          </View>
          <View style={styles.bot}>
            <TouchableOpacity
              style={styles.button1}
              onPress={() => {
                dispatch(handleSoundEffect('btn'));
                navigation.navigate('UploadPicture5Screen');
              }}>
              <Text style={styles.buttontext}>네</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button2}
              onPress={() => {
                dispatch(handleSoundEffect('btn'));
                navigation.navigate('UploadPicture4Screen');
              }}>
              <Text style={styles.buttontext}>아니오</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  subContainer: {
    alignItems: 'center',
    flex: 1,
    width: '95%',
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  middleContainer: {
    flex: 1,
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: windowWidth * 0.03,
  },
  image: {
    height: windowWidth * 0.3,
    width: windowWidth * 0.3,
  },
  text: {
    marginTop: windowWidth * 0.03,
    fontSize: windowWidth * 0.03,
    fontFamily: 'TmoneyRoundWindExtraBold',
  },
  bot: {
    flex: 0.2,
    flexDirection: 'row',
    width: '40%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button1: {
    backgroundColor: '#22A9FF',
    width: windowWidth * 0.12,
    height: windowWidth * 0.05,
    borderRadius: windowWidth * 0.005,
    marginHorizontal: windowWidth * 0.01,
    justifyContent: 'center',
  },
  button2: {
    backgroundColor: '#FC7070',
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
    fontFamily: 'TmoneyRoundWindExtraBold',
  },
});
