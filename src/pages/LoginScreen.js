import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { color } from '../utils/colors'
import { ICLogoBlue } from '../assets/icon'
import CustomTextInput from '../components/molecules/CustomTextInput'
import Gap from '../components/atoms/Gap'
import { fonts } from '../utils/fonts'
import { normalizeFont } from '../utils/normalizeFont'
import CustomButton from '../components/molecules/CustomButton'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading } from '../utils/redux/action'
import CustomButtonNoBorder from '../components/molecules/CustomButtonNoBorder'


const Loginscreen = ({navigation}) => {

  const dispatch = useDispatch();

  // const{deviceToken} = useSelector(state => state.globalReducer);


  const onLogin = () => {
      dispatch(setLoading(true))


      setTimeout(() => {
          dispatch(setLoading(false))
          
      }, 2000)
  }

  const onRegister = () => {
      navigation.navigate('Register')
  }


  return (
    <View style={styles.container}>
      <Gap height={74} />
      <View style={{alignItems: 'center'}}>
      
        <ICLogoBlue />
      </View>
      <Gap height={42} />
      <Text style={styles.title}>Login</Text>
      <Text style={styles.titleDesc}>Silahkan login untuk akses fitur kami</Text>
      <Gap height={25} />

      <CustomTextInput
            text="Email"
            placeholder="Silahkan masukan email anda..."
      />

      <Gap height={25} />

      <CustomTextInput
            text="Password"
            placeholder="Silahkan masukan password anda..."
            secureTextEntry
        />

      <Gap height={25} />

        <CustomButton 
            color={color.primary}
            text="Login"
            onPress={onLogin}
        />

      <Gap height={20} />

        <CustomButtonNoBorder
         title="Daftar Akun"
         onPress={onRegister}
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
        color: '#070707',
        fontSize: normalizeFont(24)
    },
    titleDesc:{
      marginTop: 10,
      fontFamily: fonts.medium,
      color: '#5E5E5E',
      fontSize: 13
    }
})