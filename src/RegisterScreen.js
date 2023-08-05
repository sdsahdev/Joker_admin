
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
const RegisterScreen = ({ navigation }) => {
    const [value, setValue] = useState("");
    const [formattedValue, setFormattedValue] = useState("");
    const [valid, setValid] = useState(false);
    const [showMessage, setShowMessage] = useState(false);

    const [phoneNumber, setPhoneNumber] = useState('');
    const [username, setusername] = useState('');
    const [password, setpassword] = useState('');
    // const phoneInput = useRef < PhoneInput > (null);
    const handlepassword = (input) => {
        setpassword(input)
    };
    const handleuserChange = (input) => {
        setusername(input)
    }
    const callApi = async () => {
        const token = await AsyncStorage.getItem("token")
        console.log(token, "-----");
        const apiUrl = 'https://boxclub.in/Joker/Admin/index.php?what=addThirdParty';
        const data = {
            name: username,
            // email: 'jokeradmin@gmail.com',
            phno: phoneNumber,
            password: password,
        };
        fetch(apiUrl, {
            method: 'POST',
            headers: {
                token: token,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then((response) => response.json())
            .then((responseData) => {
                // Handle successful response
                console.log('API response:', responseData);
            })
            .catch((error) => {
                // Handle error
                console.error('API error:', error);
            });
    };
    // Function to handle form submission
    const handleSubmit = () => {
        console.log(username)
        console.log(phoneNumber)
        console.log(password)
        callApi()
        // navigation.navigate("Otp");
    };

    const isValidPhoneNumber = (input) => {
        const formattedPhoneNumber = input.replace(/\D/g, '');
        const limitedPhoneNumber = formattedPhoneNumber.slice(0, 10);
        setPhoneNumber(limitedPhoneNumber);
        const phoneNumberPattern = /^\d{10}$/;
        return phoneNumberPattern;
    };

    return (
        <View style={styles.container}>
            <SafeAreaView>
                <TopHeader />
                <Text style={styles.titelText}>
                    Hi~{'\n'}
                    Add new Admin
                </Text>

                <ChangePass name={"User Name"} headerText={null} onChangeText={handleuserChange} />

                <ChangePass name={"Phone Number"} headerText={null} onChangeText={isValidPhoneNumber} called={true} />

                <ChangePass name={"Password"} headerText={null} onChangeText={handlepassword} />
            </SafeAreaView >
            <TouchableOpacity style={styles.bookbtn} onPress={() => handleSubmit()}>
                <Text style={styles.booktxt}>
                    Add Admin
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
export default RegisterScreen;

