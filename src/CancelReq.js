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

const CancelReq = ({ navigation }) => {
    const [idata, setidata] = useState([])
    const isFocused = useIsFocused(); // Get the screen's focused state

    useEffect(() => {
        // Call the API when the component mounts
        console.log("+++++++");
        inboxapi();
    }, [isFocused]);
    inboxapi = async () => {
        const Token = await AsyncStorage.getItem('token');

        fetch('https://boxclub.in/Joker/Admin/index.php?what=getAllCancelRequest', {
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

    const appApi = async (id, event) => {
        const token = await AsyncStorage.getItem("token")

        console.log(id);
        fetch('https://boxclub.in/Joker/Admin/index.php?what=updateRequestStatus', {
            method: 'POST', // Assuming you want to use POST method
            headers: {
                'Content-Type': 'application/json',
                token: token
                // Set the content type to JSON
            },

            body: JSON.stringify({
                booking_id: id,
                status: event
            }), // Convert the data to JSON string
        })
            .then(response => response.json())
            .then(data => {
                // Handle the data here
                if (data.success) {
                    inboxapi();
                    showMessage({
                        message: data.message,
                        type: "Success",
                        backgroundColor: "green", // background color
                        color: "#fff", // text color
                    });
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
                // Handle errors here
                console.error('API  error:', error);
            });
    }
    /*
     "id": "3",
     "username": "testuser",
     "phone": "6359268603",
     "date": "2023-08-12",
     "time": "11:00PM-12:00AM"  
     "BoxName": "king",
     "amount": "1000.00",
     "code": "JOKE3",
     "start_time": "1691881200",
                "end_time": "1691884800",
                "message": "cancel_request",
    */

    const renderItem = ({ item }) => (
        <View style={styles.timeSlot}>
            <View style={{ flexDirection: 'row' }}>

                <Text style={styles.textLeft}>Username</Text>
                <Text style={styles.textLeft}>{item.username}</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>

                <Text style={styles.textLeft}>Phone</Text>
                <Text style={styles.textLeft}>{item.phone}</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>

                <Text style={styles.textLeft}>Date</Text>
                <Text style={styles.textLeft}>{item.date}</Text>
            </View>
            <View style={{ flexDirection: 'row', }}>

                <Text style={styles.textLeft}>Time</Text>
                <Text style={styles.textLeft}>{item.time}</Text>
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

                <Text style={styles.textLeft}>code</Text>
                <Text style={styles.textLeft}>{item.code}</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>

                <Text style={styles.textLeft}>message</Text>
                <Text style={styles.textLeft}>{item.message}</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity
                    style={styles.btn}
                    onPress={() => appApi(item.id, "approve")} >
                    <Text style={styles.payment}>
                        Approve
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.btn}
                    onPress={() => appApi(item.id, "deny")} >
                    <Text style={styles.payment}>
                        Denied
                    </Text>
                </TouchableOpacity>
            </View>

        </View>
    );
    return (
        <SafeAreaView style={{ position: 'relative' }}>
            <View style={{ position: 'relative' }}>
                <ScrollView >

                    <View >
                        <TopHeader name={"Cancellation Request"} />
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

export default CancelReq

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