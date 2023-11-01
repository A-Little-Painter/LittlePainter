import {Provider} from 'react-redux';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import store from './src/redux/store';
import axios from 'axios';
import {refreshAccessToken} from './src/apis/baseUrl';

import AppNavigator from './src/navigations/AppNavigator';

// Axios 인터셉터 설정
axios.interceptors.response.use(
  response => response,
  error => {
    if (error.response.status === 401) {
      refreshAccessToken();
    }
    return Promise.reject(error);
  },
);

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </Provider>
  );
}

export default App;
