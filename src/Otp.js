//import liraries
import React, { useState, useRef, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    Image,
    TextInput,
    TouchableOpacity, StatusBar, Alert, Pressable, ActivityIndicator
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

import FlashMessage, {
    showMessage,
    hideMessage,
    FlashMessageManager,
} from 'react-native-flash-message';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Otp = ({ navigation, route }) => {
    const { phoneNumber, username, password } = route.params;
    const [isLoading, setIsLoading] = useState(false);
    const [randomOTP, setrandomOTP] = useState(0)
    const [otp, setOtp] = useState('');
    const MAX_CODE = 4;

    useEffect(() => {
        console.log('0000000');
        wpmsg();
    }, [])
    const callApi = async () => {
        try {
            console.log(username);
            console.log(phoneNumber);
            console.log(password);
            setIsLoading(true);
            const token = await AsyncStorage.getItem('token');
            console.log(token, '-----');
            const apiUrl =
                'https://boxclub.in/Joker/Admin/index.php?what=addThirdParty';

            console.log(username);
            // console.log(email);
            console.log(phoneNumber);
            console.log(password);
            const data = {
                name: username,
                // email: 'testing@gmail.com',
                phno: phoneNumber,
                password: password,
                type: 'insert',
            };

            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    token: token,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });


            if (response.ok) {
                const data = await response.json();
                setIsLoading(false);

                if (data.success) {
                    showMessage({
                        message: data.message,
                        type: 'Success',
                        backgroundColor: 'green', // background color
                        color: '#fff', // text color

                    });

                    console.log(data, ' logg');
                } else {
                    console.log(data.message, 'jj');
                    showMessage({
                        message: data.message,
                        type: 'Danger',
                        duration: 3000,
                        backgroundColor: 'red', // background color
                        color: '#fff',
                        onHide: () => {
                            navigation.pop();
                        }, // text color
                    });
                }
            } else {
                setIsLoading(false);

                showMessage({
                    message: 'data. s',
                    type: 'Danger',
                    backgroundColor: 'red', // background color
                    color: '#fff', // text color
                    duration: 3000,
                    onHide: () => {
                        navigation.pop();
                    },
                });
            }

        } catch (error) {
            console.error('Network error:', error);
            setIsLoading(false);
            showMessage({
                message: 'Network error occurred',
                type: 'Danger',
                backgroundColor: 'red',
                color: '#fff',
                duration: 3000,
                onHide: () => {
                    navigation.pop();
                },
            });
        }
    };
    const handleOtpChange = (otp) => {
        setOtp(otp);
        // Your additional logic here, if needed
    };

    const generateOTP = () => {
        return Math.floor(1000 + Math.random() * 9000).toString();
    };
    const wpmsg = async () => {
        console.log("ot first ");

        const mkey = await AsyncStorage.getItem('msgkey')
        const phone = await AsyncStorage.getItem('phn')
        const randomOTP2 = generateOTP();
        setrandomOTP(randomOTP2)
        console.log("otpss" + randomOTP2);

        const apiUrl = 'http://msg.msgclub.net/rest/services/sendSMS/sendGroupSms';
        const apiKey = mkey; // Replace with your actual auth key

        const smsData = {
            smsContent: `Your OTP for Box Critet Booking App registration is: *${randomOTP2}*. 
Please enter this OTP to complete your registration process.`,
            routeId: '21',
            mobileNumbers: '8000005250',
            senderId: phone,
            signature: 'signature',
            smsContentType: 'english',
        };

        fetch(`${apiUrl}?AUTH_KEY=${apiKey}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(smsData),
        })
            .then(response => response.json())
            .then(data => {
                console.log('SMS sent successfully:', data.responseCode);
                if (data.responseCode === '3001') {

                } else {
                    showMessage({
                        message: "Try Again after some time",
                        type: "Success",
                        backgroundColor: "green", // background color
                        color: "#fff", // text color
                        onHide: () => {
                            navigation.pop();
                        }
                    });
                }

                //hey llopa sayne  yution shere uis 
                // Handle success or display a message to the user
            })
            .catch(error => {
                console.error('Error sending SMS:', error);
                // Handle error or display an error message to the user
            });
    }


    const handleSubmit = () => {
        console.log(randomOTP, "==otp scere")
        if (randomOTP === otp) {
            callApi();
        } else {
            showMessage({
                message: "please enter valid otp",
                type: 'Danger',
                backgroundColor: 'red', // background color
                color: '#fff', // text color

            });

        }
        // console.log(navigation.getParam('randomOTP'), "==otp scere")
        // const datt = navigation.navigate('Register', { phoneNumber: navigation.getParam('phoneNumber') });
        // console.log(datt, '++++++')
    }
    return (
        <View style={{ flex: 1, }}>
            <View style={{ position: 'absolute', }}>
                <TopHeader name={'Otp Screen'} />
            </View>
            <View style={{ borderRadius: wp(10), justifyContent: 'center', flex: 1, }}>
                <OTPInputView
                    style={{ marginHorizontal: wp(11), height: hp(14) }} // Adjust the style as per your requirement
                    pinCount={MAX_CODE}
                    code={otp}
                    autoFocusOnLoad={false}
                    onCodeChanged={handleOtpChange}
                    codeInputFieldStyle={{ color: '#000', borderColor: '#027850', borderRadius: 7, borderWidth: 2, width: wp(14), height: hp(7) }} // Change the text and border color to red
                    codeInputHighlightStyle={{}}
                    // Change the border color of the focused input
                    inputBorderRadius={10} // Change the border radius to 10 or any other value you prefer
                />
                <TouchableOpacity onPress={() => wpmsg()}>

                    <Text style={{ alignSelf: 'center' }}>
                        Resend OTP
                    </Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.bookbtn} onPress={() => handleSubmit()}>
                <Text style={styles.booktxt}>
                    Verify Otp
                </Text>
            </TouchableOpacity>
            {isLoading && (
                <ActivityIndicator size="large" color="#0000ff" style={{ position: 'absolute', justifyContent: 'center', alignSelf: 'center', height: '100%' }} />)}

        </View>
    );
};

export default Otp;
const styles = StyleSheet.create({
    booktxt: {
        color: '#fff',
        fontSize: wp(4),
    },
    bookbtn: {
        backgroundColor: '#027850',
        width: "90%",
        position: 'absolute',
        bottom: hp(5),
        alignSelf: 'center',
        borderRadius: wp(2),
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: hp(2)
    },
    borderStyleBase: {
        width: 30,
        height: 45
    },

    borderStyleHighLighted: {
        borderColor: "#000",
    },

    underlineStyleBase: {
        width: 30,
        height: 45,
        borderWidth: 0,
        borderBottomWidth: 1,
    },

    underlineStyleHighLighted: {
        borderColor: "#000",
    },
})