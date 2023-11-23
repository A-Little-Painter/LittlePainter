/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  Animated,
  Easing,
  ScrollView,
  ImageBackground,
} from 'react-native';
import type {StackScreenProps} from '@react-navigation/stack';
import {RootStackParams} from '../../navigations/AppNavigator';
import {friendWholeData} from '../../apis/draw/draw';
import {useAppDispatch} from '../../redux/hooks';
import {handleBGMMusic} from '../../redux/slices/music/music';
import {handleSoundEffect} from '../../redux/slices/music/music';

type SelectFriendScreenProps = StackScreenProps<
  RootStackParams,
  'SelectFriendScreen'
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

interface Friend {
  personId: number;
  title: string;
  originalImageUrl: string;
}

export default function SelectFriendScreen({
  navigation,
}: SelectFriendScreenProps) {
  // type NameType = string | undefined;
  // const name: NameType = '동물선택하기';
  const [wholeFriend, setWholeFriend] = useState<Friend[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const dispatch = useAppDispatch();

  const handleFriendWholeData = async () => {
    setIsLoading(true);
    try {
      const response = await friendWholeData();
      if (response.status === 200) {
        setWholeFriend(response.data.content);
      } else {
        console.log('전체 데이터 조회 성공', response.status);
      }
    } catch (error) {
      console.log('power');
      console.log('전체 데이터 조회 실패', error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    handleFriendWholeData();
    dispatch(
      handleBGMMusic(
        'https://d36iq79hai056s.cloudfront.net/sound/bgm/BG_my%2BfriendsAnimal.mp3',
      ),
    );
  }, []);

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
      <ImageBackground
        source={require('../../assets/bgImage/myFriend.png')}
        resizeMode="cover"
        style={styles.backgroundImage}>
        <View style={styles.subContainer}>
          {/* 상단 */}
          <View style={styles.topContainer}>
            <Image
              style={styles.logoImage}
              source={require('../../assets/logo/friend.png')}
            />
            <Text style={styles.titleText}>내 친구 그리기</Text>
            <TouchableOpacity
              onPress={() => {
                dispatch(handleSoundEffect('btn'));
                navigation.navigate('MainScreen');
              }}
              style={styles.goHomeArea}>
              <Image
                source={require('../../assets/images/OVector.png')}
                style={styles.goHome}
              />
            </TouchableOpacity>
          </View>

          {/* 중단 */}
          <View style={styles.middleContainer}>
            <ScrollView style={styles.middleContainerFlatList}>
              <View style={styles.wrappingView}>
                {wholeFriend.map((item, index) => (
                  <View style={styles.animalCard1} key={index}>
                    <TouchableOpacity
                      onPress={() => {
                        dispatch(handleSoundEffect('btn'));
                        navigation.navigate('DrawFriendScreen', {
                          personId: item.personId,
                          title: item.title,
                          originalImageUrl: item.originalImageUrl,
                        });
                      }}
                      style={[
                        styles.animalCard2,
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
                        // source={item.urlOriginal}
                      />
                    </TouchableOpacity>
                    <Text style={styles.animalCardText}>{item.title}</Text>
                  </View>
                ))}
                <View style={styles.animalCard1}>
                  <TouchableOpacity
                    onPress={() => {
                      dispatch(handleSoundEffect('btn'));
                      navigation.navigate('FriendUploadPicture1Screen');
                    }}
                    style={[
                      styles.animalCard2,
                      {
                        backgroundColor: '#FFFFFF',
                        borderWidth: 3,
                      },
                    ]}>
                    <Text style={styles.childPlusText}>+</Text>
                  </TouchableOpacity>
                  <Text style={styles.animalCardText} />
                </View>
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
    alignItems: 'center',
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
    width: '100%',
    marginLeft: windowWidth * 0.04,
  },
  middleContainer: {
    flex: 0.7,
    width: '80%',
    alignSelf: 'center',
    alignItems: 'center',
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
  cardAnimalImage: {
    alignSelf: 'center',
    resizeMode: 'contain',
    width:
      ((windowWidth * 0.8 * 0.95) / 4 -
        ((windowWidth * 0.8 * 0.95) / 4) * 0.1) *
      0.9,
    height:
      ((windowWidth * 0.8 * 0.95) / 4 -
        ((windowWidth * 0.8 * 0.95) / 4) * 0.1) *
      0.9,
  },
  titleText: {
    alignSelf: 'center',
    fontSize: windowWidth * 0.05,
    fontWeight: '600',
    color: 'black',
    fontFamily: 'TmoneyRoundWindExtraBold',
  },
  animalCard1: {
    marginVertical: windowWidth * 0.01,
    marginHorizontal: ((windowWidth * 0.95 * 0.8) / 4) * 0.04999,
  },
  animalCard2: {
    borderRadius: 20,
    borderColor: '#FE7F22',
    // borderWidth: 1,
    width:
      (windowWidth * 0.95 * 0.8) / 4 - ((windowWidth * 0.95 * 0.8) / 4) * 0.1,
    height:
      (windowWidth * 0.95 * 0.8) / 4 - ((windowWidth * 0.95 * 0.8) / 4) * 0.1,
    justifyContent: 'center',
  },
  animalCardText: {
    paddingLeft: windowWidth * 0.007,
    paddingTop: windowHeight * 0.01,
    fontSize: windowWidth * 0.018,
    fontWeight: '600',
    fontFamily: 'TmoneyRoundWindExtraBold',
  },
  loadingImage: {
    position: 'absolute',
    width: windowHeight * 0.3,
    height: windowHeight * 0.3,
    top: windowHeight * 0.5 - windowHeight * 0.3 * 0.5,
    left: windowWidth * 0.5 - windowHeight * 0.3 * 0.5,
  },
  goHomeArea: {
    marginLeft: windowWidth * 0.45,
    marginTop: windowWidth * 0.03,
  },
  goHome: {
    height: windowWidth * 0.05,
    width: windowWidth * 0.05,
  },
  childPlusText: {
    fontSize: windowWidth * 0.08,
    color: '#D9D9D9',
    textAlign: 'center',
  },
});
