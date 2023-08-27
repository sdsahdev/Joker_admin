
//import liraries
import React, { Component, useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  TextInput,
  TouchableOpacity, StatusBar, Alert, ActivityIndicator
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

import FlashMessage, { showMessage, hideMessage, FlashMessageManager } from "react-native-flash-message";

// create a component
const loginSceen = ({ navigation }) => {
  FlashMessageManager.setDisabled(false);
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [username, setusername] = useState('');
  useEffect(() => {
    // Call the API when the component mounts
    //console.log("+++++++");
    fetchBoxData();
  }, []);

  const fetchBoxData = async () => {
    //console.log("-----------");
    try {
      const response = await fetch('https://boxclub.in/Joker/Admin/index.php?what=getBox');
      if (!response.ok) {
        //console.log("not ok");
        throw new Error('Network response was not ok');
      }
      const jsonData = await response.json();
      //console.log(jsonData.keys.rkey, "==== datas");
      AsyncStorage.setItem('msgkey', jsonData.keys.msgkey)
      AsyncStorage.setItem('phn', jsonData.keys.phn)
      AsyncStorage.setItem('rkey', jsonData.keys.rkey)
      AsyncStorage.setItem('rskey', jsonData.keys.rskey)

      // setData(jsonData);
    } catch (error) {
      //console.log('Error:', error);
    }
  };
  handleSubmit = () => {
    navigation.navigate("RegisterScreen");
  };
  const handleuserChange = (newUser) => {
    setusername(newUser);
  }
  const handletxtChange = (newPassword) => {
    setPassword(newPassword);
  }
  const handleAdmin = async () => {
    try {
      setIsLoading(true);
      const url = 'https://boxclub.in/Joker/Admin/index.php?what=loginThirdParty';
      const fcmToken = await AsyncStorage.getItem('fcmToken');

      const requestBody = {
        phone: username,
        password: password,
        fcm: fcmToken,
      };

      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(requestBody),
      });
      //console.log(response.status);

      if (response.ok) {
        setIsLoading(false);
        const data = await response.json();
        if (data.success) {
          showMessage({
            message: data.message,
            type: "Success",
            backgroundColor: "green", // background color
            color: "#fff", // text color
            onHide: () => {
              navigation.reset({
                index: 0,
                routes: [{ name: 'BoxList' }],
              });
            }
          });
          //console.log(data.token);
          AsyncStorage.setItem("token", data.token);
          AsyncStorage.setItem("superAdmin", 'false');
          AsyncStorage.setItem("adminnum", username);

          setPassword('')
          setusername('')

        } else {
          setIsLoading(false);
          //console.log(data.message);
          showMessage({
            message: data.message,
            type: "danger",
            icon: "danger",
            backgroundColor: "red", // background color
            color: "#fff", // text color
          });
        }
      }
    } catch (error) {
      setIsLoading(false);
      //console.log('Error:', error.message);
    }
  }
  const handleSuperAdmin = async () => {
    try {
      setIsLoading(true);

      const url = 'https://boxclub.in/Joker/Admin/index.php?what=adminLogin';
      const fcmToken = await AsyncStorage.getItem('fcmToken');
      //console.log(fcmToken, "==storae");

      const requestBody = {
        phno: username,
        password: password,
        fcm: fcmToken,
      };

      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(requestBody),
      });


      if (response.ok) {
        setIsLoading(false);

        const data = await response.json();
        if (data.success) {

          showMessage({
            message: data.message,
            type: "Success",
            backgroundColor: "green", // background color
            color: "#fff", // text color
            onHide: () => {
              navigation.reset({
                index: 0,
                routes: [{ name: 'BoxList' }],
              });
            }
          });

          //console.log(data);
          //console.log(data.token);
          AsyncStorage.setItem("token", data.token);
          AsyncStorage.setItem("superAdmin", 'true');
          setPassword('')
          setusername('')
        } else {
          setIsLoading(false);
          //console.log(data.message);
          showMessage({
            message: data.message,
            type: "danger",
            icon: "danger",
            backgroundColor: "red", // background color
            color: "#fff", // text color
            duration: 3000
          });
        }
      }
    } catch (error) {
      setIsLoading(false);
      navigation.reset({
        index: 0,
        routes: [{ name: 'BoxList' }],
      });
      //console.log('Error:', error.message);
    }

  }

  return (
    <View style={styles.container}>
      <FlashMessage />
      {isLoading && (
        <ActivityIndicator size="large" color="#0000ff" style={{ position: 'absolute', justifyContent: 'center', alignSelf: 'center', height: '100%' }} />)}
      <SafeAreaView>
        <TopHeader />
        <Text style={styles.titelText}>
          Hi~{'\n'}
          Welcome Bck!
        </Text>
        <View style={{ marginTop: hp(4) }}>

          {/* <ChangePass name={"Phone Number"} headerText={null} onChangeText={handleuserChange} /> */}
          <ChangePass name={"Phone Number"} headerText={null} onChangeText={handleuserChange} called={true} />
        </View>
        <ChangePass name={"Password"} headerText={null} onChangeText={handletxtChange} eye={true} />
        <TouchableOpacity onPress={() => navigation.navigate("ForgotP")}>
          <Text style={{ alignSelf: 'center', color: "#027850", fontSize: wp(4), marginTop: hp(2) }}>
            Forgot password
          </Text>
        </TouchableOpacity>
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
