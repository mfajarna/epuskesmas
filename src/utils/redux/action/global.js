export const setLoading = value => {
    return {type: 'SET_LOADING', value};
  };

export const setToast = value => {
  return {
    type: 'SET_TOAST',
    value
  }
}

export const setDeviceToken = value => {
  return {
    type: 'SET_DEVICE_TOKEN',
    value
  }
}
  