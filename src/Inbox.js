import React, { useEffect, useState } from 'react';
import TopHeader from '../Components/TopHeader'
import { SafeAreaView } from 'react-native-safe-area-context'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
    View,
    StyleSheet,
    Text,
    FlatList,
    TouchableOpacity,
    Image,
} from 'react-native';
import imagesClass from '../asserts/imagepath';
import { ScrollView } from 'react-native-gesture-handler';

const Inbox = () => {
    const rulesData = [
        { id: '0', message: 'book success', code: '111', date: '05-11-2023', time: '01-04 am', BoxName: 'King', amount: '400' },
        { id: '1', message: 'book success', code: '111', date: '05-11-2023', time: '01-04 am', BoxName: 'King', amount: '400' },
        { id: '2', message: 'book success', code: '111', date: '05-11-2023', time: '01-04 am', BoxName: 'King', amount: '400' },
        { id: '3', message: 'book success', code: '111', date: '05-11-2023', time: '01-04 am', BoxName: 'King', amount: '400' },
        { id: '4', message: 'book success', code: '111', date: '05-11-2023', time: '01-04 am', BoxName: 'King', amount: '400' },
        { id: '5', message: 'book success', code: '111', date: '05-11-2023', time: '01-04 am', BoxName: 'King', amount: '400' },

        // for admin
        // { id: '5', message: 'book success', code: '111', date: '05-11-2023', time: '01-04 am', BoxName: 'King', amount: '400' , username:'kevin', phone:'1234567890'},

    ];

    const renderItem = ({ item }) => (
        <View style={styles.timeSlot}>

            <Text style={styles.textLeft}>Time    :{item.time}</Text>
            <Text style={styles.textLeft}>Date    :{item.date}</Text>
            <Text style={styles.textLeft}>BoxName :{item.BoxName}</Text>
            <Text style={styles.textLeft}>Amount  :{item.amount}</Text>
            <Text style={styles.textLeft}>code    :{item.code}</Text>
            <Text style={styles.textLeft}>message :{item.message}</Text>
        </View>
    );
    return (
        <SafeAreaView style={{ position: 'relative', marginBottom: hp(12) }}>
            <View style={{ position: 'relative' }}>
                <ScrollView >

                    <View >
                        <TopHeader name={"Inbox"} />
                    </View>

                    <View>
                        <Text style={{ color: '#000', marginTop: hp(8), fontSize: wp(6), marginHorizontal: wp(5) }}>
                            Genral Rules
                        </Text>
                    </View>
                    <View style={{ marginRight: wp(9), }}>
                        <FlatList
                            style={{ marginTop: hp(3), alignSelf: 'center', width: '95%', }}
                            data={rulesData}
                            showsVerticalScrollIndicator={false}
                            keyExtractor={item => item.id}
                            renderItem={renderItem}
                        />
                    </View>

                </ScrollView>

            </View>

        </SafeAreaView>
    )
}

export default Inbox

const styles = StyleSheet.create({
    timeSlot: {

        marginVertical: wp(2),
        paddingHorizontal: wp(2),
        borderWidth: wp(0.5), justifyContent: 'center'
        , borderColor: '#027850',
    }, textLeft: {
        alignSelf: 'flex-start', textAlignVertical: 'top', verticalAlign: 'top', justifyContent: 'flex-start', flex: 1, flexWrap: 'wrap', marginVertical: wp(1), fontWeight: 'bold', fontSize: wp(4)

    }
})