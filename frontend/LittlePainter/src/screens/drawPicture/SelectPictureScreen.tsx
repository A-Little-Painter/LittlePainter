/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  FlatList,
  TouchableOpacity,
  Animated,
  Easing,
} from 'react-native';
import type {StackScreenProps} from '@react-navigation/stack';
import {RootStackParams} from '../../navigations/AppNavigator';
import DropDownPicker from 'react-native-dropdown-picker';
import {
  friendsWholePicture,
  animalWholeNameInquiry,
} from '../../apis/draw/draw';

type SelectPictureScreenProps = StackScreenProps<
  RootStackParams,
  'SelectPictureScreen'
>;

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

// const friendsPictureData = [
//   {
//     id: 1,
//     title: '귀염둥이 뽀송이',
//     image: '../../assets/images/dinosaur.png',
//     isDone: false,
//     painter: '정예진',
//   },
//   {
//     id: 2,
//     title: '과거에 있던 공룡',
//     image: '../../assets/images/dinosaur.png',
//     isDone: false,
//     painter: '방진성',
//   },
//   {
//     id: 3,
//     title: '옆집에 있는 코끼리',
//     image: '../../assets/images/dinosaur.png',
//     isDone: false,
//     painter: '류성하',
//   },
//   {
//     id: 4,
//     title: '할머니집에 있는 소',
//     image: '../../assets/images/dinosaur.png',
//     isDone: false,
//     painter: '김범기',
//   },
//   {
//     id: 5,
//     title: '내 친구 사자',
//     image: '../../assets/images/dinosaur.png',
//     isDone: false,
//     painter: '김소이',
//   },
//   {
//     id: 6,
//     title: '4살 토끼',
//     image: '../../assets/images/dinosaur.png',
//     isDone: false,
//     painter: '이대근',
//   },
//   {
//     id: 7,
//     title: '구미에 사는 쥐',
//     image: '../../assets/images/dinosaur.png',
//     isDone: false,
//     painter: '시민주',
//   },
//   {
//     id: 8,
//     title: '서울에 사는 고양이',
//     image: '../../assets/images/dinosaur.png',
//     isDone: false,
//     painter: '서현덕',
//   },
// ];

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
};

