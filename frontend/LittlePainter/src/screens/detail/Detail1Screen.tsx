import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import type {StackScreenProps} from '@react-navigation/stack';
import {RootStackParams} from '../../navigations/AppNavigator';

type Detail1ScreenProps = StackScreenProps<RootStackParams, 'Detail1Screen'>;
// interface Props1 {
//   name: string;
//   onPress: (name: string) => void;
// }

export default function Detail1Screen({route, navigation}: Detail1ScreenProps) {
  const name = route.params.name;
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('Detail2Screen', {name: name});
      }}>
      <View style={styles.container}>
        <Text style={styles.screenTitle}>{name}디테일스크린1</Text>
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
