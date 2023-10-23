import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Dimensions,
  Image,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import IconFontAwesome6 from 'react-native-vector-icons/FontAwesome6';

type KidsComponentsProps = {
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  navigation: any; // navigation의 타입은 화면 이동과 관련된 내용에 따라 다를 수 있으므로 "any"로 지정
  selectComponent: (componentName: string) => void;
};

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const KidsComponents: React.FC<KidsComponentsProps> = ({
  setEmail,
  setPassword,
  navigation,
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
          <View>
            <Image
              style={styles.kids}
              source={require('../../../assets/images/kids.png')}
              resizeMode="contain"
            />
          </View>
          <View style={styles.infoView}>
            <Text style={styles.infoText}>꼬마화가를 이용할</Text>
            <Text style={styles.infoText}>아이의 정보를 알려 주세요</Text>
          </View>
          {/* 이메일 */}
          <View style={styles.loginArea}>
            <View style={styles.loginTextBox}>
              <Text style={styles.loginTextVector}>아이애칭</Text>
              <TextInput
                placeholder="아이 애칭"
                placeholderTextColor={'black'}
                style={styles.loginInputText}
                onChangeText={text => setEmail(text)}
              />
            </View>
          </View>
          {/* 비밀번호 */}
          <View style={styles.loginTextBox}>
            <Text style={styles.loginTextVector}>생년월일</Text>
            <TextInput
              placeholder="생년월일"
              placeholderTextColor={'black'}
              style={styles.loginInputText}
              onChangeText={text => setPassword(text)}
            />
          </View>
          <View style={styles.loginButtonBox}>
            <TouchableOpacity
              onPress={() => {
                handleComponentChange('email');
              }}>
              <Text style={styles.loginText}>회원가입</Text>
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
    flex: 0.06,
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
    borderRadius: 5,
    marginBottom: windowHeight * 0.01,
  },
  loginInputText: {
    fontSize: windowWidth * 0.017,
  },
  loginTextVector: {
    alignSelf: 'center',
    paddingHorizontal: windowWidth * 0.01,
    fontSize: windowWidth * 0.013,
  },
  loginButtonBox: {
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
  loginText: {
    textAlign: 'center',
    fontSize: windowWidth * 0.025,
    fontWeight: '300',
    color: '#0D0C0C',
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
    marginBottom: windowHeight * 0.01,
  },
  kids: {
    height: windowHeight * 0.2,
    width: windowWidth * 0.2,
  },
});
export default KidsComponents;
