
//import liraries
import React, { Component, useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  TextInput,
  TouchableOpacity, StatusBar, Alert
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import PhoneInput, { getCountryCallingCode } from 'react-phone-number-input/react-native-input'
import PhoneInputWithCountry from 'react-phone-number-input/react-hook-form'
import Svg, { Path } from 'react-native-svg';
import Frame from '../asserts/svgs/Frame.svg';
import imagesClass from '../asserts/imagepath';
import TopHeader from '../Components/TopHeader';
import ChangePass from '../Components/ChangePass';
import AsyncStorage from '@react-native-async-storage/async-storage';


// create a component
const loginSceen = ({ navigation }) => {
  const [password, setPassword] = useState('');
  const [username, setusername] = useState('');
  handleSubmit = () => {
    navigation.navigate("RegisterScreen");

    console.log("name ", username);
    console.log("pass ", password);

  };
  const handleuserChange = (newUser) => {
    setusername(newUser);
  }
  const handletxtChange = (newPassword) => {
    setPassword(newPassword);
  }
  const handleAdmin = async () => {
    try {
      const url = 'https://boxclub.in/Joker/Admin/index.php?what=loginThirdParty';
      const fcmToken = await AsyncStorage.getItem('fcmToken');
      console.log(fcmToken, "==storae");

      const requestBody = {
        phno: username,
        password: password,
        fcm: fcmToken,
      };

      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(requestBody),
      });
      console.log(response.status);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          console.log(data.token);
          AsyncStorage.setItem("token", data.token);
          AsyncStorage.setItem("user", "admin");
          navigation.navigate("BoxList");
        } else {
          console.log(data.message);
          Alert.alert('', data.message)
        }
      }
    } catch (error) {
      console.log('Error:', error.message);
    }
  }
  const handleSuperAdmin = async () => {
    try {
      const url = 'https://boxclub.in/Joker/Admin/index.php?what=adminLogin';
      const fcmToken = await AsyncStorage.getItem('fcmToken');
      console.log(fcmToken, "==storae");

      const requestBody = {
        phno: username,
        password: password,
        fcm: fcmToken,
      };

      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      if (response.ok) {
        const data = await response.json();
        if (data.success) {

          console.log(data.token);
          AsyncStorage.setItem("token", data.token);
          AsyncStorage.setItem("user", "superadmin");
        } else {
          console.log(data.message);
          Alert.alert('', data.message)
        }
      }
    } catch (error) {
      console.log('Error:', error.message);
    }
    navigation.navigate("BoxList");

  }
  return (
    <View style={styles.container}>
      <SafeAreaView>
        <TopHeader />
        <Text style={styles.titelText}>
          Hi~{'\n'}
          Welcome Back!
        </Text>
        <View style={{ marginTop: hp(4) }}>

          <ChangePass name={"Phone Number"} headerText={null} onChangeText={handleuserChange} called={true} />
        </View>
        <ChangePass name={"Password"} headerText={null} onChangeText={handletxtChange} />
        {/* <TouchableOpacity >
          <Text style={{ alignSelf: 'center', color: "#027850", fontSize: wp(4), marginTop: hp(2) }}>
            login for superAmdin
          </Text>
        </TouchableOpacity> */}
      </SafeAreaView >
      <View style={{ flexDirection: 'row', height: '100%' }}>

        <TouchableOpacity style={styles.bookbtn} onPress={() => handleAdmin()}>
          <Text style={styles.booktxt}>
            Admin Login
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bookbtn} onPress={() => handleSuperAdmin()}>
          <Text style={styles.booktxt}>
            Super Admin Login
          </Text>
        </TouchableOpacity>
      </View>
    </View >
  );
};

// define your styles
const styles = StyleSheet.create({
  phnimage: { width: wp(5), height: hp(5), tintColor: '#027850' },
  booktxt: { color: '#fff', alignSelf: 'center', textAlignVertical: 'center', flex: 1, fontSize: wp(4) },
  bookbtn: { backgroundColor: '#027850', height: hp(6), flex: 1, alignSelf: 'center', borderRadius: wp(2), marginHorizontal: wp(2), bottom: hp(7), },
  container: {
    flex: 1,
  },
  titelText: {
    width: wp(80),
    height: hp(9),
    color: '#027850',
    fontSize: wp(7),
    marginTop: hp(10),
    marginHorizontal: hp(4),
    fontWeight: 'bold',
  },
  fillDetails: {
    backgroundColor: '#fff',
    margin: wp(2),
    marginHorizontal: wp(5), padding: wp(3),
    borderRadius: wp(2),
    color: ' #4b92b4',
    flexDirection: 'row',
    borderBottomColor: '#027850',
    borderBottomWidth: 2,
  },
  inputFild: {
    height: hp(5), width: wp(50), color: 'black', paddingLeft: wp(4),
  },
});

export default loginSceen;
