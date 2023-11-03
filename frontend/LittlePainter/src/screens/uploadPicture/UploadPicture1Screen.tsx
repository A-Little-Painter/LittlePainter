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
import {openImagePicker} from '../detail/ImagePicker';
import {update} from '../../redux/slices/uploadPicture/uploadPicture';

type UploadPicture1ScreenProps = StackScreenProps<
  RootStackParams,
  'UploadPicture1Screen'
>;

const windowWidth = Dimensions.get('window').width;
// const windowHeight = Dimensions.get('window').height;

export default function UploadPicture1Screen({
  navigation,
}: UploadPicture1ScreenProps) {
  const dispatch = useAppDispatch();
  const [title, setTitle] = useState('');
  const [detail, setDetail] = useState('');
  const [imageSource, setImageSource] = useState<{
    uri: string;
    fileName: string;
    originalPath: string;
  } | null>(null);
  const imagetemp = () => {
    openImagePicker(setImageSource);
    console.log(imageSource);
  };
  let srcText: string;
  if (imageSource) {
    srcText = imageSource['uri'];
  } else {
    srcText = '';
  }

  const uploadPicture1 = () => {
    if (title && detail && srcText) {
      const data: {
        title: string;
        detail: string;
        pictureaddr: string;
      } = {
        title: title,
        detail: detail,
        pictureaddr: srcText,
      };
      dispatch(update(data));
      console.log(data);
      navigation.navigate('UploadPicture2Screen');
    } else if (!srcText) {
      Alert.alert('잠깐!', '동물의 사진을 올려주세요');
    } else {
      Alert.alert('잠깐!', '동물의 이름과 소개를 적어주세요');
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
            <Text style={styles.titleText}>내 동물 사진 등록하기</Text>
          </View>
          {/* 상단 우측 */}
          <View style={styles.topRightContainer}>
            {/* <Text>검색</Text> */}
          </View>
        </View>
        {/* 중단 */}
        <View style={styles.middleContainer}>
          <View style={styles.uploadContentContainer}>
            <View style={styles.uploadsubContentContainer}>
              {/* 이름 */}
              <View style={styles.topcontentContainer}>
                <TextInput
                  style={styles.animalName}
                  placeholder="이름"
                  maxLength={15}
                  // placeholderTextColor={'black'}
                  onChangeText={text => setTitle(text)}
                />
              </View>
              {/* 내용 */}
              <View style={styles.middlecontentContainer}>
                <View style={styles.middlecontentContainerView}>
                  <TextInput
                    style={styles.animalContent}
                    placeholder="한줄 소개"
                    maxLength={30}
                    // placeholderTextColor={'black'}
                    onChangeText={text => setDetail(text)}
                  />
                </View>
              </View>
              {/* 파일선택 */}
              <View style={styles.bottomcontentContainer}>
                <Text> {srcText} </Text>
                <TouchableOpacity
                  style={styles.fileSelectView}
                  onPress={() => {
                    imagetemp();
                  }}>
                  <Image
                    resizeMode="contain"
                    style={styles.fileSelectImage}
                    source={require('../../assets/images/arrow-up.png')}
                  />
                  <Text style={styles.fileSelectText}>파일선택</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View>
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
  },
  uploadContentContainer: {
    alignSelf: 'center',
    justifyContent: 'center',
    width: '90%',
    height: '80%',
    backgroundColor: 'white',
  },
  uploadsubContentContainer: {
    width: '90%',
    height: '90%',
    alignSelf: 'center',
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
  pictureCard1: {
    margin: windowWidth * 0.01,
  },
  pcitureCard2: {
    borderRadius: 20,
    borderColor: 'black',
    borderWidth: 1,
    width: windowWidth * 0.194,
    height: windowWidth * 0.14,
  },
  pictureCardText: {
    // textAlign: 'center',
    fontSize: windowWidth * 0.018,
    fontWeight: '600',
  },
  pictureCardPainterText: {
    // textAlign: 'center',
    fontSize: windowWidth * 0.013,
  },
  topcontentContainer: {
    flex: 0.2,
    justifyContent: 'center',
    borderBottomWidth: 1,
  },
  animalName: {
    fontSize: windowWidth * 0.028,
  },
  middlecontentContainer: {flex: 0.6, borderBottomWidth: 1},
  middlecontentContainerView: {
    width: '95%',
    alignSelf: 'center',
  },
  animalContent: {
    fontSize: windowWidth * 0.02,
  },
  bottomcontentContainer: {
    flex: 0.2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  fileSelectView: {
    borderRadius: windowWidth * 0.06 * 0.1,
    width: windowWidth * 0.06,
    height: windowWidth * 0.06 * 0.5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ECECEC',
    flexDirection: 'row',
  },
  fileSelectImage: {
    width: windowWidth * 0.01,
  },
  fileSelectText: {
    paddingLeft: windowWidth * 0.003,
    color: 'black',
  },
  uploadButton: {
    justifyContent: 'center',
    alignSelf: 'flex-end',
    backgroundColor: '#C68AEB',
    marginRight: windowWidth * 0.045,
    marginTop: windowWidth * 0.02,
    width: windowWidth * 0.15,
    height: windowWidth * 0.04,
    borderRadius: windowWidth * 0.01,
  },
  uploadText: {
    textAlign: 'center',
    fontSize: windowWidth * 0.018,
  },
});
