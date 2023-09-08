import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import imagesClass from '../asserts/imagepath'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Back from '../asserts/svgs/Back';
import Icon from '../asserts/svgs/Back';
import { Svg, G, Rect, Path, Defs, Filter, FeFlood, FeGaussianBlur, FeComposite, FeBlend, Stop, LinearGradient } from 'react-native-svg';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import moment from 'moment';
import PaymentBtn from './PaymentBtn';

const CalanderFile = ({ datesselect }) => {

    const [selectedDates, setSelectedDates] = useState({});
    const [calendarTheme, setCalendarTheme] = useState({
        calendarBackground: 'white',
        textSectionTitleColor: 'white',
        dayTextColor: 'white',
        todayTextColor: 'white',
        selectedDayTextColor: 'white',
        selectedDayBackgroundColor: 'white',
        arrowColor: 'orange',
        textDisabledColor: 'tranferant'

    });
    useEffect(() => {
        // console.log(selectedDates, "==dates==");
    }, [selectedDates]);

    const onDayPress = (day) => {
        const selectedDate = day.dateString;
        const updatedDates = { ...selectedDates };
        if (selectedDates[selectedDate]) {
            // Date is already selected, so deselect it
            delete updatedDates[selectedDate];
        } else {
            // Date is not selected, so mark it as selected
            updatedDates[selectedDate] = { selected: true };
        }
        setSelectedDates(updatedDates);
        datesselect(updatedDates);
        const formattedDate1 = moment(selectedDate).format('YYYY-MM-DD'); // Format: 'YYYY-MM-DD'
        const formattedDate2 = moment(selectedDate).format('DD/MM/YYYY'); // Format: 'DD/MM/YYYY'
        const formattedDate3 = moment(selectedDate).format('dddd, MMMM Do YYYY'); // Format: 'Wednesday, July 20th 2023'

        // console.log('Formatted Date 1:', formattedDate1);
        // console.log('Formatted Date 2:', formattedDate2);
        // console.log('Formatted Date 3:', formattedDate3);
    };

    const markedDates = {
        ...selectedDates,
        // You can add more marked dates here with custom text
        // Example:
        // 'YYYY-MM-DD': { marked: true, dotColor: 'red', text: 'Custom Text' },
    };

    return (
        <View style={styles.container}>
            <Calendar
                style={{
                    borderWidth: 1,
                    borderColor: 'gray',
                    backgroundColor: 'white',
                }}
                markedDates={markedDates}
                onDayPress={onDayPress}
                minDate={Date()} // Disable past dates
                maxDate={new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)} // Show up to 1 year ahead
            />

        </View>
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