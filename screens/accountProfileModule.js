
import {
  StyleSheet,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  View,
  StatusBar,
  styleStatusBar,
  TextInput,
  onChangeText,
  TouchableOpacity, onPress
} from "react-native";
import React from "react";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import CustomInput from '../shared/customInput';
import { Button } from "react-native-paper";
import { globalStyles } from "../ForStyle/GlobalStyles";

export default function AccountProfileModule() {
  const [text, onChangeText] = React.useState("");
  const [number, onChangeNumber] = React.useState("");

  const onPressHandler_toMainPage = () => {
    navigation.navigate("TabNavigator");
  };


  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ alignSelf: "center" }}>
          <View style={styles.profileImage}>
            <Image
              source={require("../assets/Vitae.png")}
              style={styles.image}
              resizeMode="center"
            ></Image>
          </View>
          <View style={styles.dm}>
            <MaterialIcons
              name="chat"
              size={18}
              color="#DFD8C8"
            ></MaterialIcons>
          </View>
        </View>
        <View style={styles.text}>
          <Text style={{ fontWeight: "bold", left: 20, bottom: 20 }}>
            {" "}
            Basic Information
          </Text>
        </View>
      <View>
          <CustomInput placeholder="First Name" />
          <CustomInput placeholder="Middle Name" />
          <CustomInput placeholder="Last Name"/>
          <CustomInput placeholder="Contact Number"/>
          <CustomInput placeholder="Email"/>
          <CustomInput placeholder="Address"/>
          <CustomInput placeholder="Date of Birth"/>
      </View>
      
      <TouchableOpacity onPress={onPress}> 
            <View style={styles.btn}>
                    <Text style ={styles.txt}> UPDATE</Text>
            </View>
        </TouchableOpacity>

      

	
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "lightcyan",
  },
  
  image: {
    flex: 1,
    height: undefined,
    width: undefined,
  },
 
  profileImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    overflow: "hidden",
  },

  dm: {
    backgroundColor: "#41444B",
    position: "absolute",
    top: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  btn:{
    borderRadius:5,
    paddingVertical:5,
    paddingHorizontal:5,
    backgroundColor:'#009900',
    marginTop:20,
    alignItems: "center",
    width:250,
    height: 50,
    left:60,
  },
  txt:{
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  }
});
