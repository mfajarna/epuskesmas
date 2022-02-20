import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { color } from '../utils/colors'
import { ICLogoBlue } from '../assets/icon'
import CustomTextInput from '../components/molecules/CustomTextInput'
import Gap from '../components/atoms/Gap'
import { fonts } from '../utils/fonts'
import { normalizeFont } from '../utils/normalizeFont'
import CustomButton from '../components/molecules/CustomButton'

const Loginscreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Gap height={74} />
      <View style={{alignItems: 'center'}}>
      
        <ICLogoBlue />
      </View>
      <Gap height={42} />
      <Text style={styles.title}>Silahkan login untuk akses fitur kami</Text>
      <Gap height={25} />

      <CustomTextInput
            placeholder="Silahkan masukan email anda..."
      />

      <Gap height={25} />

      <CustomTextInput
            placeholder="Silahkan masukan password anda..."
            secureTextEntry
        />

      <Gap height={25} />

        <CustomButton 
            color={color.primary}
            text="Login"
            onPress={() => navigation.navigate('Authentication')}
        />
    </View>
  )
}

export default Loginscreen

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: color.white,
        paddingHorizontal: 27
    },
    title:{
        fontFamily: fonts.bold,
        color: '#5E5E5E',
        fontSize: normalizeFont(18)
    }
})