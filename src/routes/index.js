import  React from 'react';

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack"

import { NavigationContainer } from '@react-navigation/native';
import AuthenticationScreen from '../pages/auth/AuthenticationScreen';
import OtpScreen from '../pages/auth/OtpScreen';





const Stack = createNativeStackNavigator();

 
const Routes = () => {
    return(
        <NavigationContainer>
            <Stack.Navigator>
           
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
            </Stack.Navigator>
        </NavigationContainer>
    )

}

export default Routes