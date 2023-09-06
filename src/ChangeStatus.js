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
    ActivityIndicator
} from 'react-native';
import imagesClass from '../asserts/imagepath';
import { ScrollView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import OneItem from '../Components/OneItem';
import FlashMessage, { showMessage, hideMessage, FlashMessageManager } from "react-native-flash-message";
import ProgressLoader from 'rn-progress-loader';
const ChangeStatus = ({ navigation }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [rulesData, setData] = useState([]);

    useEffect(() => {
        // Call the API when the component mounts
        //console.log("+++++++");
        fetchBoxData();
    }, []);

    const fetchBoxData = async () => {
        //console.log("-----------");
        try {
            setIsLoading(true)
            const token = await AsyncStorage.getItem("token")

            const response = await fetch('https://boxclub.in/Joker/Admin/index.php?what=getAllThirdParty', {
                headers: {
                    token: token,
                    'Content-Type': 'application/json',
                },
            })

            if (!response.ok) {
                //console.log("not ok");
                setIsLoading(false)
                throw new Error('Network response was not ok');
            } else {
                setIsLoading(false)
            }
            const jsonData = await response.json();
            //console.log(jsonData);
            setData(jsonData.admins);
        } catch (error) {
            //console.log('Error:', error);
            setIsLoading(false)
        }
    };


    const changeLogin = async (item) => {

        const token = await AsyncStorage.getItem("token")
        //console.log(token, "-----");
        setIsLoading(true)
        const apiUrl = 'https://boxclub.in/Joker/Admin/index.php?what=statusChangeForAdmin';
        const data = {
            id: item.id,
            status: item.status === "active" ? "block" : "active",
            type: "status_update"
        };

        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                token: token,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            setIsLoading(false)
            throw new Error('Network response was not ok');
        }
        if (response.ok) {
            setIsLoading(false)
            const data = await response.json();

            if (data.success) {
                showMessage({
                    message: data.message,
                    type: "Success",
                    backgroundColor: "green", // background color
                    color: "#fff", // text color

                });
                fetchBoxData();
            } else {
                //console.log(data.message, "jj");
                showMessage({
                    message: data.message,
                    type: "Danger",
                    duration: 3000,
                    backgroundColor: "red", // background color
                    color: "#fff", // text color
                });
            }
        } else {
            setIsLoading(false)
            showMessage({
                message: "data. s",
                type: "Danger",
                backgroundColor: "red", // background color
                color: "#fff", // text color
                duration: 3000
            });
        }
    };

    const changeBooking = async (item) => {
        setIsLoading(true)
        const token = await AsyncStorage.getItem("token")
        //console.log(token, "-----");
        const apiUrl = 'https://boxclub.in/Joker/Admin/index.php?what=statusChangeForAdmin';
        const data = {
            id: item.id,
            status: item.book_right === true ? "0" : "1",
            type: "right_update"
        };
        //console.log(item.book_right === true ? "0" : "1");
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                token: token,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        if (response.ok) {
            setIsLoading(false)
            const data = await response.json();

            if (data.success) {
                showMessage({
                    message: data.message,
                    type: "Success",
                    backgroundColor: "green", // background color
                    color: "#fff", // text color

                });
                fetchBoxData();
            } else {
                //console.log(data.message, "jj");
                showMessage({
                    message: data.message,
                    type: "Danger",
                    duration: 3000,
                    backgroundColor: "red", // background color
                    color: "#fff", // text color
                });
            }
        } else {
            setIsLoading(false)
            showMessage({
                message: "data. s",
                type: "Danger",
                backgroundColor: "red", // background color
                color: "#fff", // text color
                duration: 3000
            });
        }
    };


    const renderItem = ({ item }) => (
        <View style={styles.timeSlot}>
            <OneItem name={item.name} keyname={"Name"} />
            <OneItem name={item.email} keyname={'Email'} />
            <OneItem name={item.phone} keyname={'phone'} />
            <OneItem name={item.status === 'active' ? 'on' : 'off'} keyname={'Login'} />
            <OneItem name={item.book_right === true ? 'on' : 'off'} keyname={'book permission'} />

            <View style={{ flexDirection: 'row' }}>

                <TouchableOpacity style={styles.bookbtn} onPress={() => changeLogin(item)}>
                    <Text style={styles.booktxt}>
                        Login status change
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.bookbtn} onPress={() => changeBooking(item)}>
                    <Text style={styles.booktxt}>
                        permission
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
    return (
        <SafeAreaView style={{ position: 'relative', flex: 1 }}>
            <FlashMessage />
            <ProgressLoader
                visible={isLoading}
                isModal={true} isHUD={true}
                hudColor={"#fff"}
                color={"#027850"} />
            <View style={{ position: 'relative' }}>
                <ScrollView >

                    <View >
                        <TopHeader name={"Change Admin Status"} />
                    </View>

                    <View style={{ marginRight: wp(9), width: '100%', marginBottom: hp(12) }}>
                        <FlatList
                            style={{ marginTop: hp(4), alignSelf: 'center', width: '95%', }}
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

export default ChangeStatus

const styles = StyleSheet.create({
    booktxt: { color: '#fff', alignSelf: 'center', textAlignVertical: 'center', flex: 1, fontSize: wp(4) },
    bookbtn: { backgroundColor: '#027850', height: hp(5), flex: 1, alignSelf: 'center', borderRadius: wp(2), marginVertical: hp(2), marginHorizontal: wp(2) },

    btn: { margin: wp(3), height: 40, flex: 1 },
    payment: { color: '#fff', backgroundColor: '#027850', flex: 1, textAlign: 'center', textAlignVertical: 'center', fontSize: wp(5), borderRadius: wp(2), },
    timeSlot: {
        marginVertical: wp(2),
        paddingHorizontal: wp(2),
        borderWidth: wp(0.5), justifyContent: 'center'
        , borderColor: '#027850',
        borderRadius: wp(2)
    }, textLeft: {
        alignSelf: 'flex-start', textAlignVertical: 'top', verticalAlign: 'top', justifyContent: 'flex-start', flex: 1, flexWrap: 'wrap', marginVertical: wp(0.5), fontWeight: 'bold', fontSize: wp(4)

    }
})