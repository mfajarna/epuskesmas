import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React, { useState } from 'react'
import { color } from '../utils/colors'
import Header from '../components/atoms/Header'
import * as ImagePicker from 'react-native-image-picker';
import { showMessage } from '../utils/showMessage';


const VerifikasiKtp = ({navigation}) => {
  const [response, setResponse] = useState('')

  const addPhoto = () => {
    ImagePicker.launchImageLibrary(            {
      quality: 1,
      maxWidth: 250,
      maxHeight: 250
  },
    response => {
      const responsePhoto = response.assets[0]

      if(response.didCancel || response.error)
      {
          showMessage('Anda tidak memilih photo!')
      }else{

        const source = {uri: responsePhoto.uri}
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
      
 
        <TouchableOpacity onPress={addPhoto} style={styles.containerPhoto}>
          <Text>Add photo</Text>
        </TouchableOpacity>
    


      <Image source={response} style={styles.photo}></Image>
    </View>
  )
}

export default VerifikasiKtp

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: color.background
    },
    photo:{
      width: 200,
      height: 200
    },
    containerPhoto:{
      flex: 1,
      borderStyle: 'dashed',
      borderWidth: 1,
      width: 500,
      backgroundColor: 'white'
    }
})