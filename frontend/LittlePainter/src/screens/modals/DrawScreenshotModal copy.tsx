import React, {useState, useEffect, useRef} from 'react';
import {
  Dimensions,
  useWindowDimensions,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  Image,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import {RootState} from '../../redux/store';
import {useDispatch, useSelector} from 'react-redux';
import {handleIsDrawScreenshotModalVisible} from '../../redux/slices/draw/draw';
import ViewShot from 'react-native-view-shot';

export type DrawScreenshotModalProps = {
  // captureUri: string;
};

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
// const windowWidth = useWindowDimensions().width;
// const windowHeight = useWindowDimensions().height;

// const DrawScreenshotModal = (props: DrawScreenshotModalProps) => {
const DrawScreenshotModal = () => {
  // const [captureUri] = useState<string>(props.captureUri);
  const [captureUri, setCaptureUri] = useState<string>('');
  const dispatch = useDispatch();
  // 선 굵기 모달을 위한 라인
  const isDrawScreenshotModalVisible = useSelector(
    (state: RootState) => state.draw.isDrawScreenshotModalVisible,
  );
  // const [captureImagePath, setCaptureImagePath] = useState<string>('');
  const captureRef = useRef();
  useEffect(() => {
    captureRef.current.capture().then((uri: string) => {
      console.log('do something with ', uri);
      setCaptureUri(uri);
      ToastAndroid.show(`캡쳐가 된당! ${uri}`, ToastAndroid.SHORT);
      // setCaptureImagePath(uri);
      // dispatch(handleIsDrawScreenshotModalVisible(false));
    });
    // dispatch(handleIsDrawScreenshotModalVisible(false));
  }, []);
  return (
    <View>
      <Modal
        animationType="none"
        transparent={true}
        visible={isDrawScreenshotModalVisible}
        onRequestClose={() => {
          dispatch(handleIsDrawScreenshotModalVisible(false));
        }}>
        <Pressable
          style={styles.centeredView}
          onPress={() => {
            dispatch(handleIsDrawScreenshotModalVisible(false));
          }}>
          <ViewShot
            style={{flex:0.8}}
            ref={captureRef}
            options={{
              fileName: 'drawAnimalCapture',
              format: 'jpg',
              quality: 0.9,
            }}>
            <Pressable
              style={styles.modalView}
              onPress={() => {
                dispatch(handleIsDrawScreenshotModalVisible(false));
              }}>
              {/* 최상단 */}
              <View style={styles.modalTop}>
                <View style={styles.modalTopLeft} />
                <View style={styles.modalTopMiddle}>
                  {/* <Text style={styles.modalTitleText}>
                    이제, '쥐'를 그려볼까요?
                  </Text> */}
                </View>
                <TouchableOpacity
                  style={styles.modalTopRight}
                  onPress={() =>
                    dispatch(handleIsDrawScreenshotModalVisible(false))
                  }>
                  {/* <Text style={styles.modalCloseX}>X</Text> */}
                </TouchableOpacity>
              </View>
              {/* 중단 */}
              <View style={styles.modalMiddle}>
                <Image style={styles.originImage} source={{uri: captureUri}} />
              </View>
              {/* 하단 */}
              <View style={styles.modalBottom}>
                {/* <Text style={styles.contentText}>
                  쥐는 구미에 사는 동물입니다.{'\n'}아주 더러워요.
                </Text> */}
              </View>
            </Pressable>
          </ViewShot>
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
    // backgroundColor: 'skyblue',
    // borderWidth: 1,
    // width: windowHeight * 0.8,
    width: windowHeight * 0.8,
    // height: windowHeight * 0.8,
    height: '100%',
    justifyContent: 'center',
    // padding: 35,
    // alignItems: 'center',
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 4,
    elevation: 2,
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
  originImage: {
    resizeMode: 'contain',
    height: windowHeight * 0.7 * 0.6,
    width: windowWidth * 0.7 * 0.8,
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

export default DrawScreenshotModal;
