import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  Platform,
  SafeAreaView,
  Alert,
  PermissionsAndroid,
} from "react-native";
import React, { useState, useEffect } from "react";
import { globalStyles } from "../ForStyle/GlobalStyles";
//import { useFonts } from "expo-font";
import {
  MaterialIcons,
  Ionicons,
  FontAwesome,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
//import Constants from "expo-constants";
import CustomBtn from "../shared/customButton";
import LoginModule from "../screens/loginModule";
import { Fontisto } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import * as Location from "expo-location";
import { geocodeAsync, reverseGeocodeAsync } from "expo-location";
import { getDatabase, child, push, ref, set } from "firebase/database";
import { db } from "../firebaseConfig";

export default function CreateAccountPage({ navigation }) {
  const onPressHandler_forLogin = () => {
    navigation.navigate("Login");
  };

  {
    /*code for eye button in password input */
  }
  const [showPassword, setShowPassword] = useState(false);
  const [visible, setVisible] = useState(true);
  const [showConfirmPass, setshowConfirmPass] = useState(false);
  const [visibleConfirmPass, setvisibleConfirmPass] = useState(true);

  {
    /*style para dili mo overlapp ang logo sa status bar */
  }
  const styleTypes = ["default", "dark-content", "light-content"];
  const [visibleStatusBar, setvisibleStatusbar] = useState(false);
  const [styleStatusBar, setstyleStatusBar] = useState(styleTypes[0]);

  {
    /*for date picker code start */
  }
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);

    let tempDate = new Date(currentDate);
    let fDate =
      tempDate.getDate() +
      "/" +
      (tempDate.getMonth() + 1) +
      "/" +
      tempDate.getFullYear();
    setText(fDate);
  };
  const [text, setText] = useState("");
  {
    /*for date picker code end here */
  }

  {
    /* for detecting geolocation and reverse code start here*/
  }
  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState(null);
  const [addresstext, setAddresstext] = useState("");
  const [isPressed, setIsPressed] = useState(false);
  // declare variable here
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  // const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [birthdate, setBirthdate] = useState("");

  //function for registration
  function register() {
    // Generate a new customer ID by pushing a new child node under the "CUSTOMER" parent node
    //const newCustomerId = push(child(ref(db), 'CUSTOMER')).key;

    // Generate a unique integer customer ID starting from 100000
    const newCustomerId = Math.floor(Math.random() * 900000) + 100000;

    // Push the new customer to the database using the generated ID
    const newCustomerRef = push(child(ref(db), "CUSTOMER"));

    //saving data to a defined path/table
    set(ref(db, "CUSTOMER/" + newCustomerId), {
      customerId: newCustomerId,
      firstName: firstName,
      middleName: middleName,
      lastName: lastName,
      phoneNumber: phoneNumber,
      birthdate: birthdate,
      address: address,
      email: email,
      password: password,
      confirmPassword: confirmPassword,
      // profile_picture : imageUrl
    })
      .then(() => {
        //Customer data saved successfully
        alert("data submitted successfully!");
        console.log("successfully registered!");
        navigation.navigate("Login");
      })
      // .catch((error) => {
      .catch(() => {
        // Error saving customer data
        alert("Error submitting data!");
      });
  }

  useEffect(() => {
    if (isPressed) {
      (async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          console.log("Permission to access location was denied");
          return;
        }

        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
        console.log(location);
        let address = await reverseGeocodeAsync({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });
        setAddress(address[0].name + ", " + address[0].city);
        console.log(address[0].name + ", " + address[0].city);
      })();
    }
  }, [isPressed]);

  {
    /* for detecting geolocation and reverse code end here*/
  }
  return (
    <SafeAreaView style={styles.safeviewStyle}>
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={styles.container}>
            <View style={styles.form}>
              {/* our own logo */}
              <Image
                source={require("../assets/logo_dic.png")}
                style={styles.imageStyle}
              />

              <Text
                style={[
                  globalStyles.textStyles,
                  {
                    marginTop: 20,
                    fontFamily: "nunito-bold",
                    fontSize: 25,
                  },
                ]}
              >
                Create Account{" "}
              </Text>

              <StatusBar
                backgroundColor="black"
                styleStatusBar={styleStatusBar}
              />
              {/*first name input */}
              <View style={styles.ViewFirstname}>
                <FontAwesome
                  name="user"
                  size={23}
                  color="black"
                  style={globalStyles.login_Email_Icon}
                />

                <TextInput
                  placeholder="First Name"
                  placeholderTextColor="black"
                  style={globalStyles.login_Email_textInput}
                  keyboardType="default"
                  value={firstName}
                  onChangeText={(value) => setFirstName(value)}
                />
              </View>

              {/*Middle name input */}
              <View style={styles.ViewMiddlename}>
                <FontAwesome
                  name="user"
                  size={23}
                  color="black"
                  style={globalStyles.login_Email_Icon}
                />

                <TextInput
                  placeholder="Middle Name"
                  placeholderTextColor="black"
                  style={globalStyles.login_Email_textInput}
                  keyboardType="default"
                  value={middleName}
                  onChangeText={(value) => setMiddleName(value)}
                />
              </View>

              {/*Last name input */}
              <View style={styles.ViewMiddlename}>
                <FontAwesome
                  name="user"
                  size={23}
                  color="black"
                  style={globalStyles.login_Email_Icon}
                />

                <TextInput
                  placeholder="Last Name"
                  placeholderTextColor="black"
                  style={globalStyles.login_Email_textInput}
                  keyboardType="default"
                  value={lastName}
                  onChangeText={(value) => setLastName(value)}
                />
              </View>

              {/*Phone number  input */}
              <View style={styles.ViewPhoneNumber}>
                <MaterialIcons
                  name="contacts"
                  size={22}
                  color="black"
                  style={styles.phoneNumberIcon}
                />

                <TextInput
                  placeholder="Phone Number"
                  style={[
                    globalStyles.login_Email_textInput,
                    { marginLeft: 3 },
                  ]}
                  placeholderTextColor="black"
                  keyboardType="number-pad"
                  value={phoneNumber}
                  onChangeText={(value) => setPhoneNumber(value)}
                />
              </View>

              {/*Birth date input */}
              <View style={styles.ViewBirthdate}>
                <MaterialIcons
                  name="date-range"
                  size={23}
                  color="black"
                  style={styles.phoneNumberIcon}
                />

                <TextInput
                  placeholder="Birth Date"
                  style={[
                    globalStyles.login_Email_textInput,
                    { marginLeft: 3 },
                  ]}
                  placeholderTextColor="black"
                  keyboardType="default"
                  value={birthdate}
                  onChangeText={(value) => setBirthdate(value)}
                />
                {/* editable={false} */}

                {/* {text}
                </TextInput> */}

                <TouchableOpacity
                  style={globalStyles.btnClickEye}
                  onPress={() => showMode("date")}
                >
                  <Fontisto
                    name="date"
                    size={23}
                    color="black"
                    style={{ marginRight: -5 }}
                  />
                </TouchableOpacity>
              </View>
              {/*for birth datepicker */}

              {show && (
                <DateTimePicker
                  testID="datePicker"
                  value={date}
                  mode={mode}
                  is24Hour={true}
                  display="default"
                  onChange={onChange}
                />
              )}
              {/*Address input */}
              <View style={styles.ViewAddress}>
                <MaterialCommunityIcons
                  name="map-marker-radius"
                  size={23}
                  color="black"
                  style={styles.phoneNumberIcon}
                />

                <TextInput
                  placeholder="Address"
                  style={[
                    globalStyles.login_Email_textInput,
                    { marginLeft: 3 },
                  ]}
                  placeholderTextColor="black"
                  keyboardType="default"
                  value={address}
                  onChangeText={(value) => setAddress(value)}
                />
                {/* rona */}
                {/* editable={false} >{address}</TextInput> */}

                <TouchableOpacity
                  style={globalStyles.btnClickEye}
                  onPress={() => setIsPressed(true)}
                >
                  <FontAwesome name="map-pin" size={22} color="black" />
                </TouchableOpacity>
              </View>

              {/*Email input */}
              <View style={styles.ViewEmail}>
                <MaterialIcons
                  name="email"
                  size={23}
                  color="black"
                  style={styles.phoneNumberIcon}
                />

                <TextInput
                  placeholder="Email"
                  style={[
                    globalStyles.login_Email_textInput,
                    { marginLeft: 3 },
                  ]}
                  placeholderTextColor="black"
                  keyboardType="default"
                  value={email}
                  onChangeText={(value) => setEmail(value)}
                />
              </View>

              {/* <View>
                {!locationEnabled && !locationDeclined && (
                  <View>
                    <Text>For a better experience, turn on device location, which uses Google's location service. This will allow us to provide you with more accurate results and tailor your experience to your location.</Text>
                    <Button title="Turn On Location" onPress={handleLocationEnabled} />
                    <Button title="No Thanks" onPress={handleLocationDeclined} />
                  </View>
                )}
                {locationEnabled && (
                  <Text>Location is enabled.</Text>
                )}
              </View> */}

              {/*password input */}
              <View style={styles.ViewEmail}>
                <Ionicons
                  name="md-lock-closed-sharp"
                  size={23}
                  color="black"
                  style={styles.phoneNumberIcon}
                />

                <TextInput
                  placeholder="Password"
                  style={[
                    globalStyles.login_Email_textInput,
                    { marginLeft: 3 },
                  ]}
                  placeholderTextColor="black"
                  secureTextEntry={visible}
                  value={password}
                  onChangeText={(value) => setPassword(value)}
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

              {/*Confirm password input */}
              <View style={styles.ViewEmail}>
                <Ionicons
                  name="md-lock-closed-sharp"
                  size={23}
                  color="black"
                  style={styles.phoneNumberIcon}
                />

                <TextInput
                  placeholder="Confirm Password"
                  style={[
                    globalStyles.login_Email_textInput,
                    { marginLeft: 3 },
                  ]}
                  placeholderTextColor="black"
                  secureTextEntry={visibleConfirmPass}
                  value={confirmPassword}
                  onChangeText={(value) => setConfirmPassword(value)}
                />

                <TouchableOpacity
                  style={globalStyles.btnClickEye}
                  onPress={() => {
                    setvisibleConfirmPass(!visibleConfirmPass);
                    setshowConfirmPass(!showConfirmPass);
                  }}
                >
                  <Ionicons
                    name={showConfirmPass === false ? "eye" : "eye-off"}
                    size={23}
                    color="black"
                  />
                </TouchableOpacity>
              </View>

              {/*for for signUP button */}
              <View style={styles.customBtnStyle}>
                <CustomBtn onPress={register} text="Register" />
                {/* <CustomBtn text="Register" /> */}
              </View>

              <View
                style={[
                  globalStyles.row,
                  { marginTop: 25 },
                  { marginLeft: 10 },
                ]}
              >
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
  );
}

