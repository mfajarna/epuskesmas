import axios from "axios";

import { ENDPOINT_API } from "../../httpClient";
import { showMessage } from "../../showMessage";

export const getKodePasien = () => async (dispatch) => {
    const result = await axios.get(`${ENDPOINT_API}/pasien/getKodePasien`)
                                .then(res => {
                                    dispatch({type: 'SET_KODE_PASIEN', value: res.data.data})  
                                }).catch(err => {
                                    showMessage(err.message)
                                })


    return Promise.resolve(result)
}


export const getVerifikasiKTP = (id, navigation,token) => async(dispatch) => {
    const result = await axios.get(`${ENDPOINT_API}/pasien/fetchStatusKtp?id=${id}`, {
        headers: {
            Authorization: token
        }
    }).then(res => {
        dispatch({
            type: "SET_STATUS_VERIFIKASI_KTP",
            value: res.data.data
        })

        navigation.reset({index: 0, routes: [{name: 'MainApp'}]})
    }).catch(errKtp => {
        console.log(errKtp)
    })


    return Promise.resolve(result)
}