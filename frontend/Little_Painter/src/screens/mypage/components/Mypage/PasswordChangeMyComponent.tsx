import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import IconFontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import IconSimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

type PasswordChangeMyComponentsProps = {
  setOldPw: (oldPw: string) => void;
  setNewPw: (newPw: string) => void;
  setNewPwConfirm: (newPwConfirm: string) => void;
  navigation: any; // navigation의 타입은 화면 이동과 관련된 내용에 따라 다를 수 있으므로 "any"로 지정
  selectComponent: (componentName: string) => void;
};

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const PasswordChangeMyComponents: React.FC<PasswordChangeMyComponentsProps> = ({
  setOldPw,
  setNewPw,
  setNewPwConfirm,
  selectComponent,
}) => {
  const handleComponentChange = (value: string) => {
    const newComponentName = value;
    selectComponent(newComponentName);
  };

  return (
    <View style={styles.rightContainer}>
      <View style={styles.subrightContainer}>
        {/* 상단 */}
        <View style={styles.topContainer}>
          <View>
            <Text style={styles.topProfileText}>비밀번호 변경</Text>
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
          <Text style={styles.infoText}>
            기존 비밀번호와 새 비밀번호를 입력해 주세요
          </Text>
          <View style={styles.contextArea}>
            <View>
              <View style={styles.loginTextBox}>
                <Text style={styles.loginTextVector}>
                  <IconSimpleLineIcons
                    name="lock"
                    size={windowWidth * 0.03}
                    color={'#645454'}
                  />
                </Text>
                <TextInput
                  placeholder="기존 비밀번호"
                  placeholderTextColor={'black'}
                  style={styles.loginInputText}
                  onChangeText={text => setOldPw(text)}
                  secureTextEntry={true}
                />
              </View>
              <View style={styles.loginTextBox}>
                <Text style={styles.loginTextVector}>
                  <IconSimpleLineIcons
                    name="lock"
                    size={windowWidth * 0.03}
                    color={'#645454'}
                  />
                </Text>
                <TextInput
                  placeholder="새 비밀번호"
                  placeholderTextColor={'black'}
                  style={styles.loginInputText}
                  onChangeText={text => setNewPw(text)}
                  secureTextEntry={true}
                />
              </View>
              <View style={styles.loginTextBox}>
                <Text style={styles.loginTextVector}>
                  <IconSimpleLineIcons
                    name="lock"
                    size={windowWidth * 0.03}
                    color={'#645454'}
                  />
                </Text>
                <TextInput
                  placeholder="새 비밀번호 확인"
                  placeholderTextColor={'black'}
                  style={styles.loginInputText}
                  onChangeText={text => setNewPwConfirm(text)}
                  secureTextEntry={true}
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
    fontSize: windowWidth * 0.035,
    color: 'black',
    fontWeight: '600',
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
    width: windowWidth * 0.53,
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
    marginLeft: windowHeight * 0.1,
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
  infoText: {
    marginLeft: windowHeight * 0.1,
  },
});
export default PasswordChangeMyComponents;
