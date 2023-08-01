
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
      </SafeAreaView >
      <TouchableOpacity style={styles.bookbtn} onPress={() => handleSubmit()}>
        <Text style={styles.booktxt}>
          Login
        </Text>
      </TouchableOpacity>
    </View >
  );
};

// define your styles
const styles = StyleSheet.create({
  phnimage: { width: wp(5), height: hp(5), tintColor: '#027850' },
  booktxt: { color: '#fff', alignSelf: 'center', textAlignVertical: 'center', flex: 1, fontSize: wp(4) },
  bookbtn: {
    backgroundColor: '#027850', height: hp(6), width: "90%", position: 'absolute', bottom: 0, alignSelf: 'center', marginBottom: hp(5), borderRadius: wp(2)

  },
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

//make this component available to the app
export default loginSceen;
