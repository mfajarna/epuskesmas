const initUploadKtp ={
    uri: '',
    type: '',
    name: '',
    isUploadPhoto: false
}

export const uploadKtpReducer = (state=initUploadKtp, action) => {
        if(action.type === "SET_UPLOAD_PHOTO")
        {
            return {
                ...state,
                uri: action.value.uri,
                type: action.value.type,
                name: action.value.name
            }
        }

        if(action.type === "SET_STATUS_UPLOAD")
        {
            return{
                ...state,
                isUploadPhoto: action.value
            }
        }


        return state;
}