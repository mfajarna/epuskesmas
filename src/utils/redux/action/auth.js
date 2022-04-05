import axios from "axios";
import { Alert } from "react-native";
import { setLoading } from ".";
import { setUser } from "../../AsyncStoreServices";
import { ENDPOINT_API } from "../../httpClient";
import { showMessage } from "../../showMessage";

const API_HOST = {
    url: 'http://103.181.142.146/api'
}


export const loginAction = (dataLogin, navigation) => (dispatch) =>  {
    axios.post(`${ENDPOINT_API}/pasien/login`, dataLogin)
        .then(res => {
            const token = `${res.data.data.token_type} ${res.data.data.access_token}`;
            const profile_pasien = res.data.data.user
            const id = profile_pasien.id

            setUser({
                token: token,
                id: id,
                nama_lengkap: profile_pasien.nama_lengkap,
                alamat: profile_pasien.alamat,
                jenis_kelamin: profile_pasien.jenis_kelamin,
                no_ktp: profile_pasien.no_ktp,
                no_handphone: profile_pasien.no_handphone,
                email: profile_pasien.email,
                device_token: profile_pasien.device_token,
                is_verification: profile_pasien.is_verification,
                authenticated: true
            })



            axios.get(`${ENDPOINT_API}/pasien/fetchStatusKtp?id=${id}`, {
                headers: {
                    Authorization: token
                }
            }).then(res => {
                dispatch({
                    type: "SET_STATUS_VERIFIKASI_KTP",
                    value: res.data.data
                })
            }).catch(errKtp => {
                console.log(errKtp)
            })
        
            dispatch(setLoading(false))
            
            navigation.reset({index: 0, routes: [{name: 'MainApp'}]});
        }).catch(err => {
            dispatch(setLoading(false))
            showMessage("Email atau password anda salah!")
        })
}


export const registerAction = (dataRegister, navigation) =>
 (dispatch) => {
     axios.post(`${ENDPOINT_API}/pasien/register`, dataRegister)
        .then(res => {

            const token = `${res.data.data.token_type} ${res.data.data.access_token}`;
            const profile_pasien = res.data.data.data_pasien;
            const id = profile_pasien.id

            setUser({
                id: id,
                token: token,
                nama_lengkap: profile_pasien.nama_lengkap,
                alamat: profile_pasien.alamat,
                jenis_kelamin: profile_pasien.jenis_kelamin,
                no_ktp: profile_pasien.no_ktp,
                no_handphone: profile_pasien.no_handphone,
                email: profile_pasien.email,
                device_token: profile_pasien.device_token,
                is_verification: profile_pasien.is_verification,
                authenticated: true
            })

            axios.get(`${ENDPOINT_API}/pasien/fetchStatusKtp?id=${id}`, {
                headers: {
                    Authorization: token
                }
            }).then(res => {
                dispatch({
                    type: "SET_STATUS_VERIFIKASI_KTP",
                    value: res.data.data.status
                })
            }).catch(errKtp => {
                console.log(errKtp.response)
            })

            dispatch(setLoading(false))
            showMessage("Selamat anda berhasil membuat akun baru!", "success")
            
            navigation.reset({index: 0, routes: [{name: 'MainApp'}]});

        }).catch(err => {

            dispatch(setLoading(false))
            showMessage(err.message)

        })
}