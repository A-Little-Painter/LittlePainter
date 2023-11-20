import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';

// Import myAnimal from your API file
import {myFairy} from '../../../../apis/mypage/mypageApi';
import TaleDrawedImageModal from '../../../modals/TaleDrawedImageModal';
import {RootState} from '../../../../redux/store';
import {handleIsTaleDrawedImageModalVisible} from '../../../../redux/slices/user/user';
import {useDispatch, useSelector} from 'react-redux';

type MyAnimalComponentsProps = {
  selectedSubComponent: (componentName: string) => void;
};

const windowWidth = Dimensions.get('window').width;

const MyAnimalComponents: React.FC<MyAnimalComponentsProps> = ({}) => {
  const [childs, setChilds] = useState<any[]>([]);
  const dispatch = useDispatch();
  const isTaleDrawedImageModalVisible = useSelector(
    (state: RootState) => state.user.isTaleDrawedImageModalVisible,
  );
  const [selectTaleid, setSelectTaleid] = useState<number>(1);
  const [selectTitle, setSelectTitle] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await myFairy();
        setChilds(data);
        console.log(data);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    fetchData();
  }, []);

  return (
    <View style={styles.picList}>
      <FlatList
        data={childs}
        renderItem={({item}) => {
          return (
            <View>
              <TouchableOpacity
                style={styles.backPlate}
                onPress={() => {
                  setSelectTitle(item.title);
                  setSelectTaleid(item.taleId);
                  dispatch(handleIsTaleDrawedImageModalVisible(true));
                }}>
                <Image
                  style={styles.pic}
                  resizeMode="contain"
                  source={{uri: item.urlCover}}
                />
              </TouchableOpacity>
              <Text style={styles.picname}>{item.title}</Text>
            </View>
          );
        }}
        keyExtractor={item => item.taleId.toString()}
        numColumns={3}
      />
      {isTaleDrawedImageModalVisible ? (
        <TaleDrawedImageModal taleId={selectTaleid} title={selectTitle} />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  picList: {
    marginLeft: windowWidth * 0.03,
    marginTop: windowWidth * 0.02,
    height: windowWidth * 0.3,
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

export default MyAnimalComponents;
