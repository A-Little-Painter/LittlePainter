import React, {useState} from 'react';
import {
  Dimensions,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  TouchableOpacity,
} from 'react-native';
import {RootState} from '../../redux/store';
import {useDispatch, useSelector} from 'react-redux';
import {
  handleLineThickness,
  handleisDrawLineThicknessModalVisible,
} from '../../redux/slices/draw/draw';
import Slider from '@react-native-community/slider';

export type DrawLineThicknessModalProps = {
  selectColor: string;
};

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const DrawLineThicknessModal = (props: DrawLineThicknessModalProps) => {
  const [selectColor] = useState<string>(props.selectColor);
  const LineThickness = useSelector(
    (state: RootState) => state.draw.LineThickness,
  );
  const dispatch = useDispatch();
  // 선 굵기 모달을 위한 라인
  const isDrawLineThicknessModalVisible = useSelector(
    (state: RootState) => state.draw.isDrawLineThicknessModalVisible,
  );
  return (
    <View>
      <Modal
        animationType="none"
        transparent={true}
        visible={isDrawLineThicknessModalVisible}
        onRequestClose={() => {
          dispatch(handleisDrawLineThicknessModalVisible(false));
        }}>
        <Pressable
          style={styles.centeredView}
          onPress={() => {
            dispatch(handleisDrawLineThicknessModalVisible(false));
          }}>
          <Pressable
            style={styles.modalView}
            onPress={() => {
              dispatch(handleisDrawLineThicknessModalVisible(true));
            }}>
            {/* 최상단 */}
            <View style={styles.modalTop}>
              <TouchableOpacity
                style={styles.modalCloseView}
                onPress={() =>
                  dispatch(handleisDrawLineThicknessModalVisible(false))
                }>
                <Text style={styles.modalCloseX}>X</Text>
              </TouchableOpacity>
            </View>
            {/* 중단 */}
            <View style={styles.modalMiddle}>
              <Text style={styles.modalTitleText}>
                선의 굵기를 조정해봅시다.
              </Text>
              {/* 내용 표시 */}
              <Text style={styles.lineThicknessText}>{LineThickness}</Text>
              {/* 슬라이더 */}
              <Slider
                style={styles.slider}
                minimumValue={1}
                maximumValue={50}
                step={1}
                lowerLimit={1}
                upperLimit={50}
                // minimumTrackTintColor="#FFFFFF"
                minimumTrackTintColor="#000000"
                maximumTrackTintColor="#000000"
                thumbTintColor="black"
                value={LineThickness} // 초기값 설정
                onValueChange={value =>
                  // dispatch(handleLineThickness(Math.floor(value)))
                  dispatch(handleLineThickness(value))
                }
              />
            </View>
            {/* 하단 */}
            <View style={styles.modalBottom}>
              <View
                style={[
                  styles.lineThicknessSee,
                  {
                    height: windowHeight * 0.001 * LineThickness,
                    backgroundColor: selectColor,
                  },
                ]}
              />
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
    justifyContent: 'flex-end',
    paddingBottom: windowHeight * 0.1,
    paddingLeft: windowWidth * 0.15,
    // alignItems: 'center',
    // left
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    width: windowWidth * 0.3,
    height: windowHeight * 0.25,
    justifyContent: 'center',
    // padding: 35,
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
    flex: 0.2,
    width: '95%',
    justifyContent: 'center',
  },
  modalCloseView: {
    alignSelf: 'flex-end',
  },
  modalCloseX: {
    color: 'black',
    fontSize: windowWidth * 0.02,
  },
  modalMiddle: {
    flex: 0.5,
    justifyContent: 'center',
    // backgroundColor: 'red',
  },
  lineThicknessText: {
    fontSize: windowWidth * 0.02,
    textAlign: 'center',
    color: 'black',
  },
  slider: {
    width: windowWidth * 0.25,
    alignSelf: 'center',
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
  modalTitleText: {
    textAlign: 'center',
    color: 'black',
    fontSize: windowWidth * 0.015,
    padding: windowHeight * 0.01,
  },
  modalBottom: {
    flex: 0.3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lineThicknessSee: {
    // borderWidth: 1,
    width: windowWidth * 0.15,
    borderRadius: windowWidth * 0.1 * 0.5,
    backgroundColor: 'black',
  },
});

export default DrawLineThicknessModal;
