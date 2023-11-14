import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  ScrollView,
  ImageBackground,
} from 'react-native';
import type {StackScreenProps} from '@react-navigation/stack';
import {RootStackParams} from '../../navigations/AppNavigator';
import {useAppSelector, useAppDispatch} from '../../redux/hooks';
import {animalTypeListApi} from '../../apis/uploadPicture/uploadPicture';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {update3, update4} from '../../redux/slices/uploadPicture/uploadPicture';

type UploadPicture4ScreenProps = StackScreenProps<
  RootStackParams,
  'UploadPicture4Screen'
>;

const windowWidth = Dimensions.get('window').width;

var Sound = require('react-native-sound');
Sound.setCategory('Playback');

export default function UploadPicture4Screen({
  navigation,
}: UploadPicture4ScreenProps) {
  const dispatch = useAppDispatch();

  interface AnimalType {
    id: number;
    name: string;
    urlSound: string;
  }

  const [animalList, setAnimalList] = useState<AnimalType[]>([]);
  const border_image = useAppSelector(
    state => state.uploadPicture.border_image,
  );

  const getRandomColor = () => {
    const red = Math.floor(Math.random() * 256);
    const green = Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random() * 256);
    return `rgb(${red}, ${green}, ${blue})`;
  };

  const callAnimals = async () => {
    const fetchedAnimalList = await animalTypeListApi();
    setAnimalList(fetchedAnimalList);
  };

  useEffect(() => {
    callAnimals();
  }, []);

  const lore = (url: string) => {
    var whoosh = new Sound(url, null, (error: any) => {
      if (error) {
        console.log('failed to load the sound', error);
        return;
      }
      // loaded successfully
      console.log(
        'duration in seconds: ' +
          whoosh.getDuration() +
          'number of channels: ' +
          whoosh.getNumberOfChannels(),
      );

      // 무한 루프 설정
      whoosh.setNumberOfLoops(0);

      whoosh.play((success: any) => {
        if (success) {
          console.log('successfully finished playing');
        } else {
          console.log('playback failed due to audio decoding errors');
        }
      });
    });
  };

  const confirmType = (type: number, url: string, name: string) => {
    lore(url);
    dispatch(update3(type));
    dispatch(update4(name));
    navigation.navigate('UploadPicture5Screen');
  };

  return (
    <View style={styles.mainContainer}>
      <ImageBackground
        source={require('../../assets/bgImage/upload.png')}
        resizeMode="cover"
        style={styles.backgroundImage}>
        <View style={styles.subContainer}>
          <View style={styles.middleContainer}>
            <Image source={{uri: border_image}} style={styles.image} />
            <View style={styles.arrow}>
              <Text style={styles.text}>동물을 선택해주세요!</Text>
              <AntDesign
                name="arrowdown"
                size={windowWidth * 0.03}
                color={'#FF9800'}
              />
            </View>
          </View>
          <View style={styles.bot}>
            <ScrollView horizontal>
              {animalList.map(animal => (
                <TouchableOpacity
                  key={animal.id}
                  style={[styles.button, {backgroundColor: getRandomColor()}]}
                  onPress={() => {
                    confirmType(animal.id, animal.urlSound, animal.name);
                  }}>
                  <Text style={styles.buttontext}>{animal.name}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
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
    flex: 3,
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: windowWidth * 0.03,
    flexDirection: 'row',
  },
  image: {
    marginLeft: windowWidth * 0.225,
    height: windowWidth * 0.3,
    width: windowWidth * 0.3,
  },
  arrow: {
    alignItems: 'center',
    marginLeft: windowWidth * 0.05,
    marginTop: windowWidth * 0.2,
  },
  text: {
    fontSize: windowWidth * 0.015,
    fontFamily: 'TmoneyRoundWindExtraBold',
  },
  bot: {
    flex: 0.7,
    marginHorizontal: windowWidth * 0.055,
  },
  button: {
    width: windowWidth * 0.15,
    height: windowWidth * 0.05,
    borderRadius: windowWidth * 0.05,
    marginHorizontal: windowWidth * 0.01,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttontext: {
    fontSize: windowWidth * 0.02,
    color: '#FFFFFF',
    textAlign: 'center',
    textAlignVertical: 'center',
    fontFamily: 'TmoneyRoundWindExtraBold',
  },
});
