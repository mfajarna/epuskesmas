import axios from "axios";
import { Alert } from "react-native";
import { setLoading } from ".";
import { setUser } from "../../AsyncStoreServices";
import { showMessage } from "../../showMessage";

const API_HOST = {
    url: 'https://epuskesmas-backend.herokuapp.com/api'
}

export const registerAction = (dataRegister, navigation) =>
 (dispatch) => {
     axios.post(`${API_HOST.url}/pasien/register`, dataRegister)
        .then(res => {

            const token = `${res.data.data.token_type} ${res.data.data.access_token}`;
            const profile_pasien = res.data.data.data_pasien;

            setUser({
                token: token,
                nama_lengkap: profile_pasien.nama_lengkap,
                alamat: profile_pasien.alamat,
                jenis_kelamin: profile_pasien.jenis_kelamin,
                no_ktp: profile_pasien.no_ktp,
                no_handphone: profile_pasien.no_handphone,
                email: profile_pasien.email,
                device_token: profile_pasien.device_token,
                is_verification: profile_pasien.is_verification,
                is_verificationktp: false,
                authenticated: true
            })

            dispatch(setLoading(false))
            showMessage("Selamat anda berhasil membuat akun baru!", "success")
            
            navigation.reset({index: 0, routes: [{name: 'HomeScreen'}]});

        }).catch(err => {

            dispatch(setLoading(false))
            showMessage(err.message)

        })
}