import axios from "axios"
import { ENDPOINT_API } from "../../httpClient"


export const getListPoliActive = (token) =>  async (dispatch) => {
        const result = await axios.get(`${ENDPOINT_API}/pendaftaran/cek-antrian-poli`, {
            headers: {
                Authorization: token
            }
        }).then(res => {
            dispatch({
                type: "SET_LIST_POLI_ACTIVE",
                value: res.data.data
            })

            console.log(res.data.data)
        }).catch(err => {
            console.log(err)
        })  

        return Promise.resolve(result);
}


export const getNoAntrian = (token, id_poli, nama_poli) => async (dispatch) => {
    const result = await axios.get(`${ENDPOINT_API}/pendaftaran/getNoAntrian?id_poli=${id_poli}&nama_poli=${nama_poli}`, {
        headers:{
            Authorization: token
        }
    }).then(res => {
        dispatch({
            type: "SET_NO_ANTRIAN",
            value: res.data.data
        })

        console.log(res.data.data)
    }).catch(err => {
        console.log(err)
    })

    return Promise.resolve(result)
} 