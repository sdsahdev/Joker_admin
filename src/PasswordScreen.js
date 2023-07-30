import { StyleSheet, Text, View, TouchableOpacity, KeyboardAvoidingView } from 'react-native'
import React, { useState } from 'react'
import ChangePass from '../Components/ChangePass'
import TopHeader from '../Components/TopHeader';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Image } from 'react-native-animatable';
import imagesClass from '../asserts/imagepath';

const PasswordScreen = ({ navigation }) => {
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handlePasswordChange = (text) => {
        setPassword(text);
    };

    const handleNewPasswordChange = (text) => {
        setNewPassword(text);
    };

    const handleConfirmPasswordChange = (text) => {
        setConfirmPassword(text);
    };

    return (
        <View style={{ flex: 1, position: 'relative', flexDirection: 'column', height: '100%' }}>
            <View style={{ position: 'absolute' }}>

                <TopHeader name={"Change Password"} back={true} navigation={navigation} />

            </View>
            <View style={{ marginTop: hp(15), }}>

                <ChangePass name={'Password'} onChangeText={handlePasswordChange} headerText={"Password"} eye={true} />
                <ChangePass name={'Enter new password'} onChangeText={handleNewPasswordChange} headerText={'Enter new password'} eye={true} />
                <ChangePass name={'Re-enter new password'} onChangeText={handleConfirmPasswordChange} headerText={'Re-enter new password'} eye={true} />

            </View>
            <View style={{ flex: 1 }}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'margin'}
                    style={{ flex: 1 }} >

                    <TouchableOpacity style={styles.bookbtn} onPress={() => handleSubmit()}>
                        <Text style={styles.booktxt}>
                            Change Password
                        </Text>
                    </TouchableOpacity>
                </KeyboardAvoidingView>
            </View>
        </View>

    )
}

export default PasswordScreen

const styles = StyleSheet.create({
    booktxt: { color: '#fff', alignSelf: 'center', textAlignVertical: 'center', flex: 1, fontSize: wp(4) },
    bookbtn: {
        backgroundColor: '#027850', height: hp(6), width: "90%", position: 'absolute', bottom: 0, alignSelf: 'center', marginBottom: hp(5), borderRadius: wp(2)

    },
    headetxt: {
        color: '#000',
        fontSize: wp(7),
        marginTop: wp(10),

        marginLeft: wp(10),
    },
})