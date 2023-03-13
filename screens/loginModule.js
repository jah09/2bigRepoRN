import {
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  SafeAreaView,
} from "react-native";
import React, { useState } from "react";
import Custombtn from "../shared/customButton";
import { MaterialIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { globalStyles } from "../ForStyle/GlobalStyles";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { db, getDatabase,  } from "../firebaseConfig";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ref,orderByChild,query,equalTo,onValue } from 'firebase/database';
//import { onValue, push, set } from "firebase/database";

export default function LoginModule({ navigation, text }) {
  const onPressHandler_forCreateAccount = () => {
    // navigation.navigate('CreateAccount');
    navigation.navigate("CreateAccount");
  };

  const onPressHandler_forForgotPassword = () => {
    navigation.navigate("ForgotPassword");
  };

  const onPressHandler_toMainPage = () => {
    navigation.navigate("TabNavigator");
  };

  const [showPassword, setShowPassword] = useState(false);
  const [visible, setVisible] = useState(true);


  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

 
  

  const handleLogin = () => {
    const auth = getAuth();
    console.log(auth);
    signInWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        const user = userCredential.user;
        console.log('Logged in with:', user.email);
  
        const customerRef = ref(db, 'CUSTOMER');
        const customerQuery = query(customerRef, orderByChild('email'), equalTo(email));
  
        onValue(customerQuery, snapshot => {
          if (snapshot.exists()) {
            const customerData = snapshot.val()[Object.keys(snapshot.val())[0]];
           
            AsyncStorage.setItem('customerData', JSON.stringify(customerData))
              .then(() => {
                navigation.navigate('TabNavigator');
              })
              .catch(error => {
                console.log(error);
                alert('Error saving data: ', error);
              });
          } else {
            alert('No customer found with this email');
          }
        }, {
          error: error => {
            console.log(error);
            alert('Error fetching data: ', error);
          }
        });
  
      })
      .catch(error =>alert('Please Register'))
  }
  
  return (
    <SafeAreaView style={globalStyles.safeviewStyle}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <TouchableWithoutFeedback
          onPress={() => {
            Keyboard.dismiss();
          }}
        >
          <View style={globalStyles.container}>
            {/* our own logo */}
            <Image
              source={require("../assets/logo_dic.png")}
              style={globalStyles.imageStyle}
            />
            <Text style={globalStyles.textStyles}>Meet the expectations. </Text>

            {/* wrapper/div for email and password input */}
            <View style={globalStyles.wrapper}>
              {/* wrapper for email input */}
              <View style={globalStyles.ViewemailTextInput}>
                <MaterialIcons
                  name="email"
                  size={23}
                  color="black"
                  style={globalStyles.login_Email_Icon}
                />
                <TextInput
                  placeholder="Email"
                  placeholderTextColor="black"
                  onChangeText = {text => setEmail(text) }
                  style={globalStyles.login_Email_textInput}
                />
                
              </View>

              {/* wrapper for password input */}
              <View style={globalStyles.ViewPasswordTextInput}>
                <Ionicons
                  name="md-lock-closed-sharp"
                  size={23}
                  color="black"
                  style={globalStyles.login_Password_Icon}
                />
                <TextInput
                  placeholder="Password"
                  style={[
                    globalStyles.login_Password_textInput,
                    { width: 195 },
                  ]}
                  onChangeText={text => setPassword(text)}
                  secureTextEntry={visible}
                  placeholderTextColor="black"
                />

                <TouchableOpacity
                  style={globalStyles.btnClickEye}
                  onPress={() => {
                    setVisible(!visible);
                    setShowPassword(!showPassword);
                  }}
                >
                  <Ionicons
                    name={showPassword === false ? "eye" : "eye-off"}
                    size={23}
                    color="black"
                  />
                </TouchableOpacity>
              </View>

              {/*for forgot password label*/}
              <TouchableOpacity onPress={onPressHandler_forForgotPassword}>
                <View style={globalStyles.viewForgotPass}>
                  <Text style={globalStyles.textForgotPass}>
                    Forgot password
                  </Text>
                </View>
              </TouchableOpacity>
              {/*login btn */}

              <Custombtn text="Login" onPress={handleLogin}  />

              <View style={globalStyles.row}>
                <Text>Don't have an account?</Text>
                <TouchableOpacity onPress={onPressHandler_forCreateAccount}>
                  <Text style={globalStyles.clickHerestyle}> Click here.</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    </SafeAreaView>
  );
}
