import React from 'react';
import { View, FlatList, Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import imagesClass from '../asserts/imagepath';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useNavigation, } from '@react-navigation/native';



const data = [
    { id: '1', image: imagesClass.banner2, leftText: 'Box 1', rightText: '$100/hr' },
    { id: '2', image: imagesClass.box2, leftText: 'Box 2', rightText: '$200/hr' },
    { id: '3', image: imagesClass.box3, leftText: 'Box 3', rightText: '$300/hr' },
    { id: '4', image: imagesClass.box4, leftText: 'Box 3', rightText: '$300/hr' },

    // Add more items as needed
];



const BoxeItems = ({ navigation }) => {
    // const navigation = useNavigation();

    const renderItem = ({ item }) => (

        <View style={styles.container}>
            <TouchableOpacity
                onPress={() => navigation.navigate("Details")}
            >
                <Image
                    source={item.image}
                    style={styles.image}
                    resizeMode="cover"
                />
                <View style={styles.textContainer}>
                    <Text style={styles.textLeft}>{item.leftText}</Text>
                    <Text style={styles.textRight}>{item.rightText}</Text>
                </View>
            </TouchableOpacity>

        </View>
    );
    return (
        <View style={styles.container}>
            <FlatList
                style={{ marginBottom: wp(19) }}
                data={data}
                showsVerticalScrollIndicator={false}
                keyExtractor={item => item.id}
                renderItem={renderItem}
            />
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
        width: "100%",
        height: 200,
        borderRadius: wp(2),
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
        color: '#000',
        fontWeight: 'bold',


    },
    textRight: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',





    },
});
export default BoxeItems;