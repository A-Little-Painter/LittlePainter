import React, {useState} from 'react';
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
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import IconFontAwesome6 from 'react-native-vector-icons/FontAwesome6';

type AddKidsComponentsProps = {
  setName: (name: string) => void;
  setBirth: (birth: string) => void;
  profileImage: number;
  setProfileImage: (profileImage: string) => void;
  navigation: any; // navigation의 타입은 화면 이동과 관련된 내용에 따라 다를 수 있으므로 "any"로 지정
  selectComponent: (componentName: string) => void;
};

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const childs = [
  {
    id: 0,
    source: require('../../../../assets/profile/bear.png'),
  },
  {
    id: 1,
    source: require('../../../../assets/profile/cat.png'),
  },
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

const AddKidsComponents: React.FC<AddKidsComponentsProps> = ({
  setName,
  setBirth,
  profileImage,
  setProfileImage,
  navigation,
  selectComponent,
}) => {
  const handleComponentChange = (value: string) => {
    const newComponentName = value;
    selectComponent(newComponentName);
  };

  const [modalVisible, setModalVisible] = useState(false);
  const itemNumber = (value: any) => {
    setProfileImage(value);
    setModalVisible(false);
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
          <View style={styles.contextArea}>
            <View style={styles.kidProfile}>
              <Image source={profileImage} style={styles.profilePicture} />
              <View style={styles.searchIcon}>
                <TouchableOpacity onPress={() => setModalVisible(true)}>
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
                              itemNumber(item.source);
                            }}
                            style={styles.modalContents}>
                            <Image
                              style={styles.childCardImage}
                              resizeMode="contain"
                              source={item.source}
                            />
                          </TouchableOpacity>
                        );
                      }}
                      keyExtractor={item => item.id.toString()}
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
                <TextInput
                  placeholder="아이 애칭"
                  placeholderTextColor={'black'}
                  style={styles.loginInputText}
                  onChangeText={text => setName(text)}
                />
              </View>
              <View style={styles.loginTextBox}>
                <Text style={styles.loginTextVector}>생년월일</Text>
                <TextInput
                  placeholder="생년월일"
                  placeholderTextColor={'black'}
                  style={styles.loginInputText}
                  onChangeText={text => setBirth(text)}
                />
              </View>
            </View>
          </View>
          <View style={styles.confirmButtons}>
            <View style={styles.loginButtonBox1}>
              <TouchableOpacity
                onPress={() => {
                  handleComponentChange('profile');
                }}>
                <Text style={styles.loginText1}>이전</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.loginButtonBox2}>
              <TouchableOpacity
                onPress={() => {
                  handleComponentChange('profile');
                }}>
                <Text style={styles.loginText2}>변경</Text>
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
    marginTop: windowHeight * 0.1,
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
  loginTextVector: {
    alignSelf: 'center',
    paddingHorizontal: windowWidth * 0.01,
    fontSize: windowWidth * 0.013,
  },
  loginInputText: {
    fontSize: windowWidth * 0.017,
  },
  loginButtonBox1: {
    borderWidth: 0,
    borderColor: 'black',
    backgroundColor: '#A3A3A3',
    width: windowWidth * 0.15,
    height: windowWidth * 0.45 * 0.12,
    justifyContent: 'center',
    marginVertical: windowWidth * 0.01,
    borderRadius: 5,
    alignSelf: 'flex-end',
    marginRight: windowWidth * 0.01,
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
    resizeMode: 'contain',
  },
  profilePictureA: {
    width: windowWidth * 0.1,
    height: windowWidth * 0.1,
    margin: windowWidth * 0.01,
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
});
export default AddKidsComponents;
