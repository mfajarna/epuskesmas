import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { fonts } from '../../utils/fonts'

const CustomText = ({label, name}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <Text style={[
              styles.name,
                {
                    color: name == "Belum Verifikasi" ? '#FF9F45' 
                           : name == "Verifikasi" ? '#6EBF8B'
                           : 'black'
                }
      ]}>{name}</Text>
    </View>
  )
}

export default CustomText

const styles = StyleSheet.create({
    container:{
        marginBottom: 8,
        justifyContent: 'space-between'
    },
    label:{
        fontFamily: fonts.semiBold,
        width: 200
    },
    name:{
        
        fontFamily: fonts.medium,
        fontSize: 13,
    }
})