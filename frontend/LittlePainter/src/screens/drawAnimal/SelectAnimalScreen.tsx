import React, {useState} from 'react';
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

type SelectAnimalScreenProps = StackScreenProps<
  RootStackParams,
  'SelectAnimalScreen'
>;

const windowWidth = Dimensions.get('window').width;
// const windowHeight = Dimensions.get('window').height;

const DATA = [
  {
    id: 1,
    animalName: '공룡',
    animalImage: require('../../assets/images/dinosaur.png'),
  },
  {
    id: 2,
    animalName: '사자',
    animalImage: require('../../assets/images/dinosaur.png'),
  },
  {
    id: 3,
    animalName: '쥐',
    animalImage: require('../../assets/images/elephant.png'),
  },
  {
    id: 4,
    animalName: '닭',
    animalImage: require('../../assets/images/dinosaur.png'),
  },
  {
    id: 5,
    animalName: '코끼리',
    animalImage: require('../../assets/images/dinosaur.png'),
  },
  {
    id: 6,
    animalName: '토끼',
    animalImage: require('../../assets/images/elephant.png'),
  },
  {
    id: 7,
    animalName: '소',
    animalImage: require('../../assets/images/dinosaur.png'),
  },
  {
    id: 8,
    animalName: '돼지',
    animalImage: require('../../assets/images/dinosaur.png'),
  },
  {
    id: 9,
    animalName: '다람쥐',
    animalImage: require('../../assets/images/dinosaur.png'),
  },
  {
    id: 10,
    animalName: '햄스터',
    animalImage: require('../../assets/images/dinosaur.png'),
  },
  {
    id: 11,
    animalName: '고양이',
    animalImage: require('../../assets/images/dinosaur.png'),
  },
  {
    id: 12,
    animalName: '호랑이',
    animalImage: require('../../assets/images/dinosaur.png'),
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
export default function SelectAnimalScreen({
  navigation,
}: SelectAnimalScreenProps) {
  // type NameType = string | undefined;
  // const name: NameType = '동물선택하기';
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
            data={DATA}
            numColumns={4}
            renderItem={({item, index}) => {
              return (
                <View style={styles.animalCard1}>
                  <TouchableOpacity
                    onPress={() => {
                      // 일단 여기로 옮김. 실제론 각 동물 id에 맞게 보내야함.
                      navigation.navigate('DrawAnimalScreen');
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
                      // source={{uri: item.animalImage}}
                      source={item.animalImage}
                    />
                  </TouchableOpacity>
                  <Text style={styles.animalCardText}>{item.animalName}</Text>
                </View>
              );
            }}
            // keyExtractor={(item, index) => index.toString()}
            keyExtractor={item => item.id.toString()}
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
