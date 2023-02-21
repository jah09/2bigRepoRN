import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import React,{useState} from "react";
import { View, Text,StyleSheet,Button,TouchableOpacity } from "react-native-web";
import { globalStyles } from '../ForStyle/GlobalStyles';
import {MaterialIcons} from '@expo/vector-icons';
export default function CustomeDatePicker({onPress,text}){
    const [date, setDate] = useState(new Date(1598051730000));
    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setDate(currentDate);
    };

      const showMode = (currentMode) => {
        DateTimePickerAndroid.open({
          value: date,
          onChange,
          mode: currentMode,
          is24Hour: true,
        });
      };

      const showDatepicker = () => {
        showMode('date');
      };
    return(
        // <View>
        //     <Button title="Show date picker!" />
        //     <Text>selected: {date.toLocaleString()}</Text>
        // </View>
        <TouchableOpacity onPress={onPress}> 
            <View style={globalStyles.viewButtonStyle}>
                    <Text style={globalStyles.buttonText}>{text}</Text>
                    <MaterialIcons 
                    name="login" 
                    size={24} 
                    color="black" 
                    style={globalStyles.loginIcon}
                    />
            </View>
        </TouchableOpacity>
    )
}

const styles=StyleSheet.create({


})