import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';

type MyUploadComponentsProps = {
  selectedSubComponent: (componentName: string) => void;
};

const windowWidth = Dimensions.get('window').width;

const childs = [
  {
    id: 2,
    source: require('../../../../assets/profile/deer.png'),
  },
  {
    id: 3,
    source: require('../../../../assets/profile/dinosaur.png'),
  },
  {
    id: 4,
    source: require('../../../../assets/profile/dog.png'),
  },
  {
    id: 5,
    source: require('../../../../assets/profile/frog.png'),
  },
  {
    id: 6,
    source: require('../../../../assets/profile/giraffe.png'),
  },
  {
    id: 7,
    source: require('../../../../assets/profile/monkey.png'),
  },
  {
    id: 8,
    source: require('../../../../assets/profile/panda.png'),
  },
  {
    id: 9,
    source: require('../../../../assets/profile/penguin.png'),
  },
  {
    id: 10,
    source: require('../../../../assets/profile/rabbit.png'),
  },
  {
    id: 11,
    source: require('../../../../assets/profile/tiger.png'),
  },
  {
    id: 12,
    source: require('../../../../assets/profile/whale.png'),
  },
];

const MyUploadComponents: React.FC<MyUploadComponentsProps> = ({}) => {
  return (
    <View style={styles.picList}>
      <FlatList
        data={childs}
        renderItem={({item}) => {
          return (
            <View>
              <TouchableOpacity style={styles.backPlate}>
                <Image
                  style={styles.pic}
                  resizeMode="contain"
                  source={item.source}
                />
              </TouchableOpacity>
              <Text style={styles.picname}>{item.id}</Text>
            </View>
          );
        }}
        keyExtractor={item => item.id.toString()}
        numColumns={3}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  picList: {
    marginLeft: windowWidth * 0.03,
    marginTop: windowWidth * 0.02,
  },
  backPlate: {
    backgroundColor: '#8C80E2',
    borderRadius: windowWidth * 0.005,
    marginHorizontal: windowWidth * 0.02,
  },
  pic: {
    height: windowWidth * 0.15,
    width: windowWidth * 0.15,
  },
  picname: {
    fontSize: windowWidth * 0.018,
    textAlign: 'center',
  },
});
export default MyUploadComponents;
