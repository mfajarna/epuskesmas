import axios from "axios"
import { setUser } from "../../AsyncStoreServices";
import { ENDPOINT_API } from "../../httpClient"
import { showMessage } from "../../showMessage";


const url =  'http://103.186.0.95/api'

export const uploadKtpAction = 
            (token, dataPhoto, navigation) => dispatch  => 
            {
                
                const file = new FormData();

            
                file.append('file', dataPhoto)
                axios.post(`${url}/pasien/updateFotoKtp`, file, {
                    headers: {
                        Authorization: token,
                        'Content-Type': 'multipart/form-data',
                    }
                }).then(resUpload => {

                    showMessage('Berhasil upload foto KTP', 'success')

                    navigation.reset({index:0, routes:[{name: 'MainApp'}]})



                }).catch(errUpload => {

                    showMessage('Gagal upload foto KTP')
                    console.log('error', errUpload)
                })
            }

            