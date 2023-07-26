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
import imagesClass from '../asserts/imagepath';
import TopHeader from '../Components/TopHeader';

const ChangePass = () => {

    const [secure, setSecure] = useState(false)
    return (

        <View style={styles.fillDetails}>

            <Image
                source={imagesClass.user
                }
                style={styles.phnimage}
                resizeMode="center"
            />
            <TextInput secureTextEntry={secure} placeholder='User' style={styles.inputFild} />
            <TouchableOpacity onPress={() => setSecure(!secure)}>
                <Image
                    source={secure ? imagesClass.hide : imagesClass.view}
                    style={{ alignSelf: 'flex-end', height: hp(3), width: wp(6), justifyContent: 'center' }}
                    resizeMode="center"
                />
            </TouchableOpacity>
        </View>
    )
}

export default ChangePass


// define your styles
const styles = StyleSheet.create({
    phnimage: { width: wp(6), height: hp(5) },
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
