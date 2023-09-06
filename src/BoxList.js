import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BackgroundSvg from '../asserts/svgs/BgImg';
import SwipList from '../Components/SwipList';
import BoxeItems from '../Components/BoxeItems';
import ProgressLoader from 'rn-progress-loader';

const BoxList = ({ navigation }) => {
  const isFocused = useIsFocused();

  useEffect(() => {
    handleAdminCheck();
  }, [isFocused]);

  const handleAdminCheck = async () => {
    const phoneNumberToCheck = await AsyncStorage.getItem('adminnum');
    const hasBookingRights = await checkAdminByPhoneNumber(phoneNumberToCheck);

    if (hasBookingRights && hasBookingRights.status === 'block') {
      navigation.reset({
        index: 0,
        routes: [{ name: 'loginSceen' }],
      });
    }
  };

  const checkAdminByPhoneNumber = async (phoneNumber) => {
    try {
      const response = await fetch('https://boxclub.in/Joker/Admin/index.php?what=getAllThirdParty');
      if (response.ok) {
        const data = await response.json();

        if (data && data.admins) {
          return data.admins.find(admin => admin.phone === phoneNumber) || false;
        }
      }
    } catch (error) {
      console.error('Error fetching admin data:', error);
    }
    return false;
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.backgroundContainer}>
          <BackgroundSvg />
        </View>

        <View style={styles.topTexts}>
          <View style={styles.toptxt}>
            <Text>Hey, Jolly</Text>
            <Text style={styles.maintxt}>Here is the best cricket box nearby you</Text>
          </View>
        </View>

        <View style={styles.swipest}>
          <SwipList />
        </View>

        <BoxeItems navigation={navigation} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
  },
  backgroundContainer: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
  },
  topTexts: {
    marginLeft: wp(6),
    marginTop: wp(10),
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: wp(4),
  },
  toptxt: {
    width: '85%',
  },
  maintxt: {
    fontWeight: 'bold',
    color: '#000',
    fontSize: wp(6),
    marginBottom: wp(5),
    fontSize: wp(5),
  },
  swipest: {
    width: '100%',
    height: wp(50),
  },
});

export default BoxList;
