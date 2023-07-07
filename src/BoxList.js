import React, { useRef, useEffect } from 'react';
import imagesClass from '../asserts/imagepath';
import { View, Text, StyleSheet, FlatList, Image, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import SwipList from '../Components/SwipList';
import BackgroundSvg from '../asserts/svgs/BgImg.js';
import BoxeItems from '../Components/BoxeItems';
import NoticationSvg from '../asserts/svgs/NoticationSvg';


const BoxList = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.backgroundContainer}>
          <BackgroundSvg width="20%" height="100%" />
        </View>
        <View style={{ bottom: 0, position: 'absolute' }}>
          <BackgroundSvg width="20%" height="100%" />
        </View>

        <View style={styles.topTexts}>
          <View>
            <Text>
              Hey, Jolly
            </Text>
            <Text style={{ fontWeight: 'bold', color: '#000', fontSize: wp(6), marginBottom: wp(5) }}>
              Find ground nearby you
            </Text>
          </View>

          <View>
            <Image source={imagesClass.notification} style={styles.imageStyle} resizeMode='contain' />
          </View>
        </View>

        <View style={{ width: "100%", height: wp(50), }}>
          <SwipList />
        </View>

        <BoxeItems />
      </ScrollView>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundContainer: {
    ...StyleSheet.absoluteFillObject,
  },
  topTexts: { marginLeft: wp(6), marginTop: wp(10), flexDirection: 'row', justifyContent: 'space-between', padding: wp(4) },
  bottomTexts: { marginLeft: wp(6), marginTop: wp(5), },
  imageStyle: {
    width: wp(8),
    height: hp(4),
    justifyContent: 'center',
    alignSelf: 'center', marginTop: wp(2), marginRight: wp(3), color: 'yellow'

  }
});

export default BoxList;
