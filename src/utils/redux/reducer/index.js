import {combineReducers} from 'redux';
import { globalReducer } from "./global";
import { pasienReducer } from './pasien';

const reducer = combineReducers({
    globalReducer,
    pasienReducer
})

export default reducer;