import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../components/atoms/Header'
import { color } from '../utils/colors'
import { fonts } from '../utils/fonts'
import Gap from '../components/atoms/Gap'
import CustomText from '../components/atoms/CustomText'
import { getUser, setUser } from '../utils/AsyncStoreServices'
import CustomButton from '../components/molecules/CustomButton'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { ENDPOINT_API } from '../utils/httpClient'

const MyProfileScreen = ({navigation, route}) => {

  const params = route.params;

  const[statusKtp,setStatusKtp] = useState('');

  const [userdata,setUserData] = useState({
      nama_lengkap: '',
      alamat: '',
      jenis_kelamin: '',
      no_ktp: '',
      no_handphone: '',
      verifikasi_ktp: '',

  })

  const fetchStatusKtp = async () => {
      const user = await getUser();

      const token = user.token;


      axios.get(`${ENDPOINT_API}/pasien/fetchKtp`, {
        headers: {
            Authorization: token,
        }
    }).then(res => {
        setStatusKtp(res.data.data.status)

    }).catch(err => {
        console.log('ktp',err.message)
    })


    if(statusKtp == "Sudah Konfirmasi")
    {
      setUser({
        is_verificationktp: true
      })
    }
  }


  const dataUser = async () => {
      const user = await getUser();


      console.log(user.is_verificationktp)

      setUserData({
        nama_lengkap: user.nama_lengkap,
        alamat: user.alamat,
        jenis_kelamin: user.jenis_kelamin,
        no_ktp: user.no_ktp,
        no_handphone: user.no_handphone,
        verifikasi_ktp: user.is_verificationktp == false ? "Belum Verifikasi" : "Verifikasi",
      })



      return Promise.resolve(user);
  }

  const renderUploadKTP = () => {
      if(statusKtp == '')
      {
        return(
          <>
            <Text style={{
              fontFamily: fonts.semiBold,
              fontSize: 14,
              color: '#FF9F45',
              marginBottom: 10
            }}>Anda belum verifikasi KTP, Mohon upload KTP anda terlebih dahulu!</Text>
            <CustomButton
                text="Upload KTP"
                color={color.primary}
                onPress={() => navigation.navigate('VerifikasiKtpScreen')}
            />
          </>
        )
      }
      if(statusKtp == "Menunggu Konfirmasi")
      {
        return(
          <>

            <Text style={{
              fontFamily: fonts.semiBold,
              fontSize: 14,
              color: '#FF9F45',
              marginBottom: 10
            }}>KTP anda sedang di proses oleh admin, mohon untuk menunggu proses konfirmasi!</Text>

          </>
        )
      }
      if(statusKtp == "Sudah Konfirmasi")
      {
        return(
          <>
            
            <Text style={{
              fontFamily: fonts.semiBold,
              fontSize: 14,
              color: '#1ABC9C',
              marginBottom: 10
            }}>Selamat KTP anda sudah terverifikasi!</Text>
          
          </>
        )
      }
      else{
        <>
        
        </>
      }
  }

  useEffect(() => {
      dataUser()

      console.log('status', params)
     
  },[])

  useEffect(() => {
      fetchStatusKtp()
  },[])

  return (
    <View style={styles.container}>
      <Header
        title="My profile"
        onBack={()=> navigation.reset({index:0, routes:[{name:'MainApp'}]})}
      />

      <View style={styles.content}>
        <Text style={styles.text}>Informasi Data Diri</Text>

        <Gap height={10} />

        <View style={styles.card}>
            <CustomText label="Nama Lengkap" name={userdata.nama_lengkap} />
            <CustomText label="Alamat" name={userdata.alamat} />
            <CustomText label="Jenis Kelamin" name={userdata.jenis_kelamin} />
            <CustomText label="No KTP" name={userdata.no_ktp} />
            <CustomText label="No Handphone" name={userdata.no_handphone} />
            <CustomText label="Verifikasi KTP" name={userdata.verifikasi_ktp} />
        </View>

        <Gap height={13} />

        {renderUploadKTP()}

      </View>
      
      
    </View>
  )
}

export default MyProfileScreen

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: color.background
    },
    content:{
      padding: 20
    },
    text:{
      fontFamily: fonts.semiBold,
      fontSize: 15,
      color: 'black'
    },
    card:{
      height: 300,
      backgroundColor: color.white,
      borderRadius: 10,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowOpacity: 0.27,
      shadowRadius: 4.65,

      elevation: 6,
      borderBottomColor: color.primary,
      borderBottomWidth: 1,
      paddingVertical: 10,
      paddingHorizontal: 15
    }
})