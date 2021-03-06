import { Alert, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import auth from '@react-native-firebase/auth'
import { ILOtp } from '../../assets/illustration'
import Gap from '../../components/atoms/Gap'
import { normalizeFont } from '../../utils/normalizeFont'
import { fonts } from '../../utils/fonts'
import { useDispatch } from 'react-redux'
import { setLoading } from '../../utils/redux/action'
import { showMessage } from '../../utils/showMessage'
import Header from '../../components/atoms/Header'


const AuthenticationScreen = ({navigation,route}) => {

  const dispatch = useDispatch();

  const{dataRegister} = route.params;

  var no_handphone = dataRegister.no_handphone;

  useEffect(() => {
      dispatch(setLoading(false))

  }, [])

  let textInput = useRef(null)
  const[phoneNumber, setPhoneNumber] = useState(no_handphone)
  const[focusInput, setFocusInput] = useState(true)


  // if null, no sms has been sent
  const[confirm, setConfirm] = useState(null)


  const onChangePhone = (number) => {
      setPhoneNumber(number)
  }

  const onPressContinue = async () => {
      
      if(phoneNumber)
      {
          dispatch(setLoading(true))
        try{
          const confirmation = await auth().signInWithPhoneNumber("+62"+phoneNumber)
          
          
            navigation.navigate('InputOTP', {
              phone: phoneNumber,
              code: confirmation,
              dataRegister: dataRegister
            })
     


        }catch(error)
        {
            dispatch(setLoading(false))
            showMessage(error.message)
        }
       
      }if(phoneNumber === "")
      {
        showMessage("Tolong isi nomor handphone anda!")
      }
  }

  const onChangeFocus = () => {
    setFocusInput(true)
  }

  const onChangeBlur = () => {
    setFocusInput(false)
  }

  useEffect(() => {
    textInput.focus()
  }, [])
 
  return (
    <View style={styles.container}>
      <Header
        title="Verifikasi nomor handphone"
        onBack={() => navigation.goBack()}
      />
        <KeyboardAvoidingView
            keyboardVerticalOffset={50}
            behavior={'padding'}
            style={styles.containerAvoiddingView}
        >

          <Gap height={30} />
          <ILOtp />

            <Text style={styles.textTitle}>Periksa nomor handphone anda, jika sudah benar lanjutkan untuk verifikasi</Text>
            <View style={[
                  styles.containerInput,
                  {
                    borderBottomColor: focusInput ? '#3987E5' : '#FFFFF'
                  }
              
              ]}>
                <View style={styles.openDialogView}>
                  <Text>+62 | </Text>
                </View>

                <TextInput
                  ref = {(input) => textInput = input}
                  style={styles.phoneInput}
                  placeholder="81344433323"
                  keyboardType='numeric'
                  maxLength={11}
                  value={phoneNumber}
                  onChangeText={onChangePhone}
                  secureTextEntry={false}
                  onFocus={onChangeFocus}
                  onBlur={onChangeBlur}
                  autoFocus={focusInput}            
                />

              <View style={styles.viewBottom}>
                        <TouchableOpacity onPress={onPressContinue}>
                            <View style={[
                                styles.btnContinue,
                                {
                                  backgroundColor: phoneNumber ? '#3987E5' : 'gray'
                                }
                              ]}>
                              <Text style={styles.textContinue}>Continue</Text>
                            </View>
                        </TouchableOpacity>
              </View>
            </View>

        </KeyboardAvoidingView>


    </View>
  )
}

export default AuthenticationScreen

const styles = StyleSheet.create({
    container:{
      flex: 1,
      alignItems: 'center',
      backgroundColor: '#FFFF'
    },
    containerAvoiddingView:{
      alignItems: 'center',
      padding: 10,
      flex: 1,
    },
    textTitle:{
      marginBottom: 30,
      marginTop: 50,
      fontFamily: 'Montserrat-SemiBold',
      textAlign: 'center',
      fontSize: 16,
      color: 'black'
      
    },
    containerInput: {
      flexDirection: 'row',
      paddingHorizontal: 12,
      borderRadius: 10,
      backgroundColor: '#F6F5FA',
      alignItems: 'center',
      borderBottomWidth: 1.5
    },
    openDialogView: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    phoneInput: {
      marginLeft: 5,
      flex: 1,
      height: 70,
      fontFamily: fonts.medium,
      color: 'gray',
      fontSize: 14
    },
    viewBottom: {
      flex: 1,
      justifyContent: 'flex-end',
      
      alignItems: 'center'
    },
    btnContinue:{
      width: 150,
      height: 50,
      borderRadius: 10,
      alignContent: 'center',
      justifyContent: 'center'
    },
    textContinue: {
      color: 'white', 
      alignItems: 'center',
      textAlign: 'center',
      fontFamily: 'Montserrat-SemiBold',
      fontSize: 14
    }
})