import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import TounamentDate from '../Components/TounamentDate'
import About from './About'
import CalanderFile from '../Components/CalanderFile'
import { ScrollView } from 'react-native-gesture-handler'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const Inbox = () => {
    return (
        <View style={{ flex: 1, marginBottom: hp(13), marginTop: hp(4) }}>
            <ScrollView>
                <View style={{ flexWrap: 'wrap', flex: 1, justifyContent: 'center', alignSelf: 'center' }}>
                    <About />
                </View>
                <View style={{ margin: wp(10) }} >
                    <CalanderFile />
                </View>
            </ScrollView>
        </View>


    )
}

export default Inbox

const styles = StyleSheet.create({})