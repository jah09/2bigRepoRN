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
} from "react-native";
import React, { useState } from "react";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import CustomInput from "../shared/customInput";
import { Button } from "react-native-paper";
import { globalStyles } from "../ForStyle/GlobalStyles";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function AccountProfileModule() {
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

  return (
    <SafeAreaView style={styles.container}>
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
                  <Text style={{
                    marginRight:20,
                    paddingHorizontal:10,
                    fontSize:18,
                    fontFamily:'nunito-bold'
                  }}>
                    Program Description:
                  </Text>
                  <Text style={{fontSize:16,
                  paddingVertical:2,
                  paddingHorizontal:10,
                  }}>
                   Program Value
                  </Text>
              </View>
              <View style={styles.rewardPts}>
                  <Text style={{
                    marginRight:20,
                    paddingHorizontal:10,
                    fontSize:18,
                    fontFamily:'nunito-bold'
                  }}>
                    Reward Points:
                  </Text>
                  <Text style={{fontSize:16,
                  paddingVertical:2,
                  paddingHorizontal:10,
                  }}>
                   Reward Value
                  </Text>
              </View>
            </View>
          </View>
        </View>
      </Modal>
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
          <CustomInput placeholder="Last Name" />
          <CustomInput placeholder="Contact Number" />
          <CustomInput placeholder="Email" />
          <CustomInput placeholder="Address" />
          <CustomInput placeholder="Date of Birth" />
        </View>

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
  programDesc:{
    //backgroundColor:'red',
    //flexDirection:'row'
  },
  rewardPts:{
    //backgroundColor:'gray',
    marginTop:10
  }
});
