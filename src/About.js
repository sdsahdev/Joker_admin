import React, { useEffect, useState, useMemo } from 'react';
import {
    View,
    StyleSheet,
    Text,
    FlatList,
    TouchableOpacity,
    Image,
} from 'react-native';
import CalendarStrip from 'react-native-calendar-strip';
import moment from 'moment-timezone'; // only if timezone is needed
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { SafeAreaView } from 'react-native-safe-area-context';
import BackgroundSvg from '../asserts/svgs/BgImg.js';
import imagesClass from '../asserts/imagepath.js';
import PaymentBtn from '../Components/PaymentBtn.js';
import TopHeader from '../Components/TopHeader.js';

const About = () => {
    const [numColumns, setNumColumns] = useState(4);
    const [selectedItems, setSelectedItems] = useState({});
    const [selectedStartTime, setSelectedStartTime] = useState(null);
    const [selectedEndTime, setSelectedEndTime] = useState(null);
    const [totalPrice, setTotalPrice] = useState(0);

    const data = [
        {
            id: '1',
            image: imagesClass.banner2,
            leftText: '01:00 pm ',
            rightText: '$100/hr',
        },
        {
            id: '1',
            image: imagesClass.banner2,
            leftText: '01:00 pm ',
            rightText: '$100/hr',
        },
        {
            id: '1',
            image: imagesClass.banner2,
            leftText: '01:00 pm ',
            rightText: '$100/hr',
        },
        {
            id: '1',
            image: imagesClass.banner2,
            leftText: '01:00 pm ',
            rightText: '$100/hr',
        },
        {
            id: '1',
            image: imagesClass.banner2,
            leftText: '01:00 pm ',
            rightText: '$100/hr',
        },
        {
            id: '1',
            image: imagesClass.banner2,
            leftText: '01:00 pm ',
            rightText: '$100/hr',
        },
        {
            id: '1',
            image: imagesClass.banner2,
            leftText: '01:00 pm ',
            rightText: '$100/hr',
        },
        {
            id: '1',
            image: imagesClass.banner2,
            leftText: '01:00 pm ',
            rightText: '$100/hr',
        },
        {
            id: '1',
            image: imagesClass.banner2,
            leftText: '01:00 pm ',
            rightText: '$100/hr',
        },
        {
            id: '1',
            image: imagesClass.banner2,
            leftText: '01:00 pm ',
            rightText: '$100/hr',
        },
        {
            id: '1',
            image: imagesClass.banner2,
            leftText: '01:00 pm ',
            rightText: '$100/hr',
        },
        {
            id: '1',
            image: imagesClass.banner2,
            leftText: '01:00 pm ',
            rightText: '$100/hr',
        },

        // Add more items as needed
    ];
    const data2 = [
        {
            id: '1',
            image: imagesClass.banner2,
            leftText: '01:00 pm ',
            rightText: '$100/hr',
        },
        {
            id: '2',
            image: imagesClass.banner2,
            leftText: '02:00 pm ',
            rightText: '$100/hr',
        },
        {
            id: '3',
            image: imagesClass.banner2,
            leftText: '03:00 pm ',
            rightText: '$100/hr',
        },
        {
            id: '4',
            image: imagesClass.banner2,
            leftText: '04:00 pm ',
            rightText: '$100/hr',
        },
        {
            id: '5',
            image: imagesClass.banner2,
            leftText: '05:00 pm ',
            rightText: '$100/hr',
        },
        {
            id: '6',
            image: imagesClass.banner2,
            leftText: '06:00 pm ',
            rightText: '$100/hr',
        },
        {
            id: '7',
            image: imagesClass.banner2,
            leftText: '07:00 pm ',
            rightText: '$100/hr',
        },
        {
            id: '8',
            image: imagesClass.banner2,
            leftText: '08:00 pm ',
            rightText: '$100/hr',
        },
        {
            id: '9',
            image: imagesClass.banner2,
            leftText: '09:00 pm ',
            rightText: '$100/hr',
        },
        {
            id: '10',
            image: imagesClass.banner2,
            leftText: '10:00 pm ',
            rightText: '$100/hr',
        },
        {
            id: '11',
            image: imagesClass.banner2,
            leftText: '11:00 pm ',
            rightText: '$100/hr',
        },
        {
            id: '12',
            image: imagesClass.banner2,
            leftText: '12:00 pm ',
            rightText: '$100/hr',
        },
    ];
    const today = moment().startOf('day');
    const maxSelectableDate = moment().add(1, 'month').endOf('day');
    const [selectedDate, setSelectedDate] = useState(null);

    const handleTimePress = (time) => {
        if (!selectedStartTime) {
            setSelectedStartTime(time);
            setSelectedEndTime(null);
        } else if (selectedStartTime && !selectedEndTime) {
            // If start time is selected and end time is not selected
            if (time > selectedStartTime) {
                setSelectedEndTime(time);
            } else {
                setSelectedStartTime(time);
            }
        } else {
            // Both start time and end time are selected, clear the selections
            setSelectedStartTime(null);
            setSelectedEndTime(null);
        }
    };

    useMemo(() => {
        if (selectedStartTime && selectedEndTime) {
            const pricePerHour = 100;
            const totalHours = moment(selectedEndTime, 'hh:mm a').diff(moment(selectedStartTime, 'hh:mm a'), 'hours');
            const totalPrice = pricePerHour * totalHours;
            setTotalPrice(totalPrice);
        } else {
            setTotalPrice(0);
        }
    }, [selectedStartTime, selectedEndTime]);

    const handleItemPress = (id) => {
        console.log("Single-click selection for item with ID:", id);
        setSelectedItems((prevSelectedItems) => {
            const isSelected = prevSelectedItems[id];
            const updatedSelectedItems = { ...prevSelectedItems };
            updatedSelectedItems[id] = !isSelected;
            return updatedSelectedItems;
        });
    };

    // Function to handle item selection on long press
    const handleItemLongPress = (id) => {
        console.log("Long-press selection for item with ID:", id);
        setSelectedItems((prevSelectedItems) => {
            const isSelected = prevSelectedItems[id];
            const updatedSelectedItems = { ...prevSelectedItems };
            updatedSelectedItems[id] = !isSelected;
            return updatedSelectedItems;
        });
    };
    // Calculate the total price based on selected items and their prices
    useMemo(() => {
        const pricePerItem = 100;
        const selectedItemCount = Object.values(selectedItems).filter((selected) => selected).length;
        const total = pricePerItem * selectedItemCount;

        let sum = 0;
        for (const id in selectedItems) {
            if (selectedItems[id]) {
                // Find the item with the corresponding ID from the data array
                const selectedItem = data.find((item) => item.id === id);
                if (selectedItem) {
                    // Calculate the total price for the selected item
                    const price = parseFloat(selectedItem.rightText.substring(1));
                    sum += price;
                }
            }
        }
        setTotalPrice(total); // Update the totalPrice state here
    }, [selectedItems]);



    const handleDateSelected = date => {
        setSelectedDate(date);
    };

    const formatDate = date => {
        return moment(date).format('D MMMM');
    };

    const renderItem2 = ({ item }) => (
        <TouchableOpacity
            onPress={() => handleItemPress(item.id)}
            onLongPress={() => handleItemLongPress(item.id)}
        >
            <View style={[styles.timeSlot, selectedItems[item.id] && styles.selectedItem]}>
                {/* ... other item content ... */}
                <Text style={styles.textRight}>{item.rightText}</Text>
            </View>
        </TouchableOpacity>
    );
    const renderItem = ({ item }) => {
        const isSelected = selectedStartTime && selectedEndTime && item.leftText === selectedStartTime && item.leftText <= selectedEndTime;

        return (
            <TouchableOpacity onPress={() => handleTimePress(item.leftText)}>
                <View style={[styles.timeSlot, isSelected && styles.selectedTimeSlot]}>
                    <Text style={styles.timeText}>{item.leftText}</Text>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <View >

                <TopHeader name={"Book Your Slot"} />
            </View>
            <Text>Total Price: ${totalPrice.toFixed(2)}</Text>

            <View style={styles.calView}>
                <CalendarStrip
                    startingDate={Date()}
                    style={styles.maincalanedr} // Adjust paddingTop and paddingBottom as needed
                    highlightDateContainerStyle={styles.con}
                    calendarHeaderStyle={styles.calheader}
                    dateNumberStyle={styles.numdate}
                    dateNameStyle={styles.datename}
                    iconContainer={{ flex: 0.1 }}
                    minDate={Date()}
                    highlightDateNumberStyle={styles.highDate}
                    highlightDateNameStyle={styles.hightname} // Adjust the paddingTop value as needed
                    scrollable={false}
                    borderHighlightColor={'grey'}
                    maxDate={maxSelectableDate}
                    daySelectionAnimation={styles.dateselect}
                    useIsoWeekday={false}
                    locale={styles.localestyle}
                    onDateSelected={handleDateSelected}
                />

                {/* {selectedDate && (
          <Text style={styles.selectedDateText}>
            Selected Date: {formatDate(selectedDate)}
          </Text>
        )} */}
            </View>
            <View style={{ alignItems: 'center' }}>
                <Text style={styles.slotTxt}>Day Slot</Text>
                <FlatList
                    data={data2}
                    numColumns={numColumns}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={item => item.id}
                    renderItem={renderItem}
                />
                {/* <View style={{ borderWidth: wp(0.3), borderColor: '#027850', width: '90%', marginTop: wp(4) }} /> */}
                <Text style={styles.slotTxt}>Night Slot</Text>
                <FlatList
                    data={data2}
                    numColumns={numColumns}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={item => item.id}
                    renderItem={renderItem2}
                />
            </View>
            <PaymentBtn txt={'Advance Payment'} txt2={'Full Payment'} />
        </SafeAreaView>
    );
};
const styles = StyleSheet.create({
    timeSlot: {
        backgroundColor: '#E3EFEB',
        width: wp(18),
        height: hp(6),
        margin: wp(2),
        borderRadius: wp(1.5),
        alignItems: 'center',
        borderWidth: wp(0.3),
        borderColor: '#027850',
        justifyContent: 'center', // Center the time text vertically
    },
    selectedTimeSlot: {
        backgroundColor: 'blue',
    },
    timeText: {
        color: 'white', // Set the text color to white, so it's always visible
        fontSize: wp(4),
    },
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
        marginBottom: wp(1)
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

        // right: 2, alignSelf: 'flex-end'
    },
    maincalanedr: {
        height: hp(14),
        paddingBottom: 20,
        position: 'relative',
    },
    container: { flex: 1, position: 'relative' },
    selectedDateText: { textAlign: 'center' },

});
export default About;
