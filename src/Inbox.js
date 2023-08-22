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
import AsyncStorage from '@react-native-async-storage/async-storage';
import FlashMessage, { showMessage, hideMessage, FlashMessageManager } from "react-native-flash-message";
import { useIsFocused } from '@react-navigation/native'; // Import the hook

const Inbox = ({ navigation }) => {
    const [idata, setidata] = useState([])
    const isFocused = useIsFocused(); // Get the screen's focused state
    useEffect(() => {

        handleAdminCheck();
    }, [])
    useEffect(() => {
        // Call the API when the component mounts
        console.log("+++++++");
        inboxapi();
    }, [isFocused]);
    inboxapi = async () => {
        const Token = await AsyncStorage.getItem('token');

        fetch('https://boxclub.in/Joker/Admin/index.php?what=showInboxAdmin', {
            method: 'POST', // Assuming you want to use POST method
            headers: {
                'Content-Type': 'application/json',
                token: Token
            },
        })
            .then(response => response.json())
            .then(data => {
                // Handle the response data here
                console.log(data)
                if (data.success) {
                    setidata(data.bookings)
                } else {
                    showMessage({
                        message: data.message,
                        type: "Danger",
                        backgroundColor: "red", // background color
                        color: "#fff", // text color
                    });

                }
            })
            .catch(error => {
                // Handle any errors here
                console.error('Error:', error);
            });
    }
    const handleAdminCheck = async () => {

        const phoneNumberToCheck = await AsyncStorage.getItem('adminnum');
        const hasBookingRights = await checkAdminByPhoneNumber(phoneNumberToCheck);
        if (hasBookingRights) {
            // Admin has booking rights
            console.log(hasBookingRights.book_right, 'admin found');
            console.log(hasBookingRights.status, 'admin found');
            // setbookingrigh(hasBookingRights.book_right)
            // setloginright(hasBookingRights.status)
            if (hasBookingRights.status === 'block') {
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'loginSceen' }],
                });
            }
            // Add your logic here, e.g., render specific UI, perform actions, etc.
        } else {
            console.log('superadmin found');
            // Admin does not have booking rights or is not active
            // Add your logic here, if needed
        }
    };

    const checkAdminByPhoneNumber = async (phoneNumber) => {
        try {
            const response = await fetch('https://boxclub.in/Joker/Admin/index.php?what=getAllThirdParty');
            if (response.ok) {
                const data = await response.json();
                console.log(data, '===admin');
                if (data && data.admins) {
                    const matchingAdmin = data.admins.find(admin => admin.phone === phoneNumber);
                    if (matchingAdmin) {

                        console.log(matchingAdmin, '=====match===');
                        return matchingAdmin;
                    }
                }

            }
        } catch (error) {
            console.error('Error fetching admin data:', error);
        }
        return false; // Default to no booking rights or on error
    };

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
    const formatDate = (inputDate) => {
        const date = new Date(inputDate);
        const day = date.getDate();
        const month = date.getMonth() + 1; // Month is 0-indexed
        const year = date.getFullYear();

        // Pad day and month with leading zero if needed
        const formattedDay = day < 10 ? `0${day}` : day;
        const formattedMonth = month < 10 ? `0${month}` : month;

        return `${formattedDay}-${formattedMonth}-${year}`;
    };
    const renderItem = ({ item }) => {


        const formattedDate = formatDate(item.date)

        return (
            <View style={styles.timeSlot}>
                <View style={{ flexDirection: 'row' }}>

                    <Text style={styles.textLeft}>code</Text>
                    <Text style={[styles.textLeft, { color: 'red' }]}>{item.code}</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>

                    <Text style={styles.textLeft}>Username</Text>
                    <Text style={styles.textLeft}>{item.username}</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>

                    <Text style={styles.textLeft}>Phone</Text>
                    <Text style={styles.textLeft}>{item.phone}</Text>
                </View>
                <View style={{ flexDirection: 'row', }}>

                    <Text style={styles.textLeft}>Time</Text>
                    <Text style={styles.textLeft}>{item.time}</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>

                    <Text style={styles.textLeft}>Date</Text>
                    <Text style={[styles.textLeft, { color: 'red' }]}>{formattedDate}</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>

                    <Text style={styles.textLeft}>BoxName</Text>
                    <Text style={styles.textLeft}>{item.BoxName}</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>

                    <Text style={styles.textLeft}>Amount</Text>
                    <Text style={styles.textLeft}>{item.amount}</Text>
                </View>

                <View style={{ flexDirection: 'row' }}>

                    <Text style={styles.textLeft}>message</Text>
                    <Text style={styles.textLeft}>{item.message}</Text>
                </View>
                {/* {item.message === 'booked' ?
                <TouchableOpacity
                    style={styles.btn}
                    onPress={() => navigation.navigate('Cancel', {
                        ids: item.id
                    })} >
                    <Text style={styles.payment}>
                    Cancellation
                    </Text>
                </TouchableOpacity> : null} */}
            </View>
        );
    };
    return (
        <SafeAreaView style={{ position: 'relative' }}>
            <View style={{ position: 'relative' }}>
                <ScrollView >

                    <View >
                        <TopHeader name={"Inbox"} />
                    </View>

                    <View style={{ marginRight: wp(9), width: '100%', marginBottom: hp(12) }}>
                        <FlatList
                            style={{ marginTop: hp(4), alignSelf: 'center', width: '95%', }}
                            data={idata}
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
    btn: { margin: wp(3), height: 40, flex: 1 },
    payment: { color: '#fff', backgroundColor: '#027850', flex: 1, textAlign: 'center', textAlignVertical: 'center', fontSize: wp(5), borderRadius: wp(2), },
    timeSlot: {
        marginVertical: wp(2),
        paddingHorizontal: wp(2),
        borderWidth: wp(0.5), justifyContent: 'center'
        , borderColor: '#027850',
        borderRadius: wp(2), paddingVertical: hp(1)
    }, textLeft: {
        alignSelf: 'flex-start', textAlignVertical: 'top', verticalAlign: 'top', justifyContent: 'flex-start', flex: 1, flexWrap: 'wrap', marginVertical: wp(0.5), fontWeight: 'bold', fontSize: wp(4)
    }
})