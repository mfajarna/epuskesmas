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
import { loginAction, setLoading } from '../utils/redux/action'
import CustomButtonNoBorder from '../components/molecules/CustomButtonNoBorder'
import UseForm from '../utils/useForm'
import { showMessage } from '../utils/showMessage'


const Loginscreen = ({navigation}) => {

  const dispatch = useDispatch();

  const[form,setForm] = UseForm({
    email: '',
    password: ''
  })


  // const{deviceToken} = useSelector(state => state.globalReducer);


  const onLogin = () => {
      
      dispatch(setLoading(true))

      let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

      if(form.email == "" || form.password == "")
      {

          dispatch(setLoading(false))
          showMessage('Data tidak boleh ada yang kosong!')

          return false

         
      }if(reg.test(form.email) === false)
      {
          dispatch(setLoading(false))
          showMessage('Format email tidak benar!')

          return false
      }else{
          dispatch(loginAction(form, navigation))
      }
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
            value={form.email}
            onChangeText={(value) => setForm('email', value)}
      />

      <Gap height={25} />

      <CustomTextInput
            text="Password"
            placeholder="Silahkan masukan password anda..."
            value={form.password}
            onChangeText={(value) => setForm('password', value)}
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