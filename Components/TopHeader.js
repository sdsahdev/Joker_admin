import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import BackgroundSvg from '../asserts/svgs/BgImg';

const TopHeader = ({ name }) => {
    return (
        <SafeAreaView style={styles.container}>

            <View style={styles.backgroundContainer}>
                <BackgroundSvg />
            </View>
            <Text
                style={styles.headetxt}>
                {name}
            </Text>
        </SafeAreaView>

    )
}

export default TopHeader

const styles = StyleSheet.create({
    headetxt: {
        color: '#000',
        fontSize: wp(7),
        marginTop: wp(10),
        position: 'absolute',
        marginLeft: wp(10),
    },
    container: { flex: 1, position: 'relative' },
    backgroundContainer: {
        ...StyleSheet.absoluteFillObject,
    },

})