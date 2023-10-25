import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import IconFontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import IconSimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

type WithdrawalComponentsProps = {
  setPwConfirm: (pwConfirm: string) => void;
  navigation: any; // navigation의 타입은 화면 이동과 관련된 내용에 따라 다를 수 있으므로 "any"로 지정
  selectComponent: (componentName: string) => void;
};

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const WithdrawalComponents: React.FC<WithdrawalComponentsProps> = ({
  setPwConfirm,
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
          <View>
            <Text style={styles.topProfileText}>회원탈퇴</Text>
          </View>
          <TouchableOpacity
            style={styles.xCircle}
            onPress={() => {
              handleComponentChange('profile');
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
          <View style={styles.contextArea}>
            <View>
              <View style={styles.infoBox}>
                <Text style={styles.infoText}>회원탈퇴시</Text>
                <Text style={styles.infoText}>
                  1. 저장된 그림도 함께 삭제됩니다
                </Text>
                <Text style={styles.infoText}>
                  2. 업로드 된 사진은 자동으로 삭제되지 않습니다
                </Text>
              </View>
              <View style={styles.infoConfirm}>
                <Text>위의 사항을 모두 동의합니다</Text>
                <BouncyCheckbox
                  size={windowHeight * 0.03}
                  fillColor="#8C8C8C"
                  unfillColor="#FFFFFF"
                  style={{marginLeft: windowHeight * 0.01}}
                />
              </View>
              <View style={styles.loginTextBox}>
                <Text style={styles.loginTextVector}>
                  <IconSimpleLineIcons
                    name="lock"
                    size={windowWidth * 0.03}
                    color={'#645454'}
                  />
                </Text>
                <TextInput
                  placeholder="비밀번호 확인"
                  placeholderTextColor={'black'}
                  style={styles.loginInputText}
                  onChangeText={text => setPwConfirm(text)}
                  secureTextEntry={true}
                />
              </View>
            </View>
          </View>
          <View style={styles.confirmButtons}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('LoginScreen');
              }}>
              <Text style={styles.loginText}>회원탈퇴 &gt;</Text>
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
    fontSize: windowWidth * 0.035,
    color: 'black',
    fontWeight: '600',
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
    marginRight: windowWidth * 0.05,
  },
  bottomContainer: {
    flex: 0.1,
  },
  loginTextBox: {
    flexDirection: 'row',
    borderWidth: 0,
    borderColor: 'black',
    backgroundColor: '#F8F8F8',
    width: windowWidth * 0.53,
    height: windowWidth * 0.45 * 0.12,
    marginVertical: windowWidth * 0.01,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },
  loginTextVector: {
    alignSelf: 'center',
    paddingHorizontal: windowWidth * 0.01,
    fontSize: windowWidth * 0.013,
  },
  loginInputText: {
    fontSize: windowWidth * 0.017,
  },
  loginText: {
    textAlign: 'center',
    fontSize: windowWidth * 0.025,
    fontWeight: '300',
    color: '#CC3636',
  },
  confirmButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  contextArea: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: windowHeight * 0.1,
  },
  infoText: {
    fontSize: windowHeight * 0.03,
    color: '#000000',
  },
  infoBox: {
    backgroundColor: '#F9F9F9',
    borderColor: '#000000',
    borderWidth: windowWidth * 0.0005,
    borderRadius: windowWidth * 0.002,
    padding: windowWidth * 0.01,
  },
  infoConfirm: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: windowHeight * 0.01,
  },
});
export default WithdrawalComponents;
