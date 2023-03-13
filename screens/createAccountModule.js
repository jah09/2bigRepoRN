import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard, ScrollView, Platform, SafeAreaView } from 'react-native';
import React, { useState, useEffect } from 'react';
import { globalStyles } from '../ForStyle/GlobalStyles';
//import { useFonts } from 'expo-font';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import CustomBtn from '../shared/customButton';
import { Fontisto } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as Location from 'expo-location';
import { geocodeAsync, reverseGeocodeAsync } from 'expo-location';
import { getDatabase,ref, set, push, child} from "firebase/database";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
//import DatePickerExample from '../shared/datePicker';




export default function CreateAccountPage({ navigation }) {



  const [checkValidEmail, setCheckValidEmail] = useState(false);

  const handleCheckEmail =(text) => {
    let re = /\S+@\S+\.\S+/;
    let regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

    setEmail(text)
    if(re.test(text) || regex.test(text)) {
        setCheckValidEmail(false)
    }
      else {
        setCheckValidEmail(true)
      }
  }
  const checkPasswordValidity = value => {
    const isNonWhiteSpace = /^\S*$/;
    if (!isNonWhiteSpace.test(value)) {
      return 'Password must not contain Whitespaces.';
    }

    const isContainsUppercase = /^(?=.*[A-Z]).*$/;
    if (!isContainsUppercase.test(value)) {
      return 'Password must have at least one Uppercase Character.';
    }

    const isContainsLowercase = /^(?=.*[a-z]).*$/;
    if (!isContainsLowercase.test(value)) {
      return 'Password must have at least one Lowercase Character.';
    }

    const isContainsNumber = /^(?=.*[0-9]).*$/;
    if (!isContainsNumber.test(value)) {
      return 'Password must contain at least one Digit.';
    }

    const isValidLength = /^.{8,16}$/;
    if (!isValidLength.test(value)) {
      return 'Password must be 8-16 Characters Long.';
    }

    return null;
  };
  
 
  
  const onPressHandler_forLogin = () => {
    navigation.navigate('Login');
  }
 
  {/*code for eye button in password input */ }
  const [showPassword, setShowPassword] = useState(false);
  const [visible, setVisible] = useState(true);
  const [showConfirmPass, setshowConfirmPass] = useState(false);
  const [visibleConfirmPass, setvisibleConfirmPass] = useState(true);

  {/*style para dili mo overlapp ang logo sa status bar */ }
  const styleTypes = ['default', 'dark-content', 'light-content'];
  const [visibleStatusBar, setvisibleStatusbar] = useState(false);
  const [styleStatusBar, setstyleStatusBar] = useState(styleTypes[0]);

  


  {/* for detecting geolocation and reverse code start here*/ }
    const [location, setLocation] = useState(null);
    // const [address, setAddress] = useState(null);
     const [addresstext, setAddresstext] = useState('');
    const [isPressed, setIsPressed] = useState(false);
 

  useEffect(() => {

    if (isPressed) {
      (async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          console.log('Permission to access location was denied');
          return;
        }

        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
        console.log(location);
        let address = await reverseGeocodeAsync({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });
         
        setAddress(address[0].name + ', ' + address[0].city);
        console.log(address[0].name + ', '+address[0].subregion+',' + address[0].city);

      })();
    }
  }, [isPressed]);

  {/* for detecting geolocation and reverse code end here*/ }


  //firebase data for creating account

  const [firstName, setFName]= useState('');
  const [middleName, setMName] = useState('');
  const [lastName, setLName] = useState('');
  const [phone, setPhone] = useState('');
  const [BOD, setBOD] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [conPass, setConPass] = useState('');


  const handleCreate = () => {
    
    try {
      //tocheck if na fillout ba tnan fields except sa middle name
       if (firstName.trim() === '' ||
        lastName.trim() === '' || 
        email.trim() === '' || 
        phone.trim() === '' ||
       // BOD.trim() === '' ||
        password.trim() === '' ||
        address.trim() === '' || 
        conPass.trim() === '' 
        ){
        alert('Please fill out all fields.');
        return;
       }

  
       // Check if password matches confirm password
    if (password !== conPass) {
      alert('Passwords do not match');
      return;
    }

    // Check password strength
    const checkPassword = checkPasswordValidity(password);
    if (!checkPassword) {
      createUserAccount();
       // calls the create function to proceed with the creation of account
      alert('Account created successfully');
    } else {
      alert('Weak password. Please enter a stronger password for security.');
    }

  } catch (error) {
    console.log( error)
    alert('There was a problem creating your account');
  }
}


  function createUserAccount (){
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        const user = userCredential.user;
        const db = getDatabase();

    //handleCheckEmail();
    
    //key generator apili
    const cusId = Math.floor(Math.random()*900000) + 100000;
    const newId = push(child(ref(db), 'CUSTOMER'));

    set(ref(db, 'CUSTOMER/' + cusId), {  
    cusId: cusId,
    firstname: firstName,
    middleName: middleName,
    lastName: lastName,
    phoneNumber: phone,
    birthdate: BOD,
    address: address,
    email: email,
    password: password,
    confirmPassword: conPass
})
.then(() => {
  alert('Registration successful');
  navigation.navigate('Login');
})
.catch((error) => {
  console.log(error);
  alert('Error writing document: ', error);
});
})
.catch((error) => {
  console.log(error);
alert('Error creating user: ', error);
});
};

  return (
    <SafeAreaView style={styles.safeviewStyle}>
      <TouchableWithoutFeedback onPress={() => {
        Keyboard.dismiss();
      }}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>

          <View style={styles.container}>

            <View style={styles.form}>
              {/* our own logo */}
              <Image source={require('../assets/logo_dic.png')}
                style={styles.imageStyle} />

              <Text style={[globalStyles.textStyles,
              {
                marginTop: 20,
                fontFamily: 'nunito-bold',
                fontSize: 25
              }]}>Create Account </Text>


              <StatusBar backgroundColor='black' styleStatusBar={styleStatusBar} />
              {/*first name input */}
              <View style={styles.ViewFirstname}>
                <FontAwesome
                  name='user'
                  size={23}
                  color="black"
                  style={globalStyles.login_Email_Icon} />

                <TextInput
                  value = {firstName}
                  onChangeText={(firstName) => {setFName(firstName)}}
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
                  value = {middleName}
                  onChangeText={(middleName) => {setMName(middleName)}}
                  placeholder='Middle Name'
                  placeholderTextColor='black'
                  style={globalStyles.login_Email_textInput}
                  keyboardType='default' />
              </View>

              {/*Last name input */}
              <View style={styles.ViewMiddlename}>
                <FontAwesome
                  name='user'
                  size={23}
                  color="black"
                  style={globalStyles.login_Email_Icon} />

                <TextInput
                value = {lastName}
                onChangeText={(lastName) => {setLName(lastName)}}
                  placeholder='Last Name'
                  placeholderTextColor='black'
                  style={globalStyles.login_Email_textInput}
                  keyboardType='default' />
              </View>

              {/*Phone number  input */}
              <View style={styles.ViewPhoneNumber}>
                <MaterialIcons
                  name='contacts'
                  size={22}
                  color="black"
                  style={styles.phoneNumberIcon} />

                <TextInput
                  value = {phone}
                  onChangeText={(phone) => {setPhone(phone)}}
                  placeholder='Phone Number'
                  style={[globalStyles.login_Email_textInput, { marginLeft: 3 }]}
                  placeholderTextColor='black'
                  keyboardType='number-pad' />
              </View>

              {/* <DatePickerExample   value = {BOD} onChangeText={(BOD) => {setBOD(BOD)}} /> */}

              {/*Birth date input */}
              {/* <View style={styles.ViewBirthdate}>
                <MaterialIcons
                  name='date-range'
                  size={23}
                  color="black"
                  style={styles.phoneNumberIcon} />

                <TextInput
                  value = {BOD}
                  onChangeText={(BOD) => {setBOD(BOD)}}
                  placeholder='Birth Date'
                  style={[globalStyles.login_Email_textInput, { marginLeft: 3 }]}
                  placeholderTextColor='black'
                  keyboardType='default'
                  editable={true} />
            

                <TouchableOpacity style={globalStyles.btnClickEye}
                  onPress={() => showMode('date')}>
                  <Fontisto name="date" size={23} color="black" style={{ marginRight: -5 }} />
                </TouchableOpacity>
              </View>
              {/*for birth datepicker */}

              {/* {show && (
                <DateTimePicker
                testID='datePicker'
                value={date}
                mode={mode}
                is24Hour={true}
                display='default'
                onChange={onChange}
                
               
                />
              )}  */}
              {/*Address input */}
              <View style={styles.ViewAddress}>
                <MaterialCommunityIcons
                  name='map-marker-radius'
                  size={23}
                  color="black"
                  style={styles.phoneNumberIcon} />

                <TextInput
                value = {address}
                onChangeText={(address) => {setAddress(address)}}
                  placeholder='Address'
                  style={[globalStyles.login_Email_textInput, { marginLeft: 3 }]}
                  placeholderTextColor='black'
                  keyboardType='default'
                  editable={false} />

                <TouchableOpacity style={globalStyles.btnClickEye} onPress={() => setIsPressed(true)}>

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
                  placeholder="Email"
                  value={email}
                  onChangeText={text=> handleCheckEmail(text)}
                  placeholderTextColor="black"
                  style={globalStyles.login_Email_textInput}
                />
                  {checkValidEmail ? (
              <Text style={styles.textFailed}>Invalid email</Text>
               ) : (
               <Text style={styles.textFailed}></Text>
                 )}
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
                  name='md-lock-closed-sharp'

                  size={23}
                  color="black"
                  style={styles.phoneNumberIcon} />

                <TextInput
                  value = {password}
                  onChangeText={(password) => {setPassword(password)}}
                  placeholder='Password'
                  style={[globalStyles.login_Email_textInput, { marginLeft: 3 }]}
                  placeholderTextColor='black'
                  secureTextEntry={visible} />

                <TouchableOpacity style={globalStyles.btnClickEye}
                  onPress={() => {
                    setVisible(!visible)
                    setShowPassword(!showPassword)
                  }}>
                  <Ionicons
                    name={showPassword === false ? 'eye' : 'eye-off'}
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
                  value = {conPass}
                  onChangeText={(conPass) => {setConPass(conPass)}}
                  placeholder='Confirm Password'
                  style={[globalStyles.login_Email_textInput, { marginLeft: 3 }]}
                  placeholderTextColor='black'
                  secureTextEntry={visibleConfirmPass} />

                <TouchableOpacity style={globalStyles.btnClickEye}
                  onPress={() => {
                    setvisibleConfirmPass(!visibleConfirmPass)
                    setshowConfirmPass(!showConfirmPass)
                  }}>
                  <Ionicons
                    name={showConfirmPass === false ? 'eye' : 'eye-off'}
                    size={23}
                    color="black" />
                </TouchableOpacity>
              </View>

              {/*for for signUP button */}

              {email == '' || checkValidEmail == true ? ( 
                <TouchableOpacity disabled onPress={handleCreate}>
                <View style={ [globalStyles.viewButtonStyle, {backgroundColor: "gray", marginRight: 50, marginTop: 10}] }>
                        <Text style={globalStyles.buttonText}> Register</Text>
                        <MaterialIcons 
                        name="login" 
                        size={24} 
                        color="black" 
                        style={globalStyles.loginIcon}
                        />
                  </View>
                </TouchableOpacity> 
              ):( <TouchableOpacity onPress={handleCreate}>
                <View style={[globalStyles.viewButtonStyle, { marginRight: 50, marginTop: 10} ] }>
                        <Text style={globalStyles.buttonText}> Register</Text>
                        <MaterialIcons 
                        name="login" 
                        size={24} 
                        color="black" 
                        style={globalStyles.loginIcon}
                        />
                  </View>
                </TouchableOpacity>) }
              
             

              <View style={[globalStyles.row, { marginTop: 25 }, { marginLeft: 10 }]}>
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

const styles = StyleSheet.create({
  phoneNumberIcon: {
    marginLeft: -2
  },
  container: {
    flex: 1,
    backgroundColor: '#F8E2CF',
    alignItems: 'center',
    justifyContent: 'center',
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
    backgroundColor: 'red',
    width: '100%'
  },
  form: {
    alignItems: 'center',
    width: '100%'

  },
  ViewFirstname: {
    flexDirection: 'row',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    paddingBottom: 2,
    marginBottom: 25,
    width: 270,
    marginTop: 50

  },
  ViewMiddlename: {
    flexDirection: 'row',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    paddingBottom: 2,
    marginBottom: 25,
    width: 270,
    marginTop: 5
  },
  ViewMiddlename: {
    flexDirection: 'row',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    paddingBottom: 2,
    marginBottom: 25,
    width: 270,
    marginTop: 5
  },
  ViewPhoneNumber: {
    flexDirection: 'row',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    paddingBottom: 2,
    marginBottom: 25,
    width: 270,
    marginTop: 5
  },
  ViewEmail: {
    flexDirection: 'row',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    paddingBottom: 2,
    marginBottom: 25,
    width: 270,
    marginTop: 5
  },
  ViewBirthdate: {
    flexDirection: 'row',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    paddingBottom: 2,
    marginBottom: 25,
    width: 270,
    marginTop: 5
  },
  ViewAddress: {
    flexDirection: 'row',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    paddingBottom: 2,
    marginBottom: 25,
    width: 270,
    marginTop: 5
  },
  customBtnStyle: {
    right: 30,
    marginTop: -20
  },
  safeviewStyle: {
    flex: 1
  },
  textFailed: {
    alignSelf: 'flex-end',
    color: 'red',
    top: 30,
    left: -70,
    fontWeight: "bold"
  },

})

