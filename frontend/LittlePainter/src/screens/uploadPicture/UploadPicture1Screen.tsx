import React from 'react';
import {Text, View, Button} from 'react-native';
import type {StackScreenProps} from '@react-navigation/stack';
import {RootStackParams} from '../../navigations/AppNavigator';

type UploadPicture1ScreenProps = StackScreenProps<
  RootStackParams,
  'UploadPicture1Screen'
>;

export default function UploadPicture1Screen({
  navigation,
}: UploadPicture1ScreenProps) {
  const name = '사진 업로드하기';
  return (
    <View>
      <Text>UploadPicture1Screen이지롱</Text>
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
