import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Platform,
} from "react-native";
import React, { useState, useEffect } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import CustomButton from "../../shared/customButton";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useRoute } from "@react-navigation/native";
export default function ProductDetailsAndPlaceOrder({ navigation }) {
  const route = useRoute();
  const { storeName, item } = route.params;
  // console.log('3rd Screen1--'+route.params.storeName+"test");
  console.log("3rd Screen2--" + route.params.item.watername);

  const [deliveryType, setDeliveryType] = useState([
    { label: "Standard", value: "standard", key: 12 },
    { label: "Reservation", value: "reservation", key: 23 },
    { label: "Express", value: "express", key: 33 },
  ]);

  const [ordertype, setorderType] = useState([
    { label: "Refill", value: "refill", key: 12 },
    { label: "New Order", value: "new_order", key: 23 },
  ]);

  const [swapGallonOption, setswapGallonOption] = useState([
    { label: "New Gallon", value: "newgallon", key: 12 },
    { label: "Old Gallon", value: "oldgallon", key: 23 },
    { label: "No Thanks", value: "nothanks", key: 34 },
  ]);
  // console.log("test");

  const [count, setCount] = useState(0);
  const [amount, setAmount] = useState("Amount");
  const handleIncrement = () => {
    setCount((value) => value + 1);
  };

  const handleDecrement = () => {
    if (count > 0) {
      setCount((value) => value - 1);
    }
  };

  const compute = () => {
    if (count > 0) {
      const waterprice = route.params.item.waterPrice;
      const total = waterprice * count;
      setAmount(total);
      // console.log(total);
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
    console.log(fdate);
  };
  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const [selectedOptionSwapGallon, setSelectedOptionSwapGallon] =
    useState(null);
  const [selectedOptionOrderType, setSelectedOptionOrderType] = useState(null);
  const [selectedOptionDeliveryType, setSelectedOptionDeliveryType] =
    useState(null);
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
              <Text style={styles.textwatername}>{route.params.storeName}</Text>

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
                      source={require("../../assets/plusIcon.png")}
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
                      source={require("../../assets/minus-math.png")}
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

              <View style={styles.ViewforDelivery}>
                <Text
                  style={{
                    fontSize: 17,
                    fontFamily: "nunito-semibold",
                    marginLeft: 10,
                  }}
                >
                  Order Type
                </Text>

                {deliveryType.map((item) => {
                  return (
                    <View
                      key={item.key}
                      style={{
                        
                        backgroundColor: "whitesmoke",
                        marginTop: 35,
                        height: 25,
                        borderRadius: 5,
                        padding: 4,
                        flexDirection: "row",
                        width: 90,
                        // alignItems:'flex-start',
                        justifyContent: "center",
                        marginLeft: -60,
                        marginRight: 70,
                        elevation: 2,
                      }}
                    >
                      <TouchableOpacity
                        activeOpacity={0.3}
                       
                        onPress={() => {
                          setSelectedOptionOrderType(item.value);

                          console.log(item.value);
                        }}
                      >
                        <Text
                          style={{
                            fontFamily: "nunito-light",
                            fontSize: 16,
                            flexDirection: "row",
                          }}
                        >
                          {item.label}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  );
                })}
              </View>

              <View style={styles.viewOrderType}>
                <Text
                  style={{
                    fontSize: 17,
                    fontFamily: "nunito-semibold",
                    marginLeft: 10,
                  }}
                >
                  Delivery Type
                </Text>

                {ordertype.map((item) => {
                  return (
                    <View
                    key={item.key}
                      style={{
                        backgroundColor: "whitesmoke",
                        marginTop: 35,
                        height: 25,
                        borderRadius: 5,
                        padding: 4,
                        flexDirection: "row",
                        width: 90,
                        // alignItems:'flex-start',
                        justifyContent: "center",
                        marginLeft: -75,
                        marginRight: 85,
                        elevation: 2,
                      }}
                    >
                      <TouchableOpacity
                        activeOpacity={0.3}
                        
                        onPress={() => {
                          setSelectedOptionDeliveryType(item.value);

                          console.log(item.value);
                        }}
                      >
                        <Text
                          style={{
                            fontFamily: "nunito-light",
                            fontSize: 16,
                            flexDirection: "row",
                          }}
                        >
                          {item.label}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  );
                })}
              </View>

              <View style={styles.viewOrderType}>
                <Text
                  style={{
                    fontSize: 17,
                    fontFamily: "nunito-semibold",
                    marginLeft: 10,
                  }}
                >
                  Swap Gallon
                </Text>

                {swapGallonOption.map((item) => {
                  return (
                    <View
                    key={item.key}
                      style={{
                        backgroundColor: "whitesmoke",
                        marginTop: 35,
                        height: 25,
                        borderRadius: 5,
                        padding: 4,
                        flexDirection: "row",
                        width: 90,
                        // alignItems:'flex-start',
                        justifyContent: "center",
                        marginLeft: -75,
                        marginRight: 85,
                        elevation: 2,
                      }}
                    >
                      <TouchableOpacity
                        activeOpacity={0.3}
                       
                        onPress={() => {
                          setSelectedOptionSwapGallon(item.value);
                          console.log(item.value);
                        }}
                      >
                        <Text
                          style={{
                            fontFamily: "nunito-light",
                            fontSize: 16,
                            flexDirection: "row",
                          }}
                        >
                          {item.label}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  );
                })}
              </View>

              <View style={styles.viewReservationdate}>
                <Text
                  style={{
                    fontSize: 17,
                    fontFamily: "nunito-semibold",
                    marginLeft: 10,
                  }}
                >
                  {text}
                </Text>
                <TouchableOpacity
                  activeOpacity={0.5}
                  onPress={() => showMode("date")}
                >
                  <MaterialIcons
                    name="date-range"
                    size={23}
                    color="black"
                    style={{ marginTop: -4, marginLeft: 10 }}
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
              <View style={styles.viewforCustomButton}>
                <CustomButton
                  text="Place order"
                  onPress={() =>{
                    navigation.navigate("OrderScreen", {
                      storeName: route.params.storeName,
                    })
                    console.log('3rd screen'+route.params.storeName);
                  } }
                />
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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
    marginTop: 80,
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
    marginLeft: 15,
  },
});
