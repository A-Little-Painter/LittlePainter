/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect, useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  // FlatList,
  TouchableOpacity,
  Animated,
  Easing,
  ScrollView,
  ToastAndroid,
  ImageBackground,
} from 'react-native';
import type {StackScreenProps} from '@react-navigation/stack';
import {RootStackParams} from '../../navigations/AppNavigator';
import DropDownPicker from 'react-native-dropdown-picker';
import {
  friendsWholePicture,
  animalWholeNameInquiry,
} from '../../apis/draw/draw';
import {useAppDispatch} from '../../redux/hooks';
import {handleBGMMusic} from '../../redux/slices/music/music';
import {handleSoundEffect} from '../../redux/slices/music/music';

type SelectPictureScreenProps = StackScreenProps<
  RootStackParams,
  'SelectPictureScreen'
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

type handleGoDrawPictureScreenType = {
  friendsAnimalId: number;
  userEmail: string;
  title: string;
  originalImageUrl: string;
  animalType: string;
};
interface FriendPictureType {
  friendsAnimalId: number;
  originalImageUrl: string;
  title: string;
  userEmail: string;
  animalType: string;
}

export default function SelectPictureScreen({
  navigation,
}: SelectPictureScreenProps) {
  const picturelistScrollViewRef = useRef(null);
  // 드랍다운
  const [open, setOpen] = useState<boolean>(false);
  const [value, setValue] = useState(0);
  const [items, setItems] = useState([]);
  // const [friendsPictures, setFriendsPictures] = useState<FriendPictureType[]>([{"friendsAnimalId": 1, "originalImageUrl": "https://littlepainter.s3.ap-northeast-2.amazonaws.com/profile-icon/frog.png", "title": "ss 토끼", "userEmail": "email"}]);
  const [friendsPictures, setFriendsPictures] = useState<FriendPictureType[]>(
    [],
  );
  // const [selectAnimalTypeName, setSelectAnimalTypeName] = useState<string>('');
  const [selectPage, setSelectPage] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const dispatch = useAppDispatch();

  function handleGoDrawPictureScreen(
    friendsAnimalInformation: handleGoDrawPictureScreenType,
  ) {
    navigation.navigate('DrawPictureScreen', {
      friendsAnimalInfo: friendsAnimalInformation,
    });
  }

  const handleAnimalWholeNameInquiry = async () => {
    setIsLoading(true);
    try {
      const response = await animalWholeNameInquiry();
      if (response.status === 200) {
        const transformedData = response.data.map(item => ({
          label: item.name,
          value: item.id,
        }));
        transformedData.unshift({label: '전체', value: 0});
        setItems(transformedData);
      } else {
        console.log('전체 동물 이름 조회하기 실패', response.status);
        ToastAndroid.show(
          '친구들의 이름을 불러오지 못했어요.',
          ToastAndroid.SHORT,
        );
      }
    } catch (error) {
      console.log('전체 동물 이름 조회하기 실패', error);
      ToastAndroid.show(
        '친구들의 이름을 불러오지 못했어요.',
        ToastAndroid.SHORT,
      );
    }
    setIsLoading(false);
  };

  const handleFriendsWholePicture = async () => {
    setIsLoading(true);
    try {
      const response = await friendsWholePicture(value, 0);
      if (response.status === 200) {
        console.log('다른 사람이 올린 사진 전체 가져오기 성공');
        const newData = response.data.content;
        if (newData.length > 0) {
          // setFriendsPictures(prevData => [...prevData, ...newData]);
          setFriendsPictures(newData);
          setSelectPage(1);
          picturelistScrollViewRef.current?.scrollTo({
            y: 0,
            animated: false,
          });
        } else {
          setFriendsPictures([]);
          setSelectPage(0);
        }
        // console.log('다른 사람이 올린 사진 전체 가져오기 성공', response.data.content);
      } else {
        console.log(
          '다른 사람이 올린 사진 전체 가져오기 실패',
          response.status,
        );
        ToastAndroid.show(
          '우리 친구들을 불러오지 못했어요.',
          ToastAndroid.SHORT,
        );
      }
    } catch (error) {
      console.log('다른 사람이 올린 사진 전체 가져오기 실패', error);
      ToastAndroid.show('우리 친구들을 불러오지 못했어요.', ToastAndroid.SHORT);
    }
    setIsLoading(false);
  };

  // 추가 사진 가져오기
  const getFriendsPictureList = async () => {
    setIsLoading(true);
    try {
      const response = await friendsWholePicture(value, selectPage);
      if (response.status === 200) {
        const newData = response.data.content;
        if (newData.length > 0) {
          // friendsPictures 상태 업데이트
          setFriendsPictures(prevData => [...prevData, ...newData]);
          setSelectPage(selectPage + 1);
        } else {
          ToastAndroid.show('오늘의 친구들은 여기까지만~', ToastAndroid.SHORT);
        }
      } else {
        console.log(
          '다른 사람이 올린 추가 사진 가져오기 실패',
          response.status,
        );
        ToastAndroid.show(
          '우리 친구들을 더 불러오지 못했어요.',
          ToastAndroid.SHORT,
        );
      }
    } catch (error) {
      console.log('다른 사람이 올린 추가 사진 가져오기 실패', error);
      ToastAndroid.show(
        '우리 친구들을 더 불러오지 못했어요.',
        ToastAndroid.SHORT,
      );
    }
    setIsLoading(false);
  };

  useEffect(() => {
    handleAnimalWholeNameInquiry();
    // handleFriendsWholePicture();
    dispatch(
      handleBGMMusic(
        'https://littlepainter.s3.ap-northeast-2.amazonaws.com/sound/bgm/BG_my%2BfriendsAnimal.mp3',
      ),
    );
  }, []);

  useEffect(() => {
    // setSelectPage(0);
    handleFriendsWholePicture();
    // getFriendsPictureList();
  }, [value]);

  ////// 로딩 애니메이션
  const [rotation] = useState(new Animated.Value(0));
  useEffect(() => {
    const rotateImage = () => {
      Animated.timing(rotation, {
        toValue: 360,
        duration: 2000, // 회전에 걸리는 시간 (밀리초)
        easing: Easing.linear,
        useNativeDriver: false, // 필요에 따라 변경
      }).start(() => {
        rotation.setValue(0); // 애니메이션이 끝나면 초기 각도로 돌아감
        rotateImage();
      });
    };

    rotateImage();
  }, []);

  const spin = rotation.interpolate({
    inputRange: [0, 360],
    outputRange: ['0deg', '360deg'],
  });
  ////////////

  // 스크롤이 맨 아래로 도달했을 때 호출되는 함수
  const handleScrollEnd = event => {
    const {layoutMeasurement, contentOffset, contentSize} = event.nativeEvent;
    if (layoutMeasurement.height + contentOffset.y >= contentSize.height) {
      // getFriendsPictureList();
      getFriendsPictureList();
    }
  };

  return (
    <View style={styles.mainContainer}>
      <ImageBackground
        source={require('../../assets/bgImage/friendAnimal.png')}
        resizeMode="cover"
        style={styles.backgroundImage}>
        <View style={styles.subContainer}>
          {/* 상단 */}
          <View style={styles.topContainer}>
            {/* 상단 좌측 */}
            <View style={styles.topLeftContainer}>
              <Image
                style={styles.logoImage}
                source={require('../../assets/logo/friendAnimal.png')}
              />
              <Text style={styles.titleText}>친구의 동물 그리기</Text>
            </View>
            {/* <TouchableOpacity
              onPress={() => {
                dispatch(handleSoundEffect('btn'));
                navigation.navigate('MainScreen');
              }}
              style={styles.goHomeArea}>
              <Image
                source={require('../../assets/images/PVector.png')}
                style={styles.goHome}
              />
            </TouchableOpacity> */}
            {/* 상단 우측 */}
            <View
              style={[
                styles.topRightContainer,
                // {
                //   transform: [{translateX: -windowHeight * 0.25}],
                // },
              ]}>
              <TouchableOpacity
                onPress={() => {
                  dispatch(handleSoundEffect('btn'));
                  navigation.navigate('MainScreen');
                }}
                style={styles.goHomeArea}>
                <Image
                  source={require('../../assets/images/PVector.png')}
                  style={styles.goHome}
                />
              </TouchableOpacity>
              {/* <Text>검색</Text> */}
              {/* <View style={styles.dropdownView}>
                <DropDownPicker
                  searchPlaceholder="동물을 찾아볼까요?"
                  searchable={true}
                  showTickIcon={false}
                  placeholder="전체"
                  open={open}
                  value={value}
                  items={items}
                  setOpen={setOpen}
                  setValue={setValue}
                  setItems={setItems}
                />
              </View> */}
            </View>
          </View>
          <View style={styles.middleContainer}>
            <View style={styles.dropdownView}>
              <DropDownPicker
                searchPlaceholder="동물을 찾아볼까요?"
                searchable={true}
                showTickIcon={false}
                placeholder="전체"
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
              />
            </View>
            <ScrollView
              ref={picturelistScrollViewRef}
              style={styles.middleContainerFlatList}
              onScroll={handleScrollEnd}>
              <View style={styles.wrappingView}>
                {friendsPictures.map((item, index) => (
                  <View style={styles.pictureCard1} key={index}>
                    <TouchableOpacity
                      onPress={() => {
                        dispatch(handleSoundEffect('btn'));
                        handleGoDrawPictureScreen({
                          friendsAnimalId: item.friendsAnimalId,
                          userEmail: item.userEmail,
                          title: item.title,
                          originalImageUrl: item.originalImageUrl,
                          animalType: item.animalType,
                        });
                      }}
                      style={[
                        styles.pictureCard2,
                        {
                          backgroundColor:
                            randomBackgroundColor[
                              index >= randomBackgroundColor.length
                                ? index % randomBackgroundColor.length
                                : index
                            ],
                        },
                      ]}>
                      <Image
                        style={styles.cardAnimalImage}
                        source={{uri: item.originalImageUrl}}
                      />
                    </TouchableOpacity>
                    <Text style={styles.pictureCardText}>{item.title}</Text>
                  </View>
                ))}
              </View>
            </ScrollView>
          </View>
        </View>
        {isLoading ? (
          <Animated.Image
            style={[styles.loadingImage, {transform: [{rotate: spin}]}]}
            source={require('../../assets/images/loading2.png')}
          />
        ) : null}
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
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
    // alignSelf: 'flex-end',
    // marginRight: windowWidth * 0.04,
    // paddingBottom: windowWidth * 0.03,
  },
  dropdownView: {
    marginHorizontal: ((windowWidth * 0.9 * 0.95) / 4) * 0.04999,
    alignSelf: 'flex-end',
    width: '15%',
  },
  middleContainer: {
    flex: 0.7,
    width: '90%',
    height: '100%',
    alignSelf: 'center',
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
  pictureCard1: {
    marginVertical: windowWidth * 0.01,
    marginHorizontal: ((windowWidth * 0.9 * 0.95) / 4) * 0.04999,
  },
  pictureCard2: {
    justifyContent: 'center',
    borderRadius: 20,
    borderColor: 'black',
    width:
      (windowWidth * 0.9 * 0.95) / 4 - ((windowWidth * 0.9 * 0.95) / 4) * 0.1,
    height:
      ((windowWidth * 0.9 * 0.95) / 4 -
        ((windowWidth * 0.9 * 0.95) / 4) * 0.1) *
      0.75,
  },
  cardAnimalImage: {
    alignSelf: 'center',
    resizeMode: 'contain',
    width:
      ((windowWidth * 0.9 * 0.95) / 4 -
        ((windowWidth * 0.9 * 0.95) / 4) * 0.1) *
      0.55,
    height:
      ((windowWidth * 0.9 * 0.95) / 4 -
        ((windowWidth * 0.9 * 0.95) / 4) * 0.1) *
      0.55,
  },
  pictureCardText: {
    paddingLeft: windowWidth * 0.007,
    paddingTop: windowHeight * 0.01,
    fontSize: windowWidth * 0.018,
    fontWeight: '600',
    fontFamily: 'TmoneyRoundWindExtraBold',
  },
  friendsAnimalImage: {
    alignSelf: 'center',
    width: windowWidth * 0.11,
    height: windowWidth * 0.11,
  },
  pictureCardPainterText: {
    fontSize: windowWidth * 0.013,
  },
  loadingImage: {
    position: 'absolute',
    width: windowHeight * 0.3,
    height: windowHeight * 0.3,
    top: windowHeight * 0.5 - windowHeight * 0.3 * 0.5,
    left: windowWidth * 0.5 - windowHeight * 0.3 * 0.5,
  },
  goHomeArea: {
    justifyContent: 'center',
    marginRight: windowWidth * 0.05,
    // marginLeft: windowWidth * 0.35,
    // marginTop: windowWidth * 0.03,
  },
  goHome: {
    height: windowWidth * 0.05,
    width: windowWidth * 0.05,
  },
});
