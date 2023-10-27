import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Alert,
  Image,
  Dimensions,
  ImageBackground,
} from 'react-native';
import {RootStackParams} from '../../navigations/AppNavigator';
import type {StackScreenProps} from '@react-navigation/stack';

import ComfirmComponent from './components/Login/ConfirmComponent';
import PasswordChangeComponent from './components/Login/PasswordChangeComponent';

type FindPasswordScreenProps = StackScreenProps<
  RootStackParams,
  'FindPasswordScreen'
>;

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function FindPasswordScreen({
  navigation,
}: FindPasswordScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedComponent, setSelectedComponent] = useState('email');
  const renderSelectedComponent = () => {
    if (selectedComponent === 'email') {
      return (
        <ComfirmComponent
          setEmail={setEmail}
          navigation={navigation}
          selectComponent={(componentName: string) =>
            setSelectedComponent(componentName)
          }
        />
      );
    } else if (selectedComponent === 'password') {
      return (
        <PasswordChangeComponent
          password={password}
          setPassword={setPassword}
          navigation={navigation}
          selectComponent={(componentName: string) =>
            setSelectedComponent(componentName)
          }
        />
      );
    }
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
          {renderSelectedComponent()}
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
