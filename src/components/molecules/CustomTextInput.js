import { StyleSheet, Text, View, TextInput as TextInputRN } from 'react-native'
import React from 'react'
import { color } from '../../utils/colors'
import { fonts } from '../../utils/fonts'

const CustomTextInput = ({text,placeholder, ...restProps}) => {
  return (
    <View>
      <Text style={styles.text}>{text}</Text>
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
 
        borderRadius: 6,
        backgroundColor: '#F8F8F8',
        padding: 9,
        borderBottomWidth: 1,
        borderColor: color.primary,
        fontFamily: fonts.medium,

      },
      text:{
        fontFamily: fonts.medium,
        fontSize: 13,
        color: '#070707',
        marginBottom: 10
      }
})