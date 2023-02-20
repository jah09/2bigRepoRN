import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import loginModScreen from '../screens/loginModule';
import createAccModScreen from '../screens/createAccountModule';
import forgotPassModScreen from '../screens/forgotPasswordModule';
import { createAppContainer } from 'react-navigation';



const screens={
    loginModScreen:{
        screen: loginModScreen
    },
    createAccModScreen:{
        screen: createAccModScreen
    },
    forgotPassModScreen:{
        screen: forgotPassModScreen
    }


}


const Homestack=createNativeStackNavigator(screens);
export default NavigationContainer(Homestack);