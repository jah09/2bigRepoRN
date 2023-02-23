import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Button, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { globalStyles } from './ForStyle/GlobalStyles';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import react from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import LoginModule from './screens/loginModule';
import CreateAccountModule from './screens/createAccountModule';
import ForgotPassword from './screens/forgotPasswordModule';

import homeModule from './screens/homeModule';
import orderScreen from './screens/order';
import profileScreen from './screens/profile';
import stationsScreen from './screens/stations';
import notificationsScreen from './screens/notifications';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Tab = createBottomTabNavigator();
const Stack=createNativeStackNavigator();
export default function App() 
{

  return (
    <NavigationContainer>
    <Tab.Navigator
    initialRouteName='Map'
    screenOptions={({route})=> ({
        tabBarIcon:({focused,size,color}) => {
            let iconName;
            if(route.name === 'Order'){
                iconName ='shopping-cart';
                size = focused? 30:19;
                color=focused? 'white' : 'black';
            } else if (route.name === 'Station'){
              iconName ='home'; 
              size = focused? 30:19;
              color=focused? 'white' : 'black';
            }
            else if (route.name === 'Map'){
              iconName ='map-marker-alt';
              size = focused? 30:19;
              color=focused? 'white' : 'black';
            }
            else if (route.name === 'Notifications'){
              iconName ='bell';
              size = focused? 30:19;
              color=focused? 'white' : 'black';
            }
            else if (route.name === 'Profile'){
              iconName ='user';
              size = focused? 30:19;
              color=focused? 'white' : 'black';
              
            }
            return (
              <FontAwesome5 
              name= {iconName}
              size = {size}
              color={color}
              />
                
            )
        },tabBarStyle:{
         
        position:'absolute',
        bottom:15,
        left:10,
        right:10,
        elevation:0,
        backgroundColor:'#73a9c2',
        borderRadius:15,
        height:65,
        
        ...style.shadow
        },

        
        tabBarLabelStyle:{ 
          color:'black',
          fontWeight: "bold",
          fontSize: 12,
          
        }
       
    })
   }>
   
    

      <Tab.Screen name="Order" component={orderScreen} />
      <Tab.Screen name="Station" component={stationsScreen} />
      <Tab.Screen name="Map" component={homeModule}/>
      <Tab.Screen name="Notifications" component={notificationsScreen} />
      <Tab.Screen name="Profile" component={profileScreen} />
    </Tab.Navigator>
    </NavigationContainer>
  );



  
  const[showPassword, setShowPassword]=useState(false);
  const[visible, setVisible]=useState(true);
  const [fontLoaded]=useFonts({
    'nunito-light':require('./assets/fonts/Nunito-Light.ttf'),
    'nunito-medium':require('./assets/fonts/Nunito-Medium.ttf'),
    'nunito-reg':require('./assets/fonts/Nunito-Regular.ttf'),
    'nunito-semibold':require('./assets/fonts/Nunito-SemiBold.ttf'),
    'nunito-bold':require('./assets/fonts/Nunito-Bold.ttf')
    
  });
  if (!fontLoaded) {
    return <AppLoading />
  }

  return (

    

    //   {/* <Stack.Navigator 
    //         screenOptions={{
    //         headerShown:false
    //       }}>
    //         <Stack.Screen
    //         component={LoginModule}
    //         name='LoginPage'
    //         />

    //         <Stack.Screen
    //         component={CreateAccountModule}
    //         name='CreateAccount'
    //         />

    //         <Stack.Screen
    //         component={ForgotPassword}
    //         name='forgotPassword'
    //         />
    //       </Stack.Navigator> */}
  <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}
        initialRouteName='Login'>
        <Stack.Screen
          name='TabNavigator'
          component={BottomTabNavigator}
        />

        <Stack.Screen
          name='Login'
          component={LoginModule}
        />

        <Stack.Screen
          name='CreateAccount'
          component={CreateAccountModule}
        />

        <Stack.Screen
          name='ForgotPassword'
          component={ForgotPassword}

          name='forgotPassword'
          />
          <Stack.Screen
          component={HomeModule}
          name='homeModule'
          />

        </Stack.Navigator>
      
      

      </NavigationContainer>


    )
    


  }

  const style=StyleSheet.create({
    shadow:{
      shadowColor:'#7F5DF0',
      shadowOffset:{
        width:0,
        height:10,
      },
      shadowOpacity:0.25,
      shadowRadius:3.5,
      elevation:5,
    }
  })

 

  

  )


}

