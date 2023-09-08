import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';
import imagesClass from '../asserts/imagepath';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const ChangePass = ({ name, onChangeText, headerText, eye, called, defaults }) => {
    const [secure, setSecure] = useState(false);
    const [inputValue, setInputValue] = useState(defaults);

    const handleTextChange = (text) => {
        setInputValue(text);
        onChangeText(text); // Call the prop function to update the parent state
    };

    return (
        <View style={{ marginVertical: hp(0.8), }}>
            {headerText === null ? null : <Text style={{ marginTop: 10, marginHorizontal: wp(5), color: '#027850', fontWeight: 'bold' }}>
                {headerText}
            </Text>
            }
            <View style={styles.fillDetails}>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', flex: 1 }}>
                    <Image
                        source={called ? imagesClass.telephone : imagesClass.user}
                        style={styles.phnimage}
                        resizeMode="center"
                    />
                    <TextInput
                        secureTextEntry={secure}
                        keyboardType={called ? 'phone-pad' : null}
                        placeholder={name}
                        style={styles.inputFild}
                        onChangeText={handleTextChange} // Set the onChangeText prop
                        value={inputValue} // Set the value prop for controlled input
                    />
                </View>
                {eye ? <View>
                    <TouchableOpacity onPress={() => setSecure(!secure)} style={{ alignSelf: 'center' }}>
                        <Image
                            source={secure ? imagesClass.hide : imagesClass.view}
                            style={{ alignSelf: 'flex-end', height: 15, width: 20, justifyContent: 'center', tintColor: '#027850' }}
                            resizeMode="center"
                        />
                    </TouchableOpacity>
                </View> : null}

            </View>

        </View>
    );
};

export default ChangePass;

// define your styles
const styles = StyleSheet.create({
    phnimage: { width: wp(5), height: hp(5), tintColor: '#027850', alignSelf: 'center' },
    booktxt: {
        color: '#fff',
        alignSelf: 'center',
        textAlignVertical: 'center',
        fontSize: wp(4)
    },
    bookbtn: {
        backgroundColor: '#027850',
        paddingVertical: hp(2),
        flex: 1,
        borderRadius: wp(2),
        marginHorizontal: wp(2),
        marginVertical: hp(2),
        justifyContent: 'center',
    },
    btn: { flex: 1 },
    container: {
        flex: 1,

    },

    fillDetails: {
        backgroundColor: '#fff',
        margin: wp(2),
        marginHorizontal: wp(5), padding: wp(3),
        borderRadius: wp(2),
        flexDirection: 'row',
        borderBottomColor: '#027850',
        borderBottomWidth: 2
        , justifyContent: 'space-between',
        alignItems: 'center'
    },
    inputFild: {
        color: 'black', paddingLeft: wp(4), flexWrap: 'wrap', flex: 1, fontSize: wp(4)
    },
});

//make this component available to the app
