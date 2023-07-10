import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import DetailsCompo from '../Components/DetailsCompo'

const Details = () => {
    return (
        <View style={styles.mainView}>
            <DetailsCompo />

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