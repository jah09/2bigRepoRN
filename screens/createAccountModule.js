import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,Image,Button,TextInput,TouchableOpacity,TouchableWithoutFeedback,Keyboard,ScrollView } from 'react-native';
import React, {useState}  from 'react';
import { globalStyles } from '../ForStyle/GlobalStyles';
import  {useFonts} from 'expo-font';
import { FontAwesome } from '@expo/vector-icons';
import {MaterialIcons} from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import react from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function CreateAccountPage(){
    return(
        
               <View style={styles.container}>
             
                  {/* our own logo */}
                 <Image source={require('../assets/logo_dic.png')}
                   style={styles.imageStyle}/> 

                    <Text style={[globalStyles.textStyles,{marginTop:30,fontFamily:'nunito-bold',fontSize:25}]}>Create Account </Text>
            
                    <ScrollView contentContainerStyle={{flex:1}}
      bounces={false}
      >  
                    <View style={globalStyles.wrapper}>

                    {/*first name input */}
                    <View style={globalStyles.ViewemailTextInput}>
                        <FontAwesome
                        name='user'
                        size={23} 
                        color="black" 
                        style={globalStyles.login_Email_Icon} />
                            
                     <TextInput
                        placeholder='First Name'
                         placeholderTextColor='black'
                        style={globalStyles.login_Email_textInput}
                        keyboardType='default'/>
                    </View>

                    {/*Middle name input */}
                    <View style={globalStyles.ViewemailTextInput}>
                        <FontAwesome
                        name='user'
                        size={23} 
                        color="black" 
                        style={globalStyles.login_Email_Icon} />
                            
                     <TextInput
                         placeholder='Middle Name'
                         placeholderTextColor='black'
                        style={globalStyles.login_Email_textInput}
                        keyboardType='default'/>
                     </View>

                      {/*Last name input */}
                      <View style={globalStyles.ViewemailTextInput}>
                        <FontAwesome
                        name='user'
                        size={23} 
                        color="black" 
                        style={globalStyles.login_Email_Icon} />
                            
                        <TextInput
                        placeholder='Last Name'
                        placeholderTextColor='black'
                        style={globalStyles.login_Email_textInput}
                        keyboardType='default'/>
                      </View>

                      
                      {/*Phone number  input */}
                      <View style={globalStyles.ViewemailTextInput}>
                        <MaterialIcons
                        name='contacts'
                        size={22} 
                        color="black" 
                        style={styles.phoneNumberIcon} />
                            
                        <TextInput
                        placeholder='Phone Number'
                        style={[globalStyles.login_Email_textInput,{marginLeft:3}]}
                        placeholderTextColor='black'
                        keyboardType='number-pad'/>
                      </View>

                        {/*Email input */}
                        <View style={globalStyles.ViewemailTextInput}>
                        <MaterialIcons
                        name='email'
                        size={23} 
                        color="black" 
                        style={styles.phoneNumberIcon} />
                            
                        <TextInput
                        placeholder='Email'
                        style={[globalStyles.login_Email_textInput,{marginLeft:3}]}
                        placeholderTextColor='black'
                        keyboardType='default'/>
                         </View>

                         {/*Birth date input */}
                        <View style={globalStyles.ViewemailTextInput}>
                        <MaterialIcons
                        name='date-range'
                        size={23} 
                        color="black" 
                        style={styles.phoneNumberIcon} />
                            
                        <TextInput
                        placeholder='Birth Date'
                        style={[globalStyles.login_Email_textInput,{marginLeft:3}]}
                        placeholderTextColor='black'
                        keyboardType='default'/>
                         </View>

                          {/*Address input */}
                        <View style={globalStyles.ViewemailTextInput}>
                        <MaterialCommunityIcons
                        name='map-marker-radius'
                        size={23} 
                        color="black" 
                        style={styles.phoneNumberIcon} />
                            
                        <TextInput
                        placeholder='Address'
                        style={[globalStyles.login_Email_textInput,{marginLeft:3}]}
                        placeholderTextColor='black'
                        keyboardType='default'/>
                         </View>

                    </View>
                    </ScrollView>
                 </View>           
            
    )
}

const styles=StyleSheet.create({
  
    phoneNumberIcon:{
        marginLeft:-2
    },
    container: {
       flexGrow:1,
        backgroundColor: '#F8E2CF',
        alignItems: 'center',
      },
      imageStyle:{
   
        height:150,
        width:150,
        marginTop:50,
        //backgroundColor:'red',
        
        },
    
})



