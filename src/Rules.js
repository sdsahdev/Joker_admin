import React, { useEffect, useState } from 'react';
import TopHeader from '../Components/TopHeader'
import { SafeAreaView } from 'react-native-safe-area-context'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
    View,
    StyleSheet,
    Text,
    FlatList,
    TouchableOpacity,
    Image,
} from 'react-native';
import imagesClass from '../asserts/imagepath';
const Rules = () => {
    const rulesData = [
        { id: '1', rule: 'All customers are to leave the pitch/ground once their time slot has been completed.' },
        { id: '2', rule: 'Possession or Consumption of alcoholic beverages, public intoxication is prohibited in the facility.' },
        { id: '3', rule: 'Organized activities, events, tournaments, etc. In the field must have a reservation and confirmed payment.' },
        { id: '4', rule: 'Individuals or organizations cannot conduct commercial operations at venue without prior consent.' },
        { id: '5', rule: 'Management reserves the right to inspect any bag for the prohibited items.' },
        { id: '6', rule: 'Boots with Metal studs are prohibited.' },
        { id: '7', rule: 'The Management reserves the right to evict any individual for any offensive, violent, abusive, discriminatory behavior of any kind shown towards any of the staff as well as other customers.' },
        { id: '8', rule: 'Smoking, chewing tobacco & chewing gum is prohibited.' },
        { id: '9', rule: 'Outside food and Beverages not permissible.' },
        { id: '10', rule: 'Children under the age of 10 years must be accompanied by a guardian (16 years or over) at all times.' },
        { id: '11', rule: 'Arrive on time to avoid inconvenience for the next booking.' },
    ];
    const renderItem = ({ item }) => (
        <View style={styles.timeSlot}>
            <Image
                source={imagesClass.Arrow}
                resizeMode='contain'
                style={{ height: hp(1.5) }}
            />
            <Text style={styles.textLeft}>{item.rule}</Text>
        </View>
    );
    return (
        <SafeAreaView style={{ position: 'relative' }}>
            <View style={{ position: 'relative' }}>

                <View >
                    <TopHeader name={"Rules"} />
                </View>


                <View>
                    <FlatList
                        style={{ marginTop: hp(15) }}
                        data={rulesData}
                        showsVerticalScrollIndicator={false}
                        keyExtractor={item => item.id}
                        renderItem={renderItem}
                    />
                </View>
            </View>

        </SafeAreaView>
    )
}

export default Rules

const styles = StyleSheet.create({
    timeSlot: {
        flexDirection: 'row',
        marginVertical: wp(2),
        backgroundColor: '#fff'
    }, textLeft: {
        alignSelf: 'flex-start', textAlignVertical: 'top', verticalAlign: 'top', justifyContent: 'flex-start'
    }
})