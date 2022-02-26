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
import Profile from '../pages/Profile';
import BottomNavigator from '../components/molecules/BottomNavigator';
import MessageScreen from '../pages/MessageScreen';
import MyProfileScreen from '../pages/MyProfileScreen';
import VerifikasiKtp from '../pages/VerifikasiKtp';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const MainApp = () => {
    return(
        <Tab.Navigator tabBar={props => <BottomNavigator {...props} />}>
            <Tab.Screen
                options={{headerShown: false}}
                name="Home"
                component={HomeScreen}
            
            />

            <Tab.Screen
                options={{headerShown: false}}
                name="Message"
                component={MessageScreen}
            
            />

            <Tab.Screen
                options={{headerShown: false}}
                name="Profile"
                component={Profile}
            
            />
            
        </Tab.Navigator>
    )
}
 
const Routes = () => {
    return(
        <NavigationContainer>
            <Stack.Navigator initialRouteName='SplashScreen'>

                <Stack.Screen
                    name = "MainApp" 
                    component={MainApp}
                    options={{ headerShown: false}}
                />

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

                <Stack.Screen
                    name = "Profile" 
                    component={Profile}
                    options={{ headerShown: false}}
                />

                <Stack.Screen
                    name = "MessageScreen" 
                    component={MessageScreen}
                    options={{ headerShown: false}}
                />

                <Stack.Screen
                    name = "MyProfileScreen" 
                    component={MyProfileScreen}
                    options={{ headerShown: false}}
                />

                <Stack.Screen
                    name = "VerifikasiKtpScreen" 
                    component={VerifikasiKtp}
                    options={{ headerShown: false}}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )

}

export default Routes