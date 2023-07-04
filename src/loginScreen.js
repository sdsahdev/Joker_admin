//import liraries
import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  TextInput,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Svg, {Path} from 'react-native-svg';
import Frame from '../asserts/svgs/Frame.svg';

// create a component
const loginSceen = () => {
  return (
    <View style={styles.container}>
      <SafeAreaView>
        <Text style={styles.titelText}>
          Hi~{'\n'}
          Signup to get started
        </Text>
        <View style={styles.fillDetails}>
          <Svg
            width="20"
            height="21"
            style={{justifyContent: 'center', alignSelf: 'center'}}
            viewBox="0 0 20 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <Path
              d="M16.6667 18.8333H15V17.1666C15 15.7859 13.8808 14.6666 12.5 14.6666H7.50004C6.11933 14.6666 5.00004 15.7859 5.00004 17.1666V18.8333H3.33337V17.1666C3.33337 14.8655 5.19886 13 7.50004 13H12.5C14.8012 13 16.6667 14.8655 16.6667 17.1666V18.8333ZM10 11.3333C7.23862 11.3333 5.00004 9.09473 5.00004 6.33331C5.00004 3.57189 7.23862 1.33331 10 1.33331C12.7615 1.33331 15 3.57189 15 6.33331C15 9.09473 12.7615 11.3333 10 11.3333ZM10 9.66665C11.841 9.66665 13.3334 8.17426 13.3334 6.33331C13.3334 4.49236 11.841 2.99998 10 2.99998C8.15909 2.99998 6.66671 4.49236 6.66671 6.33331C6.66671 8.17426 8.15909 9.66665 10 9.66665Z"
              fill="#2852BC"
            />
          </Svg>
          <TextInput placeholder="Email" style={styles.inputFild}></TextInput>
        </View>
      </SafeAreaView>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titelText: {
    width: wp(80),
    height: hp(9),
    color: '#2852BC',
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
    borderBottomColor: '#2852BC',
    borderBottomWidth: 2,
  },
  inputFild: {height: hp(5), width: wp(50), color: 'black'},
});

//make this component available to the app
export default loginSceen;
