import React from 'react';
import {
  Dimensions,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  TouchableOpacity,
} from 'react-native';
import type {StackScreenProps} from '@react-navigation/stack';
import {RootStackParams} from '../../navigations/AppNavigator';
import {useNavigation} from '@react-navigation/native';
import {RootState} from '../../redux/store';
import {useDispatch, useSelector} from 'react-redux';
import {handleisSaveDrawnToLoginModalVisible} from '../../redux/slices/draw/draw';
export type SaveDrawnToLoginModalProps = {
  selectColor: string;
};

type SaveDrawnToLoginModalNavigateProps = StackScreenProps<
  RootStackParams,
  'SaveDrawnToLoginModal'
>;
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const SaveDrawnToLoginModal = ({}: SaveDrawnToLoginModalNavigateProps) => {
  const dispatch = useDispatch();
  // 선 굵기 모달을 위한 라인
  const isSaveDrawnToLoginModalVisible = useSelector(
    (state: RootState) => state.draw.isSaveDrawnToLoginModalVisible,
  );
  const navigation = useNavigation();
  return (
    <View>
      <Modal
        animationType="none"
        transparent={true}
        visible={isSaveDrawnToLoginModalVisible}
        onRequestClose={() => {
          dispatch(handleisSaveDrawnToLoginModalVisible(false));
        }}>
        <Pressable
          style={styles.centeredView}
          onPress={() => {
            dispatch(handleisSaveDrawnToLoginModalVisible(false));
          }}>
          <Pressable
            style={styles.modalView}
            onPress={() => {
              dispatch(handleisSaveDrawnToLoginModalVisible(true));
            }}>
            <Text style={styles.middleText}>
              그림을 저장하려면 {'\n'}로그인을 해야해요.
            </Text>
            <View style={styles.modalBottom}>
              <TouchableOpacity
                style={styles.Button1}
                onPress={() => {
                  dispatch(handleisSaveDrawnToLoginModalVisible(false));
                }}>
                <Text style={styles.buttonText}>취소</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.Button2}
                onPress={() => {
                  dispatch(handleisSaveDrawnToLoginModalVisible(false));
                  navigation.navigate('LoginScreen');
                }}>
                <Text style={styles.buttonText}>로그인하러가기</Text>
              </TouchableOpacity>
            </View>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    width: windowWidth * 0.5,
    height: windowHeight * 0.5,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTop: {
    flex: 0.1,
    justifyContent: 'center',
    alignSelf: 'center',
    flexDirection: 'row',
  },
  modalTopLeft: {
    flex: 0.08,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalTopMiddle: {
    flex: 0.84,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalTitleText: {
    textAlign: 'center',
    color: 'black',
    fontSize: windowWidth * 0.025,
    fontWeight: '600',
  },
  modalTopRight: {
    flex: 0.08,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  modalCloseX: {
    textAlign: 'center',
    fontSize: windowWidth * 0.03,
  },
  modalMiddle: {
    flex: 0.7,
    justifyContent: 'center',
    alignItems: 'center',
  },
  middleText: {
    fontSize: windowHeight * 0.06,
    color: 'black',
  },
  modalBottom: {
    width: '80%',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'row',
  },
  Button1: {
    backgroundColor: '#A3A3A3',
    width: windowWidth * 0.1,
    height: windowHeight * 0.1,
    borderRadius: windowHeight * 0.03,
    justifyContent: 'center',
  },
  Button2: {
    backgroundColor: '#DBE7B5',
    width: windowWidth * 0.15,
    height: windowHeight * 0.1,
    borderRadius: windowHeight * 0.03,
    justifyContent: 'center',
  },
  buttonText: {
    color: 'black',
    textAlign: 'center',
    fontSize: windowHeight * 0.035,
  },
});

export default SaveDrawnToLoginModal;
