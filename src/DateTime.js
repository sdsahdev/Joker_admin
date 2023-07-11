import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import CalendarStrip from 'react-native-calendar-strip';
import moment from 'moment-timezone'; // only if timezone is needed
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { SafeAreaView } from 'react-native-safe-area-context';
import BackgroundSvg from '../asserts/svgs/BgImg.js';

const DateTime = () => {
  const today = moment().startOf('day');
  const maxSelectableDate = moment().add(1, 'month').endOf('day');
  const [selectedDate, setSelectedDate] = useState(null);
  const handleDateSelected = date => {
    setSelectedDate(date);
  };


  const formatDate = date => {
    return moment(date).format('D MMMM');
  };
  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.backgroundContainer}>
        <BackgroundSvg />
      </View>
      <Text style={{ color: '#000', fontSize: wp(7), marginTop: wp(10), position: 'absolute', marginLeft: wp(10) }}>
        Book Your Slot
      </Text>
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

    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  calView: { marginTop: hp(10) },
  con: {
    backgroundColor: '#E3EFEB',
    width: wp(12), height: wp(15), borderRadius: wp(2)
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
  highDate: { color: '#027850', fontSize: wp(5), },
  datename: { color: 'grey', fontSize: wp(3.5) },
  numdate: { color: 'grey', fontSize: wp(3.5) },
  calheader: {
    color: '#027850',
    fontSize: wp(5),
    paddingBottom: wp(5),

    // right: 2, alignSelf: 'flex-end'
  },
  maincalanedr: { height: hp(14), paddingTop: 30, paddingBottom: 20, position: 'relative' },
  container: { flex: 1, position: 'relative' },
  selectedDateText: { marginTop: 20, textAlign: 'center' },
  backgroundContainer: {
    ...StyleSheet.absoluteFillObject,

  },
});
export default DateTime;
