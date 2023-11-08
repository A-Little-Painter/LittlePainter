import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  Modal,
  Pressable,
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

  const goUpload = () => {
    uploadFriendImageApi(addFriendsAnimalReqDto);
    setModalVisible(!modalVisible);
    navigation.navigate('MainScreen');
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.subContainer}>
        <View style={styles.middleContainer}>
          <Image source={{uri: border_image}} style={styles.image1} />
          <Image source={{uri: trace_image}} style={styles.image2} />
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
  middleContainer: {
    flex: 3,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: windowWidth * 0.03,
    flexDirection: 'row',
  },
  image1: {
    alignItems: 'center',
    justifyContent: 'center',
    height: windowWidth * 0.3,
    width: windowWidth * 0.3,
    position: 'absolute',
  },
  image2: {
    alignItems: 'center',
    justifyContent: 'center',
    height: windowWidth * 0.3,
    width: windowWidth * 0.3,
    opacity: 0.3,
  },
  bot: {
    flex: 0.7,
    width: '100%',
    marginHorizontal: windowWidth * 0.055,
    flexDirection: 'row',
    justifyContent: 'flex-end',
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
});
