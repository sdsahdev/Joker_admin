import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import DetailsCompo from '../Components/DetailsCompo'

const Details = ({ navigation, route }) => {
    return (
        <View style={styles.mainView}>
            <DetailsCompo navigation={navigation} />

        </View>
    )
}

export default Details

const styles = StyleSheet.create({
    mainView: {
        position: 'relative', backgroundColor: '#E8E8E8'
        , flex: 1
    },
})