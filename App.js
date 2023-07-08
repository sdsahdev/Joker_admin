import React, { useRef, useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet, Image, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as Animatable from 'react-native-animatable';
import imagesClass from './asserts/imagepath';
import BoxList from './src/BoxList';
import DateTime from './src/DateTime';
import loginSceen from './src/loginScreen';
import Details from './src/Details';

const Tab = createBottomTabNavigator();

const TabButton = ({ item, onPress, accessibilityState }) => {
  const focused = accessibilityState.selected;
  const viewRef = useRef(null);
  const textViewRef = useRef(null);

  useEffect(() => {
    if (focused) {
      viewRef.current.animate({ 0: { scale: 0 }, 1: { scale: 1 } });
      textViewRef.current.animate({ 0: { scale: 0 }, 1: { scale: 1 } });
    } else {
      viewRef.current.animate({ 0: { scale: 1 }, 1: { scale: 0 } });
      textViewRef.current.animate({ 0: { scale: 1 }, 1: { scale: 0 } });
    }
  }, [focused]);

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={1}
      style={[styles.container, { flex: focused ? 1 : 0.65 }]}
    >
      <View>
        <Animatable.View
          ref={viewRef}
          style={[StyleSheet.absoluteFillObject, { backgroundColor: item.color, borderRadius: 16 }]}
        >

        </Animatable.View>
        <View style={[styles.btn, { backgroundColor: focused ? null : item.alphaClr }]}>

          <Image source={item.type} style={{
            width: 24,
            height: 24,
            marginRight: 8,
            tintColor: focused ? "#fff" : "#256D85",
          }} resizeMode="contain" />


          <Animatable.View ref={textViewRef}>
            {focused && (
              <Text style={{ color: '#fff', paddingHorizontal: 8 }}>{item.label}</Text>
            )}
          </Animatable.View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const App = () => {
  const TabArr = [
    {
      route: 'Home',
      label: 'Home',
      type: imagesClass.home, // Replace with actual image paths
      icon: 'home',
      component: BoxList,
      color: '#256D85',
      alphaClr: '#C3EDC0',
    },
    {
      route: 'Search',
      label: 'Search',
      type: imagesClass.customer, // Replace with actual image paths
      icon: 'search',
      component: Details,
      color: '#256D85',
      alphaClr: '#C3EDC0',
    },
    {
      route: 'Add',
      label: 'Add New',
      type: imagesClass.document, // Replace with actual image paths
      icon: 'plus-square',
      component: loginSceen,
      color: '#256D85',
      alphaClr: '#C3EDC0',
    },
    {
      route: 'Account',
      label: 'Account',
      type: imagesClass.history, // Replace with actual image paths
      icon: 'user-circle-o',
      component: BoxList,
      color: '#256D85',
      alphaClr: '#C3EDC0',
    },
  ];

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            height: 60,
            position: 'absolute',
            bottom: 16,
            right: 16,
            left: 16,
            borderRadius: 16,
          },
        }}
      >
        {TabArr.map((item, index) => (
          <Tab.Screen
            key={index}
            name={item.route}
            component={item.component}
            options={{
              tabBarShowLabel: false,
              tabBarButton: (props) => <TabButton {...props} item={item} />,
            }}
          />
        ))}
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    borderRadius: 16,
  },
  imageStyle: {
    width: 24,
    height: 24,
    marginRight: 8,

  },
});

export default App;
