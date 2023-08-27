import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ScrollView,
    ActivityIndicator
} from 'react-native';
import React, { useState, useEffect } from 'react';
import ChangePass from '../Components/ChangePass';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FlashMessage, { showMessage, hideMessage, FlashMessageManager } from "react-native-flash-message";

const EditBoxD = ({ navigation, route }) => {
    const { item, index } = route.params;
    const [isLoading, setIsLoading] = useState(false);
    const [Name, setName] = useState(item.name);
    const [Mornig, setMorning] = useState(item.morning_price);
    const [Afteroon, setAfternoon] = useState(item.afternoon_price);
    const [Evening, setEvening] = useState(item.evening_price);
    const [Night, setNight] = useState(item.night_price);
    const [Tounament, setTounament] = useState(item.tournament);
    const [isSuper, setisSuper] = useState();
    const [bookingrights, setbookingrigh] = useState();


    useEffect(() => {
        fetchSuperAdminStatus();
    }, [])

    const fetchSuperAdminStatus = async () => {
        try {

            handleAdminCheck();
            const isUser = await AsyncStorage.getItem('superAdmin');
            setisSuper(isUser); // Convert the string to a boolean
        } catch (error) {
            // Handle error
        }
    };


    const handleAdminCheck = async () => {

        const phoneNumberToCheck = await AsyncStorage.getItem('adminnum');
        const hasBookingRights = await checkAdminByPhoneNumber(phoneNumberToCheck);
        if (hasBookingRights) {
            setbookingrigh(hasBookingRights.book_right)


        }
    };

    const checkAdminByPhoneNumber = async (phoneNumber) => {
        try {
            const response = await fetch('https://boxclub.in/Joker/Admin/index.php?what=getAllThirdParty');
            if (response.ok) {
                const data = await response.json();
                //console.log(data, '===admin');
                if (data && data.admins) {
                    const matchingAdmin = data.admins.find(admin => admin.phone === phoneNumber);
                    if (matchingAdmin) {

                        //console.log(matchingAdmin, '=====match===');
                        return matchingAdmin;
                    }
                }

            }
        } catch (error) {
            console.error('Error fetching admin data:', error);
        }
        return false; // Default to no booking rights or on error
    };


    const handlename = input => {
        setName(input);
    };
    const handlemornig = input => {
        setMorning(input);
    };
    const handleafternoone = input => {
        setAfternoon(input);
    };
    const handleEvening = input => {
        setEvening(input);
    };
    const handleNight = input => {
        setNight(input);
    };
    const handletounament = input => {
        setTounament(input);
    };
    const changePriceAPI = async () => {
        setIsLoading(true)
        const apiUrl = 'https://boxclub.in/Joker/Admin/index.php?what=updateBox';
        const Token = await AsyncStorage.getItem('token');

        //console.log(index, "========");
        const incrementedIndex = index + 1;

        const formData = new FormData();
        formData.append('id', incrementedIndex);
        formData.append('name', Name);
        formData.append('address', 'Anthem compound, NR. Harekrishna village Restaurant, simada kenal road');
        formData.append('open_time', '00:00');
        formData.append('close_time', '00:00');
        formData.append('morning_start', '06:00');
        formData.append('morning_end', '12:00');
        formData.append('morning_price', Mornig);
        formData.append('afternoon_start', '12:00');
        formData.append('afternoon_end', '18:00');
        formData.append('afternoon_price', Afteroon);
        formData.append('evening_start', '18:00');
        formData.append('evening_end', '00:00');
        formData.append('evening_price', Evening);
        formData.append('night_start', '00:00');
        formData.append('night_end', '06:00');
        formData.append('night_price', Night);
        formData.append('tournament', Tounament);
        formData.append('updateImages', 'no');
        //console.log(formData);
        //console.log(Token);
        // Append more parameters as needed

        axios({
            url: apiUrl,
            method: 'POST',
            data: formData,
            headers: {
                Accept: 'application/json',
                'Content-Type': 'multipart/form-data',
                'token': Token
            }
        })
            .then(response => {
                setIsLoading(false)
                //console.log('Response:', response.data.success);
                showMessage({
                    message: response.data.success ? 'Data SuccessFully Updated' : 'something went wrong',
                    type: response.data.success ? 'success' : 'danger',
                    backgroundColor: response.data.success ? "green" : 'red', // background color
                    color: "#fff", // text color
                    onHide: () => {
                        response.data.success && navigation.pop()
                    }
                });
                // Handle successful response, update state, etc.
            })
            .catch(error => {
                showMessage({
                    message: 'something went wrong',
                    type: "danger",
                    backgroundColor: "red", // background color
                    color: "#fff", // text color
                });
                setIsLoading(false)
                console.error('Error:', error);
                // Handle error, show error message, etc.
            });
    }
    return (
        <View>
            <ScrollView>
                <ChangePass
                    name={'Box Name'}
                    headerText={'Box Name'}
                    onChangeText={handlename}
                    defaults={item.name}
                />
                <ChangePass
                    name={'Morning price'}
                    headerText={'Morning price 06:12 AM'}
                    onChangeText={handlemornig} defaults={item.morning_price}

                />
                <ChangePass
                    name={'Afternoon price'}
                    headerText={'Afternoon price 12:06 PM'}
                    onChangeText={handleafternoone}
                    defaults={item.afternoon_price}
                />
                <ChangePass
                    name={'Evening price'}
                    headerText={'Evening price 06:12 PM'}
                    onChangeText={handleEvening}
                    defaults={item.evening_price}
                />
                <ChangePass
                    name={'Night price'}
                    headerText={'Night price 12:06 AM'}
                    onChangeText={handleNight}
                    defaults={item.night_price}
                />
                <ChangePass
                    name={'Tournament price'}
                    headerText={'Tournament price '}
                    onChangeText={handletounament}
                    defaults={item.tournament}
                />
                {isSuper === 'true' ?

                    <TouchableOpacity style={styles.bookbtn} onPress={() => changePriceAPI()}>
                        <Text style={styles.booktxt}>Change Price</Text>
                    </TouchableOpacity>
                    :
                    bookingrights &&

                    <TouchableOpacity style={styles.bookbtn} onPress={() => changePriceAPI()}>
                        <Text style={styles.booktxt}>Change Price</Text>
                    </TouchableOpacity>
                }
            </ScrollView>
            {isLoading && (
                <ActivityIndicator size="large" color="#0000ff" style={{ position: 'absolute', justifyContent: 'center', alignSelf: 'center', height: '100%' }} />)}

        </View>
    );
};

export default EditBoxD;

const styles = StyleSheet.create({
    booktxt: {
        color: '#fff',
        alignSelf: 'center',
        textAlignVertical: 'center',
        flex: 1,
        fontSize: wp(4),
    },
    bookbtn: {
        backgroundColor: '#027850',
        height: hp(6),
        width: '90%',
        alignSelf: 'center',
        marginBottom: hp(5),
        borderRadius: wp(2),
    },
});
