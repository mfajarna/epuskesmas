import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import Header from '../components/atoms/Header';
import { IcAuth } from '../assets/icon';
import { fonts } from '../utils/fonts';
import CustomButton from '../components/molecules/CustomButton';
import { color } from '../utils/colors';
import Gap from '../components/atoms/Gap';
import CustomTextInput from '../components/molecules/CustomTextInput';
import UseForm from '../utils/useForm';
import { showMessage } from '../utils/showMessage';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { setLoading } from '../utils/redux/action';

const RegisterAuth = ({route, navigation}) => {

    const{register} = route.params;
    const[email,setEmail] = useState()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setLoading(false))
    },[])

    const[form,setForm] = UseForm({
        email : '',
        password: '',
        password_confirm: '',
    })

   
    
    

    const dataRegister = {
        ...register,
        ...form
    }

    const onContinue =  () => {

        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;


        if(form.email == "" || form.password == "" || form.password_confirm == "")
        {
            showMessage('Data tidak boleh ada yang kosong!')

           
        } if(reg.test(form.email) === false)
        {
            showMessage('Format email tidak benar!')

            return false
        }
        else{
            if(form.password != form.password_confirm)
            {
                showMessage('Password anda tidak sama')

            }else{
                if(form.password.length < 8)
                {
                    showMessage('Password anda harus melebihi 8 karakter')
                }else{
                    // If all validation success do stuff here

                    dispatch(setLoading(true))

                    setTimeout(() => {
                        dispatch(setLoading(false))
                        navigation.navigate('Authentication', {
                            dataRegister: dataRegister
                        })
                    }, 2000)

                }
            }
        }
    }

    

  return (
    <View style={styles.container}>
        <Header
            onBack={() => navigation.goBack() }
            title="Data autentikasi"
        />
        <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
            <View style={{alignItems: 'center'}}>
                <IcAuth />
            </View>

            <Text style={styles.desc}>Mohon untuk tetap menjaga kerahasiaan data autentikasi anda</Text>

            <Gap height={10} />

            <CustomTextInput
                text="Email"
                placeholder="Masukan email anda..."
                value={form.email}
                onChangeText={(value) => setForm('email', value)}
            

            />

        <Gap height={13} />

        <CustomTextInput
            text="Password"
            placeholder="Masukan password anda..."
            value={form.password}
            onChangeText={(value) => setForm('password', value)}
            secureTextEntry

        />

        <Gap height={13} />

        <CustomTextInput
            text="Konfirmasi Password"
            placeholder="Masukan password anda..."
            value={form.password_confirm}
            onChangeText={(value) => setForm('password_confirm', value)}
            secureTextEntry
        />


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

export default RegisterAuth

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.white,
        justifyContent: 'space-between'
    },
    content:{
        padding: 20,
        backgroundColor: color.white,
    },
    desc:{
        fontFamily: fonts.semiBold,
        fontSize: 15,
        paddingVertical: 20,
        textAlign: 'center',
        paddingHorizontal: 10
    }
})