import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const PaymentBtn = ({ txt, txt2 }) => {
    return (
        <View style={styles.mainView}>

            <View style={{ margin: wp(3), height: 40, flex: 1 }}>
                <Text style={styles.payment}>
                    {txt}
                </Text>
            </View>

            <View style={{ margin: wp(3), height: 40, flex: 1 }}>
                <Text style={styles.payment}>
                    {txt2}
                </Text>
            </View>
        </View>
    )
}

export default PaymentBtn

const styles = StyleSheet.create({
    mainView: { flexDirection: 'row', flex: 1 },
    payment: { color: '#fff', backgroundColor: '#027850', flex: 1, textAlign: 'center', textAlignVertical: 'center', fontSize: wp(5), borderRadius: wp(2), },


})