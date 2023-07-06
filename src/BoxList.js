import React, { useRef, useEffect } from 'react';
import imagesClass from '../asserts/imagepath';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import SwipList from '../Components/SwipList';
import BackgroundSvg from '../asserts/svgs/BgImg.js';

const BoxList = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.backgroundContainer}>
        <BackgroundSvg width="20%" height="100%" />
          </View>
          <View  style={{marginLeft:wp(6),marginTop:wp(10)}}>
            
          <Text >
              Hey, Jolly
          </Text>
          <Text style={{fontWeight:'bold', color:'#000', fontSize:wp(6), marginBottom:wp(5)}}>
          Find ground nearby you    
              </Text>
          </View>

          <SwipList  />
            <Text  style={{backgroundColor:'#000'}}>
              Hey, Jowbdbdwdlly
          </Text>
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
});

export default BoxList;
