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
} from 'react-native';
import type {StackScreenProps} from '@react-navigation/stack';
import {RootStackParams} from '../../navigations/AppNavigator';
import {useAppDispatch} from '../../redux/hooks';
import {
  update0,
  update2,
  destinationUpdate,
} from '../../redux/slices/uploadPicture/uploadPicture';
import {uploadPictureApi} from '../../apis/uploadPicture/uploadPicture';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import {googleSearchApi} from '../../apis/uploadPicture/uploadPicture';
import ImageResizer from '@bam.tech/react-native-image-resizer';

type UploadPicture0ScreenProps = StackScreenProps<
  RootStackParams,
  'UploadPicture0Screen'
>;

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function UploadPicture0Screen({
  navigation,
}: UploadPicture0ScreenProps) {
  const dispatch = useAppDispatch();
  const [title, setTitle] = useState('');
  const [detail, setDetail] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [imageSource, setImageSource] = useState('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

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

  function setIsLoadingAsync(value: boolean): Promise<void> {
    return new Promise<void>(resolve => {
      setIsLoading(value);
      resolve(); // setIsLoading가 완료되면 프로미스를 해결합니다.
    });
  }

  const uploadPicture1 = () => {
    setIsLoadingAsync(true) // 비동기로 setIsLoading(true)를 호출
      .then(() => {
        try {
          if (title && detail && srcText) {
            const data: {
              title: string;
              detail: string;
              pictureaddr: string;
              picturename: string;
              picturetype: string;
              animal_type: string;
            } = {
              title: title,
              detail: detail,
              pictureaddr: srcText,
              picturename: nameText,
              picturetype: typeText,
              animal_type: inputValue,
            };
            const imageData = new FormData();
            imageData.append('file', {
              uri: srcText,
              name: nameText,
              type: typeText,
            });
            dispatch(update0(data));
            dispatch(destinationUpdate('UploadPicture5Screen'));
            return uploadPictureApi(imageData);
          } else if (!srcText) {
            setIsLoadingAsync(false);
            Alert.alert('잠깐!', '동물의 사진을 골라주세요');
          } else {
            setIsLoadingAsync(false);
            Alert.alert('잠깐!', '동물의 이름과 소개를 적어주세요');
          }
        } catch {
          setIsLoadingAsync(false);
          console.log('error');
        }
      })
      .then(temp => {
        const checkImage = temp.data;
        const data2: {
          animal_type: string;
          border_image: string;
          trace_image: string;
          moving: boolean;
        } = {
          animal_type: inputValue,
          border_image: checkImage.border_image,
          trace_image: checkImage.trace_image,
          moving: false,
        };
        dispatch(update2(data2));
        navigation.navigate('UploadPicture5Screen');
        console.log(isLoading);
        console.log('5');
        setIsLoading(false);
      })
      .catch(error => {
        setIsLoadingAsync(false);
        console.log('에러: ', error);
      });
  };

  const goSearch = async (value: string) => {
    await setIsLoadingAsync(true); // 비동기로 setIsLoading(true)를 호출
    if (value) {
      const temp = await googleSearchApi(value);
      const resizerImage = await ImageResizer.createResizedImage(
        temp,
        500,
        500,
        'JPEG',
        70,
        0,
        undefined,
        false,
        {mode: 'stretch'},
      );
      setImageSource(resizerImage.uri);
      setIsLoadingAsync(false);
    } else {
      console.log('검색어 없음');
      setIsLoadingAsync(false);
    }
  };

  ////// 로딩 애니메이션
  const [rotation] = useState(new Animated.Value(0));
  useEffect(() => {
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

  return (
    <View style={styles.mainContainer}>
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
              source={require('../../assets/images/elephant.png')}
            />
            <Text style={styles.titleText}>동물 사진 검색하기</Text>
          </View>
          <TouchableOpacity
            onPress={() => {
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
  goHomeArea: {
    marginLeft: windowWidth * 0.35,
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
