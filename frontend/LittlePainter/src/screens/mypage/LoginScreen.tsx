import React from 'react';
import {
  StyleSheet,
  // Button,
  View,
  // Alert,
  Text,
  ImageBackground,
} from 'react-native';
import {RootStackParams} from '../../navigations/AppNavigator';
import type {StackScreenProps} from '@react-navigation/stack';

type LoginScreenProps = StackScreenProps<RootStackParams, 'LoginScreen'>;

export default function LoginScreen({navigation}: LoginScreenProps) {
  return (
    <View style={styles.mainContainer}>
      <ImageBackground
        source={require('../../assets/bgImage/mainBg.png')}
        resizeMode="cover"
        style={styles.backgroundImage}>
        {/* 전체 */}
        <View>
          {/* 좌측 */}
          <View>
            <Text>dddddddd</Text>
          </View>
          {/* 우측 */}
          <View>
            <Text>메롱</Text>
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
    alignSelf: 'center',
    width: '95%',
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
});
