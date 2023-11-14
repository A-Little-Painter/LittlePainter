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
import {
  findCodeSend,
  emailDuplication,
  authCode,
} from '../../../../apis/user/userApi';
import IconFontisto from 'react-native-vector-icons/Fontisto';
import IconFontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import IconIonicons from 'react-native-vector-icons/Ionicons';

type ComfirmComponentProps = {
  email: string;
  setEmail: (email: string) => void;
  navigation: any; // navigation의 타입은 화면 이동과 관련된 내용에 따라 다를 수 있으므로 "any"로 지정
  selectComponent: (componentName: string) => void;
};

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const ComfirmComponent: React.FC<ComfirmComponentProps> = ({
  email,
  setEmail,
  navigation,
  selectComponent,
}) => {
  const [code, setCode] = useState('');
  const [duplication, setDuplication] = useState(true);
  const [codeConfirm, setCodeConfirm] = useState(false);
  const emailInputRef = useRef(null);
  const codeInputRef = useRef(null);

  const moveToCodeInput = () => {
    codeInputRef.current.focus();
  };

  const handleComponentChange = (value: string) => {
    const newComponentName = value;
    selectComponent(newComponentName);
  };
  const emailConfirm = (text: string) => {
    setEmail(text);
    if (text.includes('.')) {
      emailDuplication(text, setDuplication);
    }
  };
  const sendCode = (value: string) => {
    const cleanEmail = value.replace(/\s/g, '');
    const emailData = {email: cleanEmail};
    findCodeSend(emailData);
    moveToCodeInput();
  };
  const passCode = (text: string) => {
    setCode(text);
    const data = {
      email: email,
      code: text,
    };
    authCode(data, setCodeConfirm);
  };
  const goNext = () => {
    if (duplication === true && codeConfirm === true) {
      handleComponentChange('password');
    } else if (duplication === false || email === '') {
      Alert.alert('', '이메일을 다시 확인해 주세요');
    } else {
      Alert.alert('', '인증번호를 다시 확인해 주세요');
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
            <Text style={styles.infoText}>비밀번호를 찾을</Text>
            <Text style={styles.infoText}>계정 정보를 입력해 주세요</Text>
          </View>
          {/* 이메일 */}
          <View style={styles.loginArea}>
            <View style={styles.loginTextBox1}>
              <Text style={styles.loginTextVector}>
                <IconFontisto
                  name="email"
                  size={windowWidth * 0.03}
                  color={'#645454'}
                />
              </Text>
              <TextInput
                ref={emailInputRef}
                placeholder="이메일"
                placeholderTextColor={'black'}
                style={styles.loginInputText1}
                onChangeText={text => emailConfirm(text)}
                onSubmitEditing={() => sendCode(email)}
              />
            </View>
            <View style={styles.ConfirmButton}>
              <TouchableOpacity onPress={() => sendCode(email)}>
                <Text style={styles.ConfirmButtonText}>인증번호 전송</Text>
              </TouchableOpacity>
            </View>
          </View>
          {/* 비밀번호 */}
          <View style={styles.loginTextBox2}>
            <Text style={styles.loginTextVector}>
              <IconIonicons
                name="checkbox-outline"
                size={windowWidth * 0.03}
                color={'#645454'}
              />
            </Text>
            <TextInput
              ref={codeInputRef}
              placeholder="인증코드"
              placeholderTextColor={'black'}
              style={styles.loginInputText2}
              onChangeText={text => passCode(text)}
              onSubmitEditing={() => goNext()}
            />
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View>
              {duplication ? (
                <Text> </Text>
              ) : (
                <Text style={styles.alert}>등록되지않은 이메일입니다.</Text>
              )}
              {code.length >= 4 && !codeConfirm ? (
                <Text style={styles.alert}>인증코드를 다시 확인해 주세요.</Text>
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
  loginTextBox1: {
    flexDirection: 'row',
    borderWidth: 0,
    borderColor: 'black',
    backgroundColor: '#F8F8F8',
    width: windowWidth * 0.32,
    height: windowWidth * 0.45 * 0.12,
    marginVertical: windowWidth * 0.01,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
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
    backgroundColor: '#dfecc2',
    color: '#383535',
    fontSize: windowWidth * 0.014,
    borderRadius: 1000,
    width: windowWidth * 0.12,
    height: windowHeight * 0.07,
    alignItems: 'center',
    textAlign: 'center',
    textAlignVertical: 'center',
    fontFamily: 'TmoneyRoundWindExtraBold',
  },
  loginTextBox2: {
    flexDirection: 'row',
    borderWidth: 0,
    borderColor: 'black',
    backgroundColor: '#F8F8F8',
    width: windowWidth * 0.45,
    height: windowWidth * 0.45 * 0.12,
    marginVertical: windowWidth * 0.01,
    borderRadius: 5,
  },
  loginInputText1: {
    fontSize: windowWidth * 0.017,
    width: windowWidth * 0.25,
    fontFamily: 'TmoneyRoundWindExtraBold',
  },
  loginInputText2: {
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
    marginBottom: windowWidth * 0.01,
  },
  alert: {
    color: '#DF5050E0',
    paddingLeft: windowHeight * 0.01,
  },
});
export default ComfirmComponent;
