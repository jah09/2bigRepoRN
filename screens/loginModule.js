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
import { auth } from "../firebaseConfig";
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

  // database

  const handleSignUp = () => {
    auth.createUserWithEmailAndPass(email, password);
  };


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
            <Text style={globalStyles.textStyles}>Meets the expectation. </Text>

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

              <Custombtn text="Login" onPress={onPressHandler_toMainPage} />

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
