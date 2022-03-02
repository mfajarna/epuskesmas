import axios from "axios"
import { ENDPOINT_API } from "../../httpClient"

const API_HOST = {
    url: 'https://epuskesmas-backend.herokuapp.com/api'
}

export const uploadKtpAction = 
            (token, dataPhoto) => dispatch  => 
            {
                
                const file = new FormData();

                
                
                file.append('file', dataPhoto)
                // console.log(photoForUpload._parts[0][0])
                axios.post(`${API_HOST.url}/pasien/updateFotoKtp`, file, {
                    headers: {
                        Authorization: token,
                        'Content-Type': 'multipart/form-data',
                    }
                }).then(resUpload => {
                    console.log('success',resUpload)
                }).catch(errUpload => {
                    console.log('error', errUpload)
                })
            }