import { Alert, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { normalizeFont } from '../../utils/normalizeFont';
import { color } from '../../utils/colors';
import { useDispatch } from 'react-redux';
import { registerAction, setLoading } from '../../utils/redux/action';
import auth from '@react-native-firebase/auth'
import Header from '../../components/atoms/Header';
import { IlOtpVerif } from '../../assets/illustration';
import Gap from '../../components/atoms/Gap';
import { showMessage } from '../../utils/showMessage';


const OtpScreen = ({route,navigation}) => {

  const {phone,code,dataRegister} = route.params;
  const dispatch = useDispatch()
  const lengthInput = 6;
  let textInput = useRef(null)
  let clockCall = null
  let defaultCountdown = 10

  const[intervalVal, setIntervalVal] = useState("")
  const[countdown, setCountDown] = useState(defaultCountdown)
  const[enableResend, setEnableResend] = useState(false)
  const[confirm,setConfirm] = useState(null);
  const[focusInput, setFocusInput] = useState(true)
  


  useEffect(() => {
      textInput.focus()
  }, [])



  useEffect(() => {
    dispatch(setLoading(false))

    clockCall = setInterval(() => {
      decrementClock()

    }, 1000)

    return () => {
      clearInterval(clockCall)
    }
  })

  const decrementClock = () => {

    if(countdown === 0)
    {
      setEnableResend(true)
      setCountDown(0)
      clearInterval(clockCall)
    }else{
      setCountDown(countdown - 1)
    }

    
  }

  const onChangeFocus = () => {
    setFocusInput(true)
  }

  const onChangeBlur = () => {
    setFocusInput(true)
  }


  const onChangeText = (val) => {
    setIntervalVal(val)
  }

  const onChangeNumber = () => {
    setIntervalVal("")

    navigation.goBack();
    

  }

  const onResendOTP = async () => {
      if(enableResend)
      {
         try{
           const confirmation = await auth().signInWithPhoneNumber("+62"+phone)
           setConfirm(confirmation)

           setCountDown(defaultCountdown)
           setEnableResend(false)
           clearInterval(clockCall)
  
          clockCall = setInterval(() => {
            decrementClock()
        }, 1000)

         }catch(error)
        {
          showMessage(error.message)
        }

      }


      
  }

  const onVerification = async () => {
      try{
        
        dispatch(setLoading(true))
        
        if(confirm == null)
        {
          await code.confirm(intervalVal)


          dispatch(registerAction(dataRegister,navigation))
        }else{
          
          await confirm.confirm(intervalVal)

          dispatch(registerAction(dataRegister, navigation))
        }

      }catch(error)
      {
        dispatch(setLoading(false))
        // showMessage(error.message)

        Alert.alert(error.message);
        
      }
  }



  return (
    <View style={styles.container}>

      <Header
        title="Konfirmasi OTP"
        onBack={() => navigation.goBack()}
      />
        <KeyboardAvoidingView
          behavior='padding'
          keyboardVerticalOffset={50}
          style={styles.containerAvoiddingView}
        >
          <Gap height={20} />
          <IlOtpVerif />

          <Gap height={20} />
          <Text style={styles.titleStyle}>
            Masukan kode OTP yang dikirimkan via SMS ke nomor 0{phone}
          </Text>

          <View>
            <TextInput
              ref = {(input) => textInput = input}
              onChangeText={onChangeText}
              style={{width: 200, height: 100, backgroundColor: 'red'}}
              value={intervalVal}
              maxLength={lengthInput}
              returnKeyType="done"
              keyboardType='numeric'
              onFocus={onChangeFocus}
              onBlur={onChangeBlur}
              autoFocus={focusInput} 
            />
          </View>

          <View style={styles.containerInput}>
            {
              Array(lengthInput).fill().map((data, index) => (
                  <View 
                      key={index}
                      style={[
                          styles.cellView,
                          {
                            backgroundColor: index === intervalVal.length ? color.primary : '#F6F5FA'
                          }
                        ]}>

                    <Text 
                      style={styles.cellText}
                      onPress={() => textInput.focus()}
                    >
                      {intervalVal && intervalVal.length > 0 ? intervalVal[index] : ""}
                    </Text>

                  </View>
              ))
            }

          </View>




        </KeyboardAvoidingView>


            

        <View style={styles.viewVerifikasi}>
              <View style={styles.bottomView}> 
                  <TouchableOpacity onPress={onChangeNumber}>
                    <View style={styles.btnChangeNumber}>
                        <Text style={styles.textChange}>Ganti nomor</Text>
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={onResendOTP}>
                    <View style={styles.btnResend}>
                        <Text style={[
                          styles.textResend,
                          {
                            color: enableResend ? '#3987E5' : 'grey'
                          }
                          
                          ]}>Resend OTP ({countdown})</Text>
                    </View>
                  </TouchableOpacity>
              </View>
                <TouchableOpacity onPress={onVerification}>
                            <View style={
                                styles.btnVerifikasi
                              }>
                              <Text style={styles.textContinue}>Verifikasi</Text>
                            </View>
                </TouchableOpacity>
        </View>
      
    </View>
  )
}

export default OtpScreen

const styles = StyleSheet.create({
  container:{
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FFFF',
  },
  containerAvoiddingView:{
    alignItems: 'center',
    padding: 10,
    flex: 1,
  },
  titleStyle:{
    margin: 0,
    marginBottom: 20,
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 14,
    textAlign: 'center',
  
  },
  containerInput: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cellView:{
    paddingVertical: 13,
    width: 45,
    height: 25,
    margin: 7,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    
    backgroundColor: '#F6F5FA',
    paddingVertical: 30,
    shadowColor: "#000",
      shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,

        elevation: 8,
  },
  cellText:{
    textAlign: 'center',
    fontSize: 16,
    fontFamily: 'Montserrat-SemiBold'
  },
  bottomView:{
    flexDirection: 'row',
    
  },
  btnChangeNumber:{
    width: 150,
    height: 50,
    borderRadius: 10,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  textChange: {
    color: '#3987E5',
    alignItems: 'center',
    fontFamily: 'Montserrat-Medium',
    fontSize: 15
  },
  btnResend: {
    width: 150,
    height: 50,
    borderRadius: 10,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  textResend: {
    alignItems: 'center',
    fontFamily: 'Montserrat-Medium',
    fontSize: 15
  },
  btnVerifikasi:{
    width: 250,
    height: 50,
    borderRadius: 10,
    alignContent: 'center',
    justifyContent: 'center',
    backgroundColor: '#3987E5'
  },
  viewVerifikasi: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 25,
    alignItems: 'center'
  },
  textContinue: {
    color: 'white', 
    alignItems: 'center',
    textAlign: 'center',
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 15
  }
})