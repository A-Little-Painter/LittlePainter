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

//친구 그리기
import SelectFriendScreen from '../screens/myfriend/SelectFriendScreen';
import FriendUploadPicture1Screen from '../screens/myfriend/FriendUploadPicture1Screen';
import FriendUploadPicture2Screen from '../screens/myfriend/FriendUploadPicture2Screen';
import DrawFriendScreen from '../screens/myfriend/DrawFriendScreen';
import ColoringFriendScreen from '../screens/myfriend/ColoringFriendScreen';
import CompleteDrawFriendScreen from '../screens/myfriend/CompleteDrawFriendScreen';

// 사진그리기
import SelectPictureScreen from '../screens/drawPicture/SelectPictureScreen';
import DrawPictureScreen from '../screens/drawPicture/DrawPictureScreen';
import ColoringPictureScreen from '../screens/drawPicture/ColoringPictureScreen';
import CompleteDrawPictureScreen from '../screens/drawPicture/CompleteDrawPictureScreen';
// 동화그리기
import SelectFairytaleScreen from '../screens/fairytale/SelectFairytaleScreen';
import DrawFairytaleScreen from '../screens/fairytale/DrawFairytaleScreen';
import ColoringFairytaleScreen from '../screens/fairytale/ColoringFairytaleScreen';
import FairytaleReadScreen from '../screens/fairytale/fairytaleRead/FairytaleReadScreen';

//이미지 업로드
import UploadPicture0Screen from '../screens/uploadPicture/UploadPicture0Screen';
import UploadPicture1Screen from '../screens/uploadPicture/UploadPicture1Screen';
import UploadPicture2Screen from '../screens/uploadPicture/UploadPicture2Screen';
import UploadPicture3Screen from '../screens/uploadPicture/UploadPicture3Screen';
import UploadPicture4Screen from '../screens/uploadPicture/UploadPicture4Screen';
import UploadPicture5Screen from '../screens/uploadPicture/UploadPicture5Screen';

import FindPasswordScreen from '../screens/mypage/FindPasswordScreen';
import SignupScreen from '../screens/mypage/SignupScreen';

// 모달
import SaveDrawnToLoginModal from '../screens/modals/SaveDrawnToLoginModal';

//기타
import LoadScreen from '../screens/load/LoadScreen';
import ShowScreen from '../screens/show/ShowScreen';

// 타입
import {
  DrawFairytaleScreenType,
  // FairyTaleInfoType,
  FairytaleReadScreenType,
  ColoringFairytaleScreenType,
  // CharactersInfoType,
} from '../screens/fairytale/fairytaleType';

