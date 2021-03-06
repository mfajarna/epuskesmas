const initGlobalState = {
    isError: false,
    message: 'Error',
    isLoading: false,
    deviceToken: '',
    isToast : false
  };
  
  export const globalReducer = (state = initGlobalState, action) => {
    if (action.type === 'SET_ERROR') {
      return {
        ...state,
        isError: action.value.isError,
        message: action.value.messsage,
      };
    }
    if (action.type === 'SET_LOADING') {
      return {
        ...state,
        isLoading: action.value,
      };
    }

    if(action.type === 'SET_DEVICE_TOKEN')
    {
      return {
        ...state,
        deviceToken: action.value,
      };
    }

    if(action.type === 'SET_TOAST')
    {
      return {
        ...state,
        isToast: action.value,
      };
    }

    return state;
  };
  