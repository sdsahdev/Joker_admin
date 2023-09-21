import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BackgroundSvg from '../asserts/svgs/BgImg';
import SwipList from '../Components/SwipList';
import BoxeItems from '../Components/BoxeItems';
import ProgressLoader from 'rn-progress-loader';
import { useIsFocused } from '@react-navigation/native'; // Import the hook
import TopHeader from '../Components/TopHeader';

const BoxList = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const isFocused = useIsFocused(); // Get the screen's focused state

  const [data, setData] = useState([]);

  useEffect(() => {
    // Call the API when the component mounts
    console.log("+++++++");
    fetchBoxData();
  }, [useIsFocused]);

  const fetchBoxData = async () => {
    console.log("-----------");
    try {
      setIsLoading(true);
      const response = await fetch('https://boxclub.in/Joker/Admin/index.php?what=getBox');
      if (!response.ok) {
        setIsLoading(false);
        console.log("not ok");
        throw new Error('Network response was not ok');
      } else {
        setIsLoading(false);
      }
      const jsonData = await response.json();
      console.log(jsonData[0].images[0].url, "==== datas");
      setData(jsonData);
    } catch (error) {
      setIsLoading(false);
      console.log('Error:', error);
    }
  };

  // const navigation = useNavigation();
  const filteredData = Object.keys(data).filter(key => key !== 'keys').reduce((obj, key) => {
    obj[key] = data[key];
    return obj;
  }, {});

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
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.backgroundContainer}>
          <TopHeader />
        </View>

        <View style={styles.topTexts}>
          <View style={styles.toptxt}>
            <Text>Hey, Jouhu8hlly</Text>
            <Text style={styles.maintxt}>Here is the best cricket box nearby you</Text>
          </View>
        </View>
        <View style={styles.swipest}>
          <SwipList boxData={Object.values(filteredData)} />
        </View>

        <BoxeItems navigation={navigation} boxData={Object.values(filteredData)} />

      </ScrollView>
    </View>
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
