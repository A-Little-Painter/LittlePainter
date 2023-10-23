import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  Image,
  Dimensions,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {RootStackParams} from '../../navigations/AppNavigator';
import type {StackScreenProps} from '@react-navigation/stack';
import IconFontAwesome6 from 'react-native-vector-icons/FontAwesome6';

type MypageProfileScreenProps = StackScreenProps<
  RootStackParams,
  'MypageProfileScreen'
>;
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const childs = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    childName: '첫째',
    birthday: '2015-02-12',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    childName: '둘째',
    birthday: '2017-09-25',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    childName: '셋째',
    birthday: '2019-05-03',
  },
];

export default function MypageProfileScreen({
  navigation,
}: MypageProfileScreenProps) {
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
          <View style={styles.rightContainer}>
            <View style={styles.subrightContainer}>
              {/* 상단 */}
              <View style={styles.topContainer}>
                <View>
                  <Text style={styles.topProfileText}>
                    <Text style={styles.nicknameText}>뽀송 </Text>님의 프로필
                  </Text>
                </View>
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
                {/* 아이 정보 */}
                <View style={styles.childInformationView}>
                  <Text style={styles.childInformationText}>아이정보</Text>
                </View>
                <View style={styles.childCardContainer}>
                  <FlatList
                    data={childs}
                    horizontal={true}
                    renderItem={({item}) => {
                      return (
                        <View style={styles.childCardView}>
                          <Image
                            style={styles.childCardImage}
                            resizeMode="contain"
                            source={require('../../assets/logo/littlePainterRabbit.png')}
                          />
                          <View style={styles.childTextView}>
                            <Text style={styles.childNameText}>
                              {item.childName}
                            </Text>
                            <Text style={styles.birthdayText}>
                              {item.birthday}
                            </Text>
                          </View>
                        </View>
                      );
                    }}
                    keyExtractor={item => item.id}
                    ListFooterComponent={
                      <TouchableOpacity style={styles.childPlusView}>
                        <View>
                          <Text style={styles.childPlusText}>+</Text>
                        </View>
                      </TouchableOpacity>
                    }
                  />
                </View>
                {/* 비밀번호 */}
                <View style={styles.passwordView}>
                  <Text style={styles.passwordText}>비밀번호</Text>
                  <TouchableOpacity style={styles.passwordChangeView}>
                    <Text style={styles.passwordChangeText}>변경</Text>
                  </TouchableOpacity>
                </View>
                {/* 회원탈퇴 */}
                <TouchableOpacity style={styles.unregisterView}>
                  <Text style={styles.unregisterText}>회원탈퇴 &gt;</Text>
                </TouchableOpacity>
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
    fontSize: windowWidth * 0.025,
    color: 'black',
  },
  nicknameText: {
    fontSize: windowWidth * 0.033,
    fontWeight: 'bold',
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
    // alignSelf: 'center',
  },
  childInformationView: {
    marginVertical: windowHeight * 0.02,
  },
  childInformationText: {
    color: 'black',
    fontWeight: '700',
    fontSize: windowWidth * 0.02,
  },
  childCardContainer: {
    width: '95%',
    flexDirection: 'row',
    alignSelf: 'center',
  },
  childCardView: {
    backgroundColor: '#9AC5F4',
    marginHorizontal: windowWidth * 0.01,
    borderRadius: windowWidth * 0.137 * 0.1,
    borderColor: 'black',
    borderWidth: 1,
    width: windowWidth * 0.137,
    height: windowWidth * 0.137 * 1.24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  childCardImage: {
    height: windowWidth * 0.137 * 1.24 * 0.5,
  },
  childPlusView: {
    width: windowWidth * 0.137,
    height: windowWidth * 0.137 * 1.24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  childPlusText: {
    fontSize: windowWidth * 0.08,
    color: '#D9D9D9',
  },
  childTextView: {
    height: '30%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  childNameText: {
    fontWeight: 'bold',
    fontSize: windowWidth * 0.018,
    color: 'black',
  },
  birthdayText: {
    color: 'black',
    fontSize: windowWidth * 0.015,
  },
  passwordView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: windowHeight * 0.02,
  },
  passwordText: {
    color: 'black',
    fontWeight: '700',
    fontSize: windowWidth * 0.02,
  },
  passwordChangeView: {
    borderWidth: 1,
    backgroundColor: '#DBE7B5',
    width: windowWidth * 0.05,
    height: windowWidth * 0.05 * 0.6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  passwordChangeText: {
    color: 'black',
    fontSize: windowWidth * 0.018,
  },
  unregisterView: {
    alignItems: 'flex-end',
  },
  unregisterText: {
    fontSize: windowWidth * 0.015,
  },
  bottomContainer: {
    flex: 0.1,
  },
});
