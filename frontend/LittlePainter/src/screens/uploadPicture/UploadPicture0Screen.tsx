import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import type {StackScreenProps} from '@react-navigation/stack';
import {RootStackParams} from '../../navigations/AppNavigator';
import {useAppDispatch} from '../../redux/hooks';
import {
  update,
  destinationUpdate,
} from '../../redux/slices/uploadPicture/uploadPicture';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import {googleSearchApi} from '../../apis/uploadPicture/uploadPicture';
import ImageResizer from '@bam.tech/react-native-image-resizer';

type UploadPicture0ScreenProps = StackScreenProps<
  RootStackParams,
  'UploadPicture0Screen'
>;

const windowWidth = Dimensions.get('window').width;
// const windowHeight = Dimensions.get('window').height;

export default function UploadPicture0Screen({
  navigation,
}: UploadPicture0ScreenProps) {
  const dispatch = useAppDispatch();
  const [title, setTitle] = useState('');
  const [detail, setDetail] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [imageSource, setImageSource] = useState('');

  let srcText: string;
  let nameText: string;
  let typeText: string;
  if (imageSource) {
    srcText = imageSource;
    nameText = 'searchAnimal.JPEG';
    typeText = 'image/jpeg';
  } else {
    srcText = '';
  }

  const uploadPicture1 = () => {
    if (title && detail && srcText) {
      const data: {
        title: string;
        detail: string;
        pictureaddr: string;
        picturename: string;
        picturetype: string;
      } = {
        title: title,
        detail: detail,
        pictureaddr: srcText,
        picturename: nameText,
        picturetype: typeText,
      };
      dispatch(update(data));
      dispatch(destinationUpdate('UploadPicture5Screen'));
      console.log(data);
      navigation.navigate('UploadPicture2Screen');
    } else if (!srcText) {
      Alert.alert('잠깐!', '동물의 사진을 골라주세요');
    } else {
      Alert.alert('잠깐!', '동물의 이름과 소개를 적어주세요');
    }
  };

  const goSearch = async (value: string) => {
    if (value) {
      const temp = await googleSearchApi(value);
      const resizerImage = await ImageResizer.createResizedImage(
        temp,
        400,
        400,
        'JPEG',
        70,
        0,
        undefined,
        false,
        {mode: 'stretch'},
      );
      setImageSource(resizerImage.uri);
    } else {
      console.log('검색어 없음');
    }
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.subContainer}>
        {/* 상단 */}
        <View style={styles.topContainer}>
          {/* 상단 좌측 */}
          <View style={styles.topLeftContainer}>
            <Image
              style={styles.logoImage}
              source={require('../../assets/images/elephant.png')}
            />
            <Text style={styles.titleText}>동물 사진 검색하기</Text>
          </View>
          {/* 상단 우측 */}
          <View style={styles.topRightContainer}>
            {/* <Text>검색</Text> */}
          </View>
        </View>
        {/* 중단 */}
        <View style={styles.middleContainer}>
          <View style={styles.imageArea}>
            <View style={styles.searchImage}>
              {!imageSource ? (
                <Image
                  source={require('../../assets/images/searching_dog.png')}
                  style={styles.image}
                  resizeMode="contain"
                />
              ) : (
                <Image
                  source={{uri: imageSource}}
                  style={styles.image}
                  resizeMode="contain"
                />
              )}
            </View>
            <View style={styles.textArea}>
              <TextInput
                placeholder="이름"
                style={styles.text1}
                maxLength={15}
                onChangeText={text => setTitle(text)}
              />
              <TextInput
                placeholder="한줄 소개"
                style={styles.text2}
                maxLength={30}
                onChangeText={text => setDetail(text)}
              />
            </View>
          </View>
          <View style={styles.uploadContentContainer}>
            <TextInput
              style={styles.searchbar}
              placeholder="동물 이름을 입력해 주세요."
              value={inputValue}
              onChangeText={text => setInputValue(text)}
              onSubmitEditing={() => {
                goSearch(inputValue);
              }}
            />
            <TouchableOpacity
              activeOpacity={1}
              style={styles.searchMark}
              onPress={() => {
                goSearch(inputValue);
              }}>
              <IconFontAwesome name="search" size={windowWidth * 0.03} />
            </TouchableOpacity>
          </View>
          <View style={styles.btnArea}>
            <TouchableOpacity
              style={styles.uploadButton}
              onPress={() => {
                uploadPicture1();
              }}>
              <Text style={styles.uploadText}>올리기</Text>
            </TouchableOpacity>
          </View>
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
    alignSelf: 'center',
    flex: 1,
    width: '95%',
  },
  topContainer: {
    flex: 0.3,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  topLeftContainer: {
    flexDirection: 'row',
  },
  topRightContainer: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    justifyContent: 'flex-end',
    marginRight: windowWidth * 0.04,
    paddingBottom: windowWidth * 0.03,
  },
  middleContainer: {
    flex: 0.7,
    width: '90%',
    alignSelf: 'center',
    alignItems: 'center',
  },
  imageArea: {
    flex: 4,
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: windowWidth * 0.01,
    backgroundColor: '#FFFFFF',
    width: '86%',
  },
  searchImage: {
    height: '100%',
    width: '40%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: '90%',
    width: '100%',
  },
  textArea: {
    height: '100%',
    width: '40%',
    alignItems: 'center',
  },
  uploadContentContainer: {
    flex: 1,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  searchbar: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: windowWidth * 0.05,
    borderBottomLeftRadius: windowWidth * 0.05,
    paddingHorizontal: windowWidth * 0.02,
    height: windowWidth * 0.05,
    width: '80%',
    fontSize: windowWidth * 0.02,
    marginTop: windowWidth * 0.015,
  },
  searchMark: {
    backgroundColor: '#FFFFFF',
    height: windowWidth * 0.05,
    justifyContent: 'center',
    borderTopRightRadius: windowWidth * 0.05,
    borderBottomRightRadius: windowWidth * 0.05,
    paddingHorizontal: windowWidth * 0.015,
    marginTop: windowWidth * 0.015,
  },
  logoImage: {
    alignSelf: 'center',
    width: windowWidth * 0.11,
    height: windowWidth * 0.11,
  },
  titleText: {
    alignSelf: 'center',
    fontSize: windowWidth * 0.05,
    fontWeight: '600',
    color: 'black',
  },
  text1: {
    borderBottomColor: '#000000',
    borderBottomWidth: 1,
    width: '100%',
    fontSize: windowWidth * 0.028,
  },
  text2: {
    width: '100%',
    fontSize: windowWidth * 0.02,
  },
  btnArea: {
    flex: 1,
    justifyContent: 'center',
    width: '90%',
  },
  uploadButton: {
    justifyContent: 'center',
    alignSelf: 'flex-end',
    backgroundColor: '#C68AEB',
    marginRight: windowWidth * 0.045,
    width: windowWidth * 0.15,
    height: windowWidth * 0.04,
    borderRadius: windowWidth * 0.01,
  },
  uploadText: {
    textAlign: 'center',
    fontSize: windowWidth * 0.018,
  },
});