export default function SelectPictureScreen({
  navigation,
}: SelectPictureScreenProps) {
  // type NameType = string | undefined;
  // const name: NameType = '동물선택하기';
  // 드랍다운
  const [open, setOpen] = useState<boolean>(false);
  const [value, setValue] = useState(0);
  // const [items, setItems] = useState([
  //   {label: '강아지', value: 'dog'},
  //   {label: '고양이', value: 'cat'},
  //   {label: '코끼리', value: 'elephant'},
  //   {label: '토끼', value: 'rabbit'},
  // ]);
  const [items, setItems] = useState([]);
  const [friendsPictureData, setFriendsPictureData] = useState([]);
  // const [selectAnimalTypeName, setSelectAnimalTypeName] = useState<string>('');
  const [selectPage, setSelectPage] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  function handleGoDrawPictureScreen(
    friendsAnimalInformation: handleGoDrawPictureScreenType,
  ) {
    navigation.navigate('DrawPictureScreen', {
      friendsAnimalInfo: friendsAnimalInformation,
    });
  }

  const handleFriendsWholePicture = async () => {
    setIsLoading(true);
    try {
      const response = await friendsWholePicture(value, selectPage);
      if (response.status === 200) {
        setFriendsPictureData(response.data.content);
        console.log('다른 사람이 올린 사진 전체 가져오기 성공', response.data);
      } else {
        console.log(
          '다른 사람이 올린 사진 전체 가져오기 실패',
          response.status,
        );
      }
    } catch (error) {
      console.log('다른 사람이 올린 사진 전체 가져오기 실패', error);
    }
    setIsLoading(false);
  };
  const handleAnimalWholeNameInquiry = async () => {
    try {
      const response = await animalWholeNameInquiry();
      if (response.status === 200) {
        const transformedData = response.data.map(item => ({
          label: item.name,
          // value: item.id.toString(), // If you want value as a string
          value: item.id, // If you want value as a string
        }));
        transformedData.unshift({label: '전체', value: 0});
        // console.log('바뀐 값', transformedData);
        // console.log('전체 동물 이름 조회하기 성공', response.data);
        setItems(transformedData);
      } else {
        console.log('전체 동물 이름 조회하기 실패', response.status);
      }
    } catch (error) {
      console.log('전체 동물 이름 조회하기 실패', error);
    }
  };

  useEffect(() => {
    handleAnimalWholeNameInquiry();
    handleFriendsWholePicture();
  }, []);

  useEffect(() => {
    setSelectPage(0);
    console.log(value);
    handleFriendsWholePicture();
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
  return (
    <View style={styles.mainContainer}>
      <View style={styles.subContainer}>
        {/* 상단 */}
        <View style={styles.topContainer}>
          {/* 상단 좌측 */}
          <View style={styles.topLeftContainer}>
            <Image
              style={styles.logoImage}
              source={require('../../assets/images/rabbitFace.png')}
            />
            <Text style={styles.titleText}>친구의 동물 그리기</Text>
          </View>
          {/* 상단 우측 */}
          <View style={styles.topRightContainer}>
            {/* <Text>검색</Text> */}
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
          </View>
        </View>
        {/* 중단 */}
        <View style={styles.middleContainer}>
          <FlatList
            data={friendsPictureData}
            numColumns={4}
            renderItem={({item, index}) => {
              return (
                <View style={styles.pictureCard1}>
                  <TouchableOpacity
                    onPress={() => {
                      handleGoDrawPictureScreen({
                        friendsAnimalId: item.friendsAnimalId,
                        userEmail: item.userEmail,
                        title: item.title,
                        originalImageUrl: item.originalImageUrl,
                      });
                    }}
                    style={[
                      styles.pcitureCard2,
                      {
                        backgroundColor:
                          randomBackgroundColor[
                            index > randomBackgroundColor.length
                              ? index % randomBackgroundColor.length
                              : index
                          ],
                      },
                    ]}>
                    <Image
                      style={styles.friendsAnimalImage}
                      source={{uri: item.originalImageUrl}}
                    />
                  </TouchableOpacity>
                  <Text style={styles.pictureCardText}>{item.title}</Text>
                  <Text style={styles.pictureCardPainterText}>
                    {item.userEmail}
                  </Text>
                </View>
              );
            }}
            keyExtractor={item => item.friendsAnimalId.toString()}
          />
        </View>
      </View>
      {isLoading ? (
        <Animated.Image
          style={[styles.loadingImage, {transform: [{rotate: spin}]}]}
          source={require('../../assets/images/loading2.png')}
        />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#FDDFE0',
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
  pictureCard1: {
    margin: windowWidth * 0.01,
  },
  pcitureCard2: {
    justifyContent: 'center',
    borderRadius: 20,
    borderColor: 'black',
    // borderWidth: 1,
    width: windowWidth * 0.194,
    height: windowWidth * 0.14,
  },
  pictureCardText: {
    // textAlign: 'center',
    fontSize: windowWidth * 0.018,
    fontWeight: '600',
  },
  friendsAnimalImage: {
    alignSelf: 'center',
    width: windowWidth * 0.11,
    height: windowWidth * 0.11,
  },
  pictureCardPainterText: {
    // textAlign: 'center',
    fontSize: windowWidth * 0.013,
  },
  dropdownView: {
    width: '33%',
  },
  loadingImage: {
    position: 'absolute',
    width: windowHeight * 0.3,
    height: windowHeight * 0.3,
    top: windowHeight * 0.5 - windowHeight * 0.3 * 0.5,
    left: windowWidth * 0.5 - windowHeight * 0.3 * 0.5,
  },
});
