import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
  TextInput,
  Modal,
  Alert,
  Pressable,
  FlatList,
} from 'react-native';
import {useAppSelector, useAppDispatch} from '../../../../redux/hooks';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import IconFontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import {
  addUserChild,
  callIconList,
  selectKids,
} from '../../../../apis/mypage/mypageApi';
import {selected} from '../../../../redux/slices/user/user';

LocaleConfig.locales['kr'] = {
  monthNames: [
    '1월',
    '2월',
    '3월',
    '4월',
    '5월',
    '6월',
    '7월',
    '8월',
    '9월',
    '10월',
    '11월',
    '12월',
  ],
  monthNamesShort: [
    '1.',
    '2.',
    '3.',
    '4.',
    '5.',
    '6.',
    '7.',
    '8.',
    '9.',
    '10.',
    '11.',
    '12.',
  ],
  dayNames: [
    '일요일',
    '월요일',
    '화요일',
    '수요일',
    '목요일',
    '금요일',
    '토요일',
  ],
  dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
};

LocaleConfig.defaultLocale = 'kr';

type AddKidsComponentsProps = {
  name: string;
  birth: string;
  setName: (name: string) => void;
  setBirth: (birth: string) => void;
  profileImage: string;
  setProfileImage: (profileImage: string) => void;
  navigation: any; // navigation의 타입은 화면 이동과 관련된 내용에 따라 다를 수 있으므로 "any"로 지정
  selectComponent: (componentName: string) => void;
};

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const AddKidsComponents: React.FC<AddKidsComponentsProps> = ({
  name,
  birth,
  setName,
  setBirth,
  profileImage,
  setProfileImage,
  selectComponent,
}) => {
  const kidIconUpdate = useAppSelector(state => state.user.kidIcon);
  const kidIdUpdate = useAppSelector(state => state.user.kidId);
  const kidNameUpdate = useAppSelector(state => state.user.kidName);
  const kidBirthdayUpdate = useAppSelector(state => state.user.kidBirthday);
  const userEmail = useAppSelector(state => state.user.userEmail);
  const dispatch = useAppDispatch();

  const handleComponentChange = (value: string) => {
    const newComponentName = value;
    selectComponent(newComponentName);
  };
  const [isCalendarVisible, setCalendarVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [childs, setChilds] = useState(null);
  const [imageId, setImageId] = useState(-1);

  const fetchData = async () => {
    try {
      const data = await callIconList();
      setChilds(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDayPress = (day: any) => {
    setBirth(day.dateString); // 선택한 날짜를 상태 변수에 저장
    setCalendarVisible(false); // 모달 닫기
  };

  const itemNumber = (value: any) => {
    setProfileImage(value);
    setModalVisible(false);
  };
  const add = useAppSelector(state => state.user.isAddKids);
  let addOrupdate: string;
  if (add) {
    addOrupdate = '등록';
  } else {
    addOrupdate = '변경';
  }
  const kidAddAndUpdate = async () => {
    if (add) {
      console.log('add');

      const data = {
        nickname: name,
        birthday: birth,
        iconId: imageId,
      };
      await addUserChild(data);
      handleComponentChange('profile');
    } else {
      console.log('나중에');
      handleComponentChange('profile');
    }
  };

  const selectKid = () => {
    const selecedData: {
      selectId: number;
      selectName: string;
      selectImage: string;
      userEmail: string;
    } = {
      selectId: kidIdUpdate,
      selectName: kidNameUpdate,
      selectImage: kidIconUpdate,
      userEmail: userEmail,
    };
    dispatch(selected(selecedData));
    console.log(selecedData);
    handleComponentChange('profile');
    selectKids(kidIdUpdate);
  };

  return (
    <View style={styles.rightContainer}>
      <View style={styles.subrightContainer}>
        {/* 상단 */}
        <View style={styles.topContainer}>
          <View>
            <Text style={styles.topProfileText}>꼬마화가를 이용할</Text>
            <Text style={styles.topProfileText}>
              아이의 정보를 입력해 주세요
            </Text>
          </View>
          <TouchableOpacity
            style={styles.xCircle}
            onPress={() => {
              handleComponentChange('profile');
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
          <View style={styles.contextArea}>
            <View style={styles.kidProfile}>
              {profileImage ? (
                <Image
                  source={{uri: profileImage}}
                  style={styles.profilePicture}
                />
              ) : (
                <Image
                  source={require('../../../../assets/logo/littlePainterRabbit.png')}
                  style={styles.profilePicture}
                />
              )}
              <View style={styles.searchIcon}>
                <TouchableOpacity
                  onPress={() => {
                    setModalVisible(true),
                      console.log('childs'),
                      console.log(childs);
                  }}>
                  <IconFontAwesome
                    name="search"
                    size={windowWidth * 0.03}
                    color={'#645454'}
                  />
                </TouchableOpacity>
              </View>
              {/* 모달 */}
              <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                  Alert.alert('Modal has been closed.');
                  setModalVisible(!modalVisible);
                }}>
                <Pressable
                  style={styles.centeredView}
                  onPress={() => setModalVisible(!modalVisible)}>
                  <View style={styles.modalView}>
                    <FlatList
                      data={childs}
                      renderItem={({item}) => {
                        return (
                          <TouchableOpacity
                            onPress={() => {
                              itemNumber(item.iconUrl);
                              setImageId(item.iconId);
                            }}
                            style={styles.modalContents}>
                            <Image
                              style={styles.childCardImage}
                              resizeMode="contain"
                              source={{uri: item.iconUrl}}
                            />
                          </TouchableOpacity>
                        );
                      }}
                      keyExtractor={item => item.iconId}
                      numColumns={7}
                    />
                    <Pressable
                      style={[styles.button]}
                      onPress={() => setModalVisible(!modalVisible)}>
                      <Text style={styles.textStyle}>안바꿀래요</Text>
                    </Pressable>
                  </View>
                </Pressable>
              </Modal>
              {/* 모달 끝 */}
            </View>
            <View>
              <View style={styles.loginTextBox}>
                <Text style={styles.loginTextVector}>아이애칭</Text>
                {add ? (
                  <TextInput
                    placeholder="아이 애칭"
                    placeholderTextColor={'black'}
                    style={styles.loginInputText}
                    onChangeText={text => setName(text)}
                  />
                ) : (
                  <TextInput
                    placeholder={kidNameUpdate}
                    placeholderTextColor={'black'}
                    style={styles.loginInputText}
                    onChangeText={text => setName(text)}
                  />
                )}
              </View>
              <View style={styles.birthAria}>
                <View style={styles.loginTextBox1}>
                  <Text style={styles.loginTextVector}>생년월일</Text>
                  {add ? (
                    <TextInput
                      placeholder="생년월일"
                      placeholderTextColor={'black'}
                      style={styles.loginInputText}
                      onChangeText={text => setBirth(text)}
                      value={birth}
                      editable={false}
                    />
                  ) : (
                    <TextInput
                      placeholder={kidBirthdayUpdate}
                      placeholderTextColor={'black'}
                      style={styles.loginInputText}
                      onChangeText={text => setBirth(text)}
                      value={birth}
                      editable={false}
                    />
                  )}
                </View>
                <View style={styles.ConfirmButton}>
                  <TouchableOpacity onPress={() => setCalendarVisible(true)}>
                    <Text style={styles.ConfirmButtonText}>날짜 선택</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <Modal
              animationType="slide"
              transparent={true}
              visible={isCalendarVisible}>
              <Pressable
                style={styles.modal}
                onPress={() => setCalendarVisible(false)}>
                {/* 캘린더 */}
                <Calendar style={styles.calender} onDayPress={handleDayPress} />
              </Pressable>
            </Modal>
          </View>
          <View style={styles.confirmButtons}>
            {add ? null : (
              <View style={styles.loginButtonBox1}>
                <TouchableOpacity
                  onPress={() => {
                    selectKid();
                  }}>
                  <Text style={styles.loginText1}>선택</Text>
                </TouchableOpacity>
              </View>
            )}
            <View style={styles.loginButtonBox2}>
              <TouchableOpacity
                onPress={() => {
                  kidAddAndUpdate();
                }}>
                <Text style={styles.loginText2}>{addOrupdate}</Text>
              </TouchableOpacity>
            </View>
          </View>
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
    marginLeft: windowWidth * 0.15,
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
    marginRight: windowWidth * 0.05,
  },
  childCardImage: {
    height: windowWidth * 0.137 * 1.24 * 0.7,
    width: windowWidth * 0.137 * 1.24 * 0.7,
    margin: windowHeight * 0.002,
  },
  bottomContainer: {
    flex: 0.1,
  },
  loginTextBox: {
    flexDirection: 'row',
    borderWidth: 0,
    borderColor: 'black',
    backgroundColor: '#F8F8F8',
    width: windowWidth * 0.36,
    height: windowWidth * 0.45 * 0.12,
    marginVertical: windowWidth * 0.01,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },
  loginTextBox1: {
    flexDirection: 'row',
    borderWidth: 0,
    borderColor: 'black',
    backgroundColor: '#F8F8F8',
    width: windowWidth * 0.23,
    height: windowWidth * 0.45 * 0.12,
    marginVertical: windowWidth * 0.01,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },
  loginTextVector: {
    alignSelf: 'center',
    paddingHorizontal: windowWidth * 0.01,
    fontSize: windowWidth * 0.013,
  },
  loginInputText: {
    width: windowWidth * 0.27,
    fontSize: windowWidth * 0.017,
    color: '#000000',
  },
  loginButtonBox1: {
    borderWidth: 0,
    backgroundColor: '#A3A3A3',
    width: windowWidth * 0.15,
    height: windowWidth * 0.45 * 0.12,
    justifyContent: 'center',
    marginVertical: windowWidth * 0.01,
    borderRadius: 5,
    alignSelf: 'flex-end',
    marginLeft: windowWidth * 0.01,
  },
  loginButtonBox2: {
    borderWidth: 0,
    borderColor: 'black',
    backgroundColor: '#DBE7B5',
    width: windowWidth * 0.15,
    height: windowWidth * 0.45 * 0.12,
    justifyContent: 'center',
    marginVertical: windowWidth * 0.01,
    borderRadius: 5,
    alignSelf: 'flex-end',
    marginLeft: windowWidth * 0.01,
  },
  loginText1: {
    textAlign: 'center',
    fontSize: windowWidth * 0.025,
    fontWeight: '300',
    color: '#FFFFFF',
  },
  loginText2: {
    textAlign: 'center',
    fontSize: windowWidth * 0.025,
    fontWeight: '300',
    color: '#0D0C0C',
  },
  confirmButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  contextArea: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  kidProfile: {
    backgroundColor: '#FFF4E5',
    height: windowHeight * 0.35,
    width: windowHeight * 0.35,
    borderRadius: 10000,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: windowWidth * 0.03,
  },
  profilePicture: {
    height: windowHeight * 0.23,
    width: windowHeight * 0.23,
    resizeMode: 'contain',
  },
  searchIcon: {
    backgroundColor: '#E6E6E6',
    height: windowWidth * 0.045,
    width: windowWidth * 0.045,
    borderRadius: 10000,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: windowWidth * 0.135,
    left: windowWidth * 0.135,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: windowWidth * 0.137 * 0.1,
    padding: windowHeight * 0.04,
    paddingBottom: windowHeight * 0.01,
    alignItems: 'center',
    elevation: 5,
    height: windowHeight * 0.6,
  },
  button: {
    borderRadius: windowWidth * 0.137 * 0.1,
    elevation: 2,
    backgroundColor: '#A3A3A3',
    height: windowHeight * 0.1,
    width: windowWidth * 0.1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: windowWidth * 0.015,
  },
  modalContents: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  ConfirmButton: {
    backgroundColor: '#F8F8F8',
    width: windowWidth * 0.13,
    height: windowWidth * 0.45 * 0.12,
    marginVertical: windowWidth * 0.01,
    justifyContent: 'center',
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },
  ConfirmButtonText: {
    backgroundColor: '#525252',
    color: '#FFFFFF',
    fontSize: windowWidth * 0.016,
    borderRadius: 1000,
    width: windowWidth * 0.1,
    height: windowHeight * 0.07,
    alignItems: 'center',
    textAlign: 'center',
    textAlignVertical: 'center',
    marginLeft: windowWidth * 0.02,
  },
  modal: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  calender: {
    height: windowHeight * 0.43,
    width: windowWidth * 0.5,
  },
  birthAria: {
    flexDirection: 'row',
  },
});
export default AddKidsComponents;
