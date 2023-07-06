import React, { useRef, useEffect } from 'react';
import imagesClass from '../asserts/imagepath';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { SvgXml } from 'react-native-svg';

const SwipList = () => {
  const data = [
    { id: '1', image: imagesClass.banner1 },
    { id: '2', image: imagesClass.banner2 },
    { id: '3', image: imagesClass.pic1 },
    { id: '4', image: imagesClass.pic2 },
  ];

  const flatListRef = useRef(null);

  useEffect(() => {
    let currentIndex = 0;
    const timer = setInterval(() => {
      if (flatListRef.current) {
        const nextIndex = currentIndex === data.length - 1 ? 0 : currentIndex + 1;
        const itemWidth = wp(90) + wp(2); // Adjust this value based on your image width and margin
        const offset = nextIndex * itemWidth;
        flatListRef.current.scrollToOffset({ offset, animated: true });
        currentIndex = nextIndex;
      }
    }, 3000); // Change the delay according to your needs

    return () => clearInterval(timer);
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.imageContainer}>
      <Image source={item.image} style={styles.image} />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <FlatList
          ref={flatListRef}
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.contentContainer}
          getItemLayout={(_, index) => ({
            length: wp(90), // Adjust this value based on your image width
            offset: wp(90) * index, // Adjust this value based on your image width
            index,
          })}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {

      justifyContent: 'center',
      alignItems: 'center',
    height: "30%", 
    
  },
  image: {
    width: wp(90),
    height: 200,
    backgroundColor: '#000',
      marginHorizontal: wp(1),
    borderRadius:wp(2)
  },
  contentContainer: {
    paddingHorizontal: wp(4),
  },
});

export default SwipList;
