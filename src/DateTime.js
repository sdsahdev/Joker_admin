// import React, { useEffect, useState, useMemo } from 'react';
// import {
//   View,
//   StyleSheet,
//   Text,
//   FlatList,
//   TouchableOpacity,
//   Image,
// } from 'react-native';
// import CalendarStrip from 'react-native-calendar-strip';
// import moment from 'moment-timezone'; // only if timezone is needed
// import {
//   widthPercentageToDP as wp,
//   heightPercentageToDP as hp,
// } from 'react-native-responsive-screen';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import BackgroundSvg from '../asserts/svgs/BgImg.js';
// import imagesClass from '../asserts/imagepath.js';
// import PaymentBtn from '../Components/PaymentBtn.js';
// import TopHeader from '../Components/TopHeader.js';
// import About from './About.js';

// const DateTime = () => {
//   const [numColumns, setNumColumns] = useState(4);
//   const [selectedItems, setSelectedItems] = useState({});
//   const [totalPrice, setTotalPrice] = useState(0);

//   // const data = [
//   //   {
//   //     id: '1',
//   //     image: imagesClass.banner2,
//   //     leftText: '01:00 pm ',
//   //     rightText: '$100/hr',
//   //   },
//   //   {
//   //     id: '1',
//   //     image: imagesClass.banner2,
//   //     leftText: '01:00 pm ',
//   //     rightText: '$100/hr',
//   //   },
//   //   {
//   //     id: '1',
//   //     image: imagesClass.banner2,
//   //     leftText: '01:00 pm ',
//   //     rightText: '$100/hr',
//   //   },
//   //   {
//   //     id: '1',
//   //     image: imagesClass.banner2,
//   //     leftText: '01:00 pm ',
//   //     rightText: '$100/hr',
//   //   },
//   //   {
//   //     id: '1',
//   //     image: imagesClass.banner2,
//   //     leftText: '01:00 pm ',
//   //     rightText: '$100/hr',
//   //   },
//   //   {
//   //     id: '1',
//   //     image: imagesClass.banner2,
//   //     leftText: '01:00 pm ',
//   //     rightText: '$100/hr',
//   //   },
//   //   {
//   //     id: '1',
//   //     image: imagesClass.banner2,
//   //     leftText: '01:00 pm ',
//   //     rightText: '$100/hr',
//   //   },
//   //   {
//   //     id: '1',
//   //     image: imagesClass.banner2,
//   //     leftText: '01:00 pm ',
//   //     rightText: '$100/hr',
//   //   },
//   //   {
//   //     id: '1',
//   //     image: imagesClass.banner2,
//   //     leftText: '01:00 pm ',
//   //     rightText: '$100/hr',
//   //   },
//   //   {
//   //     id: '1',
//   //     image: imagesClass.banner2,
//   //     leftText: '01:00 pm ',
//   //     rightText: '$100/hr',
//   //   },
//   //   {
//   //     id: '1',
//   //     image: imagesClass.banner2,
//   //     leftText: '01:00 pm ',
//   //     rightText: '$100/hr',
//   //   },
//   //   {
//   //     id: '1',
//   //     image: imagesClass.banner2,
//   //     leftText: '01:00 pm ',
//   //     rightText: '$100/hr',
//   //   },

