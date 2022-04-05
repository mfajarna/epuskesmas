const initPasien = {
    kodePasien: [],
    statusVerifikasiKtp: []
}



export const pasienReducer = (state = initPasien, action) => {

    if(action.type === 'SET_KODE_PASIEN')
    {
        return{
            ...state,
            kodePasien: action.value
        }
    }

    if(action.type === 'SET_STATUS_VERIFIKASI_KTP')
    {
        return{
            ...state,
            statusVerifikasiKtp: action.value
        }
    }

    return state
}