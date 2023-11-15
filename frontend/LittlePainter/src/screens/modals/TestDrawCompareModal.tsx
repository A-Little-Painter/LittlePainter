import React, {useState} from 'react';
import {
  Dimensions,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import {RootState} from '../../redux/store';
import {useDispatch, useSelector} from 'react-redux';
import {handleisTestDrawCompareModalVisible} from '../../redux/slices/draw/draw';

export type TestDrawCompareModalProps = {
  originImageURI: string;
  compareImageURI: string;
};

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const TestDrawCompareModal = (props: TestDrawCompareModalProps) => {
  const dispatch = useDispatch();
  const [originImageURI] = useState(props.originImageURI);
  const [compareImageURI] = useState(props.compareImageURI);
  const isTestDrawCompareModalVisible = useSelector(
    (state: RootState) => state.draw.isTestDrawCompareModalVisible,
  );
  return (
    <View>
      <Modal
        animationType="none"
        transparent={true}
        visible={isTestDrawCompareModalVisible}
        onRequestClose={() => {
          dispatch(handleisTestDrawCompareModalVisible(false));
        }}>
        <Pressable
          style={styles.centeredView}
          onPress={() => {
            dispatch(handleisTestDrawCompareModalVisible(false));
          }}>
          <Pressable
            style={styles.modalView}
            onPress={() => {
              dispatch(handleisTestDrawCompareModalVisible(true));
            }}>
            {/* 최상단 */}
            <View style={styles.modalTop}>
              <View style={styles.modalTopLeft} />
              <View style={styles.modalTopMiddle}>
                <Text style={styles.modalTitleText}>메롱</Text>
              </View>
              <TouchableOpacity
                style={styles.modalTopRight}
                onPress={() =>
                  dispatch(handleisTestDrawCompareModalVisible(false))
                }>
                <Text style={styles.modalCloseX}>X</Text>
              </TouchableOpacity>
            </View>
            {/* 중단 */}
            <View style={styles.modalMiddle}>
              <Image
                style={styles.originImage}
                // source={require('../../assets/images/elephant.png')}
                source={{uri: originImageURI}}
              />
              <Image
                style={styles.originImage}
                // source={require('../../assets/images/elephant.png')}
                source={{uri: compareImageURI}}
              />
            </View>
            {/* 하단 */}
            <View style={styles.modalBottom}>
              <Text style={styles.contentText}></Text>
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
    width: windowWidth * 0.8,
    height: windowHeight * 0.8,
    justifyContent: 'center',
    // padding: 35,
    // alignItems: 'center',
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
    flexDirection: 'row',
  },
  originImage: {
    resizeMode: 'contain',
    height: '100%',
    width: '50%',
    // height: windowHeight * 0.7 * 0.6,
    // width: windowWidth * 0.7 * 0.8,
  },
  modalBottom: {
    flex: 0.2,
    alignItems: 'center',
  },
  contentText: {
    flexWrap: 'wrap',
    fontSize: windowWidth * 0.02,
    textAlign: 'center',
    color: 'black',
  },
});

export default TestDrawCompareModal;
