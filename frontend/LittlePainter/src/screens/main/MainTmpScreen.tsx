import React, {useState} from 'react';
import {
  Button,
  View,
  // Alert,
  Text,
} from 'react-native';
import {RootStackParams} from '../../navigations/AppNavigator';
import type {StackScreenProps} from '@react-navigation/stack';
import {useAppSelector, useAppDispatch} from '../../redux/hooks';
import {
  increment,
  decrement,
  incrementByAmount,
  decrementPracticeValue,
} from '../../redux/slices/user/user';

type MainTmpScreenProps = StackScreenProps<RootStackParams, 'MainTmpScreen'>;

export default function MainTmpScreen({navigation}: MainTmpScreenProps) {
  const [numbering, setNumbering] = useState(0);
  const testValue = useAppSelector(state => state.user.testValue);
  const practiceValue = useAppSelector(state => state.user.practiceValue);
  const dispatch = useAppDispatch();

  return (
    <View>
      <Button
        title="Detail 열기"
        onPress={() => {
          navigation.navigate('DetailScreen');
        }}
      />
      <Button
        title="Nodetail 열기"
        onPress={() => {
          navigation.push('NodetailScreen');
        }}
      />
      <Button
        title="테스트벨류"
        onPress={() => {
          dispatch(increment());
        }}
      />
      <Button
        title="인크리먼트"
        onPress={() => {
          dispatch(decrement());
        }}
      />
      <Button
        title="incrementByAmount"
        onPress={() => {
          dispatch(incrementByAmount(5));
        }}
      />
      <Button
        title="decrementPracticeValue"
        onPress={() => {
          dispatch(decrementPracticeValue(3));
        }}
      />
      <Button
        title="넘버링을 올리자"
        onPress={() => {
          setNumbering(numbering + 5);
        }}
      />
      <Text>테스트 벨류: {testValue}</Text>
      <Text>프랙티스 밸류: {practiceValue}</Text>
      <Text>useState시범: {numbering}</Text>
    </View>
  );
}
