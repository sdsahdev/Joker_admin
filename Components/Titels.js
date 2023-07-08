import { StyleSheet, Text, View, SafeAreaView, Image } from 'react-native'
import React from 'react'
import imagesClass from '../asserts/imagepath'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
const Titels = () => {
    <SafeAreaView style={{ width: "100%", height: hp(3), flexDirection: 'row', justifyContent: 'space-between', marginVertical: wp(2), marginHorizontal: wp(4) }}>

        <Text style={{
            width: 'auto',
            height: 'auto',
            fontSize: 18,
            color: '#000',
        }}>Sports academy</Text>
        <Text style={{
            width: 'auto',
            height: 'auto',
            fontSize: 18,
            color: '#000',
            paddingRight: wp(10)
        }}>$600/hr</Text>
    </SafeAreaView>
}
export default Titels;

const styles = StyleSheet.create({
    mainstyle: {
        width: "100%", height: hp(3), flexDirection: 'row', alignItems: 'center', marginHorizontal: wp(4)
    },
    textStyle: {
        width: 'auto',
        height: 'auto',
        fontSize: wp(4),
        marginLeft: wp(2)
    },
    clocks: {
        width: wp(5),
        height: wp(5),
    },

})
