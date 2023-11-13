import React, {useState} from 'react';
import {
  Dimensions,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {RootState} from '../../../redux/store';
import {useDispatch, useSelector} from 'react-redux';
import {handleisFairytaleEndingPageVisible} from '../../../redux/slices/tale/tale';

export type FairytaleEndingPageProps = {
  pageContent: string[];
};

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const FairytaleEndingPage = (props: FairytaleEndingPageProps) => {
  const dispatch = useDispatch();
  const [pageContent] = useState<string[]>(props.pageContent);
  // 선 굵기 모달을 위한 라인
  const isFairytaleEndingPageVisible = useSelector(
    (state: RootState) => state.tale.isFairytaleEndingPageVisible,
  );
  return (
    <View>
      <Modal
        animationType="none"
        transparent={true}
        visible={isFairytaleEndingPageVisible}
        onRequestClose={() => {
          dispatch(handleisFairytaleEndingPageVisible(false));
        }}>
        <Pressable
          style={styles.centeredView}
          onPress={() => {
            dispatch(handleisFairytaleEndingPageVisible(false));
          }}>
          <Pressable
            style={styles.modalView}
            onPress={() => {
              dispatch(handleisFairytaleEndingPageVisible(true));
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
                  dispatch(handleisFairytaleEndingPageVisible(false))
                }>
                <Text style={styles.modalCloseX}>X</Text>
              </TouchableOpacity>
            </View>
            {/* 중단 */}
            <ScrollView style={styles.modalMiddle}>
              {/* <ScrollView style={{}}> */}
              {pageContent.map((line, index) => (
                <Text key={index} style={styles.scriptText}>
                  {line}
                </Text>
              ))}
              {/* </ScrollView> */}
            </ScrollView>
            {/* 하단 */}
            <View style={styles.modalBottom}>
              {/* <Text style={styles.contentText}>
                쥐는 구미에 사는 동물입니다.{'\n'}아주 더러워요.
              </Text> */}
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
    flex: 0.8,
    width: '95%',
    // justifyContent: 'center',
    alignSelf: 'center',
  },
  scriptText: {
    fontSize: windowHeight * 0.04,
    textAlign: 'center',
    color: 'black',
    paddingBottom: windowHeight * 0.025,
  },
  originImage: {
    resizeMode: 'contain',
    height: windowHeight * 0.7 * 0.6,
    width: windowWidth * 0.7 * 0.8,
  },
  modalBottom: {
    flex: 0.1,
    alignItems: 'center',
  },
  contentText: {
    flexWrap: 'wrap',
    fontSize: windowWidth * 0.02,
    textAlign: 'center',
    color: 'black',
  },
});

export default FairytaleEndingPage;
