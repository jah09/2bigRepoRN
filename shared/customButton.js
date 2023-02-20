import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,Image,Button,TextInput,TouchableOpacity,TouchableWithoutFeedback,Keyboard,ScrollView } from 'react-native';
import React, {useState}  from 'react';
    

import react from 'react';

export default function CustomerButton({text,onPress}){
    return(
        <TouchableOpacity onPress={onPress}>
        <View style={styles.ButtonStyle}>
        <Text style={styles.buttonText}>{text}</Text>
        </View>
        </TouchableOpacity>

    )
}

const styles=StyleSheet.create({
    ButtonStyle:{
        borderRadius:8,
        paddingVertical:14,
        paddingHorizontal:10,
        backgroundColor:'lightskyblue,'
    },
    buttonText:{
      fontFamily:'nunito-semibold',
      textTransform:'none',
      textAlign:'center',
      fontSize:18
    }
})