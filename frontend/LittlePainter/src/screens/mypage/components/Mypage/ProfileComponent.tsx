import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import IconFontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import {useAppDispatch} from '../../../../redux/hooks';
import {addKids, updateKids} from '../../../../redux/slices/user/user';
type ProfileComponentsProps = {
  setName: (name: string) => void;
  setBirth: (birth: string) => void;
  profileImage: number;
  setProfileImage: (profileImage: string) => void;
  navigation: any; // navigation의 타입은 화면 이동과 관련된 내용에 따라 다를 수 있으므로 "any"로 지정
  selectComponent: (componentName: string) => void;
};

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

const ProfileComponents: React.FC<ProfileComponentsProps> = ({
  setName,
  setBirth,
  profileImage,
  setProfileImage,
  navigation,
  selectComponent,
}) => {
  const handleComponentChange = (value: string) => {
    const newComponentName = value;
    selectComponent(newComponentName);
  };
  const dispatch = useAppDispatch();
  return (
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
                    <TouchableOpacity
                      onPress={() => {
                        handleComponentChange('kids');
                        dispatch(updateKids());
                      }}>
                      <Image
                        style={styles.childCardImage}
                        resizeMode="contain"
                        source={require('../../../../assets/logo/littlePainterRabbit.png')}
                      />
                      <View style={styles.childTextView}>
                        <Text style={styles.childNameText}>
                          {item.childName}
                        </Text>
                        <Text style={styles.birthdayText}>{item.birthday}</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                );
              }}
              keyExtractor={item => item.id}
              ListFooterComponent={
                <TouchableOpacity
                  style={styles.childPlusView}
                  onPress={() => {
                    handleComponentChange('kids');
                    dispatch(addKids());
                  }}>
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
            <TouchableOpacity
              style={styles.passwordChangeView}
              onPress={() => {
                handleComponentChange('password');
              }}>
              <Text style={styles.passwordChangeText}>변경</Text>
            </TouchableOpacity>
          </View>
          {/* 회원탈퇴 */}
          <TouchableOpacity
            style={styles.unregisterView}
            onPress={() => {
              handleComponentChange('withdraw');
            }}>
            <Text style={styles.unregisterText}>회원탈퇴 &gt;</Text>
          </TouchableOpacity>
        </View>
        {/* 하단 */}
        <View style={styles.bottomContainer} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
export default ProfileComponents;
