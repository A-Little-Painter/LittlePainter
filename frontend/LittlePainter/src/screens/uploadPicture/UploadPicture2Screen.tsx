import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import type {StackScreenProps} from '@react-navigation/stack';
import {RootStackParams} from '../../navigations/AppNavigator';
import {useAppSelector, useAppDispatch} from '../../redux/hooks';
import {uploadPictureApi} from '../../apis/uploadPicture/uploadPicture';
import {update2} from '../../redux/slices/uploadPicture/uploadPicture';

type UploadPicture2ScreenProps = StackScreenProps<
  RootStackParams,
  'UploadPicture2Screen'
>;

const windowWidth = Dimensions.get('window').width;
// const windowHeight = Dimensions.get('window').height;

export default function UploadPicture2Screen({
  navigation,
}: UploadPicture2ScreenProps) {
  const pictureaddr = useAppSelector(state => state.uploadPicture.pictureaddr);
  const picturename = useAppSelector(state => state.uploadPicture.picturename);
  const picturetype = useAppSelector(state => state.uploadPicture.picturetype);
  const destination = useAppSelector(state => state.uploadPicture.destination);
  const dispatch = useAppDispatch();

  const moving = async () => {
    const imageData = new FormData();
    imageData.append('file', {
      uri: pictureaddr,
      name: picturename,
      type: picturetype,
    });
    const temp = await uploadPictureApi(imageData);
    const checkImage = temp.data;
    const data: {
      animal_type: string;
      border_image: string;
      trace_image: string;
      moving: boolean;
    } = {
      animal_type: checkImage.animal_type,
      border_image: checkImage.border_image,
      trace_image: checkImage.trace_image,
      moving: true,
    };
    console.log('data');
    console.log(data);

    dispatch(update2(data));
    if (destination === 'UploadPicture3Screen') {
      console.log(destination);
      navigation.navigate('UploadPicture3Screen');
    } else {
      console.log(destination);
      navigation.navigate('UploadPicture5Screen');
    }
  };
  const unMoving = async () => {
    const imageData = new FormData();
    imageData.append('file', {
      uri: pictureaddr,
      name: picturename,
      type: picturetype,
    });
    const temp = await uploadPictureApi(imageData);
    const checkImage = temp.data;
    const data: {
      animal_type: string;
      border_image: string;
      trace_image: string;
      moving: boolean;
    } = {
      animal_type: checkImage.animal_type,
      border_image: checkImage.border_image,
      trace_image: checkImage.trace_image,
      moving: false,
    };
    dispatch(update2(data));
    if (destination === 'UploadPicture3Screen') {
      console.log(destination);
      navigation.navigate('UploadPicture3Screen');
    } else {
      console.log(destination);
      navigation.navigate('UploadPicture5Screen');
    }
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.subContainer}>
        {/* 상단 */}
        <View style={styles.topContainer}>
          {/* 상단 좌측 */}
          <View style={styles.topLeftContainer}>
            <Image
              style={styles.logoImage}
              source={require('../../assets/images/elephant.png')}
            />
            <Text style={styles.titleText}>내 동물 사진 등록하기</Text>
          </View>
          {/* 상단 우측 */}
          <View style={styles.topRightContainer}>
            {/* <Text>검색</Text> */}
          </View>
        </View>
        {/* 중단 */}
        <View style={styles.middleContainer}>
          <View style={styles.uploadContentContainer}>
            <View style={styles.caution}>
              <Text style={styles.cautionText1}>동물을 움직이게 만들까요?</Text>
              <Text style={styles.cautionText2}>
                (4발동물이 아니면 이상하게 움직일 수도 있어요)
              </Text>
            </View>
          </View>
          <View style={styles.uploadButton}>
            <TouchableOpacity
              onPress={() => {
                moving();
              }}>
              <Text style={styles.uploadText}>움직이는게 좋아요</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                unMoving();
              }}>
              <Text style={styles.uploadText}>안 움직여도 돼요</Text>
            </TouchableOpacity>
          </View>
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
    alignSelf: 'center',
    flex: 1,
    width: '95%',
  },
  topContainer: {
    flex: 0.3,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  topLeftContainer: {
    flexDirection: 'row',
  },
  topRightContainer: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    justifyContent: 'flex-end',
    marginRight: windowWidth * 0.04,
    paddingBottom: windowWidth * 0.03,
  },
  middleContainer: {
    flex: 0.7,
    width: '90%',
    alignSelf: 'center',
  },
  uploadContentContainer: {
    alignSelf: 'center',
    justifyContent: 'center',
    height: '60%',
  },
  caution: {
    alignItems: 'center',
  },
  cautionText1: {
    fontSize: windowWidth * 0.03,
    color: '#000000',
  },
  cautionText2: {
    fontSize: windowWidth * 0.02,
    color: '#000000',
  },
  logoImage: {
    alignSelf: 'center',
    width: windowWidth * 0.11,
    height: windowWidth * 0.11,
  },
  titleText: {
    alignSelf: 'center',
    fontSize: windowWidth * 0.05,
    fontWeight: '600',
    color: 'black',
  },
  uploadButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
    width: windowWidth * 0.5,
  },
  uploadText: {
    backgroundColor: '#C68AEB',
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: windowWidth * 0.018,
    width: windowWidth * 0.2,
    height: windowWidth * 0.05,
    borderRadius: windowWidth * 0.01,
  },
});
