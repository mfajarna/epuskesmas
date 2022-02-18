import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { clear } from 'react-native/Libraries/LogBox/Data/LogBoxData';

const OtpScreen = ({navigation}) => {

  const lengthInput = 6;
  let textInput = useRef(null)
  let clockCall = null
  let defaultCountdown = 10

  const[intervalVal, setIntervalVal] = useState("")
  const[countdown, setCountDown] = useState(defaultCountdown)
  const[enableResend, setEnableResend] = useState(false)

  useEffect(() => {
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

  const onChangeText = (val) => {
    setIntervalVal(val)
  }

  const onChangeNumber = () => {
    // setIntervalVal("")

    // navigation.goBack();

    console.log(intervalVal)

  }

  const onResendOTP = () => {
      if(enableResend)
      {
        setCountDown(defaultCountdown)
        setEnableResend(false)
        clearInterval(clockCall)

        clockCall = setInterval(() => {
          decrementClock()
        }, 1000)
      }
  }

  useEffect(() => {
      textInput.focus()
  }, [])

  return (
    <View style={styles.container}>
        <KeyboardAvoidingView
          behavior='padding'
          keyboardVerticalOffset={50}
          style={styles.containerAvoiddingView}
        >

          <Text style={styles.titleStyle}>
            Masukan kode OTP yang dikirimkan via SMS
          </Text>

          <View>
            <TextInput
              ref = {(input) => textInput = input}
              onChangeText={onChangeText}
              style={{width: 0, height: 0}}
              value={intervalVal}
              maxLength={lengthInput}
              returnKeyType="done"
              keyboardType='numeric'
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
                            borderBottomColor: index === intervalVal.length ? '#E97D19' : '#3987E5'
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

        <View style={styles.bottomView}> 
            <TouchableOpacity onPress={onChangeNumber}>
              <View style={styles.btnChangeNumber}>
                  <Text style={styles.textChange}>Ganti nomer</Text>
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
      
    </View>
  )
}

export default OtpScreen

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
  titleStyle:{
    margin: 50,
    marginBottom: 50,
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 15,
    textAlign: 'center'
  },
  containerInput: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cellView:{
    paddingVertical: 11,
    width: 40,
    height: 5,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1.5
  },
  cellText:{
    textAlign: 'center',
    fontSize: 16,
    fontFamily: 'Montserrat-Regular'
  },
  bottomView:{
    flexDirection: 'row',
    flex: 1,
    marginBottom: 50,
    alignItems: 'flex-end'
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
    fontFamily: 'Montserrat-Normal',
    fontSize: 15
  },
  btnResend: {
    width: 150,
    height: 50,
    borderRadius: 10,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  textResend: {
    alignItems: 'center',
    fontFamily: 'Montserrat-Normal',
    fontSize: 15
  },
})