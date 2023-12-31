import React, {useState, useRef} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Dimensions,
  Alert,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import IconFontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import IconSimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

type PasswordComponentsProps = {
  password: string;
  setPassword: (password: string) => void;
  navigation: any; // navigation의 타입은 화면 이동과 관련된 내용에 따라 다를 수 있으므로 "any"로 지정
  selectComponent: (componentName: string) => void;
};

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const PasswordComponents: React.FC<PasswordComponentsProps> = ({
  password,
  setPassword,
  navigation,
  selectComponent,
}) => {
  const passwordInputRef = useRef(null);
  const passwordConfirmInputRef = useRef(null);
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [checkPassword, setCheckPassword] = useState(false);
  const [showText1, setShowText1] = useState(true);

  const moveToPasswordConfirmInput = () => {
    passwordConfirmInputRef.current.focus();
  };

  const handleComponentChange = (value: string) => {
    const newComponentName = value;
    selectComponent(newComponentName);
  };
  const checkShow = (text: string) => {
    setPassword(text);
    if (text.length >= 4) {
      setShowText1(true);
    } else {
      setShowText1(false);
    }
  };
  const checkThis = (text: string) => {
    setPasswordConfirm(text);
    if (text === password) {
      setCheckPassword(true);
    } else {
      setCheckPassword(false);
    }
  };
  const goNext = () => {
    if (showText1 === true && checkPassword === true) {
      handleComponentChange('kids');
    } else if (showText1 === false) {
      Alert.alert('', '비밀번호의 길이는 4자 이상으로 해주세요');
    } else {
      Alert.alert('', '비밀번호를 다시 확인해주세요');
    }
  };
  return (
    <View style={styles.rightContainer}>
      <View style={styles.subrightContainer}>
        {/* 상단 */}
        <View style={styles.topContainer}>
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
          <View style={styles.infoView}>
            <Text style={styles.infoText}>비밀번호를 설정해 주세요</Text>
          </View>
          <View style={styles.loginArea}>
            <View style={styles.loginTextBox}>
              <Text style={styles.loginTextVector}>
                <IconSimpleLineIcons
                  name="lock"
                  size={windowWidth * 0.03}
                  color={'#645454'}
                />
              </Text>
              <TextInput
                ref={passwordInputRef}
                placeholder="비밀번호"
                placeholderTextColor={'black'}
                style={styles.loginInputText}
                onChangeText={text => checkShow(text)}
                secureTextEntry={true}
                onSubmitEditing={() => moveToPasswordConfirmInput()}
              />
            </View>
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
              ref={passwordConfirmInputRef}
              placeholder="비밀번호 확인"
              placeholderTextColor={'black'}
              style={styles.loginInputText}
              onChangeText={text => checkThis(text)}
              secureTextEntry={true}
              onSubmitEditing={() => goNext()}
            />
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View>
              {showText1 ? null : (
                <Text style={styles.alert}>
                  비밀번호는 4자리 이상이어야 합니다.
                </Text>
              )}
              {passwordConfirm.length >= 4 && !checkPassword ? (
                <Text style={styles.alert}>비밀번호가 다릅니다.</Text>
              ) : (
                <Text> </Text>
              )}
            </View>
            <View style={styles.loginButtonBox}>
              <TouchableOpacity
                onPress={() => {
                  goNext();
                }}>
                <Text style={styles.loginText}>확인</Text>
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
    flex: 0.66,
    flexDirection: 'column',
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  subrightContainer: {
    alignSelf: 'center',
    width: '90%',
    height: '90%',
    // backgroundColor: 'green',
  },
  leftImage: {
    alignSelf: 'center',
  },
  logoRabbitImage: {
    alignSelf: 'center',
    margin: windowWidth * 0.01,
    width: windowWidth * 0.2,
    height: windowHeight * 0.455,
  },
  middleContainer: {
    flex: 0.6,
    alignSelf: 'center',
  },
  topContainer: {
    flex: 0.2,
    // justifyContent: 'center',
  },
  xCircle: {
    alignSelf: 'flex-end',
    justifyContent: 'center',
    borderRadius: 500,
    backgroundColor: 'white',
    // borderWidth: 1,
    width: windowWidth * 0.05,
    height: windowWidth * 0.05,
    elevation: 3,
  },
  xText: {
    textAlign: 'center',
  },
  textLogoImage: {
    width: windowWidth * 0.25,
    height: windowHeight * 0.1,
    marginVertical: windowWidth * 0.01,
  },
  loginArea: {
    flexDirection: 'row',
  },
  loginTextBox: {
    flexDirection: 'row',
    borderWidth: 0,
    borderColor: 'black',
    backgroundColor: '#F8F8F8',
    width: windowWidth * 0.45,
    height: windowWidth * 0.45 * 0.12,
    marginVertical: windowWidth * 0.01,
    borderRadius: 5,
  },
  loginInputText: {
    fontSize: windowWidth * 0.017,
    width: windowWidth * 0.4,
    fontFamily: 'TmoneyRoundWindExtraBold',
  },
  loginTextVector: {
    alignSelf: 'center',
    paddingHorizontal: windowWidth * 0.01,
  },
  loginButtonBox: {
    borderWidth: 0,
    borderColor: 'black',
    backgroundColor: '#525252',
    width: windowWidth * 0.15,
    height: windowWidth * 0.45 * 0.12,
    justifyContent: 'center',
    marginVertical: windowWidth * 0.01,
    borderRadius: 5,
    alignSelf: 'flex-end',
  },
  loginText: {
    textAlign: 'center',
    fontSize: windowWidth * 0.025,
    fontWeight: '600',
    color: '#FFFFFF',
    fontFamily: 'TmoneyRoundWindExtraBold',
  },
  bottomContainer: {
    flex: 0.2,
  },
  infoText: {
    fontSize: windowWidth * 0.03,
    fontWeight: '600',
    color: '#000000',
    fontFamily: 'TmoneyRoundWindExtraBold',
  },
  infoView: {
    marginVertical: windowWidth * 0.025,
  },
  alert: {
    color: '#DF5050E0',
    paddingLeft: windowHeight * 0.01,
  },
});
export default PasswordComponents;