const styles = StyleSheet.create({
  phoneNumberIcon: {
    marginLeft: -2,
  },
  container: {
    flex: 1,
    backgroundColor: "#F8E2CF",
    alignItems: "center",
    justifyContent: "center",
    // paddingTop: Constants.statusBarHeight,
    padding: 8,
    paddingTop: 70,
    //paddingTop:Platform.OS==='android'? StatusBar.height:0
  },
  imageStyle: {
    height: 150,
    width: 150,
    marginTop: -25,
  },
  scrollViewStyle: {
    backgroundColor: "red",
    width: "100%",
  },
  form: {
    alignItems: "center",
    width: "100%",
  },
  ViewFirstname: {
    flexDirection: "row",
    borderBottomColor: "black",
    borderBottomWidth: 1,
    paddingBottom: 2,
    marginBottom: 25,
    width: 270,
    marginTop: 50,
  },
  ViewMiddlename: {
    flexDirection: "row",
    borderBottomColor: "black",
    borderBottomWidth: 1,
    paddingBottom: 2,
    marginBottom: 25,
    width: 270,
    marginTop: 5,
  },
  ViewMiddlename: {
    flexDirection: "row",
    borderBottomColor: "black",
    borderBottomWidth: 1,
    paddingBottom: 2,
    marginBottom: 25,
    width: 270,
    marginTop: 5,
  },
  ViewPhoneNumber: {
    flexDirection: "row",
    borderBottomColor: "black",
    borderBottomWidth: 1,
    paddingBottom: 2,
    marginBottom: 25,
    width: 270,
    marginTop: 5,
  },
  ViewEmail: {
    flexDirection: "row",
    borderBottomColor: "black",
    borderBottomWidth: 1,
    paddingBottom: 2,
    marginBottom: 25,
    width: 270,
    marginTop: 5,
  },
  ViewBirthdate: {
    flexDirection: "row",
    borderBottomColor: "black",
    borderBottomWidth: 1,
    paddingBottom: 2,
    marginBottom: 25,
    width: 270,
    marginTop: 5,
  },
  ViewAddress: {
    flexDirection: "row",
    borderBottomColor: "black",
    borderBottomWidth: 1,
    paddingBottom: 2,
    marginBottom: 25,
    width: 270,
    marginTop: 5,
  },
  customBtnStyle: {
    right: 30,
    marginTop: -3,
  },
  safeviewStyle: {
    flex: 1,
  },
});
