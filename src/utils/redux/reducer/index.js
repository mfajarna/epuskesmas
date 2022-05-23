import {combineReducers} from 'redux';
import { globalReducer } from "./global";
import { pasienReducer } from './pasien';
import { uploadKtpReducer } from './uploadktp';
import { pendaftaranReducer } from './pendaftaran';

const reducer = combineReducers({
    globalReducer,
    pasienReducer,
    uploadKtpReducer,
    pendaftaranReducer
})

export default reducer;