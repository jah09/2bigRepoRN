import { View, Text } from 'react-native'
import React from 'react'
import Custombtn from '../shared/customButton';
export default function NotificationModule({navigation,onPress}) {
  const onPressHandler_toMainPage=()=>{
    navigation.navigate('Login');
  }
  return (
    <View style={{alignItems:'center',right:30}}>
   
    </View>
  )
}