import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import Header from '../components/atoms/Header'
import { color } from '../utils/colors'
import CustomTextInput from '../components/molecules/CustomTextInput'
import Gap from '../components/atoms/Gap'
import { IcRegister } from '../assets/icon'
import { fonts } from '../utils/fonts'
import CustomButton from '../components/molecules/CustomButton'
import UseForm from '../utils/useForm'
import { showMessage } from '../utils/showMessage'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading } from '../utils/redux/action'
import { getKodePasien } from '../utils/redux/action/pasien'

const RegisterScreen = ({navigation}) => {

    const dispatch = useDispatch()
    const{deviceToken} = useSelector(state => state.globalReducer)
    const{kodePasien} = useSelector(state => state.pasienReducer);

    let kode_pasien = kodePasien

    useEffect(() => {
        dispatch(getKodePasien())
    }, [])


    

    const[form, setForm] = UseForm({
        nama_lengkap: '',
        alamat: '',
        jenis_kelamin: '',
        no_handphone: '',
        no_ktp: ''
    })



    const onContinue = () => {

        if(form.nama_lengkap == "" || form.alamat == "" || form.jenis_kelamin == "" || form.no_handphone == "" || form.no_ktp == "" )
        {
            showMessage('Data tidak boleh ada yang kosong!')

            return false
        }
        else{

            dispatch(setLoading(true))

            let text = form.no_handphone;
            let phoneNumber = text.substring(1);

            const data = {
                kode_pasien: kode_pasien,
                nama_lengkap : form.nama_lengkap,
                alamat: form.alamat,
                jenis_kelamin: form.jenis_kelamin,
                no_handphone: phoneNumber,
                device_token: deviceToken,
                no_ktp: form.no_ktp
            }

            setTimeout(() => {
                dispatch(setLoading(true))
                navigation.navigate('RegisterAuth', {
                    register: data
                })
            }, 2000)


        }
       
    }

  return (
    <View style={styles.container}>
        <Header 
            title="Registrasi akun"
            onBack={() => navigation.goBack()} />

      

        <ScrollView showsVerticalScrollIndicator={false}>

        <View style={styles.content}>
            <View style={{alignItems: 'center'}}>
                <IcRegister />
            </View>
            
            <Text style={styles.desc}>Mohon untuk mendaftarkan akun dengan data yang valid</Text>
            <Gap height={10} />
            <CustomTextInput
                    text="Nama Lengkap"
                    placeholder="Masukan nama lengkap anda..."
                    value={form.nama_lengkap}
                    onChangeText={(value) => setForm('nama_lengkap', value)}
                />

            <Gap height={13} />

            <CustomTextInput
                text="Alamat"
                placeholder="Masukan alamat anda..."
                value={form.alamat}
                onChangeText={(value) => setForm('alamat', value)}
            />

            <Gap height={13} />

            <CustomTextInput
                text="Jenis Kelamin"
                placeholder="L/P"
                value={form.jenis_kelamin}
                onChangeText={(value) => setForm('jenis_kelamin', value)}  
            />

            <Gap height={13} />

            <CustomTextInput
                text="No Handphone"
                placeholder="Masukan no handphone anda..."
                maxLength={12}
                keyboardType='numeric'
                value={form.no_handphone}
                onChangeText={(value) => setForm('no_handphone', value)}                    
            />

            <Gap height={13} />

            <CustomTextInput
                text="No KTP"
                placeholder="Masukan no ktp anda..."
                maxLength={16}
                keyboardType='numeric'
                value={form.no_ktp}
                onChangeText={(value) => setForm('no_ktp', value)}                    
            />

            <Gap height={10} />

        </View>
    
        <View style={{paddingHorizontal: 20, marginBottom: 50}}>
            <CustomButton
                        text="Lanjut"
                        color={color.primary}
                        onPress={onContinue}
                />
        </View>

        </ScrollView>
    </View>
  )
}

export default RegisterScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.white,
        justifyContent: 'space-between'
    },
    content:{
        padding: 20,
        backgroundColor: 'white',
    },
    desc:{
        fontFamily: fonts.semiBold,
        fontSize: 15,
        paddingVertical: 20,
        textAlign: 'center',
        paddingHorizontal: 10
    }
})