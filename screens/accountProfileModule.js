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
  TouchableOpacity,
  onPress,
  Modal,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  Ionicons,
  MaterialIcons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import CustomInput from "../shared/customInput";
import { db, getDatabase } from "../firebaseConfig";
import { ref, orderByChild, query, equalTo, onValue } from "firebase/database";
import AsyncStorage from "@react-native-async-storage/async-storage";
export default function AccountProfileModule({ navigation }) {
  const [text, onChangeText] = React.useState("");
  const [number, onChangeNumber] = React.useState("");

  const onPressHandler_toMainPage = () => {
    navigation.navigate("TabNavigator");
  };

  //Modal codes
  const [showModal, setShowModal] = useState(false);
  const onPressHandlerShowModal = () => {
    setShowModal(true);
  };

  const [customerData, setCustomerData] = useState(null);
  console.log("profile screen", customerData);

  useEffect(() => {
    AsyncStorage.getItem("customerData")
      .then((data) => {
        if (data !== null) {
          setCustomerData(JSON.parse(data));
        }
      })
      .catch((error) => {
        console.log(error);
        alert("Error fetching data: ", error);
      });
  }, []);

  const handleLogout = async () => {
    try {
      await AsyncStorage.multiRemove(["customerData", "email", "password"]);
      // navigate to login screen or any other screen
      Alert.alert("", "Do you want to logout?", [
        {
          text: "Yes",
          onPress: () => {
            navigation.navigate("Login");
          },
        },
        {
          text: "cancel",
        },
      ]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Modal
          transparent
          onRequestClose={() => {
            setShowModal(false);
          }}
          visible={showModal}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#00000099",
            }}
          >
            <View style={styles.RewardModal}>
              <View style={styles.modalTitle}>
                <Text
                  style={{
                    marginTop: 8,
                    marginLeft: 45,
                    fontFamily: "nunito-bold",
                    fontSize: 22,
                  }}
                >
                  2Big Loyalty
                </Text>
                <View
                  style={{
                    backgroundColor: "transparent",
                    textAlign: "right",
                    right: -75,
                    marginTop: -10,
                  }}
                >
                  <TouchableOpacity
                    onPress={() => {
                      setShowModal(false);
                    }}
                  >
                    <MaterialCommunityIcons
                      name="close-circle"
                      size={28}
                      color="black"
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.Descriptionwrapper}>
                <View style={styles.programDesc}>
                  <Text
                    style={{
                      marginRight: 20,
                      paddingHorizontal: 10,
                      fontSize: 18,
                      fontFamily: "nunito-bold",
                    }}
                  >
                    Program Description:
                  </Text>
                  <Text
                    style={{
                      fontSize: 16,
                      paddingVertical: 2,
                      paddingHorizontal: 10,
                    }}
                  >
                    Program Value
                  </Text>
                </View>
                <View style={styles.rewardPts}>
                  <Text
                    style={{
                      marginRight: 20,
                      paddingHorizontal: 10,
                      fontSize: 18,
                      fontFamily: "nunito-bold",
                    }}
                  >
                    Reward Points:
                  </Text>
                  <Text
                    style={{
                      fontSize: 16,
                      paddingVertical: 2,
                      paddingHorizontal: 10,
                    }}
                  >
                    Reward Value
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </Modal>
        <View style={{ alignSelf: "center" }}>
          <View style={styles.profileImage}>
            <Image
              source={require("../assets/Vitae.png")}
              style={styles.image}
              resizeMode="center"
            ></Image>
          </View>
          <View style={styles.out}>
            <TouchableOpacity onPress={handleLogout}>
              <MaterialIcons
                name="logout"
                size={18}
                color="#DFD8C8"
              ></MaterialIcons>
              <View>
              </View>
              
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.text}>
          <Text style={{ fontWeight: "bold", left: 20, bottom: 20 }}>
            Basic Information
          </Text>
        </View>

        {customerData !== null ? (
          <View>
            <CustomInput
              placeholder="First Name"
              value={customerData.firstname}
            />
            <CustomInput
              placeholder="Middle Name (Optional)"
              value={customerData.middleName}
            />
            <CustomInput
              placeholder="Last Name"
              value={customerData.lastName}
            />
            <CustomInput
              placeholder="Contact Number"
              value={customerData.phoneNumber}
            />
            <CustomInput placeholder="Email" value={customerData.email} />
            <CustomInput placeholder="Address" value={customerData.address} />
          </View>
        ) : (
          <Text>No customer data found</Text>
        )}

        <TouchableOpacity onPress={onPress}>
          <View style={styles.btn}>
            <Text style={styles.txt}> UPDATE</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={onPressHandlerShowModal}>
          <View style={styles.rewardButton}>
            <Text style={styles.rewardText}>REWARD</Text>
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
    //backgroundColor:'red'
  },

  out: {
    backgroundColor: "#41444B",
    position: "absolute",
    top: 40,
    width: 40,
    height: 40,
    marginLeft: 220,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  btn: {
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 5,
    backgroundColor: "#009900",
    marginTop: 20,
    alignItems: "center",
    width: 250,
    height: 50,
    left: 60,
  },
  txt: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  rewardButton: {
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 5,
    backgroundColor: "#009900",
    marginTop: 10,
    alignItems: "center",
    width: 250,
    height: 50,
    left: 60,
    marginBottom: 20,
  },
  rewardText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    alignItem: "center",
    textAlign: "center",
    justifyContent: "center",
    //  paddingVertical:10
  },
  RewardModal: {
    width: 300,
    height: 150,
    backgroundColor: "#F8E2CF",
    borderBottomColor: "gray",
    borderBottomWidth: 1,
    borderRadius: 10,
    elevation: 10,
  },
  modalTitle: {
    // backgroundColor:'red',
    justifyContent: "center",
    padding: 0,
    flexDirection: "row",
  },
  Descriptionwrapper: {
    // backgroundColor: "green",
    paddingVertical: 5,
    marginTop: 10,
    height: 120,
  },
  programDesc: {
    //backgroundColor:'red',
    //flexDirection:'row'
  },
  rewardPts: {
    //backgroundColor:'gray',
    marginTop: 10,
  },
});
