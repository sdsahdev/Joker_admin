import React, { useState, useEffect } from 'react';
import { View, FlatList, Image, StyleSheet, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import imagesClass from '../asserts/imagepath';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import ProgressLoader from 'rn-progress-loader';
import FastImage from 'react-native-fast-image';

const BoxeItems = ({ navigation, boxData }) => {
    const [isLoading, setIsLoading] = useState(false);

    const renderItem = ({ item }) => (

        <View style={styles.container}>
            <TouchableOpacity
                onPress={() => navigation.navigate("Details", { item })} >
                <View style={{ flexDirection: 'row' }}>

                    {console.log(item.images[0])}
                    {console.log(item.images[1])}


                    <FastImage
                        source={item.images[0] ? { uri: item.images[0].url } : imagesClass.box4}
                        style={[item.images[1] ? [styles.image] : [item.images[1], { width: '100%', height: '100%' }]]}
                        resizeMode="stretch"
                    />
                    <FastImage
                        source={item.images[1] ? { uri: item.images[1].url } : imagesClass.box4}
                        style={styles.image2}
                        resizeMode="stretch"
                    />


                </View>
                <View style={styles.textContainer}>
                    {item.name && <Text style={styles.textLeft}>{item.name}</Text>}
                    {item.morning_price && <Text style={styles.textRight}>{parseInt(item.morning_price)} ₹</Text>}
                </View>
            </TouchableOpacity>

        </View>
    );

    return (
        <View style={styles.container}>

            {/* {console.log(boxData)}
            {console.log(Object.values(boxData))} */}
            <FlatList
                style={{ marginBottom: wp(19) }}
                data={boxData}
                showsVerticalScrollIndicator={false}
                keyExtractor={item => item.id}
                renderItem={renderItem}
            />
            <ProgressLoader
                visible={isLoading}
                isModal={true} isHUD={true}
                hudColor={"#fff"}
                color={"#027850"} />
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        padding: wp(1),
        marginVertical: wp(2),

    },
    image: {
        width: "70%",
        height: 200,
        borderTopLeftRadius: wp(2),
        borderBottomLeftRadius: wp(2),
    },
    image2: {
        width: "30%",
        height: 200,
        borderTopRightRadius: wp(2),
        borderBottomRightRadius: wp(2),
    },
    textContainer: {
        bottom: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        width: '100%',
        paddingRight: wp(2),
        paddingTop: wp(1),
        paddingLeft: wp(2)
    },
    textLeft: {
        color: 'white',
        fontSize: 16,
        color: '#027850',
        fontWeight: 'bold',


    },
    textRight: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        color: '#027850',
    },
});
export default BoxeItems;