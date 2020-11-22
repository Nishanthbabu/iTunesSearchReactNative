/**
 * Starting point
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import React from 'react';
import {Provider} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';

import DashBoard from './app/screens/DashBoard';
import store from './app/redux/store';
import {createStackNavigator} from '@react-navigation/stack';
import Details from './app/screens/Details';
const Stack = createStackNavigator();

const App: () => React$Node = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="DashBoard">
          <Stack.Screen name="DashBoard" component={DashBoard} />
          <Stack.Screen name="Details" component={Details} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
