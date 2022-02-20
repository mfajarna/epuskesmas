import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { color } from '../utils/colors'
import { ICLogo } from '../assets/icon'
import { normalizeFont } from '../utils/normalizeFont'
import { fonts } from '../utils/fonts'


const SplashScreen = ({navigation}) => {

  useEffect(() => {
    setTimeout(() => {
        navigation.replace('LoginScreen')
    }, 2000)
  },[])

  return (
    <View style={styles.container}>
     <View style={styles.wrap}>
        <ICLogo />
            <View style={{justifyContent: 'center', marginLeft: 7}}>
                <Text style={styles.text}>MYHEALTH</Text>
            </View>
     </View>
    </View>
  )
}

export default SplashScreen

const styles = StyleSheet.create({
    container: {
        backgroundColor: color.primary,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text:{
        fontSize : normalizeFont(20),
        fontFamily: fonts.bold,
        color: color.white,
        
    },
    wrap:{
        flexDirection: 'row',
    }
})