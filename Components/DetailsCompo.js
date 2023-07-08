import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import imagesClass from '../asserts/imagepath'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Back from '../asserts/svgs/Back';
import Icon from '../asserts/svgs/Back';
import { Svg, G, Rect, Path, Defs, Filter, FeFlood, FeGaussianBlur, FeComposite, FeBlend, Stop, LinearGradient } from 'react-native-svg';
import { SafeAreaView } from 'react-native-safe-area-context';
import TimeComp from './TimeComp';
import TitelText from './Titels';
import Titels from './Titels';

const DetailsCompo = () => {
    return (
        <SafeAreaView style={styles.container}>

            <View style={styles.imageContainer}>
                <Image
                    source={imagesClass.GroudDetails}
                    style={styles.image}
                    resizeMode="cover"
                />
                <View style={styles.imagesOverlay}>
                    <Image
                        source={imagesClass.backbig}
                        style={styles.image1}
                        resizeMode="cover"
                    />
                    <Image
                        source={imagesClass.share}
                        style={styles.image2}
                        resizeMode="cover"
                    />
                </View>
            </View>
            <Titels />
            <Titels />
            <Titels />
            <Titels />
            <Titels />
            <Titels />
            <Titels />
            <Titels />
            <SafeAreaView style={{ width: "100%", height: hp(3), flexDirection: 'row', justifyContent: 'space-between', marginVertical: wp(2), marginHorizontal: wp(4) }}>

                <Text style={{
                    width: 'auto',
                    height: 'auto',
                    fontSize: 18,
                    color: '#000',
                }}>Sports academy</Text>
                <Text style={{
                    width: 'auto',
                    height: 'auto',
                    fontSize: 18,
                    color: '#000',
                    paddingRight: wp(10)
                }}>$600/hr</Text>
            </SafeAreaView>
            <TimeComp img={imagesClass.clock} text={"Open: 24 hours"} />
            <TimeComp img={imagesClass.bluerike} text={"2 Slot available"} />

        </SafeAreaView >
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%', height: '100%'
    },
    imageContainer: {
        position: 'relative',
        width: '100%',
        height: 200,
    },
    image: {
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        borderRadius: 8,
    },
    imagesOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: hp(4)
    },
    image1: {
        width: 40,
        height: 40,
        margin: 8,

    },
    image2: {
        width: 40,
        height: 40,
        margin: 8,
    },
    clocks: {
        width: wp(5),
        height: wp(5),
    },

    detailsText: {
        fontSize: 16,
        color: '#fff',
        height: wp(6),
        position: 'relative',
        marginLeft: wp(4),
        backgroundColor: '#000'
    },
    detailsText2: {
        fontSize: 16,
        color: '#fff',
        height: wp(6),
        position: 'relative',
        marginLeft: wp(4),
        right: 0,
        width: "100%",
        backgroundColor: '#000'
    },
});

export default DetailsCompo;

