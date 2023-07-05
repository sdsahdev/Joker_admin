// In App.js in a new project

import * as React from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import loginSceen from './src/loginScreen';
import DateTime from './src/DateTime';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="DateTime" component={DateTime} />
        <Stack.Screen name="loginSceen" component={loginSceen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
