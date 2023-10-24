import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  Image,
  Dimensions,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {RootStackParams} from '../../navigations/AppNavigator';
import type {StackScreenProps} from '@react-navigation/stack';
import ProfileComponents from './components/Mypage/ProfileComponent';
import AddKidsComponents from './components/Mypage/AddKidsComponent';

type MypageProfileScreenProps = StackScreenProps<
  RootStackParams,
  'MypageProfileScreen'
>;
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function MypageProfileScreen({
  navigation,
}: MypageProfileScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedComponent, setSelectedComponent] = useState('profile');

  const handleLogin = () => {
    if (email && password) {
      Alert.alert(`로그인 시도: 이메일 - ${email}, 비밀번호 - ${password}`);
    } else {
      Alert.alert('이메일과 비밀번호를 입력하세요.');
    }
  };

  const renderSelectedComponent = () => {
    if (selectedComponent === 'profile') {
      return (
        <ProfileComponents
          navigation={navigation}
          selectComponent={(componentName: string) =>
            setSelectedComponent(componentName)
          }
        />
      );
      // } else if (selectedComponent === 'password') {
      //   return (
      //     <AddKidsComponents
      //       navigation={navigation}
      //       selectComponent={(componentName: string) =>
      //         setSelectedComponent(componentName)
      //       }
      //     />
      //   );
    } else if (selectedComponent === 'kids') {
      return (
        <AddKidsComponents
          setEmail={setEmail}
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
            <View style={styles.profileImageCircle}>
              <Image
                style={styles.logoRabbitImage}
                resizeMode="contain"
                source={require('../../assets/logo/littlePainterRabbit.png')}
              />
            </View>
            <View>
              {/* 이메일 */}
              <View style={styles.profileEmailView}>
                <Text style={styles.profileEmailText}>ttorkim@naver.com</Text>
              </View>
              {/* 태그 */}
              <View style={styles.tagView}>
                <TouchableOpacity>
                  <Text style={styles.tagTextSelect}>프로필</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text style={styles.tagText}>내그림</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text style={styles.tagText}>음량 설정</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text style={styles.tagText}>로그아웃</Text>
                </TouchableOpacity>
              </View>
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
    flex: 0.25,
    flexDirection: 'column',
    alignItems: 'center',
  },
  profileImageCircle: {
    width: windowWidth * 0.2,
    height: windowWidth * 0.2,
    borderRadius: windowWidth * 0.2 * 0.5,
    backgroundColor: '#FFF4E5',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: windowWidth * 0.02,
  },
  logoRabbitImage: {
    height: windowWidth * 0.15,
  },
  profileEmailView: {
    borderBottomWidth: 1,
    borderBottomColor: '#645454',
  },
  profileEmailText: {
    color: '#645454',
    fontSize: windowWidth * 0.018,
  },
  tagView: {
    paddingHorizontal: windowWidth * 0.02,
    // backgroundColor: 'green',
  },
  tagTextSelect: {
    color: 'black',
    fontSize: windowWidth * 0.025,
    fontWeight: 'bold',
    paddingTop: windowHeight * 0.015,
  },
  tagText: {
    color: '#484848',
    fontSize: windowWidth * 0.025,
    paddingTop: windowHeight * 0.015,
  },
});
