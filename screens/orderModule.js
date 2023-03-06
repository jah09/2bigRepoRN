import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  TextInput,
} from "react-native";
import React, { useState, useEffect } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import CustomBtn from "../shared/customButton";
import { globalStyles } from "../ForStyle/GlobalStyles";
import { ref, onValue, push, set } from "firebase/database";
import { db } from "../firebaseConfig";

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

  //Initialization of the variable using the useState hook
  //for fetching the ORDER details
  const [orderProductType, setOrderProductType] = useState("");
  const [orderType, setOrderType] = useState("");
  const [orderFrom_store, setStorename] = useState("");
  const [orderPrice, setOrderPrice] = useState("");
  const [orderQuantity, setQuantity] = useState("");
  const [orderDeliveryType, setDeliveryType] = useState("");
  const [order_CUSTOMERID, setCustomerId] = useState("");
  const [orderTotalAmount, setTotalAmount] = useState("");
  const [orderDateTime, setOrdertime] = useState("");
  const [OrderStatus, setOrderStatus] = useState("");
  const [OrderReservationDate, setReservationDate] = useState("");
  const [orderID, setOrderId] = useState("");

  useEffect(() => {
    onValue(
      ref(db, "/ORDER"),
      (querySnapShot) => {
        let orders = querySnapShot.val();
        if (orders) {
          for (const orderID in orders) {
            const order = orders[orderID];
            if (order.orderID === orderID) {
              setOrderProductType(order.OrderProductType);
              setOrderType(order.orderType);
              setStorename(order.orderFrom_store);
              setOrderPrice(order.orderPrice);
              setQuantity(order.orderQuantity);
              setDeliveryType(order.orderDeliveryType);
              setCustomerId(order.order_CUSTOMERID);
              setTotalAmount(order.orderTotalAmount);
              setOrdertime(order.orderDateTime);
              setOrderStatus(order.OrderStatus);
              setReservationDate(order.OrderReservationDate);
              setOrderId(order.orderID);
              console.log("Order data", order);
              break;
            }
          }
        } else {
          console.log("No data found");
        }
      },
      (error) => {
        console.log(error.message);
      }
    );
  }, []);

  //function for received order
  function received() {
    //saving data to a defined path/table
    set(ref(db, "ADMINNOTIFICATION"), {
      OrderStatus: "order received",
    }).then(() => {
      //Customer data saved successfully
      alert("Thank you for ordering!");
      console.log("successfully registered!");
    });
    // .catch((error) => {
    // .catch(() => {
    //   // Error saving data
    //   alert("Error submitting data!");
    // });
  }

  //Initialization of the variable using the useState hook
  //for creating a new entry in the REVIEWS_RATINGS tbl
  //database every time a new review is submitted
  const [review, setReview] = useState("");
  const [rating, setRating] = useState("");

  //function for received order
  function sendReviews() {
    const reviews = review;
    const ratings = rating;
    const reviewRef = ref(db, "REVIEWS_RATINGS");
    push(reviewRef, { reviews, ratings });
    setShowModal(false);

    //Reviews saved successfully
    alert("Thank you for your ratings and feedback!");
    console.log("successfully registered!");
  }

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
                  value={review}
                  onChangeText={(value) => setReview(value)}
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
                  value={rating}
                  onChangeText={(value) => setRating(value)}
                />
              </View>
              {/*for custom Submit button */}
              <View style={styles.reviewsBtnStyle}>
                <CustomBtn onPress={sendReviews} text="Submit" />
              </View>
            </View>
          </View>
        </View>
      </Modal>
      <View style={styles.viewBackBtn}>
        <View style={styles.viewwatername}>
          <Text style={styles.textwatername}>Order Details</Text>
        </View>
      </View>
      <View style={styles.productWrapper}>
        <View style={styles.wrapperWaterProduct}>
          <View style={styles.viewWaterItem}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "flex-end",
                marginTop: 10,
              }}
            >
              <Text
                style={{
                  fontFamily: "nunito-bold",
                  fontSize: 15,
                }}
              >
                Store Name:
              </Text>
              <Text
                style={{
                  fontFamily: "nunito-semibold",
                  fontSize: 15,
                  textAlign: "right",
                  flex: 1,
                }}
              >
                {orderFrom_store}
              </Text>
            </View>
            {/* border line  */}
            <View
              style={{
                borderBottomWidth: 0.5,
                borderColor: "gray",
                marginTop: 10,
              }}
            ></View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "flex-end",
              }}
            >
              <Text
                style={{
                  fontFamily: "nunito-bold",
                  fontSize: 15,
                  marginTop: 5,
                }}
              >
                Order ID:
              </Text>
              <Text
                style={{
                  fontFamily: "nunito-semibold",
                  fontSize: 15,
                  textAlign: "right",
                  flex: 1,
                }}
              >
                {orderID}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "flex-end",
              }}
            >
              <Text
                style={{
                  fontFamily: "nunito-bold",
                  fontSize: 15,
                  marginTop: 5,
                }}
              >
                Customer ID:
              </Text>
              <Text
                style={{
                  fontFamily: "nunito-semibold",
                  fontSize: 15,
                  textAlign: "right",
                  flex: 1,
                }}
              >
                {order_CUSTOMERID}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "flex-end",
              }}
            >
              <Text
                style={{
                  fontFamily: "nunito-bold",
                  fontSize: 15,
                  marginTop: 5,
                }}
              >
                Product Name:
              </Text>
              <Text
                style={{
                  fontFamily: "nunito-semibold",
                  fontSize: 15,
                  textAlign: "right",
                  flex: 1,
                }}
              >
                {orderProductType}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "flex-end",
              }}
            >
              <Text
                style={{
                  fontFamily: "nunito-bold",
                  fontSize: 15,
                  marginTop: 5,
                }}
              >
                Order Type:
              </Text>
              <Text
                style={{
                  fontFamily: "nunito-semibold",
                  fontSize: 15,
                  textAlign: "right",
                  flex: 1,
                }}
              >
                {orderType}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "flex-end",
              }}
            >
              <Text
                style={{
                  fontFamily: "nunito-bold",
                  fontSize: 15,
                  marginTop: 5,
                }}
              >
                Price:
              </Text>
              <Text
                style={{
                  fontFamily: "nunito-semibold",
                  fontSize: 15,
                  textAlign: "right",
                  flex: 1,
                }}
              >
                {orderPrice}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "flex-end",
              }}
            >
              <Text
                style={{
                  fontFamily: "nunito-bold",
                  fontSize: 15,
                  marginTop: 5,
                }}
              >
                Quantity:
              </Text>
              <Text
                style={{
                  fontFamily: "nunito-semibold",
                  fontSize: 15,
                  textAlign: "right",
                  flex: 1,
                }}
              >
                {orderQuantity}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "flex-end",
              }}
            >
              <Text
                style={{
                  fontFamily: "nunito-bold",
                  fontSize: 15,
                  marginTop: 5,
                }}
              >
                Delivery Type:
              </Text>
              <Text
                style={{
                  fontFamily: "nunito-semibold",
                  fontSize: 15,
                  textAlign: "right",
                  flex: 1,
                }}
              >
                {orderDeliveryType}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "flex-end",
              }}
            >
              <Text
                style={{
                  fontFamily: "nunito-bold",
                  fontSize: 15,
                  marginTop: 5,
                }}
              >
                Date of Order:
              </Text>
              <Text
                style={{
                  fontFamily: "nunito-semibold",
                  fontSize: 15,
                  textAlign: "right",
                  flex: 1,
                }}
              >
                {orderDateTime}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "flex-end",
              }}
            >
              <Text
                style={{
                  fontFamily: "nunito-bold",
                  fontSize: 15,
                  marginTop: 5,
                }}
              >
                Order Status:
              </Text>
              <Text
                style={{
                  fontFamily: "nunito-semibold",
                  fontSize: 15,
                  textAlign: "right",
                  flex: 1,
                }}
              >
                {OrderStatus}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "flex-end",
              }}
            >
              <Text
                style={{
                  fontFamily: "nunito-bold",
                  fontSize: 15,
                  marginTop: 5,
                }}
              >
                Reservation Date:
              </Text>
              <Text
                style={{
                  fontFamily: "nunito-semibold",
                  fontSize: 15,
                  textAlign: "right",
                  flex: 1,
                }}
              >
                {OrderReservationDate}
              </Text>
            </View>
            {/* border line  */}
            <View
              style={{
                borderBottomWidth: 0.5,
                borderColor: "gray",
                marginTop: 10,
              }}
            ></View>
            <View
              style={{
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
                {orderTotalAmount}
              </Text>
            </View>
            {/* Button for submitting the received order */}
            <View style={styles.customBtnStyle}>
              <CustomBtn onPress={received} text="Order Received" />
            </View>

            <View
              style={{
                backgroundColor: "transparent",
                height: 50,
                flexDirection: "row",
                justifyContent: "flex-end",
              }}
            >
              <TouchableOpacity onPress={onPressHandlerShowModal}>
                <View
                  style={{
                    marginTop: 15,
                    justifyContent: "center",
                    marginRight: 150,
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <MaterialIcons name="feedback" size={34} color="black" />
                  <Text style={{ marginLeft: 10 }}>Give Rate and Reviews</Text>
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
    marginTop: 10,
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
    marginTop: 25,
  },
  wrapperWaterProduct: {
    // backgroundColor: "red",
    height: 300,
  },
  // customBtnStyle: {
  //   marginTop: -3,
  // },
  viewWaterItem: {
    backgroundColor: "white",
    padding: 3,
    width: "100%",
    height: 400,
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
    height: 300,
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
    height: 400,
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
    //marginBottom: 5,
    width: 270,
    marginTop: 30,
    marginLeft: 20,
  },
  reviewsBtnStyle: {
    marginBottom: 20,
  },
});
