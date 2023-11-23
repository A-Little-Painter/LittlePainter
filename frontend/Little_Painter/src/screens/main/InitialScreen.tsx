import React, {useEffect} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {RootStackParams} from '../../navigations/AppNavigator';
import type {StackScreenProps} from '@react-navigation/stack';

type InitialScreenProps = StackScreenProps<RootStackParams, 'InitialScreen'>;

export default function InitialScreen({navigation}: InitialScreenProps) {
  useEffect(() => {
    const timeout = setTimeout(() => {
      navigation.reset({
        index: 0,
        routes: [
          {
            name: 'MainScreen',
            params: {},
          },
        ],
      });
    }, 2000);

    return () => clearTimeout(timeout);
  }, [navigation]);

  return (
    <View style={styles.mainContainer}>
      <View style={styles.backgroundImage}>
        {/* 상단 */}
        <View />
        {/* 중단 */}
        <View style={styles.middleContainer}>
          <View style={styles.textView}>
            <Text style={styles.textMessage}>
              해당 앱은 인터넷 연결이 필수입니다.
            </Text>
          </View>
        </View>
        {/* 하단 */}
        <View />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  middleContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },
  textView: {
    width: '100%',
    height: '100%',
    backgroundColor: 'black',
    justifyContent: 'center',
  },
  textMessage: {
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 24,
    color: 'white',
  },
});
