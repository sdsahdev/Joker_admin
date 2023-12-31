import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const OneItem = ({ name, keyname }) => {
    return (
        <View style={{ flexDirection: 'row' }}>
            <Text style={styles.textLeft}>{keyname}</Text>
            <Text style={name === 'on' ? [styles.textLeft, { color: 'red' }] : name === 'off' ? [styles.textLeft, { color: 'green' }] : styles.textLeft} >{`${name}`}</Text>
        </View>
    );
};

export default OneItem;

const styles = StyleSheet.create({
    textLeft: {
        alignSelf: 'flex-start',
        textAlignVertical: 'top',
        verticalAlign: 'top',
        justifyContent: 'flex-start',
        flexWrap: 'wrap',
        marginVertical: wp(0.5),
        fontWeight: 'bold',
        fontSize: wp(4),
        width: '50%',
    },
});
