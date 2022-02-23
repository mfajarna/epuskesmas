const initPasien = {
    kodePasien: []
}



export const pasienReducer = (state = initPasien, action) => {

    if(action.type === 'SET_KODE_PASIEN')
    {
        return{
            ...state,
            kodePasien: action.value
        }
    }

    return state
}