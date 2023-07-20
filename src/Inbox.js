import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import TounamentDate from '../Components/TounamentDate'
import About from './About'
import CalanderFile from '../Components/CalanderFile'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Facilities from '../Components/Facilities'
import BackgroundSvg from '../asserts/svgs/BgImg'
import TopHeader from '../Components/TopHeader'

const Inbox = () => {
    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);
    const [caldate, setcalldat] = useState(null);
    const handleDateSelect = date => {
        setcalldat(date)
        console.log(date, "====dates=====");
        console.log(caldate, "====dates=====");
    }
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
    return (
        <View style={{ flex: 1, marginBottom: hp(13), }}>
            <ScrollView>

                <View >
                    <TopHeader name={"Rules"} />
                </View>
                <View style={{ flexWrap: 'wrap', flex: 1, justifyContent: 'center', alignSelf: 'center', marginTop: hp(4) }}>
                    <About onStartTimeChange={handleStartTimeChange} onEndTimeChange={handleEndTimeChange} />
                </View>
                <View style={{ margin: wp(10) }} >
                    <CalanderFile datesselect={handleDateSelect} />
                </View>
                <View>
                    {startTime !== null && endTime !== null && (
                        <TouchableOpacity
                            style={{ margin: wp(3), height: 40, flex: 1 }}
                            onPress={() => BookingPro()}
                        >
                            <Text style={styles.payment}>
                                {startTime} to {endTime}
                            </Text>
                        </TouchableOpacity>
                    )}
                </View>

            </ScrollView>
        </View>


    )
}

export default Inbox

const styles = StyleSheet.create({
    mainView: { flexDirection: 'row', },
    payment: { color: '#fff', backgroundColor: '#027850', flex: 1, textAlign: 'center', textAlignVertical: 'center', fontSize: wp(5), borderRadius: wp(2), },

})