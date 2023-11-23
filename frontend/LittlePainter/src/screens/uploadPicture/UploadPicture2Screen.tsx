import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  Animated,
  Easing,
  ImageBackground,
} from 'react-native';
import type {StackScreenProps} from '@react-navigation/stack';
import {RootStackParams} from '../../navigations/AppNavigator';
import {useAppSelector, useAppDispatch} from '../../redux/hooks';
import {uploadPictureApi} from '../../apis/uploadPicture/uploadPicture';
import {update2} from '../../redux/slices/uploadPicture/uploadPicture';

type UploadPicture2ScreenProps = StackScreenProps<
  RootStackParams,
  'UploadPicture2Screen'
>;

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function UploadPicture2Screen({
  navigation,
}: UploadPicture2ScreenProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const pictureaddr = useAppSelector(state => state.uploadPicture.pictureaddr);
  const picturename = useAppSelector(state => state.uploadPicture.picturename);
  const picturetype = useAppSelector(state => state.uploadPicture.picturetype);
  const destination = useAppSelector(state => state.uploadPicture.destination);
  const dispatch = useAppDispatch();

  function setIsLoadingAsync(value: boolean): Promise<void> {
    return new Promise<void>(resolve => {
      setIsLoading(value);
      resolve(); // setIsLoading가 완료되면 프로미스를 해결합니다.
    });
  }

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

  const moving = async () => {
    setIsLoadingAsync(true);
    const imageData = new FormData();
    imageData.append('file', {
      uri: pictureaddr,
      name: picturename,
      type: picturetype,
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
      moving: true,
    };
    dispatch(update2(data));
    setIsLoadingAsync(false);
    if (destination === 'UploadPicture3Screen') {
      console.log(destination);
      navigation.navigate('UploadPicture3Screen');
    } else {
      console.log(destination);
      navigation.navigate('UploadPicture5Screen');
    }
  };
  const unMoving = async () => {
    setIsLoadingAsync(true);
    const imageData = new FormData();
    imageData.append('file', {
      uri: pictureaddr,
      name: picturename,
      type: picturetype,
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
    if (destination === 'UploadPicture3Screen') {
      console.log(destination);
      navigation.navigate('UploadPicture3Screen');
    } else {
      console.log(destination);
      navigation.navigate('UploadPicture5Screen');
    }
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
            {/* 상단 우측 */}
            <View style={styles.topRightContainer}>
              {/* <Text>검색</Text> */}
            </View>
          </View>
          {/* 중단 */}
          <View style={styles.middleContainer}>
            <View style={styles.uploadContentContainer}>
              <View style={styles.caution}>
                <Text style={styles.cautionText1}>
                  동물을 움직이게 만들까요?
                </Text>
                <Text style={styles.cautionText2}>
                  (4발동물이 아니면 이상하게 움직일 수도 있어요)
                </Text>
              </View>
            </View>
            <View style={styles.uploadButton}>
              <TouchableOpacity
                onPress={() => {
                  moving();
                }}>
                <Text style={styles.uploadText}>움직이는게 좋아요</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  unMoving();
                }}>
                <Text style={styles.uploadText}>안 움직여도 돼요</Text>
              </TouchableOpacity>
            </View>
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
  },
  uploadContentContainer: {
    alignSelf: 'center',
    justifyContent: 'center',
    height: '60%',
  },
  caution: {
    alignItems: 'center',
  },
  cautionText1: {
    fontSize: windowWidth * 0.03,
    color: '#000000',
  },
  cautionText2: {
    fontSize: windowWidth * 0.02,
    color: '#000000',
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
  uploadButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
    width: windowWidth * 0.5,
  },
  uploadText: {
    backgroundColor: '#C68AEB',
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: windowWidth * 0.018,
    width: windowWidth * 0.2,
    height: windowWidth * 0.05,
    borderRadius: windowWidth * 0.01,
  },
  loadingImage: {
    position: 'absolute',
    width: windowHeight * 0.3,
    height: windowHeight * 0.3,
    top: windowHeight * 0.5 - windowHeight * 0.3 * 0.5,
    left: windowWidth * 0.5 - windowHeight * 0.3 * 0.5,
  },
});