//   //   // Add more items as needed
//   // ];
//   const data2 = [
//     {
//       id: '1',
//       image: imagesClass.banner2,
//       leftText: '01:00 pm ',
//       rightText: '$100/hr',
//     },
//     {
//       id: '2',
//       image: imagesClass.banner2,
//       leftText: '01:00 pm ',
//       rightText: '$100/hr',
//     },
//     {
//       id: '3',
//       image: imagesClass.banner2,
//       leftText: '01:00 pm ',
//       rightText: '$100/hr',
//     },
//     {
//       id: '4',
//       image: imagesClass.banner2,
//       leftText: '01:00 pm ',
//       rightText: '$100/hr',
//     },
//     {
//       id: '5',
//       image: imagesClass.banner2,
//       leftText: '01:00 pm ',
//       rightText: '$100/hr',
//     },
//     {
//       id: '6',
//       image: imagesClass.banner2,
//       leftText: '01:00 pm ',
//       rightText: '$100/hr',
//     },
//     {
//       id: '7',
//       image: imagesClass.banner2,
//       leftText: '01:00 pm ',
//       rightText: '$100/hr',
//     },
//     {
//       id: '8',
//       image: imagesClass.banner2,
//       leftText: '01:00 pm ',
//       rightText: '$100/hr',
//     },
//     {
//       id: '9',
//       image: imagesClass.banner2,
//       leftText: '01:00 pm ',
//       rightText: '$100/hr',
//     },
//     {
//       id: '10',
//       image: imagesClass.banner2,
//       leftText: '01:00 pm ',
//       rightText: '$100/hr',
//     },
//     {
//       id: '11',
//       image: imagesClass.banner2,
//       leftText: '01:00 pm ',
//       rightText: '$100/hr',
//     },
//     {
//       id: '12',
//       image: imagesClass.banner2,
//       leftText: '01:00 pm ',
//       rightText: '$100/hr',
//     },
//     {
//       id: '13',
//       image: imagesClass.banner2,
//       leftText: '01:00 pm ',
//       rightText: '$100/hr',
//     },
//     {
//       id: '14',
//       image: imagesClass.banner2,
//       leftText: '01:00 pm ',
//       rightText: '$100/hr',
//     },
//     {
//       id: '15',
//       image: imagesClass.banner2,
//       leftText: '01:00 pm ',
//       rightText: '$100/hr',
//     },
//     {
//       id: '16',
//       image: imagesClass.banner2,
//       leftText: '01:00 pm ',
//       rightText: '$100/hr',
//     },
//     {
//       id: '17',
//       image: imagesClass.banner2,
//       leftText: '01:00 pm ',
//       rightText: '$100/hr',
//     },
//     {
//       id: '18',
//       image: imagesClass.banner2,
//       leftText: '01:00 pm ',
//       rightText: '$100/hr',
//     },
//     {
//       id: '19',
//       image: imagesClass.banner2,
//       leftText: '01:00 pm ',
//       rightText: '$100/hr',
//     },
//     {
//       id: '20',
//       image: imagesClass.banner2,
//       leftText: '01:00 pm ',
//       rightText: '$100/hr',
//     },
//     {
//       id: '21',
//       image: imagesClass.banner2,
//       leftText: '01:00 pm ',
//       rightText: '$100/hr',
//     },
//     {
//       id: '22',
//       image: imagesClass.banner2,
//       leftText: '01:00 pm ',
//       rightText: '$100/hr',
//     },
//     {
//       id: '23',
//       image: imagesClass.banner2,
//       leftText: '01:00 pm ',
//       rightText: '$100/hr',
//     },
//     {
//       id: '24',
//       image: imagesClass.banner2,
//       leftText: '01:00 pm ',
//       rightText: '$100/hr',
//     },
//   ];
//   const today = moment().startOf('day');
//   const maxSelectableDate = moment().add(1, 'month').endOf('day');
//   const [selectedDate, setSelectedDate] = useState(null);

//   const handleItemPress = (id) => {
//     console.log("Single-click selection for item with ID:", id);
//     setSelectedItems((prevSelectedItems) => {
//       const isSelected = prevSelectedItems[id];
//       const updatedSelectedItems = { ...prevSelectedItems };
//       updatedSelectedItems[id] = !isSelected;
//       return updatedSelectedItems;
//     });
//   };

//   // Function to handle item selection on long press
//   const handleItemLongPress = (id) => {
//     console.log("Long-press selection for item with ID:", id);
//     setSelectedItems((prevSelectedItems) => {
//       const isSelected = prevSelectedItems[id];
//       const updatedSelectedItems = { ...prevSelectedItems };
//       updatedSelectedItems[id] = !isSelected;
//       return updatedSelectedItems;
//     });
//   };
//   // Calculate the total price based on selected items and their prices
//   useMemo(() => {
//     const pricePerItem = 100;
//     const selectedItemCount = Object.values(selectedItems).filter((selected) => selected).length;
//     const total = pricePerItem * selectedItemCount;

//     let sum = 0;
//     for (const id in selectedItems) {
//       if (selectedItems[id]) {
//         // Find the item with the corresponding ID from the data array
//         const selectedItem = data2.find((item) => item.id === id);
//         if (selectedItem) {
//           // Calculate the total price for the selected item
//           const price = parseFloat(selectedItem.rightText.substring(1));
//           sum += price;
//         }
//       }
//     }
//     setTotalPrice(total); // Update the totalPrice state here
//   }, [selectedItems]);


//   const handleDateSelected = date => {
//     setSelectedDate(date);
//   };

//   const formatDate = date => {
//     return moment(date).format('D MMMM');
//   };

//   const renderItem2 = ({ item }) => (
//     <TouchableOpacity
//       onPress={() => handleItemPress(item.id)}
//       onLongPress={() => handleItemLongPress(item.id)}
//     >
//       <View style={[styles.timeSlot, selectedItems[item.id] && styles.selectedItem]}>
//         {/* ... other item content ... */}
//         <Text style={styles.textRight}>{item.rightText}</Text>
//       </View>
//     </TouchableOpacity>
//   );
//   const renderItem = ({ item }) => (
//     <View style={styles.timeSlot}>

//       <Text style={styles.textLeft}>{item.leftText}</Text>
//     </View>
//   );
//   return (
//     <SafeAreaView style={styles.container}>
//       <View >

//         <TopHeader name={"Book Your Slot"} />
//       </View>
//       <Text>Total Price: ${totalPrice.toFixed(2)}</Text>

