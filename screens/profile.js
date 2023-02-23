import { StyleSheet, Text, View,Button, SafeAreaView, ScrollView, Image} from 'react-native'
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';




export default function Profile() {
    return (
        <SafeAreaView style = {styles.container}>
            <ScrollView showsVerticalScrollIndicator ={false}>

                <Image style = {styles.profileImage} source = {require('../assets/Vitae.png')} styles= {styles .image} resizeMode ="center"/>
                <Text style ={styles.infoContainer}> Rhea Mae Trinidad</Text>
                <Text style ={styles.bodyText}> Basic Information</Text>
            
            </ScrollView>
      </SafeAreaView>
    )
  }

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "lightblue",
        padding: 20,
        alignItems: "center",
        justifyContent: "center",

    },
    text:{
        fontFamily:"HelveticaNeue",
        color: "black"
    },
    image:{
        flex:1,
        width:undefined,
        height: undefined,
    },
    titleBar:{
        flexDirection:"row",
        justifyContent:"space-between",
        marginTop:24,
        marginHorizontal: 16,
    },
    profileImage:{
        width: 150,
        height: 150,
        borderRadius: 75,
        
    },
    infoContainer:{
        fontSize: 18,
        fontWeight:'600',
        color:"blue",
        alignSelf: "center",
        alignItems:"center",
        marginBottom: 10,
    },
    bodyText:{
        fontSize: 18,
        fontWeight:'600',
        color:"black",
        alignSelf: "stretch",
        alignItems:"center",
        right: 10,
    }

});