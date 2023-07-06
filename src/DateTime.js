import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import CalendarStrip from 'react-native-calendar-strip';
import moment from 'moment-timezone'; // only if timezone is needed
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {SafeAreaView} from 'react-native-safe-area-context';

const CalendarStripComponent = () => {
  const today = moment().startOf('day');
  const maxSelectableDate = moment().add(1, 'month').endOf('day');
  const [selectedDate, setSelectedDate] = useState(null);
  const handleDateSelected = date => {
    setSelectedDate(date);
  };
  //   useEffect(() => {
  //     console.log(today, '--date--');
  //     console.log(new Date(), '--date--');
  //   });

  const formatDate = date => {
    return moment(date).format('D MMMM');
  };
  return (
    <SafeAreaView style={styles.container}>
      <CalendarStrip
        startingDate={Date()}
        style={{height: hp(14), paddingTop: 30, paddingBottom: 20, }} // Adjust paddingTop and paddingBottom as needed
        calendarColor={'white'}
        calendarHeaderStyle={{
          color: 'blue',
          fontSize: wp(4),
          paddingBottom: wp(5),
        }}
        dateNumberStyle={{color: 'grey', fontSize: wp(3.5)}}
        dateNameStyle={{color: 'grey', fontSize: wp(3.5)}}
        iconContainer={{flex: 0.1}}
        minDate={Date()}
        highlightDateNumberStyle={{color: 'blue', fontSize: wp(5)}}
        highlightDateNameStyle={{
          color: 'blue',
          fontSize: wp(4),
        }} // Adjust the paddingTop value as needed
        scrollable={false}
        borderHighlightColor={'grey'}
        maxDate={maxSelectableDate}
        daySelectionAnimation={{
          type: 'border',
          borderWidth: 0, // Adjust the borderWidth as desired
          borderHighlightColor: 'blue',

          // Add padding to create space between the border and content
        }}
        useIsoWeekday={false}
        locale={{
          name: 'en', // Set the locale to English
          config: {
            months: moment.localeData('en').months(), // Use English months
            weekdaysShort: moment.localeData('en').weekdaysShort(), // Use English weekdays
          },
        }}
        onDateSelected={handleDateSelected}
      />

      {selectedDate && (
        <Text style={styles.selectedDateText}>
          Selected Date: {formatDate(selectedDate)}
        </Text>
      )}
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {flex: 1},
  selectedDateText: {marginTop: 20, textAlign: 'center'},
});
export default CalendarStripComponent;
