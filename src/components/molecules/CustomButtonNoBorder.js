import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { color } from '../../utils/colors'
import { fonts } from '../../utils/fonts'
import { normalizeFont } from '../../utils/normalizeFont'

const CustomButtonNoBorder = ({title, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress}>
        <View style={{alignItems: 'center'}}>
            <Text style={styles.text}>{title}</Text>
        </View>
    </TouchableOpacity>
  )
}

export default CustomButtonNoBorder

const styles = StyleSheet.create({
    text:{
        fontFamily: fonts.semiBold,
        fontSize: 15,
        color: color.primary
    }
})