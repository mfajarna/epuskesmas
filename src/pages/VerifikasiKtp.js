import { StyleSheet, Text, TouchableOpacity, View, Image, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { color } from '../utils/colors'
import Header from '../components/atoms/Header'
import * as ImagePicker from 'react-native-image-picker';
import { showMessage } from '../utils/showMessage';
import { fonts } from '../utils/fonts';
import { IcUploadKtp } from '../assets/icon';
import Gap from '../components/atoms/Gap';
import { useSelector , useDispatch} from 'react-redux';
import CustomButton from '../components/molecules/CustomButton';
import axios from 'axios';
import { ENDPOINT_API } from '../utils/httpClient';
import { getUser } from '../utils/AsyncStoreServices';
import { uploadKtpAction } from '../utils/redux/action/uploadktp';


const VerifikasiKtp = ({navigation}) => {
  const [response, setResponse] = useState('')
  const {uploadKtpReducer} = useSelector(state => state);
  const dispatch = useDispatch();
  const [token,setToken] = useState('')
  const [dataPhoto, setDataPhoto] = useState({});


  const userFetch = async () => {
      const user = await getUser();

      setToken(user.token);
  }

  console.log(token)

  useEffect(() => {
      userFetch()
  },[])


  const addPhoto = () => {
    ImagePicker.launchImageLibrary({
      quality: 0.5,
      maxWidth: 200,
      maxHeight: 200
  },
    response => {


      console.log(response)
        if(response.didCancel || response.error)
        {


            showMessage('Anda tidak memilih photo!')
        }else{

          const dataPhoto = response.assets[0]
          const source = {uri: dataPhoto.uri}


          const filePhoto = {
            uri: dataPhoto.uri,
            type: dataPhoto.type,
            name: dataPhoto.fileName
          }

          setResponse(source)
          setDataPhoto(filePhoto)
          
          dispatch({type: 'SET_UPLOAD_PHOTO', value: filePhoto})
          dispatch({type: 'SET_STATUS_UPLOAD', value: true})
        }
      }
    );
  }

  const onSubmit = async () => {
      if(response)
      {
        dispatch(uploadKtpAction(token,dataPhoto))

      }else{
        showMessage('Anda belum memilih foto')
      }
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
            onPress={onSubmit}
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