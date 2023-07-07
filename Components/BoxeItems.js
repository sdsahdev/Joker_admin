import React from 'react';
import { View, FlatList, Image, StyleSheet, Text } from 'react-native';
import imagesClass from '../asserts/imagepath';


const data = [
    { id: '1', image: imagesClass.banner1, leftText: 'Left Text 1', rightText: 'Right Text 1' },
    { id: '2', image: imagesClass.banner2, leftText: 'Left Text 2', rightText: 'Right Text 2' },
    // Add more items as needed
];

const FullWidthImageWithText = ({ image, leftText, rightText }) => {
    return (
        <View style={styles.container}>
            <Image
                source={imagesClass.banner1}
                style={styles.image}
                resizeMode="cover"
            />
            <View style={styles.textContainer}>
                <Text style={styles.textLeft}>{leftText}</Text>
                <Text style={styles.textRight}>{rightText}</Text>
            </View>
        </View>
    );
};

const renderItem = ({ item }) => (
    <FullWidthImageWithText
        image={item.image}
        leftText={item.leftText}
        rightText={item.rightText}
    />
);



const BoxeItems = () => {
    return (
        <View style={styles.container}>
            <FlatList
                data={data}
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
    },
    image: {
        width: "90%",
        height: 200,
    },
    textContainer: {
        position: 'absolute',
        bottom: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        width: '100%',
        padding: 10,
    },
    textLeft: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    textRight: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
export default BoxeItems;