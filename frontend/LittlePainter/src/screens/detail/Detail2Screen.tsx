import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import type {StackScreenProps} from '@react-navigation/stack';
import {RootStackParams} from '../../navigations/AppNavigator';

type Detail2ScreenProps = StackScreenProps<RootStackParams, 'Detail2Screen'>;
// interface Props1 {
//   name: string;
//   onPress: (name: string) => void;
// }

export default function Detail2Screen({route, navigation}: Detail2ScreenProps) {
  const name = route.params.name;
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('MainScreen');
      }}>
      <View style={styles.container}>
        <Text style={styles.screenTitle}>{name}디테일스크린2</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    marginTop: 24,
  },
  screenTitle: {
    fontSize: 24,
    marginTop: 8,
    fontWeight: 'bold',
  },
});
