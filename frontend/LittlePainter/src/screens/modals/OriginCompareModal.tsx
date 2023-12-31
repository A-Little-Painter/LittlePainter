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
  ScrollView,
} from 'react-native';
import {RootState} from '../../redux/store';
import {useDispatch, useSelector} from 'react-redux';
import {handleisOriginCompareModalVisible} from '../../redux/slices/draw/draw';

export type OriginCompareModalProps = {
  animalBorderURI: string;
  animalExplanation: string;
  animalType: string;
  originImage: string;
};

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const OriginCompareModal = (props: OriginCompareModalProps) => {
  const dispatch = useDispatch();
  // const [animalBorderURI] = useState<string>(props.animalBorderURI);
  // const [animalExplanation] = useState<string>(props.animalExplanation);
  const [animalExplanation] = useState<string>(
    props.animalExplanation.replace(/\. /g, '.\n').replace(/! /g, '!\n'),
  );
  const [animalType] = useState<string>(props.animalType);
  const [originImage] = useState<string>(props.originImage);
  // 선 굵기 모달을 위한 라인
  const isOriginCompareModalVisible = useSelector(
    (state: RootState) => state.draw.isOriginCompareModalVisible,
  );
  return (
    <View>
      <Modal
        animationType="none"
        transparent={true}
        visible={isOriginCompareModalVisible}
        onRequestClose={() => {
          dispatch(handleisOriginCompareModalVisible(false));
        }}>
        <Pressable
          style={styles.centeredView}
          onPress={() => {
            dispatch(handleisOriginCompareModalVisible(false));
          }}>
          <Pressable
            style={styles.modalView}
            onPress={() => {
              dispatch(handleisOriginCompareModalVisible(true));
            }}>
            {/* 최상단 */}
            <View style={styles.modalTop}>
              <View style={styles.modalTopLeft} />
              <View style={styles.modalTopMiddle}>
                <Text style={styles.modalTitleText}>
                  '{animalType}'를 그려볼까요?
                </Text>
              </View>
              <TouchableOpacity
                style={styles.modalTopRight}
                onPress={() =>
                  dispatch(handleisOriginCompareModalVisible(false))
                }>
                <Text style={styles.modalCloseX}>X</Text>
              </TouchableOpacity>
            </View>
            {/* 중단 */}
            <View style={styles.modalMiddle}>
              <Image
                style={styles.originImage}
                // source={require('../../assets/images/elephant.png')}
                source={{uri: originImage}}
              />
            </View>
            {/* 하단 */}
            <View style={styles.modalBottom}>
              <ScrollView>
                <View onStartShouldSetResponder={() => true}>
                  <Text style={styles.contentText}>{animalExplanation}</Text>
                </View>
              </ScrollView>
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
    flex: 0.65,
    justifyContent: 'center',
    alignItems: 'center',
  },
  originImage: {
    resizeMode: 'contain',
    height: windowHeight * 0.7 * 0.6,
    width: windowWidth * 0.7 * 0.8,
  },
  modalBottom: {
    flex: 0.25,
    alignItems: 'center',
  },
  contentText: {
    flexWrap: 'wrap',
    fontSize: windowWidth * 0.03,
    textAlign: 'center',
    color: 'black',
  },
});

export default OriginCompareModal;
