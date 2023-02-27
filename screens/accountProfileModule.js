import { StyleSheet, Text, SafeAreaView, ScrollView, Image, View, StatusBar, styleStatusBar, TextInput,onChangeText, Pressable } from 'react-native'
import React from 'react'
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { globalStyles } from '../ForStyle/GlobalStyles'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {MD2LightTheme as DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import CustomButton from '../shared/customButton';




export default function AccountProfileModule( props) {
    
    const { onPress, title = 'Update' } = props;

    const [text, onChangeText] = React.useState('');
    const [number, onChangeNumber] = React.useState('');

    // const theme = {
    //     ...DefaultTheme,
    //     colors: {
    //         ...DefaultTheme.colors,
    //         text: '#565656',
    //         disabled: '#ffffff',
    //         primary: '#3f51b5'
    //     },
    //     fonts: {
    //         regular: "AirbnbCereal"+fontSuffix+"-Book",
    //         medium: "AirbnbCereal"+fontSuffix+"-Medium",
    //         bold: "AirbnbCereal"+fontSuffix+"-Bold"
    //     }
    // }
    const onPressHandler_toMainPage=()=>{
        navigation.navigate('TabNavigator');
      }
  return (
    <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 ,}}>
                <View style={styles.titleBar}>
                    <Ionicons name="ios-arrow-back" size={24} color="#52575D"></Ionicons>
                </View>

                <View style={{ alignSelf: "center" }}>
                    <View style={styles.profileImage}>
                        <Image source={require('../assets/Vitae.png')} style={styles.image} resizeMode="center"></Image>
                    </View>
                    <View style={styles.dm}>
                        <MaterialIcons name="chat" size={18} color="#DFD8C8"></MaterialIcons>
                    </View>
                    <View style={styles.active}></View>
                    <View style={styles.add}>
                        <Ionicons name="ios-add" size={48} color="#DFD8C8" style={{ marginTop: 6, marginLeft: 2 }}></Ionicons>
                    </View>
                </View>
            <View style={styles.text}>
                    <Text style = {{ fontWeight: "bold", left: 20}}> Basic Information</Text>
             </View>

             <View>
             
             <TextInput
             style={styles.input}
            onChangeText={onChangeText}
            placeholder="First Name"
            value={text}
      />
             {/* <TextInput
                style={styles.input}
                onChangeText={onChangeNumber}
                value={number}
                placeholder="Middle Name"
                keyboardType="numeric"
            /> */}
             <TextInput
             style={styles.input}
            onChangeText={onChangeText}
            placeholder="Middle Name"
            value={text}
      />
             <TextInput
             style={styles.input}
            onChangeText={onChangeText}
            placeholder="Last Name"
            value={text}
      />
    
             <TextInput
                style={styles.input}
                onChangeText={onChangeNumber}
                value={number}
                placeholder="Contact Number"
                keyboardType="numeric"
            />
       <TextInput
             style={styles.input}
            onChangeText={onChangeText}
            placeholder="Email"
            value={text}
      />
       <TextInput
             style={styles.input}
            onChangeText={onChangeText}
            placeholder="Address"
            value={text}
        
      />
       <TextInput
             style={styles.input}
            onChangeText={onChangeText}
            placeholder="Date of Birth"
            value={text}
      />
         
            </View>
            <Pressable style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>


{/* <TextInput
	label='Name'
	testID="input"
	mode="outlined"
	theme={{ colors: { placeholder: 'grey', background: '#f5f6f5', text: 'grey', primary: '#5d5d5d' }}}
	style={styles.input}
	value={ this.state.name === undefined ? name : this.state.name }
	onChangeText={name => this.setState({ name })}
/> */}


            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "lightcyan"
    },
    text: {
        fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: 'seagreen',
        width: 150,
        height: 50,
        marginLeft: 110,
      
      },
    image: {
        flex: 1,
        height: undefined,
        width: undefined
    },
    titleBar: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 54,
        marginHorizontal: 16,
        color: "black"
    },
    subText: {
        fontSize: 12,
        color: "#AEB5BC",
        textTransform: "uppercase",
        fontWeight: "500"
    },
    profileImage: {
        width: 200,
        height: 200,
        borderRadius: 100,
        overflow: "hidden"
    },

    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
      },

    dm: {
        backgroundColor: "#41444B",
        position: "absolute",
        top: 20,
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center"
    },
    active: {
        backgroundColor: "#34FFB9",
        position: "absolute",
        bottom: 28,
        left: 10,
        padding: 4,
        height: 20,
        width: 20,
        borderRadius: 10
    },
    add: {
        backgroundColor: "#41444B",
        position: "absolute",
        bottom: 0,
        right: 0,
        width: 60,
        height: 60,
        borderRadius: 30,
        alignItems: "center",
        justifyContent: "center"
    },
    infoContainer: {
        alignSelf: "center",
        alignItems: "center",
        marginTop: 16
    },
    statsContainer: {
        flexDirection: "row",
        alignSelf: "center",
        marginTop: 32
    },
    statsBox: {
        alignItems: "center",
        flex: 1
    },
    mediaImageContainer: {
        width: 180,
        height: 200,
        borderRadius: 12,
        overflow: "hidden",
        marginHorizontal: 10
    },
    mediaCount: {
        backgroundColor: "#41444B",
        position: "absolute",
        top: "50%",
        marginTop: -50,
        marginLeft: 30,
        width: 100,
        height: 100,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 12,
        shadowColor: "rgba(0, 0, 0, 0.38)",
        shadowOffset: { width: 0, height: 10 },
        shadowRadius: 20,
        shadowOpacity: 1
    },
    recent: {
        marginLeft: 78,
        marginTop: 32,
        marginBottom: 6,
        fontSize: 10
    },
    recentItem: {
        flexDirection: "row",
        alignItems: "flex-start",
        marginBottom: 16
    },
    activityIndicator: {
        backgroundColor: "#CABFAB",
        padding: 4,
        height: 12,
        width: 12,
        borderRadius: 6,
        marginTop: 3,
        marginRight: 20
    }
});