import React from 'react';
import {
  Dimensions,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';

import ColorPicker from 'react-native-wheel-color-picker';
import {RootState} from '../../redux/store';
import {useDispatch, useSelector} from 'react-redux';
import {
  handleisDrawColorPaletteModalVisible,
  handleDrawColorSelect,
} from '../../redux/slices/draw/draw';

export type DrawColorPaletteModalProps = {
  selectColor: string;
};

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const DrawColorPaletteModal = () => {
  const dispatch = useDispatch();
  const isDrawColorPaletteModalVisible = useSelector(
    (state: RootState) => state.draw.isDrawColorPaletteModalVisible,
  );
  const drawColorSelect = useSelector(
    (state: RootState) => state.draw.drawColorSelect,
  );

  return (
    <View>
      <Modal
        animationType="none"
        transparent={true}
        visible={isDrawColorPaletteModalVisible}
        onRequestClose={() => {
          dispatch(handleisDrawColorPaletteModalVisible(false));
        }}>
        <Pressable
          style={styles.centeredView}
          onPress={() => {
            dispatch(handleisDrawColorPaletteModalVisible(false));
          }}>
          <Pressable
            style={styles.modalView}
            onPress={() => {
              dispatch(handleisDrawColorPaletteModalVisible(true));
            }}>
            {/* 최상단 */}
            <View style={styles.modalTop}>
              <View style={styles.modalTopLeft} />
              <View style={styles.modalTopMiddle}>
                <Text style={styles.modalTitleText}>
                  원하는 색을 선택해 보아요
                </Text>
              </View>
              <TouchableOpacity
                style={styles.modalTopRight}
                onPress={() =>
                  dispatch(handleisDrawColorPaletteModalVisible(false))
                }>
                <Text style={styles.modalCloseX}>X</Text>
              </TouchableOpacity>
            </View>
            {/* 중단 */}
            <View style={styles.modalMiddle}>
              {/* 팔레트를 위치시킬 화면*/}
              <SafeAreaView style={styles.colorPaletteContainer}>
                <View style={styles.sectionContainer}>
                  <ColorPicker
                    color={drawColorSelect}
                    // onColorChange={color =>
                    // dispatch(handleDrawColorSelect(color))
                    // }
                    onColorChangeComplete={color =>
                      dispatch(handleDrawColorSelect(color))
                    }
                    thumbSize={15}
                    sliderSize={30}
                    noSnap={true}
                    row={false}
                    autoResetSlider={true}
                  />
                </View>
              </SafeAreaView>
            </View>
            {/* 하단 */}
            <View style={styles.modalBottom}>
              {/* <View
                style={{
                  width: windowHeight * 0.7 * 0.07,
                  height: windowHeight * 0.7 * 0.07,
                  backgroundColor: drawColorSelect,
                  borderRadius: windowHeight * 0.7 * 0.07 * 0.5,
                }}
              /> */}
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
    width: windowWidth * 0.7,
    height: windowHeight * 0.7,
    justifyContent: 'center',
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
  sectionContainer: {
    // paddingHorizontal: 24,
  },
  colorPaletteContainer: {
    width: windowWidth * 0.7 * 0.7,
    height: windowHeight * 0.7 * 0.7,
  },
  modalBottom: {
    flex: 0.1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentText: {
    flexWrap: 'wrap',
    fontSize: windowWidth * 0.02,
    textAlign: 'center',
    color: 'black',
  },
});

export default DrawColorPaletteModal;
