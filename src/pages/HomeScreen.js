import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { deleteUser, getUser, setUser } from '../utils/AsyncStoreServices'
import { showToast } from '../utils/showToast'
import Toast from 'react-native-toast-message'
import { color } from '../utils/colors'
import { fonts } from '../utils/fonts'
import { IcNotif, IcUser } from '../assets/icon'
import Gap from '../components/atoms/Gap'
import CustomButton from '../components/molecules/CustomButton'
import FiturComponent from '../components/molecules/FiturComponent'
import { useDispatch } from 'react-redux'
import { setLoading } from '../utils/redux/action'

const HomeScreen = ({navigation}) => {

  const [name,setName] = useState('');
  const[verifktp,setVerifKtp] = useState(false);
  const dispatch = useDispatch()

  const user = async () => {

        dispatch(setLoading(true))
        const dataUser = await getUser();

        setVerifKtp(dataUser.is_verificationktp)

        setName(dataUser.nama_lengkap)

       if(dataUser.is_verificationktp == false)
       {
          showToast('Verififkasi KTP anda untuk menggunakan fitur, klik notif!','error', onDanger)
       }

       dispatch(setLoading(false))

       return Promise.resolve(dataUser)
  }


  const onDanger = () => {
      Toast.hide();
      navigation.navigate('MyProfileScreen')
  }

  const onDaftarAntrian = () => {
      Alert.alert("Hallo")
  }
  

  useEffect(() => {
    user();

  }, [])



  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>


      <View style={styles.topContent}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View style={{justifyContent: 'center',}}>
            <IcUser />
          </View>
          
          <View style={{marginRight: 75}}>
            <Text style={styles.name}>Hai, {name}</Text>
            <Text style={styles.desc}>Selamat Datang Kembali</Text>
          </View>
          <View style={{justifyContent: 'center',}}>
            <IcNotif />
          </View>
        </View>

        <View style={styles.antrianWrapper}>
            <Text style={styles.statusAntrian}>
              Status Antrian Anda
            </Text>
            <Gap height={14} />
            <Text style={styles.descAntrian}>
                  Anda untuk saat ini <Text style={{color: '#E97D19'}}>belum memesan </Text> 
                  antrian online, tekan tombol dibawah ini 
                  untuk mendapatkan antrian online.
            </Text>
            <Gap height={14} />


        </View>
        
      </View>
      <View style={{paddingHorizontal: 62}}>
            <CustomButton
                  text="Daftar Antrian"
                  color={color.primary}
                  onPress={onDaftarAntrian}
                  disabled={verifktp == true ? false : true}
              />
      </View>

      <Gap height={38} />

      <View style={styles.contentFitur}>
        <Text style={{
          fontFamily: fonts.semiBold,
          fontSize: 16,
          color: 'black'
        }}>Pelayanan kami</Text>

      <Gap height={19} />
        <FiturComponent 
              onPress={onDaftarAntrian}
              title="Pemeriksaan"
              desc="Pilih pemeriksaan sesuai dengan gejala yang anda
              alami"
              disabled={verifktp == true ? false : true}
            />

      <Gap height={13} />
        <FiturComponent 
              onPress={onDaftarAntrian}
              title="Riwayat Kesehatan"
              desc="Lihat riwayat kesehatan anda sesuai dengan pemeriksaan terakhir"
              disabled={verifktp == true ? false : true}
          />

      <Gap height={13} />
        <FiturComponent 
              onPress={onDaftarAntrian}
              title="Informasi Kesehatan"
              desc="Informasi tentang dunia kesehatan"
              disabled={verifktp == true ? false : true}
          />

      <Gap height={13} />
        <FiturComponent 
              onPress={onDaftarAntrian}
              title="Riwayat Obat"
              desc="Riwayat penggunaan obat sesuai dengan
              pemeriksaan"
              disabled={verifktp == true ? false : true}
          />

      <Gap height={13} />
        <FiturComponent 
              onPress={onDaftarAntrian}
              title="Surat Rujukan"
              desc="Lihat surat rujukan untuk puskesmas"
              disabled={verifktp == true ? false : true}
          />

      <Gap height={13} />
      </View>
      </ScrollView>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
    container:{
      backgroundColor: '#F1F5FD',
      flex: 1
    },
    topContent: {
      height: 215,
      backgroundColor: color.primary,
      paddingHorizontal: 26,
      paddingTop: 23
    },
    name:{
      fontFamily: fonts.bold,
      color: color.white,
      fontSize: 20
    },
    desc:{
      fontFamily: fonts.medium,
      color: color.white,
      fontSize: 13
    },
    antrianWrapper:{
        paddingVertical: 15,
        marginTop: 40,
        height: 175,
        backgroundColor: 'white',
        borderRadius: 10,

        shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 5,
      },
      shadowOpacity: 0.34,
      shadowRadius: 6.27,

      elevation: 10,
    },
    statusAntrian:{
      fontFamily: fonts.semiBold,
      color: 'black',
      fontSize: 16,
      textAlign: 'center'
    },
    descAntrian:{
      fontFamily: fonts.medium,
      color: '#9F9F9F',
      fontSize: 13,
      textAlign: 'center',
      paddingHorizontal: 16
    },
    contentFitur:{
      paddingHorizontal: 26
    }

})