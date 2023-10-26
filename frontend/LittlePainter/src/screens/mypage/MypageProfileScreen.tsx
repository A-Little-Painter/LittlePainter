import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {RootStackParams} from '../../navigations/AppNavigator';
import type {StackScreenProps} from '@react-navigation/stack';
import {useAppDispatch} from '../../redux/hooks';
import {logOut} from '../../redux/slices/user/user';
import ProfileComponents from './components/Mypage/ProfileComponent';
import AddKidsComponents from './components/Mypage/AddKidsComponent';
import PasswordChangeMyComponents from './components/Mypage/PasswordChangeMyComponent';
import WithdrawalComponents from './components/Mypage/WithdrawalComponent';
import MyPictureComponents from './components/Mypage/MyPictureComponent';
import VolumeComponents from './components/Mypage/VolumeComponent';

type MypageProfileScreenProps = StackScreenProps<
  RootStackParams,
  'MypageProfileScreen'
>;
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function MypageProfileScreen({
  navigation,
}: MypageProfileScreenProps) {
  const [name, setName] = useState('');
  const [birth, setBirth] = useState('');
  const [oldPw, setOldPw] = useState('');
  const [newPw, setNewPw] = useState('');
  const [newPwConfirm, setNewPwConfirm] = useState('');
  const [selectedComponent, setSelectedComponent] = useState('profile');
  const [selectedMenu, setSelectedMenu] = useState('profile');
  const [profileImage, setProfileImage] = useState(
    require('../../assets/logo/rabbit.png'),
  );

  const renderSelectedComponent = () => {
    if (selectedComponent === 'profile') {
      return (
        <ProfileComponents
          setName={setName}
          setBirth={setBirth}
          profileImage={profileImage}
          setProfileImage={setProfileImage}
          navigation={navigation}
          selectComponent={(componentName: string) =>
            setSelectedComponent(componentName)
          }
        />
      );
    } else if (selectedComponent === 'password') {
      return (
        <PasswordChangeMyComponents
          setOldPw={setOldPw}
          setNewPw={setNewPw}
          setNewPwConfirm={setNewPwConfirm}
          navigation={navigation}
          selectComponent={(componentName: string) =>
            setSelectedComponent(componentName)
          }
        />
      );
    } else if (selectedComponent === 'withdraw') {
      return (
        <WithdrawalComponents
          setPwConfirm={setNewPwConfirm}
          navigation={navigation}
          selectComponent={(componentName: string) =>
            setSelectedComponent(componentName)
          }
        />
      );
    } else if (selectedComponent === 'kids') {
      return (
        <AddKidsComponents
          setName={setName}
          setBirth={setBirth}
          profileImage={profileImage}
          setProfileImage={setProfileImage}
          navigation={navigation}
          selectComponent={(componentName: string) =>
            setSelectedComponent(componentName)
          }
        />
      );
    } else if (selectedComponent === 'pic') {
      return <MyPictureComponents navigation={navigation} />;
    } else if (selectedComponent === 'vol') {
      return <VolumeComponents navigation={navigation} />;
    }
  };
  const handleComponentChangeA = (value: string) => {
    const newComponentName = value;
    setSelectedComponent(newComponentName);
    setSelectedMenu(value);
  };

  const dispatch = useAppDispatch();

  const logoutFonc = () => {
    dispatch(logOut());
    navigation.navigate('MainScreen');
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
                <TouchableOpacity
                  onPress={() => {
                    handleComponentChangeA('profile');
                  }}>
                  <Text
                    style={[
                      styles.tagText,
                      selectedMenu === 'profile' && styles.tagTextSelected,
                    ]}>
                    프로필
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    handleComponentChangeA('pic');
                  }}>
                  <Text
                    style={[
                      styles.tagText,
                      selectedMenu === 'pic' && styles.tagTextSelected,
                    ]}>
                    내그림
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    handleComponentChangeA('vol');
                  }}>
                  <Text
                    style={[
                      styles.tagText,
                      selectedMenu === 'vol' && styles.tagTextSelected,
                    ]}>
                    음성 설정
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    logoutFonc();
                  }}>
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
  tagText: {
    color: '#484848',
    fontSize: windowWidth * 0.025,
    paddingTop: windowHeight * 0.015,
  },
  tagTextSelected: {
    fontWeight: 'bold',
  },
});
