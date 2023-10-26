import React, {useState} from 'react';
import {StyleSheet, View, Text, TextInput, Dimensions} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import IconFontisto from 'react-native-vector-icons/Fontisto';
import IconFontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import IconIonicons from 'react-native-vector-icons/Ionicons';

type EmailComponentsProps = {
  setEmail: (email: string) => void;
  navigation: any; // navigation의 타입은 화면 이동과 관련된 내용에 따라 다를 수 있으므로 "any"로 지정
  selectComponent: (componentName: string) => void;
};

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const EmailComponents: React.FC<EmailComponentsProps> = ({
  setEmail,
  navigation,
  selectComponent,
}) => {
  const [code, setCode] = useState('');
  const handleComponentChange = (value: string) => {
    const newComponentName = value;
    selectComponent(newComponentName);
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
            <Text style={styles.infoText}>아이디로 사용할</Text>
            <Text style={styles.infoText}>이메일을 인증해 주세요</Text>
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
                placeholder="이메일"
                placeholderTextColor={'black'}
                style={styles.loginInputText1}
                onChangeText={text => setEmail(text)}
              />
            </View>
            <View style={styles.ConfirmButton}>
              <TouchableOpacity>
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
              placeholder="인증코드"
              placeholderTextColor={'black'}
              style={styles.loginInputText2}
              onChangeText={text => setCode(text)}
            />
          </View>
          <View style={styles.loginButtonBox}>
            <TouchableOpacity
              onPress={() => {
                handleComponentChange('password');
              }}>
              <Text style={styles.loginText}>확인</Text>
            </TouchableOpacity>
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
    fontSize: windowWidth * 0.016,
    borderRadius: 1000,
    width: windowWidth * 0.12,
    height: windowHeight * 0.07,
    alignItems: 'center',
    textAlign: 'center',
    textAlignVertical: 'center',
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
  },
  loginInputText2: {
    fontSize: windowWidth * 0.017,
    width: windowWidth * 0.4,
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
  },
  subLoginView: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
  subLoginText: {
    color: '#645454',
    marginHorizontal: windowWidth * 0.005,
    fontSize: windowWidth * 0.02,
  },
  bottomContainer: {
    flex: 0.2,
  },
  infoText: {
    fontSize: windowWidth * 0.03,
    fontWeight: '600',
    color: '#000000',
  },
  infoView: {
    marginBottom: windowWidth * 0.01,
  },
});
export default EmailComponents;
