
//import liraries
import React, { Component, useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  TextInput,
  TouchableOpacity, StatusBar, Alert, ActivityIndicator,
  Platform
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import TopHeader from '../Components/TopHeader';
import ChangePass from '../Components/ChangePass';
import AsyncStorage from '@react-native-async-storage/async-storage';

import FlashMessage, { showMessage, hideMessage, FlashMessageManager } from "react-native-flash-message";
import ProgressLoader from 'rn-progress-loader';
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
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const userToken = await AsyncStorage.getItem('superAdmin');
      console.log(userToken, '====token');
      if (userToken) {
        // User is authenticated, navigate to DateTime or other screen
        navigation.reset({
          index: 0,
          routes: [{ name: 'BoxList' }],
        });
      }
    } catch (error) {
      // Handle error
    }
  };

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
      <ProgressLoader
        visible={isLoading}
        isModal={true} isHUD={true}
        hudColor={"#fff"}
        color={"#027850"} />
      <View >
        <View style={{ marginBottom: hp(10) }}>

          <TopHeader />
        </View>
        <Text style={styles.titelText}>
          Hi~{'\n'}
          Welcome Back!
        </Text>
        <View style={{ marginTop: hp(4) }}>

          <ChangePass name={"Phone Number"} headerText={null} onChangeText={handleuserChange} called={true} />
        </View>
        <ChangePass name={"Password"} headerText={null} onChangeText={handletxtChange} eye={true} />
        <TouchableOpacity onPress={() => navigation.navigate("ForgotP")}>
          <Text style={{ alignSelf: 'center', color: "#027850", fontSize: wp(4), marginTop: hp(2) }}>
            Forgot password
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{ flexDirection: 'row', height: '100%', }}>

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
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  phnimage: { width: Platform === 'ios' ? wp(5) : wp(2), height: hp(5), tintColor: '#027850' },
  booktxt: {
    color: '#fff',
    alignSelf: 'center',
    textAlignVertical: 'center',
    fontSize: wp(4),
  },
  bookbtn: {
    backgroundColor: '#027850',
    alignSelf: 'center',
    borderRadius: wp(2),
    marginHorizontal: wp(2),
    bottom: hp(10),
    padding: wp(4),
    flex: 1
  },
  container: {
    flex: 1,
  },
  titelText: {
    width: wp(80),
    height: hp(9),
    color: '#027850',
    fontSize: wp(7),
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
