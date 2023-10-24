import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import MainScreen from '../screens/main/MainScreen';
import InitialScreen from '../screens/main/InitialScreen';
import LoginScreen from '../screens/mypage/LoginScreen';
import MypageProfileScreen from '../screens/mypage/MypageProfileScreen';

import SelectAnimalScreen from '../screens/drawAnimal/SelectAnimalScreen';
import SelectPictureScreen from '../screens/drawPicture/SelectPictureScreen';
import SelectFairytaleScreen from '../screens/fairytale/SelectFairytaleScreen';
import UploadPicture1Screen from '../screens/uploadPicture/UploadPicture1Screen';

import FindPasswordScreen from '../screens/mypage/FindPasswordScreen';
import SignupScreen from '../screens/mypage/SignupScreen';

import MainTmpScreen from '../screens/main/MainTmpScreen';
import Detail1Screen from '../screens/detail/Detail1Screen';
import DetailScreen from '../screens/detail/DetailScreen';
import NodetailScreen from '../screens/detail/NodetailScreen';
import Detail2Screen from '../screens/detail/Detail2Screen';

export type RootStackParams = {
  InitialScreen: undefined;
  MainScreen: undefined;
  LoginScreen: undefined;
  MypageProfileScreen: undefined;
  SelectAnimalScreen: undefined;
  SelectPictureScreen: undefined;
  SelectFairytaleScreen: undefined;
  UploadPicture1Screen: undefined;
  SignupScreen: undefined;
  FindPasswordScreen: undefined;

  // 이하는 테스트용이었음
  MainTmpScreen: undefined;
  DetailScreen: undefined;
  NodetailScreen: undefined;
  Detail1Screen: {
    name: string;
  };
  Detail2Screen: {
    name: string;
  };
};
const RootStack = createStackNavigator<RootStackParams>();

export default function AppNavigator() {
  return (
    <RootStack.Navigator
      // initialRouteName="MainScreen"
      initialRouteName="InitialScreen"
      screenOptions={{headerShown: false}}>
      <RootStack.Screen name="MainScreen" component={MainScreen} />
      <RootStack.Screen name="InitialScreen" component={InitialScreen} />
      <RootStack.Screen name="LoginScreen" component={LoginScreen} />
      <RootStack.Screen
        name="MypageProfileScreen"
        component={MypageProfileScreen}
      />
      <RootStack.Screen
        name="SelectAnimalScreen"
        component={SelectAnimalScreen}
      />
      <RootStack.Screen
        name="SelectPictureScreen"
        component={SelectPictureScreen}
      />
      <RootStack.Screen
        name="SelectFairytaleScreen"
        component={SelectFairytaleScreen}
      />
      <RootStack.Screen
        name="UploadPicture1Screen"
        component={UploadPicture1Screen}
      />
      <RootStack.Screen name="SignupScreen" component={SignupScreen} />
      <RootStack.Screen
        name="FindPasswordScreen"
        component={FindPasswordScreen}
      />

      {/* 이하는 테스트용이었음 */}
      <RootStack.Screen name="MainTmpScreen" component={MainTmpScreen} />
      <RootStack.Screen name="DetailScreen" component={DetailScreen} />
      <RootStack.Screen name="Detail1Screen" component={Detail1Screen} />
      <RootStack.Screen name="Detail2Screen" component={Detail2Screen} />
      <RootStack.Screen name="NodetailScreen" component={NodetailScreen} />
    </RootStack.Navigator>
  );
}
