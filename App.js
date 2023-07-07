// In App.js in a new project

import * as React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import loginSceen from './src/loginScreen';
import DateTime from './src/DateTime';
import BoxList from './src/BoxList';
import BoxeItems from './Components/BoxeItems';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import imagesClass from './asserts/imagepath';
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import SwipList from './Components/SwipList';

import { LogBox } from 'react-native';

LogBox.ignoreAllLogs();
function App() {
  return (
    // <NavigationContainer>
    //   <Stack.Navigator
    //     screenOptions={{ headerShown: false }}
    //     initialRouteName='"BoxList'>
    //     <Stack.Screen name="BoxList" component={BoxList} />
    //     <Stack.Screen name="BoxeItems" component={BoxeItems} />
    //     <Stack.Screen name="DateTime" component={DateTime} />
    //     <Stack.Screen name="loginSceen" component={loginSceen} />
    //   </Stack.Navigator>
    // </NavigationContainer>

    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="BoxList" component={BoxList} options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Image source={imagesClass.home} style={styles.imageStyle} resizeMode='contain' />
          ),// Hide the header for this screen
        }} />
        <Tab.Screen name="BoxeItems" component={BoxeItems} options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Image source={imagesClass.document} style={styles.imageStyle} resizeMode='contain' />
          ),
          // Hide the header for this screen
        }} />
        <Tab.Screen name="loginSceen" component={loginSceen} options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Image source={imagesClass.history} style={styles.imageStyle} resizeMode='contain' />
          ),
          // Hide the header for this screen
        }} />
        <Tab.Screen name="DateTime" component={DateTime} options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Image source={imagesClass.customer} style={styles.imageStyle} resizeMode='contain' />
          ),
          // Hide the header for this screen
        }} />
        <Tab.Screen name="SwipList" component={SwipList} options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Image source={imagesClass.user} style={styles.imageStyle} resizeMode='contain' />
          ),
          // Hide the header for this screen
        }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundContainer: {
    ...StyleSheet.absoluteFillObject,
  },
  topTexts: { marginLeft: wp(6), marginTop: wp(10), flexDirection: 'row', justifyContent: 'space-between', padding: wp(4) },
  bottomTexts: { marginLeft: wp(6), marginTop: wp(5), },
  imageStyle: {
    width: wp(5),
    height: hp(4),
  }
});

export default App;
