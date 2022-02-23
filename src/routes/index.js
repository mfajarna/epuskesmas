import  React from 'react';

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack"

import { NavigationContainer } from '@react-navigation/native';
import AuthenticationScreen from '../pages/auth/AuthenticationScreen';
import OtpScreen from '../pages/auth/OtpScreen';
import SplashScreen from '../pages/SplashScreen';
import Loginscreen from '../pages/LoginScreen';
import RegisterScreen from '../pages/RegisterScreen';
import RegisterAuth from '../pages/RegisterAuth';
import HomeScreen from '../pages/HomeScreen';

const Stack = createNativeStackNavigator();

 
const Routes = () => {
    return(
        <NavigationContainer>
            <Stack.Navigator initialRouteName='SplashScreen'>

                <Stack.Screen
                    name="SplashScreen"
                    component={SplashScreen}
                    options={{ headerShown: false}}
                />

                <Stack.Screen
                    name="LoginScreen"
                    component={Loginscreen}
                    options={{ headerShown: false}}
                />
           
                <Stack.Screen
                    name = "Authentication" 
                    component={AuthenticationScreen}
                    options={{ headerShown: false}}
                />

                <Stack.Screen
                    name = "InputOTP" 
                    component={OtpScreen}
                    options={{ headerShown: false}}
                />

                
                <Stack.Screen
                    name = "Register" 
                    component={RegisterScreen}
                    options={{ headerShown: false}}
                />

                <Stack.Screen
                    name = "RegisterAuth" 
                    component={RegisterAuth}
                    options={{ headerShown: false}}
                />

                <Stack.Screen
                    name = "HomeScreen" 
                    component={HomeScreen}
                    options={{ headerShown: false}}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )

}

export default Routes