import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Dimensions,
  Image,
  Modal,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {signUp} from '../../../../apis/user/userApi';
import {Calendar} from 'react-native-calendars';
import IconFontAwesome6 from 'react-native-vector-icons/FontAwesome6';

type KidsComponentsProps = {
  email: string;
  password: string;
  navigation: any; // navigation의 타입은 화면 이동과 관련된 내용에 따라 다를 수 있으므로 "any"로 지정
};

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const KidsComponents: React.FC<KidsComponentsProps> = ({
  email,
  password,
  navigation,
}) => {
  const [kidName, setKidName] = useState('');
  const [kidBirthday, setKidBirthday] = useState('');
  const [isCalendarVisible, setCalendarVisible] = useState(false);

  const handleDayPress = day => {
    setKidBirthday(day.dateString); // 선택한 날짜를 상태 변수에 저장
    setCalendarVisible(false); // 모달 닫기
  };

  const signUpFunc = () => {
    const userData = {
      Email: email,
      password: password,
      kidName: kidName,
      kidBirthday: kidBirthday,
    };
    console.log(userData);
    signUp(userData);
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
              source={require('../../../../assets/images/kids.png')}
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
                onChangeText={text => setKidName(text)}
              />
            </View>
          </View>
          {/* 비밀번호 */}
          <View style={styles.loginArea}>
            <View style={styles.loginTextBox1}>
              <Text style={styles.loginTextVector}>생년월일</Text>
              <TextInput
                placeholder="생년월일"
                placeholderTextColor={'black'}
                style={styles.loginInputText1}
                value={kidBirthday}
                editable={false}
              />
            </View>
            <View style={styles.ConfirmButton}>
              <TouchableOpacity onPress={() => setCalendarVisible(true)}>
                <Text style={styles.ConfirmButtonText}>날짜 선택</Text>
              </TouchableOpacity>
            </View>
          </View>
          <Modal
            animationType="slide"
            transparent={false}
            visible={isCalendarVisible}
            onRequestClose={() => setCalendarVisible(false)}>
            <View style={styles.modal}>
              {/* 캘린더 */}
              <Calendar
                onDayPress={handleDayPress} // 날짜를 선택하면 실행될 함수
              />
            </View>
          </Modal>
          <View style={styles.loginButtonBox}>
            <TouchableOpacity
              onPress={() => {
                signUpFunc();
                navigation.goBack();
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
  loginInputText: {
    fontSize: windowWidth * 0.017,
    width: windowWidth * 0.38,
  },
  loginInputText1: {
    fontSize: windowWidth * 0.017,
    width: windowWidth * 0.25,
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
  modal: {
    height: windowHeight * 0.2,
  },
});
export default KidsComponents;
