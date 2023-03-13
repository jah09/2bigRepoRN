import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Platform,
  Alert,
} from "react-native";
import CheckBox from "expo-checkbox";
import React, { useState, useEffect } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import CustomButton from "../shared/customButton";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useRoute } from "@react-navigation/native";
import { globalStyles } from "../ForStyle/GlobalStyles";
import { db } from "../firebaseConfig";
import { ref, set, push, child } from "firebase/database";

export default function ProductDetailsAndPlaceOrder({ navigation }) {
  const route = useRoute();
  const { item, storeName } = route.params;
  //console.log("Ordere screen received--" +JSON.stringify(item)); mo test successfully
  const passedStoreName = storeName;
  //console.log('order screen store name received?--' ,passedStoreName); mo test successfully

  //for delivery type object with array--- and also checkbox on it-> codes start here
  const [isDisabled, setisDisabled] = useState(true);
  const [deliveryType, setDeliveryType] = useState([
    { label: "Standard", value: "standard", key: 12 },
    { label: "Reservation", value: "reservation", key: 23 },
    { label: "Express", value: "express", key: 33 },
  ]);
 // console.log("Before-- still running", deliveryType);
  const [checkedItemKey_deliveryType, setCheckedItemKey_deliveryType] =
    useState(null);

    const handleItemChecked_deliveryType = (item) => {
      setCheckedItemKey_deliveryType(
        item.key === checkedItemKey_deliveryType ? null : item.key
      );
      
      console.log("when checkbox is click---item key--:", item.key);
      console.log("when checkbox is click---checkedItemKey_deliveryType #", checkedItemKey_deliveryType);
    
      if (item.value === "standard" || item.value === "express" ) {
        setIsReservationChoiceChecked(true);
        setCheckedItemKey_deliveryType(item.key);
        console.log('test',checkedItemKey_deliveryType);
      } else {
        setIsReservationChoiceChecked(false);
      }
    
      setisDisabled(false);
    };
  //for delivery type object with array--- and also checkbox on it-> codes end here

  //for order type object with array--- and also checkbox on it-> codes start here
  const [ordertype, setorderType] = useState([
    { label: "Refill", value: "refill", key: 14 },
    { label: "New Order", value: "new order", key: 23 },
  ]);

  const [checkedItemKey_orderType, setCheckedItemKey_orderType] =
    useState(null);

  const handleItemChecked_orderType = (item) => {
    setCheckedItemKey_orderType(
      item.key === checkedItemKey_orderType ? null : item.key
    );

    setisDisabled(false);
  }; //for delivery type object with array--- and also checkbox on it-> codes end  here

  //for swapgallon type object with array--- and also checkbox on it-> codes start here
  const [swapGallonOption, setswapGallonOption] = useState([
    { label: "New Gallon", value: "new gallon", key: 19 },
    { label: "Old Gallon", value: "old gallon", key: 23 },
    { label: "No Thanks", value: "no thanks", key: 34 },
  ]);
  // const [showDatePicker, setShowDatePicker] = useState(false);
  const [checkedItemKey_swapGallon, setCheckedItemKey_swapGallon] =
    useState(null);
  const handleItemchecked_swapgallon = (item) => {
    setCheckedItemKey_swapGallon(
      item.key === checkedItemKey_swapGallon ? null : item.key
    );
    setisDisabled(false);
  }; //for delivery type object with array--- and also checkbox on it-> codes end here
  //
  // mao ni siya ang codes para echeck if naa ba data nga ge input si customer
  const handleSubmit = () => {
    if (checkedItemKey_deliveryType === null) {
      alert("Please choose a delivery type");
    } else if (checkedItemKey_orderType === null) {
      alert("Please choose a order Type");
    } else if (checkedItemKey_swapGallon === null) {
      alert("Please choose if you want to swap gallon or not");
    } else {
      // handle button press here
      createOrder(); //call this if all data is fill up
    }
  };

  //
  //for quantity counter codes
  const [count, setCount] = useState(0);
  const [amount, setAmount] = useState("Amount");
  const handleIncrement = () => {
    setCount((value) => value + 1); // every count, if mo click "+", it will increment by one
    setQuantity((value) => value + 1); //para mo reflect ang value sa count into "quantity variable"
  };

  const handleDecrement = () => {
    if (count > 0) {
      setCount((value) => value - 1);
      setQuantity((value) => value - 1);
    }
  };

  //function to compute the choosen quantity and the product price.
  const compute = () => {
    if (count > 0) {
      const waterprice = route.params.item.waterPrice;
      const total = waterprice * count;
      setAmount(total);
      setInitialAmount(total);
    } else {
      setAmount("Amount");
    }
  };
  useEffect(() => {
    compute();
  }, [count]);

  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [text, setText] = useState("Reservation Date");
  const [isReservationChoiceChecked, setIsReservationChoiceChecked] =
    useState(false);
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);

    let temporaryDate = new Date(currentDate);
    let fdate =
      temporaryDate.getDate() +
      "/" +
      (temporaryDate.getMonth() + 1) +
      "/" +
      temporaryDate.getFullYear();
    setText(fdate);
    setReservationDate(fdate);
    // alert("Order", "Order successfully.", "OK");
    //console.log("testdaw" + fdate);
  };
  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  //storing the fetch to a variable
  const [storename, setStorename] = useState(passedStoreName);
  const [waterproduct, setWaterproduct] = useState(route.params.item.watername);
  const [waterprice, setWaterprice] = useState(route.params.item.waterPrice);
  const [quantity, setQuantity] = useState(count);
  const [initialAmount, setInitialAmount] = useState(amount);
  const [deliveryTypeValue, setdeliveryTypeValue] = useState(deliveryType);
  const [orderTypeValue, setOrderTypeValue] = useState(ordertype);
  const [swapgallonTypeValue, setswapgallonTypeValue] =
    useState(swapGallonOption);
  const [orderStatus, setOrderStatus] = useState("Pending");
  const [reservationDate, setReservationDate] = useState("");
  const [customerID, setCustomerID] = useState("090730");
  //console.log(customerID);
  //function to insert the data to database
  function createOrder() {
    console.log("Creating order...");

    //  const newKey = push(child(ref(db), 'Orders')).key;
    const RandomId = Math.floor(Math.random() * 500) + 1;
    const newOrderRef = push(ref(db, "Orders"));

    //  const newOrderKey = newOrderRef.key;
    const newOrderKey = RandomId;
    set(ref(db, `Orders/${newOrderKey}`), {
      orderID: newOrderKey,
      order_StoreName: storename,
      order_WaterProduct: waterproduct,
      order_WaterPrice: waterprice,
      order_Quantity: quantity,
      order_InitialAmount: initialAmount,
      order_DeliveryTypeValue: deliveryTypeValue,
      order_OrderTypeValue: orderTypeValue,
      order_SwapGallonTypeValue: swapgallonTypeValue,
      order_OrderStatus: orderStatus,
      order_ReservationDate: reservationDate,
      order_CustomerID: customerID,
    })
      .then(async () => {
        // console.log('Test if Save to db-----'+reservationDate );
        console.log(newOrderKey);
        alert("Order successfully", "OK");
        //reset input fields
        setCheckedItemKey_deliveryType(null);
        setCheckedItemKey_orderType(null);
        setCheckedItemKey_swapGallon(null);
        setAmount("Amount");
        setCount(0);
      })
      .catch((error) => {
        console.log("Error Saving to Database", error);
        alert("Error", JSON.stringify(error), "OK");
      });
  }

  //disable reservation date view/icon if customer will select express or standard

  return (
    <SafeAreaView style={styles.safeviewStyle}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.container}>
          <View style={styles.viewBackBtn}>
            <MaterialIcons
              name="arrow-back-ios"
              size={24}
              color="black"
              onPress={() => navigation.goBack()}
            />
            <View style={styles.viewwatername}>
              <Text style={styles.textwatername}>{passedStoreName}</Text>

              <View
                style={{ justifyContent: "flex-end", right: -80, width: 30 }}
              >
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("OrderScreen");
                    //console.log('3rd screen test--'+ route.params.storeName)
                  }}
                >
                  <FontAwesome name="shopping-cart" size={22} color="black" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={styles.productDetailswrapper}>
            <View style={styles.wrapperWaterProduct}>
              <Text style={styles.waterProdStyle}>Product Details </Text>
              <View style={styles.viewWaterItem}>
                <Image
                  style={styles.waterImageStyle}
                  source={item.waterImage}
                />

                <Text
                  style={{
                    fontSize: 21,
                    fontFamily: "nunito-reg",
                    marginTop: 5,
                    marginLeft: 5,
                  }}
                >
                  {item.watername}
                </Text>
                <Text
                  style={{
                    fontSize: 17,
                    fontFamily: "nunito-reg",
                    marginLeft: 5,
                  }}
                >
                  ₱{item.waterPrice.toFixed(2)}
                </Text>
                <View
                  style={{
                    width: 50,
                    justifyContent: "center",
                    alignItems: "center",
                    marginLeft: 140,
                    marginTop: 10,
                    padding: 1,
                  }}
                >
                  <Text style={{ fontFamily: "nunito-semibold", fontSize: 20 }}>
                    x {count}
                  </Text>
                </View>

                <View
                  style={{
                    flexDirection: "row-reverse",
                    marginVertical: -70,
                    right: 5,
                    // backgroundColor:'green',
                  }}
                >
                  {/* <MaterialCommunityIcons name="plus" size={24} color="black" /> */}
                  <TouchableOpacity onPress={handleIncrement}>
                    <Image
                      source={require("../assets/plusIcon.png")}
                      style={{ width: 20, height: 20 }}
                    />
                  </TouchableOpacity>
                </View>

                <View
                  style={{
                    flexDirection: "row-reverse",
                    marginVertical: 80,
                    right: 5,
                    // backgroundColor:'coral',
                  }}
                >
                  <TouchableOpacity onPress={handleDecrement}>
                    <Image
                      source={require("../assets/minus-math.png")}
                      style={{ width: 20, height: 20 }}
                    />
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.viewforOrder}>
                <View>
                  <Text
                    style={{
                      fontFamily: "nunito-semibold",
                      fontSize: 20,
                      marginLeft: 75,
                    }}
                  >
                    Place your order below.
                  </Text>
                </View>
              </View>
              <View style={styles.viewQuantity}>
                <Text
                  style={{
                    fontSize: 17,
                    fontFamily: "nunito-semibold",
                    marginLeft: 10,
                  }}
                >
                  {amount}
                </Text>
              </View>

              {/*delivery type */}
              <View style={styles.ViewforDelivery}>
                <Text
                  style={{
                    fontSize: 17,
                    fontFamily: "nunito-semibold",
                    marginLeft: 5,
                  }}
                >
                  Delivery Type
                </Text>
                {deliveryType &&
                  deliveryType.map((item) => {
                    const isChecked = item.key === checkedItemKey_deliveryType;
                    return (
                      <View
                        key={item.key}
                        style={{
                          //backgroundColor: "red",
                          marginTop: 35,
                          height: 25,
                          borderRadius: 5,
                          padding: 0,
                          flexDirection: "row",
                          width: 100,

                          justifyContent: "center",
                          marginLeft: -75,
                          marginRight: 80,
                          // elevation: 2,
                          alignItems: "center",
                        }}
                      >
                        <TouchableOpacity
                          onPress={() => {
                            handleItemChecked_deliveryType(item);

                            setdeliveryTypeValue(item.value);
                            setCheckedItemKey_deliveryType(item.key);
                            console.log(
                              "if unsa ang ge click nga value--",
                              item.value
                            );
                            console.log(
                              "if unsa ang geclick nga key--",
                              item.key
                            );
                          }}
                        >
                          <View style={styles.checkbox}>
                            {isChecked && (
                              <MaterialIcons
                                name="done"
                                size={15}
                                color="black"
                                styles={{ alignItems: "center" }}
                              />
                            )}
                          </View>
                        </TouchableOpacity>
                        <Text
                          style={{
                            fontFamily: "nunito-light",
                            fontSize: 16,
                            flexDirection: "row",
                          }}
                        >
                          {item.label}
                        </Text>
                      </View>
                    );
                  })}
              </View>

              {/* order type */}
              <View style={styles.viewOrderType}>
                <Text
                  style={{
                    fontSize: 17,
                    fontFamily: "nunito-semibold",
                    marginLeft: 5,
                  }}
                >
                  Order Type
                </Text>
                {ordertype &&
                  ordertype.map((item) => {
                    const isChecked = item.key === checkedItemKey_orderType;
                    return (
                      <View
                        key={item.key}
                        style={{
                          //   backgroundColor: "red",
                          marginTop: 35,
                          height: 25,
                          borderRadius: 5,
                          padding: 0,
                          flexDirection: "row",
                          width: 100,

                          justifyContent: "center",
                          marginLeft: -70,
                          marginRight: 80,
                          // elevation: 2,
                          alignItems: "center",
                        }}
                      >
                        <TouchableOpacity
                          onPress={() => {
                            handleItemChecked_orderType(item);
                            setOrderTypeValue(item.value);
                            //   console.log(item.value);
                          }}
                        >
                          <View style={styles.checkbox}>
                            {isChecked && (
                              <MaterialIcons
                                name="done"
                                size={15}
                                color="black"
                                styles={{ alignItems: "center" }}
                              />
                            )}
                          </View>
                        </TouchableOpacity>
                        <Text
                          style={{
                            fontFamily: "nunito-light",
                            fontSize: 16,
                            flexDirection: "row",
                          }}
                        >
                          {item.label}
                        </Text>
                      </View>
                    );
                  })}
              </View>

              {/*swap gallon*/}

              <View style={styles.viewforSwapGallong}>
                <Text
                  style={{
                    fontSize: 17,
                    fontFamily: "nunito-semibold",
                    marginLeft: 5,
                  }}
                >
                  Swap Gallon
                </Text>
                {swapGallonOption &&
                  swapGallonOption.map((item) => {
                    const isChecked = item.key === checkedItemKey_swapGallon;
                    return (
                      <View
                        key={item.key}
                        style={{
                          //   backgroundColor: "red",
                          marginTop: 35,
                          height: 25,
                          borderRadius: 5,
                          padding: 0,
                          flexDirection: "row",
                          width: 100,

                          justifyContent: "center",
                          marginLeft: -57,
                          marginRight: 60,
                          // elevation: 2,
                          alignItems: "center",
                        }}
                      >
                        <TouchableOpacity
                          onPress={() => {
                            handleItemchecked_swapgallon(item);
                            setswapgallonTypeValue(item.value);
                            // console.log(item.value);
                          }}
                        >
                          <View style={styles.checkbox}>
                            {isChecked && (
                              <MaterialIcons
                                name="done"
                                size={15}
                                color="black"
                                styles={{ alignItems: "center" }}
                              />
                            )}
                          </View>
                        </TouchableOpacity>
                        <Text
                          style={{
                            fontFamily: "nunito-light",
                            fontSize: 16,
                            flexDirection: "row",
                          }}
                        >
                          {item.label}
                        </Text>
                      </View>
                    );
                  })}
              </View>

              <View style={styles.viewReservationdate}>
                <Text
                  style={{
                    fontSize: 17,
                    fontFamily: "nunito-semibold",
                    marginLeft: 2,
                  }}
                >
                  {text}
                </Text>
                <TouchableOpacity
                  activeOpacity={0.5}
                  onPress={() => {
                    console.log(
                      "deliveryType[checkedItemKey_deliveryType]:---------",
                      checkedItemKey_deliveryType
                    );

                    try {
                      if (
                        checkedItemKey_deliveryType !== null &&
                        deliveryType &&
                        deliveryType[checkedItemKey_deliveryType] &&
                        deliveryType[checkedItemKey_deliveryType].value ===
                          "reservation"
                      ) {
                        showMode("date");
                      }
                      else {
                        console.log("deliveryType[checkedItemKey_deliveryType] is not defined");
                      }
                    } catch (error) {
                      console.log("the error says", error);
                    }
                  }}
                  disabled={
                    checkedItemKey_deliveryType === null ||
                    !deliveryType ||
                    !deliveryType[checkedItemKey_deliveryType] ||
                    deliveryType[checkedItemKey_deliveryType]?.value !== "reservation"
                  }
                >
                  <MaterialIcons
                    name="date-range"
                    size={23}
                    color={
                      checkedItemKey_deliveryType !== null &&
                      deliveryType[checkedItemKey_deliveryType]?.value !==
                        "reservation"
                        ? "gray"
                        : "black"
                    }
                    style={{ marginTop: -4, marginLeft: 10 }}
                    onPress={() => {
                      console.log(
                        " when Date icon is click---checkedItemKey_deliveryType:",
                        checkedItemKey_deliveryType
                      );
                      console.log(
                        "when Date icon is click---deliveryType[checkedItemKey_deliveryType]:",
                        deliveryType[checkedItemKey_deliveryType]
                      );
                      console.log(
                        "when Date icon is click---deliveryType[checkedItemKey_deliveryType].value:",
                        deliveryType[checkedItemKey_deliveryType]?.value
                      );
                      console.log("when Date icon is click---when Icon date is pressed", deliveryType);
                      console.log(isReservationChoiceChecked);
                      if (
                        checkedItemKey_deliveryType !== null &&
                        deliveryType[checkedItemKey_deliveryType] &&
                        deliveryType[checkedItemKey_deliveryType]?.value ===
                          "reservation"
                      ) {
                        showMode("date");
                      }
                    }}
                  />
                </TouchableOpacity>
              </View>

              {show && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={date}
                  mode={mode}
                  is24Hour={true}
                  display="default"
                  onChange={onChange}
                />
              )}
              <View style={styles.viewTotalAmount}>
                <Text
                  style={{
                    fontSize: 17,
                    fontFamily: "nunito-semibold",
                    marginLeft: 10,
                  }}
                >
                  Total Amount
                </Text>
              </View>
              <View
                style={{
                  // backgroundColor: "red",
                  padding: 10,
                  marginTop: 40,
                  height: 50,
                }}
              >
                <View
                  style={{
                    backgroundColor: "transparent",
                    marginTop: 20,
                    height: 50,
                  }}
                >
                  <TouchableOpacity
                    // onPress={() => {
                    //  // navigation.navigate("OrderScreen");
                    //  create
                    // }}
                    onPress={handleSubmit}
                    disabled={isDisabled}
                    // disabled={!ifChecked}
                  >
                    <View
                      style={{
                        borderRadius: 10,
                        paddingVertical: 10,
                        paddingHorizontal: 10,
                        backgroundColor: isDisabled ? "gray" : "#87cefa",
                        marginTop: -30,
                        width: 200,
                        left: 70,
                        height: 40,
                      }}
                    >
                      <Text
                        style={[
                          globalStyles.buttonText,
                          { marginTop: 0, left: -8 },
                        ]}
                      >
                        Place Order
                      </Text>
                      <MaterialIcons
                        name="login"
                        size={24}
                        color="black"
                        style={[globalStyles.loginIcon, { marginLeft: -80 }]}
                      />
                    </View>
                  </TouchableOpacity>
                </View>
              </View>

              {/* custom button */}
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  checkbox: {
    width: 18,
    height: 18,
    borderWidth: 1,
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 0,
    marginRight: 5,
    // backgroundColor:'blue'
  },
  checkboxMark: {
    width: 10,
    height: 10,
    borderRadius: 2,
    backgroundColor: "black",
  },
  container: {
    flex: 1,
    backgroundColor: "lightcyan",
    flexWrap: "wrap",
  },
  viewBackBtn: {
    //backgroundColor: "coral",
    marginTop: 20,
    marginLeft: 10,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
  },
  productDetailswrapper: {
    //backgroundColor: "red",
    padding: 10,
    //flex: 1,
    marginTop: 15,
    height: 900,
  },
  viewwatername: {
    //backgroundColor:'red',
    width: 150,
    marginHorizontal: 90,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  textwatername: {
    fontSize: 20,
    fontFamily: "nunito-bold",
    fontWeight: "bold",
  },
  wrapperWaterProduct: {
    // backgroundColor: "whitesmoke",
    height: 650,
  },
  waterProdStyle: {
    fontFamily: "nunito-semibold",
    fontSize: 20,
    marginLeft: 6,
  },
  viewWaterItem: {
    backgroundColor: "white",
    padding: 3,
    marginTop: 10,
    width: 332,
    height: 310,
    marginLeft: 5,
    borderRadius: 10,
    marginRight: 5,
    shadowColor: "black",
    shadowRadius: 5,
    shadowOffset: {
      height: 5,
      width: 5,
    },
    elevation: 7,
  },
  waterImageStyle: {
    width: 323,
    height: 223,
    resizeMode: "cover",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    marginLeft: 1,
  },
  itemWrapper: {
    backgroundColor: "yellow",
    flexDirection: "row",
  },

  viewforOrder: {
    padding: 15,
    //backgroundColor:'coral',
    marginTop: 10,
  },

  viewQuantity: {
    backgroundColor: "white",
    width: 120,
    height: 30,
    padding: 6,
    borderRadius: 8,
    // borderColor: "black",
    // borderWidth: 1,
    marginTop: 10,
    elevation: 3,
    justifyContent: "center",
    // alignItems:'center'
  },
  ViewforDelivery: {
    backgroundColor: "white",
    width: 120,
    height: 30,
    padding: 6,
    borderRadius: 8,
    marginTop: 10,
    elevation: 3,
    flexDirection: "row",
    //marginRight:5,
    //justifyContent:'space-between',
  },
  viewOrderType: {
    backgroundColor: "white",
    width: 120,
    height: 30,
    padding: 6,
    borderRadius: 8,
    marginTop: 50,
    elevation: 3,
    flexDirection: "row",
  },
  viewforSwapGallong: {
    backgroundColor: "white",
    width: 120,
    height: 30,
    padding: 6,
    borderRadius: 8,
    marginTop: 50,
    elevation: 3,
    flexDirection: "row",
    //flex:1
  },
  safeviewStyle: {
    flex: 1,
  },
  viewReservationdate: {
    backgroundColor: "white",
    width: 170,
    height: 30,
    padding: 6,
    borderRadius: 8,
    marginTop: 55,
    elevation: 3,
    flexDirection: "row",
    justifyContent: "center",
  },
  viewforCustomButton: {
    backgroundColor: "blue",
    marginLeft: 15,
    top: 70,
    width: 100,
  },
  ViewCheckbox: {
    flexDirection: "row",
    alignItems: "center",
    //backgroundColor: "red",
  },
  checkboxContainer: {
    backgroundColor: "red",
    borderWidth: 0,
    padding: 0,
    marginRight: 50,
  },
  checkboxText: {
    marginRight: 50,
  },
  viewTotalAmount: {
    backgroundColor: "white",
    width: 120,
    height: 30,
    padding: 6,
    borderRadius: 8,
    // borderColor: "black",
    // borderWidth: 1,
    marginTop: 15,
    elevation: 3,
    justifyContent: "center",
  },
});
