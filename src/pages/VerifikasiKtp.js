import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React, { useState } from 'react'
import { color } from '../utils/colors'
import Header from '../components/atoms/Header'
import * as ImagePicker from 'react-native-image-picker';
import { showMessage } from '../utils/showMessage';
import { fonts } from '../utils/fonts';
import { IcUploadKtp } from '../assets/icon';
import Gap from '../components/atoms/Gap';
import CustomButton from '../components/molecules/CustomButton';


const VerifikasiKtp = ({navigation}) => {
  const [response, setResponse] = useState('')

  const addPhoto = () => {
    ImagePicker.launchImageLibrary(            {
      quality: 1,
      maxWidth: 250,
      maxHeight: 250
  },
    response => {
      const responsePhoto = response

      if(response.didCancel || response.error)
      {
          showMessage('Anda tidak memilih photo!')
      }else{

        const dataPhoto = response.assets[0]
        const source = {uri: dataPhoto.uri}
        setResponse(source)
        

      }


    }
  );
  }

  return (
    <View style={styles.container}>
        <Header
            title="Verifikasi KTP"
            onBack={() => navigation.navigate('MyProfileScreen')}
        />

        <View style={styles.content}>
            <Text style={styles.text}>Silahkan upload foto KTP</Text>

            <TouchableOpacity onPress={addPhoto} style={styles.containerPhoto}>


              {response ?  <Image source={response} style={styles.photo}></Image> 
              
              : <IcUploadKtp /> }
            </TouchableOpacity>

        <Gap height={10} />
        <CustomButton
            text="Upload KTP"
            color={color.primary}
        />

            
        </View>
      
  
    </View>
  )
}

export default VerifikasiKtp

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: color.background,

    },
    photo:{
      width: 300,
      height: 250
    },
    containerPhoto:{

      borderWidth: 1,
      borderColor: color.primary,
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white',
      height: 300
    },
    text:{
      fontFamily: fonts.semiBold,
      fontSize: 15,
      marginBottom: 20
    },
    content:{
      flex: 1,
      padding: 20
    },
    textKtp:{
      fontFamily: fonts.medium,
      color: '#89BBF8'
    }
})