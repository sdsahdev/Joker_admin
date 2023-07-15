import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import imagesClass from '../asserts/imagepath'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Back from '../asserts/svgs/Back';
import Icon from '../asserts/svgs/Back';
import { Svg, G, Rect, Path, Defs, Filter, FeFlood, FeGaussianBlur, FeComposite, FeBlend, Stop, LinearGradient } from 'react-native-svg';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';

const CalanderFile = () => {
    const [selectedDates, setSelectedDates] = useState({});

    const onDayPress = (day) => {
        // Handle the selection of multiple dates
        const selectedDay = day.dateString;
        const updatedSelectedDates = { ...selectedDates };

        if (updatedSelectedDates[selectedDay]) {
            delete updatedSelectedDates[selectedDay];
        } else {
            updatedSelectedDates[selectedDay] = { selected: true };
        }

        setSelectedDates(updatedSelectedDates);
    };
    useEffect(() => {
        console.log(selectedDates, "====dates=====");
    }, [selectedDates]);
    return (
        <SafeAreaView style={styles.container}>
            <Calendar
                style={{
                    borderWidth: 1,
                    borderColor: 'gray',
                    height: 350
                }}
                // Customize the appearance of the calendar
                markedDates={selectedDates}
                onDayPress={onDayPress}
                minDate={Date()} // Disable past dates
                maxDate={new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)}
            // Show up to 1 year ahead
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        height: '100%'
    },
});


export default CalanderFile