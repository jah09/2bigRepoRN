import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,Image,Button,TextInput,TouchableOpacity,TouchableWithoutFeedback,Keyboard,ScrollView } from 'react-native';
import React, {useState}  from 'react';
import { globalStyles  } from './ForStyle/GlobalStyles';
import  {useFonts} from 'expo-font';
import AppLoading from 'expo-app-loading';
import {MaterialIcons} from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import react from 'react';

import LoginModule from './screens/loginModule';
import CreateAccountModule from './screens/createAccountModule';
import ForgotPassword from './screens/forgotPasswordModule';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack=createNativeStackNavigator();
export default function App() {
  const[showPassword, setShowPassword]=useState(false);
  const[visible, setVisible]=useState(true);
  const [fontLoaded]=useFonts({
    'nunito-light':require('./assets/fonts/Nunito-Light.ttf'),
    'nunito-medium':require('./assets/fonts/Nunito-Medium.ttf'),
    'nunito-reg':require('./assets/fonts/Nunito-Regular.ttf'),
    'nunito-semibold':require('./assets/fonts/Nunito-SemiBold.ttf'),
    'nunito-bold':require('./assets/fonts/Nunito-Bold.ttf')
  });
  if(!fontLoaded){
    return <AppLoading/>
  }
 
    return (
      <NavigationContainer>
        <Stack.Navigator 
          screenOptions={{
          headerShown:false
         }}>
          <Stack.Screen
          component={LoginModule}
          name='LoginPage'
          />

          <Stack.Screen
          component={CreateAccountModule}
          name='CreateAccount'
          />

          <Stack.Screen
          component={ForgotPassword}
          name='forgotPassword'
          />
        </Stack.Navigator>
      </NavigationContainer>
         
    )

  }
  
  