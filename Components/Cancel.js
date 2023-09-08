import React, { useEffect, useState } from 'react';
import TopHeader from '../Components/TopHeader';
import { SafeAreaView } from 'react-native-safe-area-context';
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
const Cancel = () => {

    const Refunds = [
        {
            id: '1',
            rule: 'Users can cancel their booking up to 48 hours before the scheduled booking time to be eligible for a refund.',
        },
        {
            id: '2',
            rule: 'If a user cancels their booking within 48 hours before the scheduled booking time, no refund will be provided.',
        },
        {
            id: '3',
            rule: 'If a user cancels their booking before 48 hours of the scheduled booking time, they will be eligible for a refund of 80% of the booking price.',
        },
        { id: '4', rule: 'Users must initiate the refund request through the app.' },
        {
            id: '5',
            rule: 'Upon successful refund request, the refund amount will be processed within some working days.',
        },
        {
            id: '6',
            rule: 'The refunded amount will be directly credited to the users bank account through the original payment method used for the booking.',
        },
        {
            id: '7',
            rule: 'No refund will be provided for cancellations made within 48 hours of the scheduled booking time.',
        },
        {
            id: '8',
            rule: 'No refund will be provided for no-shows or late arrivals. Users must arrive on time for their booking.',
        },
        {
            id: '9',
            rule: 'In case of any unforeseen circumstances or maintenance issues, the turf management reserves the right to cancel a booking.',
        },
        {
            id: '10',
            rule: 'Users will be provided with a full refund if the cancellation is initiated by the turf management.',
        },
        {
            id: '11',
            rule: 'In case of any dispute regarding refunds, users can contact our customer support team to resolve the issue.',
        },
    ];
    const renderItem = ({ item }) => (
        <View style={styles.timeSlot}>
            <Image
                source={imagesClass.Arrow}
                resizeMode="center"
                style={{ height: hp(1.5), alignSelf: 'center' }}
            />
            <Text style={styles.textLeft}>{item.rule}</Text>
        </View>
    );
    return (
        <View
            style={{ position: 'relative', marginBottom: hp(12), height: '100%' }}>
            <View style={{ position: 'relative' }}>
                <ScrollView>
                    <View>
                        <TopHeader name={'Cencle And Refund Policiy'} />
                    </View>

                    <View>
                        <FlatList
                            style={{ marginTop: hp(5) }}
                            data={Refunds}
                            showsVerticalScrollIndicator={false}
                            keyExtractor={item => item.id}
                            renderItem={renderItem}
                        />

                        <TouchableOpacity
                            style={styles.btn}
                            onPress={() => 'Fcancle reqest'}>
                            <Text style={styles.payment}>cancle You slot</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        </View>
    );
};

export default Cancel;

const styles = StyleSheet.create({
    btn: { margin: wp(3), height: 40, flex: 1, marginBottom: hp(5) },
    payment: {
        color: '#fff',
        backgroundColor: '#027850',
        flex: 1,
        textAlign: 'center',
        textAlignVertical: 'center',
        fontSize: wp(5),
        borderRadius: wp(2),
    },
    timeSlot: {
        flexDirection: 'row',
        marginVertical: wp(2),
        paddingHorizontal: wp(2),
    },
    textLeft: {
        alignSelf: 'flex-start',
        textAlignVertical: 'top',
        verticalAlign: 'top',
        justifyContent: 'flex-start',
        flex: 1,
        flexWrap: 'wrap',
    },
});
