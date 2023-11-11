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
} from 'react-native';
import type {StackScreenProps} from '@react-navigation/stack';
import {RootStackParams} from '../../navigations/AppNavigator';
import {useAppSelector} from '../../redux/hooks';
import {uploadFriendImageApi} from '../../apis/uploadPicture/uploadPicture';
import {TouchableOpacity} from 'react-native-gesture-handler';

type UploadPicture5ScreenProps = StackScreenProps<
  RootStackParams,
  'UploadPicture5Screen'
>;

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function UploadPicture5Screen({
  navigation,
}: UploadPicture5ScreenProps) {
  const [modalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const border_image = useAppSelector(
    state => state.uploadPicture.border_image,
  );
  const trace_image = useAppSelector(state => state.uploadPicture.trace_image);
  const title = useAppSelector(state => state.uploadPicture.title);
  const detail = useAppSelector(state => state.uploadPicture.detail);
  const animal_type_num = useAppSelector(
    state => state.uploadPicture.animal_type_num,
  );
  const moving = useAppSelector(state => state.uploadPicture.moving);
  const animal_type = useAppSelector(state => state.uploadPicture.animal_type);

  const addFriendsAnimalReqDto: {
    title: string;
    detail: string;
    animalTypeId: number;
    movable: boolean;
    originalUrl: string;
    traceUrl: string;
  } = {
    title: title,
    detail: detail,
    animalTypeId: animal_type_num,
    movable: moving,
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
    await uploadFriendImageApi(addFriendsAnimalReqDto);
    setModalVisible(!modalVisible);
    navigation.navigate('MainScreen');
  };

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
      <View style={styles.topLeftContainer}>
        <Image
          style={styles.logoImage}
          source={require('../../assets/images/elephant.png')}
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
                {title}은(는) 귀여운 {animal_type}입니다.
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.bot}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
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
              onPress={() => setModalVisible(!modalVisible)}>
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
                    onPress={() => setModalVisible(!modalVisible)}>
                    <Text style={styles.Mbuttontext}>취소</Text>
                  </Pressable>
                  <Pressable
                    style={[styles.Mbutton2]}
                    onPress={() => goUpload()}>
                    <Text style={styles.Mbuttontext}>등록</Text>
                  </Pressable>
                </View>
              </View>
            </Pressable>
          </Modal>
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
    justifyContent: 'center',
    flex: 1,
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
    marginTop: windowHeight * 0.04,
  },
  button: {
    width: windowWidth * 0.15,
    height: windowWidth * 0.05,
    borderRadius: windowWidth * 0.005,
    marginHorizontal: windowWidth * 0.01,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#C68AEB',
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
  },
  loadingImage: {
    position: 'absolute',
    width: windowHeight * 0.3,
    height: windowHeight * 0.3,
    top: windowHeight * 0.5 - windowHeight * 0.3 * 0.5,
    left: windowWidth * 0.5 - windowHeight * 0.3 * 0.5,
  },
});
