import React, { useState } from 'react';
import { View, StyleSheet, Text, FlatList, TouchableOpacity } from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import moment from 'moment';
import CalanderFile from '../Components/CalanderFile';
// nornmal and for bulk booking  comppoonent 
const About = ({ onStartTimeChange, onEndTimeChange }) => {
    const [numColumns, setNumColumns] = useState(4);
    const [selectedItems, setSelectedItems] = useState({});
    const [selectedStartTime, setSelectedStartTime] = useState(null);
    const [selectedEndTime, setSelectedEndTime] = useState(null);
    // const [torna, settoyna] = useState(tor);

    const data = [

        { id: '1', time: '01-02 am', price: 100 },
        { id: '2', time: '02-03 am', price: 100 },
        { id: '3', time: '03-04 am', price: 100 },
        { id: '4', time: '04-05 am', price: 100 },
        { id: '5', time: '05-06 am', price: 100 },
        { id: '6', time: '06-07 am', price: 100 },
        { id: '7', time: '07-08 am', price: 100 },
        { id: '8', time: '08-09 am', price: 100 },
        { id: '9', time: '09-10 am', price: 100 },
        { id: '10', time: '10-11 am', price: 100 },
        { id: '11', time: '11-12 am', price: 100 },
        { id: '12', time: '12-13 am', price: 100 },
        { id: '13', time: '13-14 pm', price: 100 },
        { id: '14', time: '14-15 pm', price: 100 },
        { id: '15', time: '15-16 pm', price: 100 },
        { id: '16', time: '16-17 pm', price: 100 },
        { id: '17', time: '17-18 pm', price: 100 },
        { id: '18', time: '18-19 pm', price: 100 },
        { id: '19', time: '19-20 pm', price: 100 },
        { id: '20', time: '20-21 pm', price: 100 },
        { id: '21', time: '21-22 pm', price: 100 },
        { id: '22', time: '22-23 pm', price: 100 },
        { id: '23', time: '23-24 pm', price: 100 },
        { id: '24', time: '24-01 pm', price: 100 },
    ];

    const handleTimePress = time => {
        if (!selectedStartTime) {
            setSelectedStartTime(time);
            setSelectedEndTime(null);
            onStartTimeChange(time)
            onEndTimeChange(null)
        } else if (!selectedEndTime) {
            if (time > selectedStartTime) {
                onEndTimeChange(time)
                setSelectedEndTime(time);
            } else {
                setSelectedEndTime(selectedStartTime);
                setSelectedStartTime(time);
                onEndTimeChange(selectedStartTime)
                onStartTimeChange(time)
            }
        } else {
            onStartTimeChange(time)
            setSelectedStartTime(time);
            setSelectedEndTime(null);
            onEndTimeChange(null)
        }
    };

    const handleItemPress = id => {
        setSelectedItems(prevSelectedItems => {
            const isSelected = prevSelectedItems[id];
            const updatedSelectedItems = { ...prevSelectedItems };
            if (isSelected) {
                updatedSelectedItems[id].quantity -= 1;
                if (updatedSelectedItems[id].quantity <= 0) {
                    delete updatedSelectedItems[id];
                }
            } else {
                updatedSelectedItems[id] = {
                    ...data.find(item => item.id === id),
                    quantity: 1,
                };
            }
            return updatedSelectedItems;
        });
    };

    const renderItem = ({ item }) => {
        const isSelected =
            (selectedStartTime &&
                selectedEndTime &&
                item.time >= selectedStartTime &&
                item.time <= selectedEndTime) ||
            (selectedStartTime && item.time === selectedStartTime) ||
            (selectedEndTime && item.time === selectedEndTime);

        return (
            <TouchableOpacity
                onPress={() => {
                    handleTimePress(item.time);
                    handleItemPress(item.id);
                }}>
                <View style={[styles.timeSlot, isSelected && styles.selectedTimeSlot]}>
                    <Text style={[styles.timeText, isSelected && styles.selectedtext]}>
                        {item.time}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    };
    const calculateTotalDuration = () => {
        if (selectedStartTime && selectedEndTime) {
            // Calculate the time difference in hours
            const startMoment = moment(selectedStartTime, 'hh:mm a');
            const endMoment = moment(selectedEndTime, 'hh:mm a');
            const totalDuration = endMoment.diff(startMoment, 'hours');

            return totalDuration;
        }

        return 0; // Return 0 if start or end time is not selected
    };
    const renderSelectedItemsText = () => {
        const totalDuration = calculateTotalDuration();
        const requireDuration = 4 - totalDuration;
        const selectedItemsCount = Object.keys(selectedItems).length;
        return (
            <View>
                {totalDuration > 3 ? console.log(totalDuration, "first") : (
                    <Text style={styles.minHoursText}>
                        Please select  minimum {totalDuration} hours
                    </Text>
                )}
            </View>
        );
    };

    return (
        <View style={styles.container}>
            {/* {console.log(selectedStartTime, "===== start time ==")}
            {console.log(selectedEndTime, "===End time==")} */}

            {renderSelectedItemsText()}
            <FlatList
                style={{ flex: 1, alignSelf: 'center' }} // Set flex: 1 to occupy the remaining space
                data={data}
                numColumns={numColumns}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    minHoursText: {
        textAlign: 'center',
        fontSize: wp(4),
        color: 'red',
        marginTop: 10,
    },
    timeText: { alignSelf: 'center', textAlign: 'center', flex: 1, fontWeight: 'bold', },
    selectedtext: { color: '#fff' },
    selectedItem: {
        // Add styles to indicate the selected item (e.g., change the background color)
        backgroundColor: 'blue',
    },
    slotTxt: {
        color: '#000',
        borderWidth: wp(0.3),
        borderColor: '#027850',
        padding: wp(3),
        borderRadius: wp(2),
        fontSize: wp(4),
        marginBottom: wp(1),
    },
    textLeft: { textAlignVertical: 'center', flex: 1 },
    timeSlot: {
        backgroundColor: '#E3EFEB',
        width: wp(18),
        height: hp(6),
        margin: wp(2),
        borderRadius: wp(1.5),
        alignItems: 'center',
        borderWidth: wp(0.3),
        borderColor: '#027850',
        flexDirection: 'row',
    },
    calView: { marginTop: hp(10) },
    con: {
        backgroundColor: '#E3EFEB',
        width: wp(12),
        height: wp(15),
        borderRadius: wp(2),
    },
    localestyle: {
        name: 'en', // Set the locale to English
        config: {
            months: moment.localeData('en').months(), // Use English months
            weekdaysShort: moment.localeData('en').weekdaysShort(), // Use English weekdays
        },
    },
    dateselect: {
        type: 'border',
        borderWidth: 0, // Adjust the borderWidth as desired
        borderHighlightColor: '#027850',

        // Add padding to create space between the border and content
    },
    hightname: {
        color: '#027850',
        fontSize: wp(4),
    },
    highDate: { color: '#027850', fontSize: wp(5) },
    datename: { color: 'grey', fontSize: wp(3.5) },
    numdate: { color: 'grey', fontSize: wp(3.5) },
    calheader: {
        color: '#000',
        fontSize: wp(5),
        paddingBottom: wp(5),
    },
    maincalanedr: {
        height: hp(14),
        paddingBottom: 20,
        position: 'relative',
    },
    container: { flex: 1, position: 'relative' },
    selectedDateText: { textAlign: 'center' },
    selectedItem: {
        backgroundColor: 'green',
    },
    selectedTimeSlot: {
        backgroundColor: 'green',
    },
});

export default About;
