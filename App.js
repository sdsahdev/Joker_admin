import React, { useRef, useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet, Image, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { BottomTabView, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import * as Animatable from 'react-native-animatable';
import imagesClass from './asserts/imagepath';
import BoxList from './src/BoxList';
import DateTime from './src/DateTime';
import loginSceen from './src/loginScreen';
import Details from './src/Details';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import TimeComp from './Components/TimeComp';
import Rules from './src/Rules';
import Inbox from './src/Inbox';
import ProfileScreen from './src/ProfileScreen';
import About from './src/About';
import BottomTab from './BottomTab';
import BoxeItems from './Components/BoxeItems';
import DetailsCompo from './Components/DetailsCompo';
import Otp from './src/Otp';
import Cancel from './Components/Cancel';
import ChangePass from './Components/ChangePass';
import PasswordScreen from './src/PasswordScreen';
import RegisterScreen from './src/RegisterScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const App = () => {


  return (

    <NavigationContainer>
      <Stack.Navigator headerMode="none">
        <Stack.Screen name="BoxList" component={BottomTab} />
        <Stack.Screen name="BoxeItems" component={BoxeItems} />
        <Stack.Screen name="Details" component={Details} />
        <Stack.Screen name="DateTime" component={DateTime} />
        <Stack.Screen name="Inbox" component={Inbox} />
        <Stack.Screen name="DetailsCompo" component={DetailsCompo} />
        <Stack.Screen name="loginSceen" component={loginSceen} />
        <Stack.Screen name="Cancel" component={Cancel} />
        <Stack.Screen name="Otp" component={Otp} />
        <Stack.Screen name="ChangePass" component={ChangePass} />
        <Stack.Screen name="PasswordScreen" component={PasswordScreen} />
        <Stack.Screen name="RegisterScreen" component={RegisterScreen} />

      </Stack.Navigator>
    </NavigationContainer>

  );
};



export default App;
