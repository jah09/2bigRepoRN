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
          name='login'
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
  
  


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8E2CF',
    alignItems: 'center',
    
  },
  imageStyle:{
 
  height:150,
  width:150,
  marginTop:50
  },
  textStyles:{
    fontSize:19,
    fontFamily:'nunito-medium'
  },
  wrapper:{
  
    padding:30,
    height:200,
    width: '100%',
    marginTop:50
  },
  ViewemailTextInput:{
   flexDirection:'row',
   borderBottomColor:'black',
   borderBottomWidth:1,
   paddingBottom:2,
   marginBottom:25,
   width:270,
   marginLeft:20
  },
  login_Email_Icon:{
    marginRight:5
  },
  login_Email_textInput:{
    fontSize:18,
   
  },

  ViewPasswordTextInput:{
    flexDirection:'row',
    borderBottomColor:'black',
    borderBottomWidth:1,
    paddingBottom:2,
    marginBottom:25,
    width:270,
    marginLeft:20,
    marginTop:15
   },
   login_Password_Icon:{
     marginRight:5
   },
   login_Password_textInput:{
     fontSize:18,
    
   },
   btnClickEye:{
    position:'absolute',
    right:10,

   },
    viewForgotPass:{
    // backgroundColor:'red',
    marginTop:-15,
    fontFamily:'nunito-light',
    left:200,
    width:100,

  },
  viewButtonStyle:{
    borderRadius:10,
    paddingVertical:10,
    paddingHorizontal:10,
    backgroundColor:'#87cefa',
    marginTop:55,
    width:250,
    left:30,

},
buttonText:{
  fontFamily:'nunito-bold',
  fontWeight:'bold',
  textTransform:'none',
  textAlign:'center',
  fontSize:18,
  color:'black',

},
loginIcon:{
  position:'absolute',
  right:20,
  marginTop:7,

},
createAccLabel:{
  marginTop:20,
  justifyContent:'center',
  textAlign:'center',
  fontFamily:'nunito-reg'
}
});