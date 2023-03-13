import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  Modal,
  TextInput,
} from "react-native";
import React, { useState, useEffect } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import { globalStyles } from "../ForStyle/GlobalStyles";

export default function ProductComponent() {
  // const route = useRoute();
  // const { storeName } = route.params.storeName;
  //  console.log('receving-2nd--'+ route.params.storeName);
  //console.log(storeName);
  const navigation = useNavigation();
  const onPresshandler_toStationPage = () => {
    navigation.goBack();
  };
  const onPressHandler_toProducDetails = () => {
    navigation.navigate("ProductDetailsAndOrder");
  };
  const route = useRoute();
  //check if the route.params object exists before accessing its properties. You can do this using the optional chaining operator ?
  const { storeName } = route.params?.storeName ?? "No store to display"; //object is not defined when the screen is reloaded. When the app is reloaded, the state of the application is reset, including any parameters that were passed to the screens.--- In this way, if route.params is undefined, the storeName variable will also be undefined, but the code will not throw an error.
  //console.log('4th screen--'+route.params.storeName);//run test if naa ba data na receive or wala
  // console.log("4th screen---"+route.params.storeName);

  const [showModal, setShowModal] = useState(false);
  const onPressHandlerShowModal = () => {
    setShowModal(true);
  };
  return (
    <View style={styles.container}>
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
          <View style={styles.FeedbackModal}>
            {/*for title and close icon btn */}
            <View style={styles.modalTitle}>
              <Text
                style={{
                  marginTop: 8,
                  marginLeft: 50,
                  fontFamily: "nunito-bold",
                  fontSize: 18,
                }}
              >
                Store's Review
              </Text>

              <View
                style={{
                  backgroundColor: "transparent",
                  textAlign: "right",
                  right: -70,
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

            {/*for input wrapper and btn and */}
            <View style={styles.inputwrapper}>
              <View style={styles.reviewInputStyle}>
                <MaterialIcons
                  name="rate-review"
                  size={23}
                  color="black"
                  style={[globalStyles.login_Email_Icon, { marginTop: 5 }]}
                />
                {/*for review input  */}
                <TextInput
                  placeholder="Enter your feedback or review"
                  multiline={true}
                  placeholderTextColor="black"
                  style={globalStyles.login_Email_textInput}
                  keyboardType="default"
                />
              </View>

              <View style={styles.ratingsInputStyle}>
                <MaterialIcons
                  name="star"
                  size={23}
                  color="black"
                  style={[globalStyles.login_Email_Icon, { marginTop: 2 }]}
                />
                {/*for ratings input  */}
                <TextInput
                  placeholder="Ratings(1-5)"
                  multiline={true}
                  placeholderTextColor="black"
                  style={globalStyles.login_Email_textInput}
                  keyboardType="numeric"
                />
              </View>
             
            </View>
             {/*for custom Submit button */}
            <View
              style={{
                backgroundColor: "transparent",
                marginTop: 20,
                height: 50,
              }}
            >
              <TouchableOpacity >
                <View
                  style={{
                    borderRadius: 10,
                    paddingVertical: 10,
                    paddingHorizontal: 10,
                    backgroundColor: "#87cefa",
                    marginTop: 5,
                    width: 200,
                    left: 50,
                    height: 40,
                  }}
                >
                  <Text
                    style={[globalStyles.buttonText, { marginTop: 0, left: 0 }]}
                  >
                    Submit
                  </Text>
                  <MaterialIcons
                    name="login"
                    size={24}
                    color="black"
                    style={[
                      globalStyles.loginIcon,
                      { backgroundColor: "transparent", marginLeft: -70 },
                    ]}
                  />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <View style={styles.viewBackBtn}>
        {/* <MaterialIcons
          name="arrow-back-ios"
          size={24}
          color="black"
          onPress={onPresshandler_toStationPage}
        /> */}
        <View style={styles.viewwatername}>
          <Text style={styles.textwatername}>Order Details</Text>
        </View>
      </View>
      <View style={styles.productWrapper}>
        <View style={styles.wrapperWaterProduct}>
          <View style={styles.viewWaterItem}>
            {/*Name of the store */}
            <Text style={styles.productNameStyle}>
              {route.params?.storeName || "No Store name to display"}
            </Text>

            {/* Product template and its value  */}
            <View
              style={{
                // backgroundColor: "green",
                flexDirection: "row",
                alignItems: "flex-end",
              }}
            >
              <Text
                style={{
                  fontFamily: "nunito-semibold",
                  fontSize: 15,
                }}
              >
                Product Name Template
              </Text>
              <Text
                style={{
                  fontFamily: "nunito-semibold",
                  fontSize: 15,
                  textAlign: "right",
                  flex: 1,
                }}
              >
                Prodname value
              </Text>
            </View>
            {/*delivery type  template and its value */}
            <View
              style={{
                // backgroundColor: "red",
                flexDirection: "row",
                alignItems: "flex-end",
              }}
            >
              <Text
                style={{
                  fontFamily: "nunito-semibold",
                  fontSize: 15,
                  marginTop: 5,
                }}
              >
                Delivery Type Template
              </Text>
              <Text
                style={{
                  fontFamily: "nunito-semibold",
                  fontSize: 15,
                  textAlign: "right",
                  flex: 1,
                }}
              >
                Delivery value
              </Text>
            </View>
            {/*order  template and its value */}
            <View
              style={{
                //  backgroundColor: "coral",
                flexDirection: "row",
                alignItems: "flex-end",
              }}
            >
              <Text
                style={{
                  fontFamily: "nunito-semibold",
                  fontSize: 15,
                  marginTop: 5,
                }}
              >
                Order Type Template
              </Text>
              <Text
                style={{
                  fontFamily: "nunito-semibold",
                  fontSize: 15,
                  textAlign: "right",
                  flex: 1,
                }}
              >
                ordertype value
              </Text>
            </View>

            {/*reservation  template and its value */}
            <View
              style={{
                //  backgroundColor: "blue",
                flexDirection: "row",
                alignItems: "flex-end",
              }}
            >
              <Text
                style={{
                  fontFamily: "nunito-semibold",
                  fontSize: 15,
                  marginTop: 5,
                }}
              >
                Reservation Date
              </Text>
              <Text
                style={{
                  fontFamily: "nunito-semibold",
                  fontSize: 15,
                  textAlign: "right",
                  flex: 1,
                }}
              >
                ReserveDate value
              </Text>
            </View>
            {/*Borrow gallon types  template and its value */}
            <View
              style={{
                // backgroundColor: "red",
                flexDirection: "row",
                alignItems: "flex-end",
              }}
            >
              <Text
                style={{
                  fontFamily: "nunito-semibold",
                  fontSize: 15,
                  marginTop: 5,
                }}
              >
                Borrow Gallon Type
              </Text>
              <Text
                style={{
                  fontFamily: "nunito-semibold",
                  fontSize: 15,
                  textAlign: "right",
                  flex: 1,
                }}
              >
                BorrowgalVal
              </Text>
            </View>

            {/*product  template and its value */}
            <View
              style={{
                // backgroundColor: "brown",
                flexDirection: "row",
                alignItems: "flex-end",
              }}
            >
              <Text
                style={{
                  fontFamily: "nunito-semibold",
                  fontSize: 15,
                  marginTop: 5,
                }}
              >
                Product price
              </Text>
              <Text
                style={{
                  fontFamily: "nunito-semibold",
                  fontSize: 15,
                  textAlign: "right",
                  flex: 1,
                }}
              >
                value x qty
              </Text>
            </View>

            {/*status  template and its value */}
            <View
              style={{
                // backgroundColor: "brown",
                flexDirection: "row",
                alignItems: "flex-end",
              }}
            >
              <Text
                style={{
                  fontFamily: "nunito-semibold",
                  fontSize: 15,
                  marginTop: 5,
                }}
              >
                Status
              </Text>
              <Text
                style={{
                  fontFamily: "nunito-semibold",
                  fontSize: 15,
                  textAlign: "right",
                  flex: 1,
                }}
              >
                Status Value
              </Text>
            </View>

            <View
              style={{
                borderBottomWidth: 0.5,
                borderColor: "gray",
                marginTop: 10,
              }}
            ></View>
            <View
              style={{
                // backgroundColor: "brown",
                flexDirection: "row",
                alignItems: "flex-end",
              }}
            >
              <Text
                style={{
                  fontFamily: "nunito-semibold",
                  fontSize: 17,
                  marginTop: 6,
                }}
              >
                Total
              </Text>
              <Text
                style={{
                  fontFamily: "nunito-semibold",
                  fontSize: 15,
                  textAlign: "right",
                  flex: 1,
                }}
              >
                Total Value
              </Text>
            </View>

            <View
              style={{
                backgroundColor: "transparent",
                height: 50,
                flexDirection: "row",
                justifyContent:'flex-end',
              }}
            >
              <TouchableOpacity onPress={onPressHandlerShowModal}>
                <View
                  style={{
                   // backgroundColor: "red",
                    marginTop: 15,
                    height: 25,
                    borderRadius: 5,
                    padding: 4,
                    flexDirection: "row",
                    width: 30,
                    height:30,
                    justifyContent: "center",
                    marginLeft: 85,
                    marginRight: 5,
                   // elevation: 4,
                    alignItems:'center'
                  }}
                >
                  {/* <Text style={{ fontFamily: "nunito-semibold" }}>
                    Feedback
                  </Text> */}
                  <MaterialIcons name="feedback" size={24} color="black" />
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  Alert.alert("Confirmation", "Order received?", [
                    {
                      text: "Not yet",
                      onPress: () => {
                        console.log("not yet pressed!");
                      },
                    },
                    {
                      text: "Yes",
                      onPress: () => {
                        console.log("Yes pressed!");
                      },
                    },
                  ]);
                }}
              >
                <View
                  style={{
                  //  backgroundColor: "red",
                    marginTop: 15,
                    height: 25,
                    //borderRadius: 5,
                    padding: 4,
                    flexDirection: "row",
                    width: 30,
                    justifyContent: "center",
                    marginRight:1,
                   height:30,
                  }}
                >
                  {/* <Text style={{ fontFamily: "nunito-semibold" }}>
                    Received
                  </Text> */}
                  <MaterialIcons name="done" size={24} color="black" style={{marginBottom:-10}}/>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "lightcyan",
    // justifyContent:'center',
    //alignItems:'center'
  },
  viewBackBtn: {
    // backgroundColor: "coral",
    marginTop: 20,
    marginLeft: 10,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
  },
  productWrapper: {
    //backgroundColor: "yellowgreen",
    padding: 10,
    flex: 1,
    marginTop: 20,
  },
  viewwatername: {
    // backgroundColor: "red",
    width: 150,
    marginHorizontal: 120,
  },
  textwatername: {
    fontSize: 20,
    fontFamily: "nunito-bold",
    fontWeight: "bold",
  },
  wrapperWaterProduct: {
    // backgroundColor: "red",
    height: 300,
  },

  viewWaterItem: {
    backgroundColor: "white",
    padding: 3,

    width: "100%",
    height: 250,
    marginLeft: 0,
    borderRadius: 10,
    marginRight: 5,
    shadowColor: "black",
    shadowRadius: 5,
    shadowOffset: {
      height: 5,
      width: 5,
    },
    elevation: 7,
    // flexDirection:'row'
  },
  productNameStyle: {
    fontSize: 20,
    fontFamily: "nunito-semibold",
    marginLeft: 0,
  },
  FeedbackModal: {
    width: 300,
    height: 250,
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
  inputwrapper: {
    // backgroundColor: "green",
    paddingVertical: 5,
    marginTop: 10,
    height: 120,
  },
  reviewInputStyle: {
    flexDirection: "row",
    borderBottomColor: "black",
    borderBottomWidth: 1,
    paddingBottom: 2,
    marginBottom: 5,
    width: 270,
    marginTop: 10,
    marginLeft: 20,
  },
  ratingsInputStyle: {
    flexDirection: "row",
    borderBottomColor: "black",
    borderBottomWidth: 1,
    paddingBottom: 2,
    marginBottom: 5,
    width: 270,
    marginTop: 10,
    marginLeft: 20,
  },
});
