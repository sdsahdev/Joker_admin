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
import base64 from 'react-native-base64';
import axios from 'axios'
import SearchBar from '../Components/SearchBar';

const CancelReq = ({ navigation }) => {
    const [idata, setidata] = useState([])
    const isFocused = useIsFocused(); // Get the screen's focused state
    const [user, setuser] = useState('')
    const [searchText, setSearchText] = useState('');
    const [idata2, setidata2] = useState([]);
    useEffect(() => {
        // Call the API when the component mounts
        //console.log("+++++++");
        fetchData();
        inboxapi();
    }, [isFocused]);

    const fetchData = async () => {
        try {
            const user1 = await AsyncStorage.getItem('superAdmin');
            //console.log(user1, "==end===");
            setuser(user1);
        } catch (error) {
            //console.log("Error fetching user:", error);
        }
    };


    const getPaymentDetails = async (paymentId) => {
        try {
            const keyId = await AsyncStorage.getItem('rkey');
            const keySecret = await AsyncStorage.getItem('rskey');

            const url = `https://api.razorpay.com/v1/payments/${paymentId}`;
            const basicAuth = `Basic ${base64.encode(`${keyId}:${keySecret}`)}`;

            const response = await axios.get(url, {
                headers: {
                    Authorization: basicAuth,
                },
            });

            if (response.status === 200) {
                const paymentDetails = response.data;
                return paymentDetails;
            } else {
                showMessage({
                    message: 'Failed to get payment details with status code',
                    type: "Danger",
                    backgroundColor: "red", // background color
                    color: "#fff", // text color
                });
                //console.log('====Failed to get payment details with status code=====', response.status);
                throw new Error('Failed to get payment details');
            }
        } catch (error) {

            showMessage({
                message: 'something went wrong',
                type: "Danger",
                backgroundColor: "red", // background color
                color: "#fff", // text color
            });
            //console.log('====Error getting payment details:=====', error);
            throw error;
        }
    };

    async function capturePayment(paymentId, amount, uPhone) {
        const keyId = await AsyncStorage.getItem('rkey');
        const keySecret = await AsyncStorage.getItem('rskey');

        const url = `https://api.razorpay.com/v1/payments/${paymentId}/capture`;
        const captureRequest = {
            amount: amount, // Amount in smallest currency unit (e.g., paise for INR)
        };

        const basicAuth = `Basic ${base64.encode(`${keyId}:${keySecret}`)}`;

        try {
            const response = await axios.post(url, captureRequest, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: basicAuth,
                },
            });

            if (response.status === 200) {
                const responseData = response.data;
                //console.log('Capture success:', responseData);
                refundFinal(amount, paymentId)
                return responseData;
            } else {
                //console.log('Capture request failed with status code', response);
                showMessage({
                    message: 'Capture request failed',
                    type: "Danger",
                    backgroundColor: "red", // background color
                    color: "#fff", // text color
                });

                throw new Error('===Capture request failed====');
            }
        } catch (error) {
            showMessage({
                message: 'something went wrong',
                type: "Danger",
                backgroundColor: "red", // background color
                color: "#fff", // text color
            });
            //console.log('=====Error capturing payment:=====', error);
            throw error;
        }
    }

    const refundFinal = async (amount, paymentId, uPhone) => {
        const keyId = await AsyncStorage.getItem('rkey')
        const keySecret = await AsyncStorage.getItem('rskey')

        const refundPercentage = 80; // 20% refund
        const refundAmount = Math.floor(amount * (refundPercentage / 100));

        const url = `https://api.razorpay.com/v1/payments/${paymentId}/refund`;
        const refundRequest = {
            amount: refundAmount,
            speed: 'normal',
            notes: {
                notes_key_1: `Refund bye app ${uPhone} `,
            },

        };
        const basicAuth = `Basic ${base64.encode(`${keyId}:${keySecret}`)}`;
        try {
            const response = await axios.post(url, refundRequest, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: basicAuth,
                },
            });
            if (response.status === 200) {
                showMessage({
                    message: 'Refund success',
                    type: "success",
                    backgroundColor: "green", // background color
                    color: "#fff", // text color
                });
                const responseData = response.data;
                //console.log('=====Refund success:=====', responseData);
            } else {
                showMessage({
                    message: 'Refund request failed with status code ',
                    type: "Danger",
                    backgroundColor: "red", // background color
                    color: "#fff", // text color
                });
                //console.log('===Refund request failed with status code=========', response);
            }

        } catch (error) {
            showMessage({
                message: "something went wrong",
                type: "Danger",
                backgroundColor: "red", // background color
                color: "#fff", // text color
            });
            //console.log('====Error creating refund request:=====', error);
        }

    }
    const processRefund = async (paymentId, uPhone) => {

        const captureResponse = await getPaymentDetails(paymentId);

        //console.log(captureResponse.captured, "=====check capture==");
        if (captureResponse && captureResponse.captured === 'true') {
            refundFinal(captureResponse.amount, paymentId, uPhone)
        } else {
            capturePayment(paymentId, captureResponse.amount, uPhone)
            // throw new Error('Payment capture failed');
        }
    };

    const inboxapi = async () => {

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
                //console.log(data)
                if (data.success) {
                    setidata(data.bookings)
                    setidata2(data.bookings)
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
    const handleSerach = e => {
        setSearchText(e)
        let text = e.toLowerCase();
        let filteredData = idata2.filter(item => {
            // "phone": "1234567111",

            return (
                item.code.toLowerCase().match(text) ||
                item.username.toLowerCase().match(text) ||
                item.phone.toLowerCase().match(text) ||
                item.time.toLowerCase().match(text) ||
                item.date.toLowerCase().match(text) ||
                item.BoxName.toLowerCase().match(text) ||
                item.amount.toLowerCase().match(text) ||
                item.message.toLowerCase().match(text) ||
                item.cancelRequestTime.toLowerCase().match(text) ||
                item.bookingTime.toLowerCase().match(text)

            );
        });

        if (!text || text === '') {
            setSearchText('');
            inboxapi();
        } else if (!filteredData.length) {
            //console.log('no data');
        } else if (Array.isArray(filteredData)) {
            setidata(filteredData);
        }
    };

    const appApi = async (id, event, uPhone) => {
        const token = await AsyncStorage.getItem("token")

        //console.log(id);
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
                    //console.log(data.user_data[0].payment_id, "---");
                    processRefund(data.user_data[0].payment_id, uPhone);

                    inboxapi();
                    //console.log(data, '=======apicalling if');
                    showMessage({
                        message: 'Success',
                        type: "Success",
                        backgroundColor: "green", // background color
                        color: "#fff", // text color
                    });
                } else {
                    //console.log(data);
                    //console.log(data, '=======apicalling else');

                    showMessage({
                        message: 'Fail the event',
                        type: "Danger",
                        backgroundColor: "red", // background color
                        color: "#fff", // text color
                    });

                }
            })
            .catch(error => {
                showMessage({
                    message: 'something went wrong',
                    type: "Danger",
                    backgroundColor: "red", // background color
                    color: "#fff", // text color
                });
                // Handle errors here
                console.error('=====API  error:=========', error);
            });
    }


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

    const formatDateTime = (inputDateTime) => {
        const date = new Date(inputDateTime);

        const day = date.getDate();
        const month = date.getMonth() + 1; // Month is 0-indexed
        const year = date.getFullYear();

        const hours = date.getHours();
        const minutes = date.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';

        const formattedDay = day < 10 ? `0${day}` : day;
        const formattedMonth = month < 10 ? `0${month}` : month;
        const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
        const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

        return `${formattedDay}-${formattedMonth}-${year} ${formattedHours}:${formattedMinutes} ${ampm}`;
    };
    const renderItem = ({ item }) => {


        const formattedDate = formatDate(item.date)
        const cancelRequestTime = formatDateTime(item.cancelRequestTime)
        const bookingTime = formatDateTime(item.bookingTime)

        return (
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
                    <Text style={[styles.textLeft, { color: 'red' }]}>{formattedDate}</Text>
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
                    <Text style={[styles.textLeft, { color: 'red' }]}>{item.code}</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>

                    <Text style={styles.textLeft}>Booking date</Text>
                    <Text style={[styles.textLeft, { color: 'red' }]}>{bookingTime}</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>

                    <Text style={styles.textLeft}>Cancel Time</Text>
                    <Text style={[styles.textLeft, { color: 'red' }]}>{cancelRequestTime}</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>

                    <Text style={styles.textLeft}>message</Text>
                    <Text style={styles.textLeft}>{item.message}</Text>
                </View>

                {
                    user === 'true' ?

                        <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity
                                style={styles.btn}
                                onPress={() => appApi(item.id, "approve", item.phone)} >
                                <Text style={styles.payment}>
                                    Approve
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.btn}
                                onPress={() => appApi(item.id, "deny", item.phone)} >
                                <Text style={styles.payment}>
                                    Denied
                                </Text>
                            </TouchableOpacity>
                        </View>
                        : null}
            </View>
        );
    }
    return (
        <View style={{ position: 'relative' }}>
            <View style={{ position: 'relative' }}>
                <ScrollView >

                    <View >
                        <TopHeader name={"Cancellation Request"} />
                    </View>
                    <SearchBar searchText={searchText} onChangeSearchText={handleSerach} filter={false} />


                    <View style={{ marginRight: wp(9), width: '100%', marginBottom: hp(12) }}>
                        <FlatList
                            style={{ marginTop: hp(0.2), alignSelf: 'center', width: '95%', }}
                            data={idata}
                            showsVerticalScrollIndicator={false}
                            keyExtractor={item => item.id}
                            renderItem={renderItem}
                        />
                    </View>

                </ScrollView>

            </View>

        </View>
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