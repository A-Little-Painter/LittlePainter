// import React, {useState} from 'react';
import React from 'react';
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

type SelectFairytaleScreenProps = StackScreenProps<
  RootStackParams,
  'SelectFairytaleScreen'
>;

const windowWidth = Dimensions.get('window').width;
// const windowHeight = Dimensions.get('window').height;

const fairytaleData = [
  {
    id: 1,
    title: '방귀시합',
    image: '../../assets/images/dinosaur.png',
  },
  {
    id: 2,
    title: '밥만 먹는 밥벌레 장군',
    image: '../../assets/images/dinosaur.png',
  },
  {
    id: 3,
    title: '흥부 놀부',
    image: '../../assets/images/dinosaur.png',
  },
  {
    id: 4,
    title: '콩쥐팥쥐',
    image: '../../assets/images/dinosaur.png',
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

export default function SelectFairytaleScreen({
  navigation,
}: SelectFairytaleScreenProps) {
  // type NameType = string | undefined;
  // const name: NameType = '동물선택하기';
  return (
    <View style={styles.mainContainer}>
      <View style={styles.subContainer}>
        {/* 상단 */}
        <View style={styles.topContainer}>
          <Image
            style={styles.logoImage}
            source={require('../../assets/images/fox.png')}
          />
          <Text style={styles.titleText}>동화 그리기</Text>
        </View>
        {/* 중단 */}
        <View style={styles.middleContainer}>
          <FlatList
            data={fairytaleData}
            numColumns={4}
            renderItem={({item, index}) => {
              return (
                <View style={styles.animalCard1}>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('ReadFairytaleScreen', {
                        title: item.title,
                      });
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
                    {/* <Image
                      style={styles.logoImage}
                      source={{uri: item.image}}
                    /> */}
                  </TouchableOpacity>
                  <Text style={styles.animalCardText}>{item.title}</Text>
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
    backgroundColor: '#EAFFBA',
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
  animalCard1: {
    margin: windowWidth * 0.01,
  },
  animalCard2: {
    borderRadius: 20,
    borderColor: 'black',
    borderWidth: 1,
    width: windowWidth * 0.194,
    height: windowWidth * 0.16,
  },
  animalCardText: {
    textAlign: 'center',
    fontSize: windowWidth * 0.018,
  },
});
