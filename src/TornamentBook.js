

import { StyleSheet, Text, View, } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import About from './About'
import CalanderFile from '../Components/CalanderFile'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Facilities from '../Components/Facilities'
import BackgroundSvg from '../asserts/svgs/BgImg'
import TopHeader from '../Components/TopHeader'
import TimeComp from '../Components/TimeComp'
import SlotTime from '../Components/SlotTime'

const TornamentBook = () => {
    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);
    const [tornament, settornament] = useState(false);
    const [caldate, setcalldat] = useState({});
    const scrollViewRef = useRef(null);

    const handleDateSelect = date => {
        // Reset startTime and endTime to null when the date is removed
        setcalldat(date);

    };


    const BookingPro = () => {
        console.log("preess");
    }
    const handleStartTimeChange = time => {
        setStartTime(time);
        // console.log(time, "++++start Times++++++++");
    };

    const handleEndTimeChange = time => {
        setEndTime(time);
        // console.log(time, "++++end Times++++++++");

    };

    const handletor = event => {
        settornament(event);
        console.log(event, "++++event++++++++");

    };
    // useEffect(() => {
    //     if (Object.keys(caldate).length !== 0 && startTime !== null && tornament === true) {
    //         // Scroll to the bottom when the condition is true.
    //         scrollViewRef.current.scrollToEnd({ animated: true });
    //     }
    // }, [caldate, startTime, tornament]);


    return (
        <View style={styles.mainView}>
            <ScrollView >
                <View >
                    <TopHeader name={"Book Your Tornament"} />
                </View>
                <View style={styles.sendView}>
                    {tornament === false ?
                        <Text Text style={styles.minHoursText}>
                            Please select  minimum 5 hours
                        </Text> : null}
                    <SlotTime onStartTimeChange={handleStartTimeChange} onEndTimeChange={handleEndTimeChange} tor={handletor} />
                </View>
                <View>

                    {Object.keys(caldate).length !== 0 && startTime !== null && tornament === true && (


                        <TouchableOpacity
                            style={styles.btn}
                            onPress={() => BookingPro()} >
                            <Text style={styles.payment}>
                                {startTime} to {endTime}
                            </Text>
                        </TouchableOpacity>

                    )}
                </View>
                <View style={styles.thiView} >
                    <CalanderFile datesselect={handleDateSelect} />
                </View>


            </ScrollView>
        </View>


    )
}

export default TornamentBook;

const styles = StyleSheet.create({
    minHoursText: {
        textAlign: 'center',
        fontSize: wp(4),
        color: 'red',
    },
    thiView: { marginHorizontal: wp(10), marginVertical: hp(2) },
    sendView: { flexWrap: 'wrap', flex: 1, justifyContent: 'center', alignSelf: 'center', marginTop: hp(4) },
    mainView: { flex: 1, marginBottom: hp(5), },
    btn: { margin: wp(3), height: 40, flex: 1 },
    payment: { color: '#fff', backgroundColor: '#027850', flex: 1, textAlign: 'center', textAlignVertical: 'center', fontSize: wp(5), borderRadius: wp(2), },

})