import { StyleSheet, Text, View, TextInput as TextInputRN } from 'react-native'
import React from 'react'
import { color } from '../../utils/colors'
import { fonts } from '../../utils/fonts'

const CustomTextInput = ({placeholder, ...restProps}) => {
  return (
    <View>
      <TextInputRN
        style={styles.input}
        placeholder={placeholder}
        {...restProps}
      >
      </TextInputRN>
    </View>
  )
}

export default CustomTextInput

const styles = StyleSheet.create({
    input:{
        shadowColor: "#000",
        borderRadius: 6,
        backgroundColor: color.white,
        padding: 7,
        
        fontFamily: fonts.medium,
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 11,
            },
            shadowOpacity: 0.55,
            shadowRadius: 14.78,

            elevation: 22,
                }
})