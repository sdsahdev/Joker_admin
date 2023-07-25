import { View, Text, SafeAreaView, StyleSheet } from 'react-native';
import React from 'react';
import { Image } from 'react-native-animatable';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import imagesClass from '../asserts/imagepath';
import TopHeader from './TopHeader';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Menu = ({ icon, name, onpress }) => {
    return (
        <TouchableOpacity onpress={onpress}>

            <View style={{ alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row', backgroundColor: '#fff', marginHorizontal: wp(4), marginVertical: hp(1), borderRadius: wp(2) }}>

                <View style={{ flexDirection: 'row', }}>

                    <Image source={icon} style={{ height: hp(6), width: wp(20), resizeMode: 'center', marginVertical: hp(2) }} />
                    <Text style={{ fontSize: wp(5), color: '#000', alignSelf: 'center' }}>
                        {name}
                    </Text>

                </View>
                <View >
                    <Image source={imagesClass.arrowdown} resizeMode='center' style={{ width: wp(5), height: hp(2), justifyContent: 'flex-end', marginRight: wp(4) }} />
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default Menu

const styles = StyleSheet.create({})