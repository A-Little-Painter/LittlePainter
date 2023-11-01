import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import MainScreen from '../screens/main/MainScreen';
import InitialScreen from '../screens/main/InitialScreen';
import LoginScreen from '../screens/mypage/LoginScreen';
import MypageProfileScreen from '../screens/mypage/MypageProfileScreen';

//동물 그리기
import SelectAnimalScreen from '../screens/drawAnimal/SelectAnimalScreen';
import DrawAnimalScreen from '../screens/drawAnimal/DrawAnimalScreen';
import ColoringAnimalScreen from '../screens/drawAnimal/ColoringAnimalScreen';
import CompleteDrawAnimalScreen from '../screens/drawAnimal/CompleteDrawAnimalScreen';

// 사진그리기
import SelectPictureScreen from '../screens/drawPicture/SelectPictureScreen';
import DrawPictureScreen from '../screens/drawPicture/DrawPictureScreen';
import ColoringPictureScreen from '../screens/drawPicture/ColoringPictureScreen';
import CompleteDrawPictureScreen from '../screens/drawPicture/CompleteDrawPictureScreen';
// 동화그리기
import SelectFairytaleScreen from '../screens/fairytale/SelectFairytaleScreen';
import ReadFairytaleScreen from '../screens/fairytale/Fairtytale1Screen.tsx/ReadFairytaleScreen';
import FairytaleDrawScreen from '../screens/fairytale/Fairtytale1Screen.tsx/FairytaleDrawScreen';
import FairytaleColoringScreen from '../screens/fairytale/Fairtytale1Screen.tsx/FairytaleColoringScreen';

import UploadPicture1Screen from '../screens/uploadPicture/UploadPicture1Screen';

import FindPasswordScreen from '../screens/mypage/FindPasswordScreen';
import SignupScreen from '../screens/mypage/SignupScreen';

// 모달
import SaveDrawnToLoginModal from '../screens/modals/SaveDrawnToLoginModal';

// 이후 삭제
import MainTmpScreen from '../screens/main/MainTmpScreen';
import Detail1Screen from '../screens/detail/Detail1Screen';
import DetailScreen from '../screens/detail/DetailScreen';
import NodetailScreen from '../screens/detail/NodetailScreen';
import Detail2Screen from '../screens/detail/Detail2Screen';
import DrawCaptureScreen from '../screens/drawAnimal/DrawCaptureScreen';

export type RootStackParams = {
  InitialScreen: undefined;
  MainScreen: undefined;
  LoginScreen: undefined;
  MypageProfileScreen: undefined;
  SelectAnimalScreen: undefined;
  DrawAnimalScreen: {
    animalId: number;
  };
  ColoringAnimalScreen: {
    // completeLineUri: string;
    completeLine: {path: string; color: string; strokeWidth: number}[];
  };
  CompleteDrawAnimalScreen: {
    completeDrawUri: string;
  };
  SelectPictureScreen: undefined;
  DrawPictureScreen: undefined;
  ColoringPictureScreen: {
    // completeLineUri: string;
    completeLine: {path: string; color: string; strokeWidth: number}[];
  };
  CompleteDrawPictureScreen: {
    completeDrawUri: string;
  };
  SelectFairytaleScreen: undefined;
  FairytaleDrawScreen: undefined;
  ReadFairytaleScreen: {title: string};
  FairytaleColoringScreen: {
    // completeLineUri: string;
    completeLine: {path: string; color: string; strokeWidth: number}[];
  };

  UploadPicture1Screen: undefined;
  SignupScreen: undefined;
  FindPasswordScreen: undefined;

  // 모달
  SaveDrawnToLoginModal: undefined;
  // 이하는 테스트용이었음
  MainTmpScreen: undefined;
  DetailScreen: undefined;
  NodetailScreen: undefined;
  DrawCaptureScreen: undefined;
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
      <RootStack.Screen name="DrawAnimalScreen" component={DrawAnimalScreen} />
      <RootStack.Screen
        name="ColoringAnimalScreen"
        component={ColoringAnimalScreen}
      />
      <RootStack.Screen
        name="CompleteDrawAnimalScreen"
        component={CompleteDrawAnimalScreen}
      />
      <RootStack.Screen
        name="SelectPictureScreen"
        component={SelectPictureScreen}
      />
      <RootStack.Screen
        name="DrawPictureScreen"
        component={DrawPictureScreen}
      />
      <RootStack.Screen
        name="ColoringPictureScreen"
        component={ColoringPictureScreen}
      />
      <RootStack.Screen
        name="CompleteDrawPictureScreen"
        component={CompleteDrawPictureScreen}
      />
      <RootStack.Screen
        name="SelectFairytaleScreen"
        component={SelectFairytaleScreen}
      />
      <RootStack.Screen
        name="ReadFairytaleScreen"
        component={ReadFairytaleScreen}
      />
      <RootStack.Screen
        name="FairytaleDrawScreen"
        component={FairytaleDrawScreen}
      />
      <RootStack.Screen
        name="FairytaleColoringScreen"
        component={FairytaleColoringScreen}
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
      {/* 모달 */}
      <RootStack.Screen
        name="SaveDrawnToLoginModal"
        component={SaveDrawnToLoginModal}
      />

      {/* 이하는 테스트용이었음 */}
      <RootStack.Screen name="MainTmpScreen" component={MainTmpScreen} />
      <RootStack.Screen name="DetailScreen" component={DetailScreen} />
      <RootStack.Screen name="Detail1Screen" component={Detail1Screen} />
      <RootStack.Screen name="Detail2Screen" component={Detail2Screen} />
      <RootStack.Screen name="NodetailScreen" component={NodetailScreen} />
      <RootStack.Screen
        name="DrawCaptureScreen"
        component={DrawCaptureScreen}
      />
    </RootStack.Navigator>
  );
}
