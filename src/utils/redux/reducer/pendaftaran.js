const initPendaftaran ={
    listPoliActive : [],
    noAntrianPoli: [],
}

export const pendaftaranReducer = (state = initPendaftaran, action) => {
    if(action.type === "SET_LIST_POLI_ACTIVE")
    {
        return{
            ...state,
            listPoliActive: action.value
        }
    }
    if(action.type === "SET_NO_ANTRIAN")
    {
        return{
            ...state,
            noAntrianPoli: action.value
        }
    }

    return state;
    
}