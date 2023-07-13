import React, { useEffect, useState } from 'react';
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

const DateTime = () => {
  const [numColumns, setNumColumns] = useState(4);

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
  ];
  const today = moment().startOf('day');
  const maxSelectableDate = moment().add(1, 'month').endOf('day');
  const [selectedDate, setSelectedDate] = useState(null);
  const handleDateSelected = date => {
    setSelectedDate(date);
  };

  const formatDate = date => {
    return moment(date).format('D MMMM');
  };

  const renderItem2 = ({ item }) => (
    <View style={styles.timeSlot}>
      <Text style={styles.textLeft}>{item.leftText}</Text>
    </View>
  );
  const renderItem = ({ item }) => (
    <View style={styles.timeSlot}>
      <Text style={styles.textLeft}>{item.leftText}</Text>
    </View>
  );
  return (
    <SafeAreaView style={styles.container}>
      <TopHeader name={"Book Your Slot"} />
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

        {selectedDate && (
          <Text style={styles.selectedDateText}>
            Selected Date: {formatDate(selectedDate)}
          </Text>
        )}
      </View>
      <View style={{ alignItems: 'center' }}>
        <Text style={styles.slotTxt}>Day Slot</Text>
        <FlatList
          data={data}
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
  slotTxt: {
    color: '#000',
    margin: wp(2),
    borderWidth: wp(0.3),
    borderColor: '#027850',
    padding: wp(3),
    borderRadius: wp(2),
    fontSize: wp(4),
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
    color: '#027850',
    fontSize: wp(5),
    paddingBottom: wp(5),

    // right: 2, alignSelf: 'flex-end'
  },
  maincalanedr: {
    height: hp(14),
    paddingTop: 30,
    paddingBottom: 20,
    position: 'relative',
  },
  container: { flex: 1, position: 'relative' },
  selectedDateText: { marginTop: 20, textAlign: 'center' },
  backgroundContainer: {
    ...StyleSheet.absoluteFillObject,
  },
});
export default DateTime;
