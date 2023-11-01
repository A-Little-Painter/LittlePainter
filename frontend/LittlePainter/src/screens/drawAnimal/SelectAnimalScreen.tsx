import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import type {StackScreenProps} from '@react-navigation/stack';
import {RootStackParams} from '../../navigations/AppNavigator';
import {animalWholeData} from '../../apis/draw/draw';

type SelectAnimalScreenProps = StackScreenProps<
  RootStackParams,
  'SelectAnimalScreen'
>;

const windowWidth = Dimensions.get('window').width;
// const windowHeight = Dimensions.get('window').height;

const wholeAnimalTmp = [
  {
    animalId: 1,
    animalType: '공룡',
    urlOriginal: require('../../assets/images/dinosaur.png'),
  },
  {
    animalId: 2,
    animalType: '사자',
    urlOriginal: require('../../assets/images/dinosaur.png'),
  },
  {
    animalId: 3,
    animalType: '쥐',
    urlOriginal: require('../../assets/images/elephant.png'),
  },
  {
    animalId: 4,
    animalType: '닭',
    urlOriginal: require('../../assets/images/dinosaur.png'),
  },
  {
    animalId: 5,
    animalType: '코끼리',
    urlOriginal: require('../../assets/images/dinosaur.png'),
  },
  {
    animalId: 6,
    animalType: '토끼',
    urlOriginal: require('../../assets/images/elephant.png'),
  },
  {
    animalId: 7,
    animalType: '소',
    urlOriginal: require('../../assets/images/dinosaur.png'),
  },
  {
    animalId: 8,
    animalType: '돼지',
    urlOriginal: require('../../assets/images/dinosaur.png'),
  },
  {
    animalId: 9,
    animalType: '다람쥐',
    urlOriginal: require('../../assets/images/dinosaur.png'),
  },
  {
    animalId: 10,
    animalType: '햄스터',
    urlOriginal: require('../../assets/images/dinosaur.png'),
  },
  {
    animalId: 11,
    animalType: '고양이',
    urlOriginal: require('../../assets/images/dinosaur.png'),
  },
  {
    animalId: 12,
    animalType: '호랑이',
    urlOriginal: require('../../assets/images/dinosaur.png'),
  },
];

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

  const handleAnimalWholeData = async () => {
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
  };

  useEffect(() => {
    handleAnimalWholeData();
  }, []);
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
        </View>
        {/* 중단 */}
        <View style={styles.middleContainer}>
          <FlatList
            data={wholeAnimal}
            numColumns={4}
            renderItem={({item, index}) => {
              return (
                <View style={styles.animalCard1}>
                  <TouchableOpacity
                    onPress={() => {
                      // 일단 여기로 옮김. 실제론 각 동물 id에 맞게 보내야함.
                      navigation.navigate('DrawAnimalScreen', {animalId:item.animalId});
                    }}
                    style={[
                      styles.animalCard2,
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
                      style={styles.logoImage}
                      source={{uri: item.urlOriginal}}
                      // source={item.urlOriginal}
                    />
                  </TouchableOpacity>
                  <Text style={styles.animalCardText}>{item.animalType}</Text>
                </View>
              );
            }}
            // keyExtractor={(item, index) => index.toString()}
            keyExtractor={item => item.animalId.toString()}
          />
        </View>
      </View>
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
  animalCard1: {
    margin: windowWidth * 0.01,
  },
  animalCard2: {
    borderRadius: 20,
    borderColor: 'black',
    borderWidth: 1,
    width: windowWidth * 0.16,
    height: windowWidth * 0.16,
    justifyContent: 'center',
  },
  animalCardText: {
    textAlign: 'center',
    fontSize: windowWidth * 0.018,
  },
});
