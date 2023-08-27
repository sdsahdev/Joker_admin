import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import ChangePass from '../Components/ChangePass';
import TopHeader from '../Components/TopHeader';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import FlashMessage, { showMessage, hideMessage, FlashMessageManager } from "react-native-flash-message";

const ForgotP = ({ navigation }) => {
    const [Phone, setPhone] = useState('');

    const handleuserChange = (phn) => {
        setPhone(phn);
    }
    const handleNavigation = (input) => {
        if (Phone == '') {
            showMessage({
                message: 'please enter a phone number',
                backgroundColor: "red",
                type: "danger",// background color
                color: "#fff", // text color
                icon: "danger",
            }); return;
        } else {

            navigation.navigate("Fotp", { phoneNumber: Phone, type: input })
        }
    };
    return (
        <View style={{ flex: 1, flexDirection: 'column' }}>
            <View style={{ position: 'absolute', width: '100%' }}>
                <TopHeader />
            </View>
            <View style={{ marginTop: hp(15), }}>
                <ChangePass name={'phone number'} headerText={null} onChangeText={handleuserChange} />
            </View>

            {/* <TouchableOpacity
                style={styles.bookbtn}
                onPress={() => handleNavigation()}>
                <Text style={styles.booktxt}>Send  Otp</Text>
            </TouchableOpacity> */}

            <View style={{ flexDirection: 'row', height: '100%' }}>

                <TouchableOpacity style={styles.bookbtn} onPress={() => handleNavigation('admin')}>
                    <Text style={styles.booktxt}>
                        Admin
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.bookbtn} onPress={() => handleNavigation('super admin')}>
                    <Text style={styles.booktxt}>
                        Super Admin
                    </Text>
                </TouchableOpacity>

            </View>

        </View>
    );
};

export default ForgotP;

const styles = StyleSheet.create({
    booktxt: { color: '#fff', alignSelf: 'center', textAlignVertical: 'center', flex: 1, fontSize: wp(4) },
    bookbtn: { backgroundColor: '#027850', height: hp(6), flex: 1, alignSelf: 'center', borderRadius: wp(2), marginHorizontal: wp(2), bottom: hp(7), },

});
