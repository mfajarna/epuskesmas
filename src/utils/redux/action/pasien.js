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