import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { LogBox } from 'react-native'
import Routes from './routes';



LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications

const App = () => {
  return (
    
        <Routes />
    
  )
}

export default App

