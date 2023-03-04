

   import { StyleSheet, Text, View, TextInput } from 'react-native'
   import React from 'react'
   
   export default function customInput({value, setValue, placeholder}) {
     return (
       <View style={ styles.container}>
         <TextInput 
         value ={value}
         onChangeText={setValue}
         placeholder={placeholder} />


       </View>
     )
   }
   
   const styles = StyleSheet.create({
    container:{
        backgroundColor: 'white',
        left: 40,
        width: '75%',
        height: 50,
        alignItems:"center",
        borderRadius: 5,
        paddingHorizontal: 10,
        borderColor: "gray",
        marginVertical: 10,
    }

   })