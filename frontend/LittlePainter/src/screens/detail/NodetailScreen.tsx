import React from 'react';
import {Text, View, Button} from 'react-native';
import type {StackScreenProps} from '@react-navigation/stack';
import {RootStackParams} from '../../navigations/AppNavigator';

type NodetailScreenProps = StackScreenProps<RootStackParams, 'NodetailScreen'>;

const NodetailScreen = ({navigation}: NodetailScreenProps) => {
  return (
    <View>
      <Text>DetailScreen이 아니지롱</Text>
      <Button
        title="넘어가기"
        onPress={() => {
          navigation.navigate('MainScreen');
        }}
      />
    </View>
  );
};
export default NodetailScreen;
