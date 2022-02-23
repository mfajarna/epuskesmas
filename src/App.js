import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { LogBox } from 'react-native'
import Routes from './routes';
import { useSelector } from 'react-redux';
import Loading from './components/atoms/Loading/Loading';
import {Provider} from 'react-redux';
import FlashMessage from 'react-native-flash-message';
import store from './utils/redux/store';



LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications


const MainApp = () => {
    const{isLoading} = useSelector(state => state.globalReducer);

    return (
      <>
      <Routes />
      <FlashMessage position="top" />
      {isLoading && <Loading />}
      </>
    )
    
}

const App = () => {
  return (
    
        <Provider store={store}>
            <MainApp />
        </Provider>
    
  )
}

export default App