//       <View style={styles.calView}>
//         <CalendarStrip
//           startingDate={Date()}
//           style={styles.maincalanedr} // Adjust paddingTop and paddingBottom as needed
//           highlightDateContainerStyle={styles.con}
//           calendarHeaderStyle={styles.calheader}
//           dateNumberStyle={styles.numdate}
//           dateNameStyle={styles.datename}
//           iconContainer={{ flex: 0.1 }}
//           minDate={Date()}
//           highlightDateNumberStyle={styles.highDate}
//           highlightDateNameStyle={styles.hightname} // Adjust the paddingTop value as needed
//           scrollable={false}
//           borderHighlightColor={'grey'}
//           maxDate={maxSelectableDate}
//           daySelectionAnimation={styles.dateselect}
//           useIsoWeekday={false}
//           locale={styles.localestyle}
//           onDateSelected={handleDateSelected}
//         />

//         {selectedDate && (
//           <Text style={styles.selectedDateText}>
//             Selected Date: {formatDate(selectedDate)}
//           </Text>
//         )}
//       </View>
//       <View style={{ alignItems: 'center', flex: 1, }}>

//         <About tor={true}  />
//       </View>
//       <View style={{ flex: 0.2 }}>
//         <PaymentBtn txt={'Advance Payment'} txt2={'Full Payment'} />
//       </View>
//     </SafeAreaView>
//   );
// };
// const styles = StyleSheet.create({
//   selectedItem: {
//     // Add styles to indicate the selected item (e.g., change the background color)
//     backgroundColor: 'green',
//   },
//   slotTxt: {
//     color: '#000',
//     borderWidth: wp(0.3),
//     borderColor: '#027850',
//     padding: wp(3),
//     borderRadius: wp(2),
//     fontSize: wp(4),
//     marginBottom: wp(1)
//   },
//   textLeft: { textAlignVertical: 'center', flex: 1 },
//   timeSlot: {
//     backgroundColor: '#E3EFEB',
//     width: wp(18),
//     height: hp(6),
//     margin: wp(2),
//     borderRadius: wp(1.5),
//     alignItems: 'center',
//     borderWidth: wp(0.3),
//     borderColor: '#027850',
//   },
//   calView: { marginTop: hp(10) },
//   con: {
//     backgroundColor: '#E3EFEB',
//     width: wp(12),
//     height: wp(15),
//     borderRadius: wp(2),
//     borderWidth: wp(0.3),
//     borderColor: '#027850',
//   },
//   localestyle: {
//     name: 'en', // Set the locale to English
//     config: {
//       months: moment.localeData('en').months(), // Use English months
//       weekdaysShort: moment.localeData('en').weekdaysShort(), // Use English weekdays
//     },
//   },
//   dateselect: {
//     type: 'border',
//     borderWidth: 0, // Adjust the borderWidth as desired
//     borderHighlightColor: '#027850',

//     // Add padding to create space between the border and content
//   },
//   hightname: {
//     color: '#027850',
//     fontSize: wp(4),
//   },
//   highDate: { color: '#027850', fontSize: wp(5) },
//   datename: { color: 'grey', fontSize: wp(3.5) },
//   numdate: { color: 'grey', fontSize: wp(3.5) },
//   calheader: {
//     color: '#000',
//     fontSize: wp(5),
//     paddingBottom: wp(5),
//     // right: 2, alignSelf: 'flex-end'
//   },
//   maincalanedr: {
//     height: hp(14),
//     paddingBottom: 20,
//     position: 'relative',
//   },
//   container: { flex: 1, position: 'relative' },
//   selectedDateText: { textAlign: 'center' },

// });
// export default DateTime;


import { StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import About from './About'
import CalanderFile from '../Components/CalanderFile'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Facilities from '../Components/Facilities'
import BackgroundSvg from '../asserts/svgs/BgImg'
import TopHeader from '../Components/TopHeader'
import TimeComp from '../Components/TimeComp'
import SlotTime from '../Components/SlotTime'

const DateTime = () => {
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [caldate, setcalldat] = useState({});
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



  return (
    <View style={styles.mainView}>
      <ScrollView>
        <View >
          <TopHeader name={"Book Your Slot"} />
        </View>
        <View style={styles.sendView}>
          <SlotTime onStartTimeChange={handleStartTimeChange} onEndTimeChange={handleEndTimeChange} />
        </View>
        <View style={styles.thiView} >
          <CalanderFile datesselect={handleDateSelect} />
        </View>
        <View>

          {Object.keys(caldate).length !== 0 && startTime !== null && (
            <TouchableOpacity
              style={styles.btn}
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

export default DateTime;

const styles = StyleSheet.create({
  btn: { margin: wp(3), height: 40, flex: 1 },
  thiView: { margin: wp(10) },
  sendView: { flexWrap: 'wrap', flex: 1, justifyContent: 'center', alignSelf: 'center', marginTop: hp(4) },
  mainView: { flex: 1, marginBottom: hp(5), },
  payment: { color: '#fff', backgroundColor: '#027850', flex: 1, textAlign: 'center', textAlignVertical: 'center', fontSize: wp(5), borderRadius: wp(2), },

})