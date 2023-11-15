/* eslint-disable prettier/prettier */
// import React, {useState} from 'react';
import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  ToastAndroid,
} from 'react-native';
import type {StackScreenProps} from '@react-navigation/stack';
import {RootStackParams} from '../../navigations/AppNavigator';
import {taleListInquiry} from '../../apis/draw/draw';
// 타입
import {TaleListInquiryType} from './fairytaleType';
import {useAppDispatch} from '../../redux/hooks';
import {handleBGMMusic} from '../../redux/slices/music/music';
import {handleSoundEffect} from '../../redux/slices/music/music';

type SelectFairytaleScreenProps = StackScreenProps<
  RootStackParams,
  'SelectFairytaleScreen'
>;

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const randomBackgroundColor: string[] = [
  '#8C80E2',
  '#A6D934',
  '#FE7779',
  '#FF9240',
  '#FFD31D',
  '#53ACFF',
  '#9FEFCD',
  '#47CEB0',
  '#A9C6FF',
  '#F97CEC',
  '#E1F1A0',
  '#C3FFC9',
];

export default function SelectFairytaleScreen({
  navigation,
}: SelectFairytaleScreenProps) {
  const [fairytale, setFairytale] = useState<TaleListInquiryType['content']>(
    [],
  );
  const dispatch = useAppDispatch();

  const handleTaleListInquiry = async () => {
    try {
      const response = await taleListInquiry();
      if (response.status === 200) {
        console.log('전체 동화 목록 조회하기 성공', response.data);
        setFairytale(response.data.content);
        console.log(response.data);
      } else {
        console.log('전체 동화 목록 조회하기 실패', response.status);
      }
    } catch (error) {
      console.log('전체 동화 목록 조회하기 실패', error);
    }
  };
  useEffect(() => {
    handleTaleListInquiry();
    dispatch(
      handleBGMMusic(
        'https://littlepainter.s3.ap-northeast-2.amazonaws.com/sound/bgm/BG_animal_tale.mp3',
      ),
    );
    return () => {};
  }, []);

  return (
    <View style={styles.mainContainer}>
      <ImageBackground
        source={require('../../assets/bgImage/fairytale.png')}
        resizeMode="cover"
        style={styles.backgroundImage}>
        <View style={styles.subContainer}>
          {/* 상단 */}
          <View style={styles.topContainer}>
            <Image
              style={styles.logoImage}
              source={require('../../assets/logo/fairy.png')}
            />
            <Text style={styles.titleText}>동화 그리기</Text>
            <TouchableOpacity
              onPress={() => {
                dispatch(handleSoundEffect('btn'));
                navigation.navigate('MainScreen');
              }}
              style={styles.goHomeArea}>
              <Image
                source={require('../../assets/images/GVector.png')}
                style={styles.goHome}
              />
            </TouchableOpacity>
          </View>
          {/* 중단 */}
          <View style={styles.middleContainer}>
            <ScrollView
              // ref={picturelistScrollViewRef}
              style={styles.middleContainerFlatList}
              // onScroll={handleScrollEnd}
            >
              <View style={styles.wrappingView}>
                {fairytale.map((item, index) => (
                  <View style={styles.pictureCard1} key={index}>
                    <TouchableOpacity
                      onPress={() => {
                        dispatch(handleSoundEffect('btn'));
                        if (item.isAvailable) {
                          navigation.navigate('FairytaleReadScreen', {
                            title: item.title,
                            taleId: item.id,
                          });
                        } else {
                          ToastAndroid.show(
                            `'${item.title}' 동화는 아직 준비중인 동화에요.`,
                            ToastAndroid.SHORT,
                          );
                        }
                      }}
                      style={[styles.pictureCard2]}>
                      <ImageBackground
                        source={{uri: item.urlCover}}
                        resizeMode="cover"
                        style={styles.taleImage}>
                        {/* <Image
                        style={styles.cardFairytaleImage}
                        source={{uri: item.urlCover}}
                      /> */}
                      </ImageBackground>
                    </TouchableOpacity>
                    <Text style={styles.fairytaleCardText}>{item.title}</Text>
                  </View>
                ))}
              </View>
            </ScrollView>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#EAFFBA',
  },
  subContainer: {
    alignSelf: 'center',
    flex: 1,
    width: '95%',
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  taleImage: {
    width: '100%',
    height: '100%',
  },
  topContainer: {
    flex: 0.3,
    flexDirection: 'row',
  },
  middleContainer: {
    flex: 0.7,
    width: '90%',
    alignSelf: 'center',
  },
  logoImage: {
    alignSelf: 'center',
    width: windowWidth * 0.11,
    height: windowWidth * 0.11,
    resizeMode: 'contain',
  },
  titleText: {
    alignSelf: 'center',
    fontSize: windowWidth * 0.05,
    fontWeight: '600',
    color: 'black',
    fontFamily: 'TmoneyRoundWindExtraBold',
  },
  middleContainerFlatList: {
    width: '100%',
    height: '100%',
  },
  wrappingView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
  },
  pictureCard1: {
    marginVertical: windowWidth * 0.01,
    marginHorizontal: ((windowWidth * 0.9 * 0.95) / 3) * 0.04999,
  },
  pictureCard2: {
    overflow: 'hidden',
    justifyContent: 'center',
    borderRadius: windowWidth * 0.015,
    borderColor: 'black',
    width:
      (windowWidth * 0.9 * 0.95) / 3 - ((windowWidth * 0.9 * 0.95) / 3) * 0.1,
    height:
      ((windowWidth * 0.9 * 0.95) / 3 -
        ((windowWidth * 0.9 * 0.95) / 3) * 0.1) *
      0.5625,
  },
  // cardFairytaleImage: {
  //   alignSelf: 'center',
  //   resizeMode: 'contain',
  //   width:
  //     ((windowWidth * 0.9 * 0.95) / 4 -
  //       ((windowWidth * 0.9 * 0.95) / 4) * 0.1) *
  //     0.55,
  //   height:
  //     ((windowWidth * 0.9 * 0.95) / 4 -
  //       ((windowWidth * 0.9 * 0.95) / 4) * 0.1) *
  //     0.55,
  // },
  fairytaleCardText: {
    paddingLeft: windowWidth * 0.007,
    paddingTop: windowHeight * 0.01,
    fontSize: windowWidth * 0.018,
    fontWeight: '600',
    fontFamily: 'TmoneyRoundWindExtraBold',
  },
  goHomeArea: {
    marginLeft: windowWidth * 0.51,
    marginTop: windowWidth * 0.03,
  },
  goHome: {
    height: windowWidth * 0.05,
    width: windowWidth * 0.05,
  },
});