export type RootStackParams = {
  InitialScreen: undefined;
  MainScreen: undefined;
  LoginScreen: undefined;
  MypageProfileScreen: undefined;

  // 동물 그리기
  SelectAnimalScreen: undefined;
  DrawAnimalScreen: {
    animalId: number;
    animalType: string;
    originImage: string;
  };
  ColoringAnimalScreen: {
    roomId: string;
    captureBorderImagePath: string;
    animalId: number;
    completeLine: {path: string; color: string; strokeWidth: number}[];
    animalType: string;
    originImage: string;
    animalBorderURI: string;
    animalExplanation: string;
  };
  CompleteDrawAnimalScreen: {
    animalId: number;
    animalType: string;
    completeDrawUri: string;
    animatedGif: string;
    originDrawUri: string;
  };

  // 친구 그리기
  SelectFriendScreen: undefined;
  FriendUploadPicture1Screen: undefined;
  FriendUploadPicture2Screen: undefined;
  DrawFriendScreen: {
    personId: number;
    title: string;
    originalImageUrl: string;
  };
  ColoringFriendScreen: {
    roomId: string;
    captureBorderImagePath: string;
    animalId: number;
    completeLine: {path: string; color: string; strokeWidth: number}[];
    animalType: string;
    originImage: string;
    animalBorderURI: string;
    animalExplanation: string;
  };
  CompleteDrawFriendScreen: {
    animalId: number;
    animalType: string;
    completeDrawUri: string;
    animatedGif: string;
    originDrawUri: string;
  };

  // 사진 그리기
  SelectPictureScreen: undefined;
  DrawPictureScreen: {
    friendsAnimalInfo: {
      friendsAnimalId: number;
      userEmail: string;
      title: string;
      originalImageUrl: string;
      animalType: string;
    };
  };
  ColoringPictureScreen: {
    roomId: string;
    captureBorderImagePath: string;
    pictureId: number;
    pictureTitle: string;
    completeLine: {path: string; color: string; strokeWidth: number}[];
    pictureBorderURI: string;
    pictureExplanation: string;
    pictureOriginImageUri: string;
    animalType: string;
  };
  CompleteDrawPictureScreen: {
    pictureId: number;
    completeDrawUri: string;
    animatedGif: string;
    originDrawUri: string;
  };

  // 동화 그리기
  SelectFairytaleScreen: undefined;
  DrawFairytaleScreen: DrawFairytaleScreenType;
  ColoringFairytaleScreen: {
    fairytaleDrawInfo: ColoringFairytaleScreenType;
  };
  FairytaleReadScreen: FairytaleReadScreenType;

  // 이제 안쓰는 동화 그리기
  FairytaleDrawScreen: undefined;
  ReadFairytaleScreen: {title: string};
  FairytaleColoringScreen: {
    // completeLineUri: string;
    completeLine: {path: string; color: string; strokeWidth: number}[];
  };

  UploadPicture0Screen: undefined;
  UploadPicture1Screen: undefined;
  UploadPicture2Screen: undefined;
  UploadPicture3Screen: undefined;
  UploadPicture4Screen: undefined;
  UploadPicture5Screen: undefined;
  SignupScreen: undefined;
  FindPasswordScreen: undefined;
  LoadScreen: undefined;
  ShowScreen: undefined;

  // 모달
  SaveDrawnToLoginModal: undefined;
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
        name="SelectFriendScreen"
        component={SelectFriendScreen}
      />
      <RootStack.Screen
        name="FriendUploadPicture1Screen"
        component={FriendUploadPicture1Screen}
      />
      <RootStack.Screen
        name="FriendUploadPicture2Screen"
        component={FriendUploadPicture2Screen}
      />
      <RootStack.Screen name="DrawFriendScreen" component={DrawFriendScreen} />
      <RootStack.Screen
        name="ColoringFriendScreen"
        component={ColoringFriendScreen}
      />
      <RootStack.Screen
        name="CompleteDrawFriendScreen"
        component={CompleteDrawFriendScreen}
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
      {/* 동화 그리기 */}
      <RootStack.Screen
        name="SelectFairytaleScreen"
        component={SelectFairytaleScreen}
      />
      <RootStack.Screen
        name="DrawFairytaleScreen"
        component={DrawFairytaleScreen}
      />
      <RootStack.Screen
        name="ColoringFairytaleScreen"
        component={ColoringFairytaleScreen}
      />
      <RootStack.Screen
        name="FairytaleReadScreen"
        component={FairytaleReadScreen}
      />

      {/* 이미지 업로드 */}
      <RootStack.Screen
        name="UploadPicture0Screen"
        component={UploadPicture0Screen}
      />
      <RootStack.Screen
        name="UploadPicture1Screen"
        component={UploadPicture1Screen}
      />
      <RootStack.Screen
        name="UploadPicture2Screen"
        component={UploadPicture2Screen}
      />
      <RootStack.Screen
        name="UploadPicture3Screen"
        component={UploadPicture3Screen}
      />
      <RootStack.Screen
        name="UploadPicture4Screen"
        component={UploadPicture4Screen}
      />
      <RootStack.Screen
        name="UploadPicture5Screen"
        component={UploadPicture5Screen}
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
      {/* 기타 */}
      <RootStack.Screen name="LoadScreen" component={LoadScreen} />
      <RootStack.Screen name="ShowScreen" component={ShowScreen} />
    </RootStack.Navigator>
  );
}
