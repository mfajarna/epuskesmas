import { NavigationContainer, useNavigation } from '@react-navigation/native'
import Toast from 'react-native-toast-message'



/**
 * make a request to api without token
 * @param {string} desc
 * @param {('info' | 'success' | 'error')} type
 */

 

export const showToast = (desc,type, onPress) => {
    Toast.show({
        text1: type == 'error' ? 'Pemberitahuan ⚠️' : 'Pemberitahuan ✅',
        text2: desc,
        type: type,
        position: 'top',
        visibilityTime: 3000,
        autoHide: false,
        topOffset: 20,
        bottomOffset: 30,
        onShow: () => {},
        onHide: () => {},
        onPress: onPress
    })
}