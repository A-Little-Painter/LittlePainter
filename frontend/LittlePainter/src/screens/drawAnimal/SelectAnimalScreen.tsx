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
} from 'react-native';
import type {StackScreenProps} from '@react-navigation/stack';
import {RootStackParams} from '../../navigations/AppNavigator';
import {animalWholeData} from '../../apis/draw/draw';

type SelectAnimalScreenProps = StackScreenProps<
  RootStackParams,
  'SelectAnimalScreen'
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

interface Animal {
  animalId: number;
  animalType: string;
  urlOriginal: string;
}

export default function SelectAnimalScreen({
  navigation,
}: SelectAnimalScreenProps) {
  // type NameType = string | undefined;
  // const name: NameType = '동물선택하기';
  const [wholeAnimal, setWholeAnimal] = useState<Animal[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const handleAnimalWholeData = async () => {
    setIsLoading(true);
    try {
      const response = await animalWholeData();
      if (response.status === 200) {
        setWholeAnimal(response.data);
      } else {
        console.log('전체 동물 데이터 조회 성공', response.status);
      }
    } catch (error) {
      console.log('전체 동물 데이터 조회 실패', error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    handleAnimalWholeData();
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
      <View style={styles.subContainer}>
        {/* 상단 */}
        <View style={styles.topContainer}>
          <Image
            style={styles.logoImage}
            source={require('../../assets/images/orca.png')}
          />
          <Text style={styles.titleText}>동물 그리기</Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('MainScreen');
            }}
            style={styles.goHomeArea}>
            <Image
              source={require('../../assets/images/BVector.png')}
              style={styles.goHome}
            />
          </TouchableOpacity>
        </View>

        {/* 중단 */}
        <View style={styles.middleContainer}>
          <ScrollView style={styles.middleContainerFlatList}>
            <View style={styles.wrappingView}>
              {wholeAnimal.map((item, index) => (
                <View style={styles.animalCard1} key={index}>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('DrawAnimalScreen', {
                        animalId: item.animalId,
                        animalType: item.animalType,
                        originImage: item.urlOriginal,
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
                      source={{uri: item.urlOriginal}}
                      // source={item.urlOriginal}
                    />
                  </TouchableOpacity>
                  <Text style={styles.animalCardText}>{item.animalType}</Text>
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
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#E1EBF8',
  },
  subContainer: {
    alignSelf: 'center',
    flex: 1,
    width: '95%',
  },
  topContainer: {
    flex: 0.3,
    flexDirection: 'row',
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
  },
  animalCard1: {
    marginVertical: windowWidth * 0.01,
    marginHorizontal: ((windowWidth * 0.95 * 0.8) / 4) * 0.04999,
  },
  animalCard2: {
    borderRadius: 20,
    borderColor: 'black',
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
  },
  loadingImage: {
    position: 'absolute',
    width: windowHeight * 0.3,
    height: windowHeight * 0.3,
    top: windowHeight * 0.5 - windowHeight * 0.3 * 0.5,
    left: windowWidth * 0.5 - windowHeight * 0.3 * 0.5,
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
