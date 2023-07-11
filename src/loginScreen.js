//import liraries
import React, { Component, useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  TextInput,
  TouchableOpacity, StatusBar,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Svg, { Path } from 'react-native-svg';
import Frame from '../asserts/svgs/Frame.svg';
import imagesClass from '../asserts/imagepath';

// create a component
const loginSceen = ({ navigation }) => {
  const [value, setValue] = useState("");
  const [formattedValue, setFormattedValue] = useState("");
  const [valid, setValid] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const phoneInput = useRef < PhoneInput > (null);
  return (
    <View style={styles.container}>
      <SafeAreaView>
        <Text style={styles.titelText}>
          Hi~{'\n'}
          Signup to get started
        </Text>



        <View style={styles.fillDetails}>

          <Image
            source={imagesClass.telephone
            }
            style={styles.phnimage}
            resizeMode="center"
          />
          <TextInput keyboardType='phone-pad' placeholder="Enter Mobile Number" style={styles.inputFild} />

        </View>


      </SafeAreaView >
      <TouchableOpacity style={styles.bookbtn} onPress={() => navigation.navigate("Otp")}>
        <Text style={styles.booktxt}>
          Verify Number
        </Text>
      </TouchableOpacity>

    </View >
  );
};

// define your styles
const styles = StyleSheet.create({
  phnimage: { width: wp(6), height: hp(5) },
  booktxt: { color: '#fff', alignSelf: 'center', textAlignVertical: 'center', flex: 1, fontSize: wp(4) },
  bookbtn: {
    backgroundColor: '#027850', height: hp(6), width: "90%", position: 'absolute', bottom: 0, alignSelf: 'center', marginBottom: hp(15), borderRadius: wp(2)

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
    margin: wp(8),
    padding: wp(3),
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
