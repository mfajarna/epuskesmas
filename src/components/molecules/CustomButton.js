import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { fonts } from '../../utils/fonts'
import { color } from '../../utils/colors'
import { normalizeFont } from '../../utils/normalizeFont'


const CustomButton = ({onPress, color, text}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container(color)}>
        <View style={{alignItems: 'center'}}>
            <Text style={styles.text}>{text}</Text>
        </View>
    </TouchableOpacity>
  )
}

export default CustomButton

const styles = StyleSheet.create({
    container: color => ({
        backgroundColor: color,
        padding: 15,
        borderRadius: 8,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 11,
        },
        shadowOpacity: 0.55,
        shadowRadius: 14.78,

        elevation: 22,

    }),
    text:{
        fontFamily: fonts.semiBold,
        fontSize: normalizeFont(18),
        color: color.white
    }
})