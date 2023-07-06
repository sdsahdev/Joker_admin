import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';


const BoxList = () => {


    const data = [
        { id: '1', image: require('../asserts/Images/pic1.jpeg') },
        { id: '2', image: require('../asserts/Images/pic2.jpeg') },
        { id: '3', image: require('../asserts/Images/pic1.jpeg') },
        { id: '4', image: require('../asserts/Images/pic2.jpeg') },


    ];
    const renderItem = ({ item }) => (

        <Image source={item.image} style={styles.image} />
    );
    return (
        <SafeAreaView style={styles.container}>
            <Text >Hey, Jolly{'\n'}
                Find ground near by you</Text>

            <View style={styles.container}>
                <FlatList
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.contentContainer}
                />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column'
    }, banners: {
        width: wp(90),
        height: hp(25),
        alignSelf: 'center',
        borderRadius: wp(1.5),
        backgroundColor: '#000'
    },
    imageContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

    },
    image: {
        width: 200,
        height: 200,

        backgroundColor: '#000',
        margin: 4
    },
});

export default BoxList;
