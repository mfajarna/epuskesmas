import { Alert, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { color } from '../utils/colors'
import { ICLogo } from '../assets/icon'
import { normalizeFont } from '../utils/normalizeFont'
import { fonts } from '../utils/fonts'
import { useDispatch } from 'react-redux'
import NotifService from '../utils/notification/NotifService'
import { getUser } from '../utils/AsyncStoreServices'
import { getVerifikasiKTP } from '../utils/redux/action/pasien'


const SplashScreen = ({navigation}) => {

    const dispatch = useDispatch();

    const[registerToken, setRegisterToken] = useState('');
    const [fcmRegistered, setFcmRegistered] = useState(false);

    const onRegister = token => {
        setRegisterToken(token.token);
        setFcmRegistered(true);
      };

      const onNotif = notif => {
        Alert.alert(notif.title, notif.message);
      };

    const notif = new NotifService(onRegister, onNotif);

    const handlePerm = perms => {
        Alert.alert('permission', JSON.stringify(perms));
      };

    dispatch({
      type: "SET_DEVICE_TOKEN",
      value: registerToken
    })

    const checkAuth = async () => {
        const user = await getUser()
        const isAuth = user.authenticated
        const idUser = user.id
        const token = user.token

        if(isAuth !== false)
        {

          
          dispatch(getVerifikasiKTP(idUser, navigation, token))
          
        }else{
          navigation.replace('LoginScreen')
        }

        return Promise.resolve(user)
    }

  useEffect(() => {
    checkAuth()
  },[registerToken])

  return (
    <View style={styles.container}>
     <View style={styles.wrap}>
        <ICLogo />
            <View style={{justifyContent: 'center', marginLeft: 7}}>
                <Text style={styles.text}>MYHEALTH</Text>
            </View>
     </View>
    </View>
  )
}

export default SplashScreen

const styles = StyleSheet.create({
    container: {
        backgroundColor: color.primary,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text:{
        fontSize : normalizeFont(20),
        fontFamily: fonts.bold,
        color: color.white,
        
    },
    wrap:{
        flexDirection: 'row',
    }
})