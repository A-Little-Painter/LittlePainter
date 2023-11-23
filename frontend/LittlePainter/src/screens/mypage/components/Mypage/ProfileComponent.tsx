import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';
import IconFontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import {useAppDispatch, useAppSelector} from '../../../../redux/hooks';
import {addKids, updateKids} from '../../../../redux/slices/user/user';
import {callUserData, deleteUserChild} from '../../../../apis/mypage/mypageApi';

interface Child {
  id: number;
  birthday: string;
  iconUrl: string;
  nickname: string;
}

type ProfileComponentsProps = {
  setProfileImage: (profileImage: string) => void;
  navigation: any; // navigation의 타입은 화면 이동과 관련된 내용에 따라 다를 수 있으므로 "any"로 지정
  selectComponent: (componentName: string) => void;
};

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const ProfileComponents: React.FC<ProfileComponentsProps> = ({
  setProfileImage,
  navigation,
  selectComponent,
}) => {
  const [childs, setChildData] = useState<Child[]>([]);
  const [temp, setTemp] = useState('1');
  const selectId = useAppSelector(state => state.user.selectId);
  const selectName = useAppSelector(state => state.user.selectName);

  const handleComponentChange = (value: string) => {
    const newComponentName = value;
    selectComponent(newComponentName);
  };
  const dispatch = useAppDispatch();
  useEffect(() => {
    function formatDateToKorean(dateString: string) {
      const formattedDate = dateString.replace(
        /^(\d{4})-(\d{2})-(\d{2})$/,
        '$1년 $2월 $3일',
      );
      return formattedDate;
    }
    const fetchData = async () => {
      console.log(temp);
      try {
        const response: Child[] = await callUserData();
        const formatted = response.map(item => ({
          ...item,
          birthday: formatDateToKorean(item.birthday),
        }));
        console.log('on');
        setChildData(formatted);
        setTemp('2');
      } catch (error) {
        console.error('데이터 불러오기 실패:', error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    console.log(temp);
    if (childs.length !== 0) {
      console.log('move');
      const moveItemToFront = (item: number) => {
        const updatedData = [...childs];
        const index = updatedData.findIndex(child => child.id === item);
        if (index !== -1) {
          const selectedChild = updatedData.splice(index, 1)[0];
          updatedData.unshift(selectedChild);
          setChildData(updatedData);
          console.log(updatedData);
        }
      };
      moveItemToFront(selectId);
    } else {
      console.log('no move');
    }
  }, [temp]);

  const handleLongPress = (id: number) => {
    Alert.alert('프로필 제거', '이 프로필을 지울까요?', [
      {
        text: '취소',
        style: 'cancel',
      },
      {
        text: '확인',
        onPress: () => {
          deleteUserChild(id);
          function formatDateToKorean(dateString: string) {
            const formattedDate = dateString.replace(
              /^(\d{4})-(\d{2})-(\d{2})$/,
              '$1년 $2월 $3일',
            );
            return formattedDate;
          }
          const fetchData = async () => {
            console.log(temp);
            try {
              const response: Child[] = await callUserData();
              const formatted = response.map(item => ({
                ...item,
                birthday: formatDateToKorean(item.birthday),
              }));
              console.log('on');
              setChildData(formatted);
              if (temp === '2') {
                setTemp('3');
              } else {
                setTemp('2');
              }
            } catch (error) {
              console.error('데이터 불러오기 실패:', error);
            }
          };
          fetchData();
        },
      },
    ]);
  };

  return (
    <View style={styles.rightContainer}>
      <View style={styles.subrightContainer}>
        {/* 상단 */}
        <View style={styles.topContainer}>
          <View>
            <Text style={styles.topProfileText}>
              <Text style={styles.nicknameText}>{selectName} </Text>님의 프로필
            </Text>
          </View>
          <TouchableOpacity
            style={styles.xCircle}
            onPress={() => {
              navigation.goBack();
            }}>
            <Text style={styles.xText}>
              <IconFontAwesome6
                name="x"
                size={windowWidth * 0.03}
                color={'#C0C0C0'}
              />
            </Text>
          </TouchableOpacity>
        </View>
        {/* 중단 */}
        <View style={styles.middleContainer}>
          {/* 아이 정보 */}
          <View style={styles.childInformationView}>
            <Text style={styles.childInformationText}>아이정보</Text>
          </View>
          <View style={styles.childCardContainer}>
            <FlatList
              data={childs}
              horizontal={true}
              renderItem={({item}) => {
                const isSelected = item.id === selectId;
                const cardStyle = isSelected
                  ? styles.childCardViewSelect
                  : styles.childCardView;
                return (
                  <View style={cardStyle}>
                    <TouchableOpacity
                      onPress={() => {
                        handleComponentChange('kids');
                        dispatch(updateKids(item));
                        setProfileImage(item.iconUrl);
                      }}
                      onLongPress={() => {
                        handleLongPress(item.id);
                      }}>
                      <Image
                        style={styles.childCardImage}
                        source={{uri: item.iconUrl}}
                      />
                      <View style={styles.childTextView}>
                        <Text style={styles.childNameText}>
                          {item.nickname}
                        </Text>
                        <Text style={styles.birthdayText}>{item.birthday}</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                );
              }}
              keyExtractor={item => item.id.toString()}
              ListFooterComponent={
                <TouchableOpacity
                  style={styles.childPlusView}
                  onPress={() => {
                    handleComponentChange('kids');
                    dispatch(addKids());
                    setProfileImage('');
                  }}>
                  <View>
                    <Text style={styles.childPlusText}>+</Text>
                  </View>
                </TouchableOpacity>
              }
            />
          </View>
          {/* 비밀번호 */}
          <View style={styles.passwordView}>
            <Text style={styles.passwordText}>비밀번호</Text>
            <TouchableOpacity
              style={styles.passwordChangeView}
              onPress={() => {
                handleComponentChange('password');
              }}>
              <Text style={styles.passwordChangeText}>변경</Text>
            </TouchableOpacity>
          </View>
          {/* 회원탈퇴 */}
          <TouchableOpacity
            style={styles.unregisterView}
            onPress={() => {
              handleComponentChange('withdraw');
            }}>
            <Text style={styles.unregisterText}>회원탈퇴 &gt;</Text>
          </TouchableOpacity>
        </View>
        {/* 하단 */}
        <View style={styles.bottomContainer} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  rightContainer: {
    flex: 0.75,
    flexDirection: 'column',
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  subrightContainer: {
    alignSelf: 'center',
    width: '85%',
    height: '90%',
  },
  topContainer: {
    flex: 0.2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  topProfileText: {
    fontSize: windowWidth * 0.025,
    color: 'black',
  },
  nicknameText: {
    fontSize: windowWidth * 0.033,
    fontWeight: 'bold',
  },
  xCircle: {
    justifyContent: 'center',
    borderRadius: 500,
    backgroundColor: 'white',
    width: windowWidth * 0.05,
    height: windowWidth * 0.05,
    elevation: 3,
  },
  xText: {
    textAlign: 'center',
  },
  middleContainer: {
    flex: 0.7,
    justifyContent: 'center',
  },
  childInformationView: {
    marginVertical: windowHeight * 0.02,
  },
  childInformationText: {
    color: 'black',
    fontWeight: '700',
    fontSize: windowWidth * 0.02,
  },
  childCardContainer: {
    width: '95%',
    flexDirection: 'row',
    alignSelf: 'center',
  },
  childCardView: {
    backgroundColor: '#FFF4E5',
    marginHorizontal: windowWidth * 0.01,
    borderRadius: windowWidth * 0.137 * 0.1,
    borderColor: 'black',
    borderWidth: 0,
    width: windowWidth * 0.137,
    height: windowWidth * 0.137 * 1.24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  childCardViewSelect: {
    backgroundColor: '#9AC5F4',
    marginHorizontal: windowWidth * 0.01,
    borderRadius: windowWidth * 0.137 * 0.1,
    borderColor: 'black',
    borderWidth: 0,
    width: windowWidth * 0.137,
    height: windowWidth * 0.137 * 1.24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  childCardImage: {
    height: windowWidth * 0.137 * 1.24 * 0.5,
    resizeMode: 'contain',
  },
  childPlusView: {
    width: windowWidth * 0.137,
    height: windowWidth * 0.137 * 1.24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  childPlusText: {
    fontSize: windowWidth * 0.08,
    color: '#D9D9D9',
  },
  childTextView: {
    height: '30%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  childNameText: {
    fontWeight: 'bold',
    fontSize: windowWidth * 0.015,
    color: 'black',
    marginTop: windowHeight * 0.03,
  },
  birthdayText: {
    color: 'black',
    fontSize: windowWidth * 0.013,
    marginTop: windowHeight * 0.01,
  },
  passwordView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: windowHeight * 0.02,
  },
  passwordText: {
    color: 'black',
    fontWeight: '700',
    fontSize: windowWidth * 0.02,
  },
  passwordChangeView: {
    borderWidth: 1,
    backgroundColor: '#DBE7B5',
    width: windowWidth * 0.05,
    height: windowWidth * 0.05 * 0.6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  passwordChangeText: {
    color: 'black',
    fontSize: windowWidth * 0.018,
  },
  unregisterView: {
    alignItems: 'flex-end',
  },
  unregisterText: {
    fontSize: windowWidth * 0.015,
  },
  bottomContainer: {
    flex: 0.1,
  },
});
export default ProfileComponents;
