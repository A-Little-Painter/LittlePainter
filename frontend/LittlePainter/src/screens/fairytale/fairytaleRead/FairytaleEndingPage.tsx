import React, {useState} from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  // TouchableOpacity,
  // ScrollView,
} from 'react-native';
// import {RootState} from '../../../redux/store';
// import {useDispatch, useSelector} from 'react-redux';
// import {handleisFairytaleEndingPageVisible} from '../../../redux/slices/tale/tale';

export type FairytaleEndingPageProps = {
  fairytaleTitle: string;
};

// const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const FairytaleEndingPage = (props: FairytaleEndingPageProps) => {
  const [fairytaleTitle] = useState(props.fairytaleTitle);
  // const dispatch = useDispatch();
  // 선 굵기 모달을 위한 라인
  // const isFairytaleEndingPageVisible = useSelector(
  //   (state: RootState) => state.tale.isFairytaleEndingPageVisible,
  // );
  return (
    <View style={styles.centeredView}>
      <Text style={styles.fairytaleEndingText1}>{fairytaleTitle}</Text>
      <Text style={styles.fairytaleEndingText2}>이야기 끝</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    // height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fairytaleEndingText1: {
    fontSize: windowHeight * 0.13,
    color: 'black',
  },
  fairytaleEndingText2: {
    fontSize: windowHeight * 0.1,
    // color: 'black',
  },
});

export default FairytaleEndingPage;
