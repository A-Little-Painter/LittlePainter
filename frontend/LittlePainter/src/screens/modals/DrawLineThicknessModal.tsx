import React, {useState} from 'react';
import {Alert, Modal, StyleSheet, Text, Pressable, View} from 'react-native';
import {RootState} from '../../redux/store';
import {useDispatch, useSelector} from 'react-redux';
import {
  handleLineThickness,
  handleisDrawLineThicknessModalVisible,
} from '../../redux/slices/draw/draw';
// import Slider from '@react-native-community/slider';

const DrawLineThicknessModal = () => {
  const dispatch = useDispatch();
  // 선 굵기 모달을 위한 라인
  const LineThickness = useSelector(
    (state: RootState) => state.draw.LineThickness,
  );
  const isDrawLineThicknessModalVisible = useSelector(
    (state: RootState) => state.draw.isDrawLineThicknessModalVisible,
  );
  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isDrawLineThicknessModalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          dispatch(handleisDrawLineThicknessModalVisible(false));
        }}>
        <Pressable
          style={styles.centeredView}
          onPress={() => {
            dispatch(handleisDrawLineThicknessModalVisible(false));
          }}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Hello World!</Text>
            {/* <Slider
              style={{width: 200, height: 40}}
              minimumValue={0}
              maximumValue={1}
              minimumTrackTintColor="#FFFFFF"
              maximumTrackTintColor="#000000"
            /> */}
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() =>
                dispatch(handleisDrawLineThicknessModalVisible(false))
              }>
              <Text style={styles.textStyle}>Hide Modal</Text>
            </Pressable>
          </View>
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
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
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
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default DrawLineThicknessModal;
