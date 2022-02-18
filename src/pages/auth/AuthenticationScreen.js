import { Alert, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import auth from '@react-native-firebase/auth'

const AuthenticationScreen = ({navigation}) => {

  let textInput = useRef(null)
  const[phoneNumber, setPhoneNumber] = useState()
  const[focusInput, setFocusInput] = useState(true)

  // if null, no sms has been sent
  const[confirm, setConfirm] = useState(null)

  const[code, setCode] = useState('')

  const signInWithPhoneNumber = async () => {
      const confirmation = await auth.signInWithPhoneNumber(phoneNumber)

      setConfirm(confirmation)
  }

  const confirmCode = async () => {
    try{
      await confirm.confirm(code)

    }catch(error)
    {
      console.log('invalid code')
    }
  }




  const onChangePhone = (number) => {
      setPhoneNumber(number)
  }

  const onPressContinue = async () => {
      
      if(phoneNumber)
      {

        const confirmation = await auth().signInWithPhoneNumber("+6281388669869")

        console.log(confirmation)


        // navigation.navigate('InputOTP')
      }if(phoneNumber === "")
      {
        Alert.alert("Tolong isi nomer handphone")
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
        
        <KeyboardAvoidingView
            keyboardVerticalOffset={50}
            behavior={'padding'}
            style={styles.containerAvoiddingView}
        >

            <Text style={styles.textTitle}>Masukan nomor telepon anda</Text>
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
                  value={phoneNumber}
                  onChangeText={onChangePhone}
                  secureTextEntry={false}
                  onFocus={onChangeFocus}
                  onBlur={onChangeBlur}
                  autoFocus={focusInput}            
                />
            </View>

        </KeyboardAvoidingView>

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
  )
}

export default AuthenticationScreen

const styles = StyleSheet.create({
    container:{
      flex: 1,
      alignItems: 'center'
    },
    containerAvoiddingView:{
      alignItems: 'center',
      padding: 10,
      flex: 1,
    },
    textTitle:{
      marginBottom: 50,
      marginTop: 50,
      fontFamily: 'Montserrat-SemiBold',
      fontSize: 15
    },
    containerInput: {
      flexDirection: 'row',
      paddingHorizontal: 12,
      borderRadius: 10,
      backgroundColor: 'white',
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
      height: 50
    },
    viewBottom: {
      flex: 1,
      justifyContent: 'flex-end',
      marginBottom: 50,
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
      fontFamily: 'Montserrat-SemiBold'
    }
})