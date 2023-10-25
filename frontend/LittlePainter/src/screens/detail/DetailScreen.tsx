import React from 'react';
import {Text, View, Button} from 'react-native';
import type {StackScreenProps} from '@react-navigation/stack';
import {RootStackParams} from '../../navigations/AppNavigator';

type DetailScreenProps = StackScreenProps<RootStackParams, 'DetailScreen'>;

export default function DetailScreen({navigation}: DetailScreenProps) {
  const name = '왕';
  return (
    <View>
      <Text>DetailScreen이지롱</Text>
      <Button
        title="넘어가기"
        onPress={() => {
          navigation.navigate('MainScreen');
        }}
      />
      <Button
        title="디테일1으로 넘어가기"
        onPress={() => {
          navigation.navigate('Detail1Screen', {name});
        }}
      />
    </View>
  );
}
