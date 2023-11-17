import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  Modal,
  Pressable,
  Animated,
  Easing,
  ImageBackground,
} from 'react-native';
import type {StackScreenProps} from '@react-navigation/stack';
import {RootStackParams} from '../../navigations/AppNavigator';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {uploadFriendImageApi} from '../../apis/uploadPicture/uploadPicture';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {handleSoundEffect} from '../../redux/slices/music/music';

type FriendUploadPicture2ScreenProps = StackScreenProps<
  RootStackParams,
  'FriendUploadPicture2Screen'
>;

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function FriendUploadPicture2Screen({
  navigation,
}: FriendUploadPicture2ScreenProps) {
  const [modalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const border_image = useAppSelector(
    state => state.uploadPicture.border_image,
  );
  const trace_image = useAppSelector(state => state.uploadPicture.trace_image);
  const title = useAppSelector(state => state.uploadPicture.title);
  const detail = useAppSelector(state => state.uploadPicture.detail);
  const dispatch = useAppDispatch();

  const addFriendsReqDto: {
    title: string;
    detail: string;
    originalUrl: string;
    traceUrl: string;
  } = {
    title: title,
    detail: detail,
    originalUrl: border_image,
    traceUrl: trace_image,
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

  function setIsLoadingAsync(value: boolean): Promise<void> {
    return new Promise<void>(resolve => {
      setIsLoading(value);
      resolve(); // setIsLoading가 완료되면 프로미스를 해결합니다.
    });
  }

  const goUpload = async () => {
    await setIsLoadingAsync(true);
    await uploadFriendImageApi(addFriendsReqDto);
    setModalVisible(!modalVisible);
    navigation.navigate('MainScreen');
  };

  return (
    <View style={styles.mainContainer}>
      <ImageBackground
        source={require('../../assets/bgImage/myFriend.png')}
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
        <View style={styles.topLeftContainer}>
          <Image
            style={styles.logoImage}
            source={require('../../assets/logo/friend.png')}
          />
          <Text style={styles.titleText}>동물 사진 검색하기</Text>
        </View>
        <View style={styles.subContainer}>
          <View style={styles.contentArea}>
            <View style={styles.middleContainer}>
              <Image source={{uri: border_image}} style={styles.image1} />
              <Image source={{uri: trace_image}} style={styles.image2} />
            </View>
            <View style={styles.content}>
              <View style={styles.textArea}>
                <View style={styles.upper}>
                  <Text style={styles.text1}>이름: {title} </Text>
                  <Text style={styles.text2}>한줄설명: {detail} </Text>
                </View>
                <Text style={styles.text3}>
                  저는 {title}입니다, 만나서 반가워.
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.bot}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                dispatch(handleSoundEffect('btn'));
                setModalVisible(true);
              }}>
              <Text style={styles.buttontext}>업로드하기</Text>
            </TouchableOpacity>
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                setModalVisible(!modalVisible);
              }}>
              <Pressable
                style={styles.centeredView}
                onPress={() => {
                  dispatch(handleSoundEffect('btn'));
                  setModalVisible(!modalVisible);
                }}>
                <View style={styles.modalView}>
                  <View style={styles.Mtexts}>
                    <Text style={styles.modaltext}>등록한 사진은</Text>
                    <Text style={styles.modaltext}>
                      수정 또는 삭제할 수 없습니다.
                    </Text>
                  </View>
                  <View style={styles.modalbtns}>
                    <Pressable
                      style={[styles.Mbutton1]}
                      onPress={() => {
                        dispatch(handleSoundEffect('btn'));
                        setModalVisible(!modalVisible);
                      }}>
                      <Text style={styles.Mbuttontext}>취소</Text>
                    </Pressable>
                    <Pressable
                      style={[styles.Mbutton2]}
                      onPress={() => {
                        dispatch(handleSoundEffect('btn'));
                        goUpload();
                      }}>
                      <Text style={styles.Mbuttontext}>등록</Text>
                    </Pressable>
                  </View>
                </View>
              </Pressable>
            </Modal>
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
  contentArea: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderRadius: windowHeight * 0.01,
  },
  middleContainer: {
    width: '40%',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: windowHeight * 0.02,
    marginBottom: windowHeight * 0.02,
  },
  image1: {
    alignItems: 'center',
    justifyContent: 'center',
    height: windowWidth * 0.3,
    width: windowWidth * 0.3,
    position: 'absolute',
    borderWidth: windowHeight * 0.002,
    borderColor: '#000000',
    borderRadius: windowHeight * 0.02,
  },
  image2: {
    alignItems: 'center',
    justifyContent: 'center',
    height: windowWidth * 0.3,
    width: windowWidth * 0.3,
    opacity: 0.3,
  },
  content: {
    height: '100%',
    width: '40%',
    marginTop: windowHeight * 0.02,
    marginBottom: windowHeight * 0.02,
    alignItems: 'center',
  },
  textArea: {
    height: windowWidth * 0.3,
    width: windowWidth * 0.3,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  upper: {
    width: '100%',
    alignItems: 'center',
    marginTop: windowHeight * 0.02,
  },
  text1: {
    borderBottomColor: '#000000',
    borderBottomWidth: 1,
    width: '100%',
    fontSize: windowWidth * 0.028,
    color: '#000000',
  },
  text2: {
    width: '100%',
    fontSize: windowWidth * 0.02,
    marginTop: windowHeight * 0.02,
    color: '#000000',
  },
  text3: {
    width: '100%',
    fontSize: windowWidth * 0.015,
    marginTop: windowHeight * 0.02,
    color: '#000000',
  },
  bot: {
    flex: 0.5,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingRight: windowHeight * 0.088,
    marginTop: windowHeight * 0.025,
  },
  button: {
    width: windowWidth * 0.15,
    height: windowWidth * 0.05,
    borderRadius: windowWidth * 0.005,
    marginHorizontal: windowWidth * 0.01,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FE7F22',
    marginRight: windowWidth * 0.05,
  },
  buttontext: {
    fontSize: windowWidth * 0.02,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: windowWidth * 0.137 * 0.1,
    padding: windowHeight * 0.04,
    paddingBottom: windowHeight * 0.01,
    alignItems: 'center',
    elevation: 5,
    height: windowHeight * 0.4,
  },
  Mtexts: {
    alignItems: 'center',
    paddingTop: windowWidth * 0.02,
  },
  modaltext: {
    fontSize: windowWidth * 0.02,
  },
  modalbtns: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '30%',
    marginTop: windowHeight * 0.05,
  },
  Mbutton1: {
    backgroundColor: '#A3A3A3',
    justifyContent: 'center',
    alignItems: 'center',
    width: windowWidth * 0.1,
    height: windowWidth * 0.05,
    borderRadius: windowWidth * 0.005,
  },
  Mbutton2: {
    backgroundColor: '#DBE7B5',
    justifyContent: 'center',
    alignItems: 'center',
    width: windowWidth * 0.1,
    height: windowWidth * 0.05,
    borderRadius: windowWidth * 0.005,
  },
  Mbuttontext: {
    fontSize: windowWidth * 0.02,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  topLeftContainer: {
    marginTop: windowHeight * 0.03,
    marginLeft: windowHeight * 0.03,
    flexDirection: 'row',
  },
  logoImage: {
    alignSelf: 'center',
    width: windowWidth * 0.11,
    height: windowWidth * 0.11,
    resizeMode: 'contain',
  },
  titleText: {
    alignSelf: 'center',
    fontSize: windowWidth * 0.05,
    fontWeight: '600',
    color: 'black',
  },
  loadingImage: {
    position: 'absolute',
    width: windowHeight * 0.3,
    height: windowHeight * 0.3,
    top: windowHeight * 0.5 - windowHeight * 0.3 * 0.5,
    left: windowWidth * 0.5 - windowHeight * 0.3 * 0.5,
  },
});
