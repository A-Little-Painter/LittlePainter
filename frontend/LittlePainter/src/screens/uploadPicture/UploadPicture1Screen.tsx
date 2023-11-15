import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
  Animated,
  Easing,
  ImageBackground,
} from 'react-native';
import type {StackScreenProps} from '@react-navigation/stack';
import {RootStackParams} from '../../navigations/AppNavigator';
import {useAppDispatch} from '../../redux/hooks';
import {openImagePicker} from '../detail/ImagePicker';
import {
  update,
  update2,
  destinationUpdate,
} from '../../redux/slices/uploadPicture/uploadPicture';
import ImageResizer from '@bam.tech/react-native-image-resizer';
import {handleBGMMusic} from '../../redux/slices/music/music';
import {uploadPictureApi} from '../../apis/uploadPicture/uploadPicture';
import {handleSoundEffect} from '../../redux/slices/music/music';

type UploadPicture1ScreenProps = StackScreenProps<
  RootStackParams,
  'UploadPicture1Screen'
>;

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function UploadPicture1Screen({
  navigation,
}: UploadPicture1ScreenProps) {
  const dispatch = useAppDispatch();
  const [title, setTitle] = useState('');
  const [detail, setDetail] = useState('');
  const [imageSource, setImageSource] = useState<{
    uri: string;
    fileName: string;
    type: string;
  } | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const imagetemp = async () => {
    try {
      const selectedImage = await openImagePicker();
      console.log(selectedImage);

      if (selectedImage) {
        const resizerImage = await ImageResizer.createResizedImage(
          selectedImage.uri,
          500,
          500,
          'JPEG',
          70,
          0,
          undefined,
          false,
          {mode: 'stretch'},
        );
        console.log('resizerImage');
        console.log(resizerImage);
        setImageSource({
          uri: resizerImage.uri,
          fileName: selectedImage.fileName,
          type: selectedImage.type,
        });
      } else {
        console.log('이미지 선택되지 않음');
      }
    } catch (error) {
      console.log('실패:', error);
    }
  };
  let srcText: string;
  let nameText: string = '';
  let typeText: string;
  if (imageSource) {
    srcText = imageSource.uri;
    nameText = imageSource.fileName;
    typeText = imageSource.type;
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
      dispatch(destinationUpdate('UploadPicture3Screen'));
      console.log(data);
      unMoving();
    } else if (!srcText) {
      Alert.alert('잠깐!', '동물의 사진을 올려주세요');
    } else {
      Alert.alert('잠깐!', '동물의 이름과 소개를 적어주세요');
    }
  };

  useEffect(() => {
    dispatch(
      handleBGMMusic(
        'https://littlepainter.s3.ap-northeast-2.amazonaws.com/sound/bgm/BG_uploadAnimal.mp3',
      ),
    );
  }, []);

  function setIsLoadingAsync(value: boolean): Promise<void> {
    return new Promise<void>(resolve => {
      setIsLoading(value);
      resolve(); // setIsLoading가 완료되면 프로미스를 해결합니다.
    });
  }

  ////// 로딩 애니메이션
  const [rotation] = useState(new Animated.Value(0));
  useEffect(() => {
    dispatch(
      handleBGMMusic(
        'https://littlepainter.s3.ap-northeast-2.amazonaws.com/sound/bgm/BG_uploadAnimal.mp3',
      ),
    );
    const rotateImage = () => {
      Animated.timing(rotation, {
        toValue: 360,
        duration: 2000, // 회전에 걸리는 시간 (밀리초)
        easing: Easing.linear,
        useNativeDriver: false, // 필요에 따라 변경
      }).start(() => {
        rotation.setValue(0); // 애니메이션이 끝나면 초기 각도로 돌아감
        rotateImage();
      });
    };

    rotateImage();
  }, []);

  const spin = rotation.interpolate({
    inputRange: [0, 360],
    outputRange: ['0deg', '360deg'],
  });
  ////////////

  const unMoving = async () => {
    setIsLoadingAsync(true);
    const imageData = new FormData();
    imageData.append('file', {
      uri: srcText,
      name: nameText,
      type: typeText,
    });
    const temp = await uploadPictureApi(imageData);
    const checkImage = temp.data;
    const data: {
      animal_type: string;
      border_image: string;
      trace_image: string;
      moving: boolean;
    } = {
      animal_type: checkImage.animal_type,
      border_image: checkImage.border_image,
      trace_image: checkImage.trace_image,
      moving: false,
    };
    dispatch(update2(data));
    setIsLoadingAsync(false);
    navigation.navigate('UploadPicture3Screen');
  };

  return (
    <View style={styles.mainContainer}>
      <ImageBackground
        source={require('../../assets/bgImage/upload.png')}
        resizeMode="cover"
        style={styles.backgroundImage}>
        {isLoading ? (
          <View style={{position: 'absolute', zIndex: 1}}>
            <Animated.Image
              style={[styles.loadingImage, {transform: [{rotate: spin}]}]}
              source={require('../../assets/images/loading2.png')}
            />
          </View>
        ) : null}
        <View style={styles.subContainer}>
          {/* 상단 */}
          <View style={styles.topContainer}>
            {/* 상단 좌측 */}
            <View style={styles.topLeftContainer}>
              <Image
                style={styles.logoImage}
                source={require('../../assets/logo/upload.png')}
              />
              <Text style={styles.titleText}>내 동물 사진 등록하기</Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                dispatch(handleSoundEffect('btn'));
                navigation.navigate('MainScreen');
              }}
              style={styles.goHomeArea}>
              <Image
                source={require('../../assets/images/VVector.png')}
                style={styles.goHome}
              />
            </TouchableOpacity>
            {/* 상단 우측 */}
            <View style={styles.topRightContainer}>
              {/* <Text>검색</Text> */}
            </View>
          </View>
          {/* 중단 */}
          <View style={styles.middleContainer}>
            {/* 이름 */}
            <View style={styles.imageArea}>
              <View style={styles.searchImage}>
                {!imageSource ? (
                  <Image
                    source={require('../../assets/images/wwaitting_cat.png')}
                    style={styles.image}
                  />
                ) : (
                  <Image source={{uri: imageSource.uri}} style={styles.image} />
                )}
              </View>
              <View style={styles.originPart}>
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
                {/* 파일선택 */}
                <View style={styles.bottomcontentContainer}>
                  <Text> {nameText} </Text>
                  <TouchableOpacity
                    style={styles.fileSelectView}
                    onPress={() => {
                      dispatch(handleSoundEffect('btn'));
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
          </View>
          <View style={styles.btnArea}>
            <TouchableOpacity
              style={styles.uploadButton}
              onPress={() => {
                dispatch(handleSoundEffect('btn'));
                uploadPicture1();
              }}>
              <Text style={styles.uploadText}>올리기</Text>
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
    alignSelf: 'center',
    flex: 1,
    width: '95%',
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
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
    justifyContent: 'space-evenly',
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
    resizeMode: 'stretch',
  },
  textArea: {
    height: '85%',
    width: '100%',
    alignItems: 'center',
  },
  uploadContentContainer: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
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
    fontFamily: 'TmoneyRoundWindExtraBold',
  },
  text1: {
    borderBottomColor: '#000000',
    borderBottomWidth: 1,
    width: '100%',
    fontSize: windowWidth * 0.028,
    fontFamily: 'TmoneyRoundWindExtraBold',
  },
  text2: {
    width: '100%',
    fontSize: windowWidth * 0.02,
    fontFamily: 'TmoneyRoundWindExtraBold',
  },
  btnArea: {
    justifyContent: 'center',
    width: '90%',
    marginBottom: windowWidth * 0.01,
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
    fontFamily: 'TmoneyRoundWindExtraBold',
  },
  middlecontentContainer: {
    flex: 4,
    borderBottomWidth: 1,
  },
  bottomcontentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    paddingTop: windowWidth * 0.01,
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
    fontFamily: 'TmoneyRoundWindExtraBold',
  },
  originPart: {
    height: '100%',
    width: '40%',
  },
  goHomeArea: {
    marginLeft: windowWidth * 0.2754,
    marginTop: windowWidth * 0.03,
  },
  goHome: {
    height: windowWidth * 0.05,
    width: windowWidth * 0.05,
  },
  loadingImage: {
    position: 'absolute',
    width: windowHeight * 0.3,
    height: windowHeight * 0.3,
    top: windowHeight * 0.5 - windowHeight * 0.3 * 0.5,
    left: windowWidth * 0.5 - windowHeight * 0.3 * 0.5,
  },
});
