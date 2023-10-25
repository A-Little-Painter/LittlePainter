import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  Image,
  Dimensions,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {RootStackParams} from '../../navigations/AppNavigator';
import type {StackScreenProps} from '@react-navigation/stack';
import IconFontisto from 'react-native-vector-icons/Fontisto';
import IconSimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import IconFontAwesome6 from 'react-native-vector-icons/FontAwesome6';

// temp
import {openImagePicker} from '../detail/ImagePicker';
// temp

type LoginScreenProps = StackScreenProps<RootStackParams, 'LoginScreen'>;
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function LoginScreen({navigation}: LoginScreenProps) {
  const [imageSource, setImageSource] = useState<{uri: string} | null>(null);

  // 이미지 픽커 실사용 예시
  const imagetemp = () => {
    openImagePicker(setImageSource);
    console.log('4');
    console.log(imageSource);
  };

  return (
    <View style={styles.mainContainer}>
      <ImageBackground
        source={require('../../assets/bgImage/mainBg.png')}
        resizeMode="cover"
        style={styles.backgroundImage}>
        {/* 전체 */}
        <View style={styles.subContainer}>
          {/* 좌측 */}
          <View style={styles.leftContainer}>
            <View style={styles.leftImage}>
              <Image
                style={styles.logoRabbitImage}
                resizeMode="contain"
                source={require('../../assets/logo/littlePainterRabbit.png')}
              />
            </View>
          </View>
          {/* 우측 */}
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
                {/* 나중에 여기 터치 뺴야함(테스트를 위해 넣은 부분) */}
                <TouchableOpacity
                  onPress={() => {
                    imagetemp();
                  }}>
                  <Image
                    resizeMode="contain"
                    style={styles.textLogoImage}
                    source={require('../../assets/logo/littlePainterTextLogo.png')}
                  />
                </TouchableOpacity>
                {/* 이메일 */}
                <View style={styles.loginTextBox}>
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
                    style={styles.loginInputText}
                  />
                </View>
                {/* 비밀번호 */}
                <View style={styles.loginTextBox}>
                  <Text style={styles.loginTextVector}>
                    <IconSimpleLineIcons
                      name="lock"
                      size={windowWidth * 0.03}
                      color={'#645454'}
                    />
                  </Text>
                  <TextInput
                    placeholder="비밀번호"
                    placeholderTextColor={'black'}
                    style={styles.loginInputText}
                    secureTextEntry={true}
                  />
                </View>
                <TouchableOpacity
                  style={styles.loginButtonBox}
                  onPress={() => {
                    navigation.navigate('MypageProfileScreen');
                  }}>
                  <Text style={styles.loginText}>로그인</Text>
                </TouchableOpacity>
                <View style={styles.subLoginView}>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('FindPasswordScreen');
                    }}>
                    <Text style={styles.subLoginText}>비밀번호 찾기</Text>
                  </TouchableOpacity>
                  <Text style={styles.subLoginText}>|</Text>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('SignupScreen');
                    }}>
                    <Text style={styles.subLoginText}>회원가입</Text>
                  </TouchableOpacity>
                </View>
              </View>
              {/* 하단 */}
              <View style={styles.bottomContainer} />
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  subContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  leftContainer: {
    flex: 0.34,
    alignSelf: 'center',
  },
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
  },
  xCircle: {
    alignSelf: 'flex-end',
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
  textLogoImage: {
    width: windowWidth * 0.25,
    height: windowHeight * 0.1,
    marginVertical: windowWidth * 0.01,
  },
  loginTextBox: {
    flexDirection: 'row',
    borderWidth: 0,
    borderColor: 'black',
    backgroundColor: '#F8F8F8',
    width: windowWidth * 0.45,
    height: windowWidth * 0.45 * 0.12,
    marginVertical: windowWidth * 0.005,
    borderRadius: 5,
  },
  loginInputText: {
    fontSize: windowWidth * 0.017,
  },
  loginTextVector: {
    alignSelf: 'center',
    paddingHorizontal: windowWidth * 0.01,
  },
  loginButtonBox: {
    borderWidth: 0,
    borderColor: 'black',
    backgroundColor: '#DFECC2',
    width: windowWidth * 0.45,
    height: windowWidth * 0.45 * 0.12,
    justifyContent: 'center',
    marginVertical: windowWidth * 0.01,
    borderRadius: 5,
  },
  loginText: {
    textAlign: 'center',
    fontSize: windowWidth * 0.025,
    fontWeight: '600',
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
});
