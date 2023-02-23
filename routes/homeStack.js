import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import loginModScreen from '../screens/loginModule';
import createAccModScreen from '../screens/createAccountModule';
import forgotPassModScreen from '../screens/forgotPasswordModule';
import mapModScreen from '../screens/mapModule';
import orderModScreen from '../screens/orderModule';
import stationModScreen from '../screens/stationModule';
import notificationModScreen from '../screens/notificationModule';
import profileModScreen from '../screens/accountProfileModule';
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
    },
    OrderModScreen:{
        screen:mapModScreen
    },
    MapModScreen:{
        screen:mapModScreen
    },
    stationModScreen:{
        screen:stationModScreen
    }    ,
    notificationModScreen:{
        screen:notificationModScreen
    },
    profileModScreen:{
        screen:profileModScreen
    }




}

const Homestack=createNativeStackNavigator(screens);
export default NavigationContainer(Homestack);