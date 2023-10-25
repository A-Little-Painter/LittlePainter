import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import IconFontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import MyAnimalComponents from './MyAnimalComponent';
import MyFairyComponents from './MyFairyComponent';
import MyUploadComponents from './MyUploadComponent';

type MyPictureComponentsProps = {
  navigation: any; // navigation의 타입은 화면 이동과 관련된 내용에 따라 다를 수 있으므로 "any"로 지정
};

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const MyPictureComponents: React.FC<MyPictureComponentsProps> = ({
  navigation,
}) => {
  const [selectedMenu, setSelectedMenu] = useState('animal');
  const [selectedSubComponent, setSelectedSubComponent] = useState('fairy');

  const handleComponentChange = (value: string) => {
    const newComponentName = value;
    setSelectedSubComponent(newComponentName);
    setSelectedMenu(newComponentName);
  };

  const renderSelectedComponent = () => {
    if (selectedSubComponent === 'animal') {
      return (
        <MyAnimalComponents
          selectedSubComponent={(componentName: string) =>
            setSelectedSubComponent(componentName)
          }
        />
      );
    } else if (selectedSubComponent === 'fairy') {
      return (
        <MyFairyComponents
          selectedSubComponent={(componentName: string) =>
            setSelectedSubComponent(componentName)
          }
        />
      );
    } else if (selectedSubComponent === 'upload') {
      return (
        <MyUploadComponents
          selectedSubComponent={(componentName: string) =>
            setSelectedSubComponent(componentName)
          }
        />
      );
    }
  };

  return (
    <View style={styles.rightContainer}>
      <View style={styles.subrightContainer}>
        {/* 상단 */}
        <View style={styles.topContainer}>
          <View>
            <Text style={styles.topProfileText}>내그림</Text>
          </View>
          <TouchableOpacity
            style={styles.xCircle}
            onPress={() => {
              navigation.navigate('LoginScreen');
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
            <View style={styles.menus}>
              <TouchableOpacity
                style={[
                  styles.menu,
                  selectedMenu === 'animal' && styles.menuSeleted,
                ]}
                onPress={() => {
                  handleComponentChange('animal');
                }}>
                <Text style={styles.menuText}>동물</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.menu,
                  selectedMenu === 'fairy' && styles.menuSeleted,
                ]}
                onPress={() => {
                  handleComponentChange('fairy');
                }}>
                <Text style={styles.menuText}>동화</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.menu,
                  selectedMenu === 'upload' && styles.menuSeleted,
                ]}
                onPress={() => {
                  handleComponentChange('upload');
                }}>
                <Text style={styles.menuText}>업로드</Text>
              </TouchableOpacity>
            </View>
          </View>
          {renderSelectedComponent()}
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
    marginBottom: windowHeight * 0.05,
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
  menus: {
    flexDirection: 'row',
  },
  menu: {
    borderRadius: windowWidth * 0.003,
    marginHorizontal: windowWidth * 0.01,
    width: windowWidth * 0.065,
    height: windowWidth * 0.033,
  },
  menuSeleted: {
    backgroundColor: '#DBE7B5',
  },
  menuText: {
    color: '#000000',
    fontSize: windowWidth * 0.02,
    textAlign: 'center',
    textAlignVertical: 'center',
  },

  bottomContainer: {
    flex: 0.1,
  },
  contextArea: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: windowHeight * 0.1,
  },
});
export default MyPictureComponents;
