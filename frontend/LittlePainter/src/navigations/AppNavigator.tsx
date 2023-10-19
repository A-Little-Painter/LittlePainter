import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import MainScreen from '../screens/main/MainScreen';
import MainTmpScreen from '../screens/main/MainTmpScreen';
import Detail1Screen from '../screens/detail/Detail1Screen';
import DetailScreen from '../screens/detail/DetailScreen';
import NodetailScreen from '../screens/detail/NodetailScreen';
import Detail2Screen from '../screens/detail/Detail2Screen';

export type RootStackParams = {
  MainScreen: undefined;
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
      initialRouteName="MainScreen"
      screenOptions={{headerShown: false}}>
      <RootStack.Screen name="MainScreen" component={MainScreen} />
      <RootStack.Screen name="MainTmpScreen" component={MainTmpScreen} />
      <RootStack.Screen name="DetailScreen" component={DetailScreen} />
      <RootStack.Screen name="Detail1Screen" component={Detail1Screen} />
      <RootStack.Screen name="Detail2Screen" component={Detail2Screen} />
      <RootStack.Screen name="NodetailScreen" component={NodetailScreen} />
    </RootStack.Navigator>
  );
}
