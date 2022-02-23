import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { ICArrowBack } from '../../assets/icon'
import { fonts } from '../../utils/fonts'
import { normalizeFont } from '../../utils/normalizeFont'

const Header = ({title, onPress, onBack}) => {
  return (
    <View style={styles.container}>

        <View style={styles.wrapper}>
                {onBack && (
                        <TouchableOpacity activeOpacity={0.5} onPress={onBack}>
                            <View style={styles.icon}>
                                <ICArrowBack />
                            </View>
                        </TouchableOpacity>
                    )}

                    <View style={styles.textContainer}>
                        <Text style={styles.title}>{title}</Text>
                    </View>
        </View>

    </View>
  )
}

export default Header

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 20,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 0.5,
        borderBottomColor: '#E7E4E4'
      },
      icon: {

        paddingHorizontal: 10
      },
      title: {
        fontSize: 15,
        fontFamily: fonts.semiBold,
        color: '#353535',
      },
      wrapper:{
          flexDirection: 'row'
      },
      textContainer: {
          flex: 1,
          marginRight: 30,
          alignItems: 'center',
          justifyContent: 'center'
      }
})