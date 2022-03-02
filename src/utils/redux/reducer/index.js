import {combineReducers} from 'redux';
import { globalReducer } from "./global";
import { pasienReducer } from './pasien';
import { uploadKtpReducer } from './uploadktp';

const reducer = combineReducers({
    globalReducer,
    pasienReducer,
    uploadKtpReducer
})

export default reducer;