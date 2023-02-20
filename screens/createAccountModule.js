import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,Image,Button,TextInput,TouchableOpacity,TouchableWithoutFeedback,Keyboard,ScrollView,Platform,SafeAreaView } from 'react-native';
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
import Constants from 'expo-constants';
import CustomBtn from '../shared/customButton';
import LoginModule from '../screens/loginModule';

export default function CreateAccountPage({navigation}){
  const onPressHandler_forLogin=()=>{
    navigation.navigate('LoginPage');
  }

  const[showPassword, setShowPassword]=useState(false);
  const[visible, setVisible]=useState(true);

  const [showConfirmPass, setshowConfirmPass]=useState(false);
  const [visibleConfirmPass,setvisibleConfirmPass]=useState(true);
  const styleTypes=['default','dark-content','light-content'];
  
  const [visibleStatusBar,setvisibleStatusbar]=useState(false);
  const [styleStatusBar,setstyleStatusBar]=useState(styleTypes[0]);

  return(
    <SafeAreaView style={styles.safeviewStyle}>
    <TouchableWithoutFeedback onPress={()=>{
      Keyboard.dismiss();
    }}> 
    <ScrollView contentContainerStyle={{flexGrow:1}}>
 
        <View style={styles.container}> 
          
            <View style={styles.form}> 
                  {/* our own logo */}
                 <Image source={require('../assets/logo_dic.png')}
                   style={styles.imageStyle}/> 
                     <Text style={[globalStyles.textStyles,
                      {marginTop:20,
                      fontFamily:'nunito-bold',
                      fontSize:25}]}>Create Account </Text>  

                        <StatusBar backgroundColor='black' styleStatusBar={styleStatusBar} />
                        {/*first name input */}
                        <View style={styles.ViewFirstname}>
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
                        <View style={styles.ViewMiddlename}>
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
                        <View style={styles.ViewMiddlename}>
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
                        <View style={styles.ViewPhoneNumber}>
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

                        
                       

                           {/*Birth date input */}
                          <View style={styles.ViewBirthdate}>
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
                          <View style={styles.ViewAddress}>
                          <MaterialCommunityIcons
                          name='map-marker-radius'
                          size={23} 
                          color="black" 
                          style={styles.phoneNumberIcon} />
                              
                          <TextInput
                          placeholder='Address'
                          style={[globalStyles.login_Email_textInput,{marginLeft:3}]}
                          placeholderTextColor='black'
                          keyboardType='default'
                          editable={false}/>

                        <TouchableOpacity style={globalStyles.btnClickEye}>
                                  
                             <FontAwesome  
                                  name='map-pin'
                                  size={22} 
                                  color="black" 
                                  />
                         </TouchableOpacity>

                          </View>

                           {/*Email input */}
                           <View style={styles.ViewEmail}>
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


                           {/*password input */}
                           <View style={styles.ViewEmail}>
                          <Ionicons
                           name='md-lock-closed-sharp'
          
                          size={23} 
                          color="black" 
                          style={styles.phoneNumberIcon} />
                              
                          <TextInput
                          placeholder='Password'
                          style={[globalStyles.login_Email_textInput,{marginLeft:3}]}
                          placeholderTextColor='black'
                          secureTextEntry={visible}/>

                          <TouchableOpacity style={globalStyles.btnClickEye}
                                    onPress={()=>{
                                    setVisible(!visible)
                                    setShowPassword(!showPassword)
                                  }}>
                             <Ionicons  
                                  name={showPassword === false ? 'eye' : 'eye-off' }
                                  size={23} 
                                  color="black" />
                         </TouchableOpacity>


                          </View>

                           {/*Confirm password input */}
                           <View style={styles.ViewEmail}>
                          <Ionicons
                           name='md-lock-closed-sharp'
          
                          size={23} 
                          color="black" 
                          style={styles.phoneNumberIcon} />
                              
                          <TextInput
                          placeholder='Confirm Password'
                          style={[globalStyles.login_Email_textInput,{marginLeft:3}]}
                          placeholderTextColor='black'
                          secureTextEntry={visibleConfirmPass}/>

                          <TouchableOpacity style={globalStyles.btnClickEye}
                                    onPress={()=>{
                                      setvisibleConfirmPass(!visibleConfirmPass)
                                      setshowConfirmPass(!showConfirmPass)
                                  }}>
                             <Ionicons  
                                  name={showConfirmPass === false ? 'eye' : 'eye-off' }
                                  size={23} 
                                  color="black" />
                         </TouchableOpacity>
                          </View>

                          {/*for for signUP button */}
                          <View style={styles.customBtnStyle}>
                          <CustomBtn text='Register' />
                          </View>

                          <View style={[globalStyles.row,{marginTop:25},{marginLeft:10}]}>
                              <Text>Already have an account?</Text>
                            <TouchableOpacity onPress={onPressHandler_forLogin}>
                              <Text style={globalStyles.clickHerestyle}> Click here.</Text>
                            </TouchableOpacity>
                          </View>
                                        


             </View>          
         </View>
           
        
        </ScrollView>
        </TouchableWithoutFeedback>
    </SafeAreaView>
   
    )
}

const styles=StyleSheet.create({
   phoneNumberIcon:{
      marginLeft:-2
    },
     container: {
      flex:1,
      backgroundColor: '#F8E2CF',
      alignItems: 'center',
      justifyContent:'center',
      // paddingTop: Constants.statusBarHeight,
      padding:8,
      paddingTop:70,
     //paddingTop:Platform.OS==='android'? StatusBar.height:0
    },
    imageStyle:{
      height:150,
      width:150,
      marginTop:-25,
    },
    scrollViewStyle:{
      backgroundColor:'red',
       width:'100%'
    },
    form:{ 
     alignItems: 'center',
     width:'100%'
     
  },
  ViewFirstname:{
    flexDirection:'row',
    borderBottomColor:'black',
    borderBottomWidth:1,
    paddingBottom:2,
    marginBottom:25,
    width:270,
    marginTop:50
    
   },
   ViewMiddlename:{
    flexDirection:'row',
    borderBottomColor:'black',
    borderBottomWidth:1,
    paddingBottom:2,
    marginBottom:25,
    width:270,
    marginTop:5
   },   
   ViewMiddlename:{
    flexDirection:'row',
   borderBottomColor:'black',
   borderBottomWidth:1,
   paddingBottom:2,
   marginBottom:25,
   width:270,
   marginTop:5
  },  
  ViewPhoneNumber:{
    flexDirection:'row',
    borderBottomColor:'black',
    borderBottomWidth:1,
    paddingBottom:2,
    marginBottom:25,
    width:270,
    marginTop:5
   },     
   ViewEmail:{
    flexDirection:'row',
    borderBottomColor:'black',
    borderBottomWidth:1,
    paddingBottom:2,
    marginBottom:25,
    width:270,
    marginTop:5
   },    
   ViewBirthdate:{
    flexDirection:'row',
    borderBottomColor:'black',
    borderBottomWidth:1,
    paddingBottom:2,
    marginBottom:25,
    width:270,
    marginTop:5
   },       
   ViewAddress:{
    flexDirection:'row',
    borderBottomColor:'black',
    borderBottomWidth:1,
    paddingBottom:2,
    marginBottom:25,
    width:270,
    marginTop:5
   },   
   customBtnStyle:{
    right:30,
    marginTop:-20
   },
   safeviewStyle:{
    flex:1
   }
   

           
      
})



