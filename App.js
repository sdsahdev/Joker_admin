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
import EditProfile from './src/EditProfile';
import ContactUs from './src/ContactUs';
import TornamentBook from './src/TornamentBook';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FlashMessage, { showMessage, hideMessage, FlashMessageManager } from "react-native-flash-message";
import ChangeStatus from './src/ChangeStatus';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const App = () => {
  useEffect(() => {
    // Call the function when the App component mounts
    requestUserPermission();
  }, []);

  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
      GetFcmToken();
    }
  }

  async function GetFcmToken() {
    try {
      let fcmToken = await messaging().getToken();
      await AsyncStorage.setItem('fcmToken', fcmToken);

      console.log(fcmToken, "==firebase token==");
    } catch (error) {
      console.log(error, 'error');
    }
  }
  return (

    <NavigationContainer>
      <FlashMessage position="bottom" />

      <Stack.Navigator headerMode="none">
        <Stack.Screen name="loginSceen" component={loginSceen} />
        <Stack.Screen name="BoxList" component={BottomTab} />
        <Stack.Screen name="ChangeStatus" component={ChangeStatus} />
        <Stack.Screen name="BoxeItems" component={BoxeItems} />
        <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
        <Stack.Screen name="Details" component={Details} />
        <Stack.Screen name="DateTime" component={DateTime} />
        <Stack.Screen name="Inbox" component={Inbox} />
        <Stack.Screen name="DetailsCompo" component={DetailsCompo} />
        <Stack.Screen name="Cancel" component={Cancel} />
        <Stack.Screen name="Otp" component={Otp} />
        <Stack.Screen name="ChangePass" component={ChangePass} />
        <Stack.Screen name="PasswordScreen" component={PasswordScreen} />
        <Stack.Screen name="EditProfile" component={EditProfile} />
        <Stack.Screen name="ContactUs" component={ContactUs} />
        <Stack.Screen name="About" component={About} />
        <Stack.Screen name="TornamentBook" component={TornamentBook} />

      </Stack.Navigator>
    </NavigationContainer>

  );
};



export default App;
