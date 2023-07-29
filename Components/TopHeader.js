import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import BackgroundSvg from '../asserts/svgs/BgImg';
import imagesClass from '../asserts/imagepath';
import { TouchableOpacity } from 'react-native-gesture-handler';

const TopHeader = ({ name, back, navigation }) => {
    return (
        <SafeAreaView style={styles.container}>

            <View style={styles.backgroundContainer}>
                <BackgroundSvg />
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: hp(3) }}>


                {back === true ?
                    <TouchableOpacity onPress={() => navigation.pop()} >

                        <Image source={imagesClass.backScreen} style={styles.backstyle} />
                    </TouchableOpacity>


                    : null}

                <Text
                    style={styles.headetxt}>
                    {name}
                </Text>
            </View>
        </SafeAreaView>

    )
}

export default TopHeader

const styles = StyleSheet.create({
    backstyle: { width: wp(10), height: hp(8), resizeMode: 'center', marginLeft: wp(8), tintColor: '#000' },
    headetxt: {
        color: '#000',
        fontSize: wp(7),
        marginLeft: wp(4),
    },
    container: { flex: 1, position: 'relative' },
    backgroundContainer: {
        ...StyleSheet.absoluteFillObject,
    },

})