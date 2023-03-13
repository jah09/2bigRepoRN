import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
export default function ProductComponent() {
  const route = useRoute();
 // const { storeName } = route.params.storeName;
//  console.log("receving-2nd--" + route.params.storeName);
  //console.log(storeName);

  //pag received the object from previous screen
  const {item}=route.params;
//  console.log(JSON.stringify(item));
  const passedStoreName=item.StoreName; // ge store sa variable ang previous passed object from station screen
 
//  console.log("2nd Screen Test-- Received--"+item.StoreName);  //pag test if successfully passed ba ang OBJECT.
  const navigation = useNavigation();
  const onPresshandler_toStationPage = () => {
    navigation.goBack();
  };
  const onPressHandler_toProducDetails = () => {
    navigation.navigate("ProductDetailsAndOrder");
  };

  const [waterProduct, setWaterProduct] = useState([
    {
      key: 1,
      watername: "Alkaline",
      waterPrice: 30.0,
      waterImage: require("../assets/alkalineWater.jpg"),
    },
    {
      key: 2,
      watername: "Mineral",
      waterPrice: 20.0,
      waterImage: require("../assets/mineralWater.jpg"),
    },

    {
      key: 3,
      watername: "Tubig Kanal",
      waterPrice: 10.0,
      waterImage: require("../assets/Vitae.png"),
    },
  ]);

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.viewBackBtn}>
          <MaterialIcons
            name="arrow-back-ios"
            size={24}
            color="black"
            onPress={onPresshandler_toStationPage}
          />
          <View style={styles.viewwatername}>
            <Text style={styles.textwatername}>{passedStoreName}</Text>
          </View>
        </View>
        <View style={styles.productWrapper}>
          <View style={{padding:5,backgroundColor:'whitesmoke',borderRadius:10,elevation:4,paddingHorizontal:10,marginBottom:25}}>
            <Text style={{fontSize:16,fontFamily:'nunito-semibold'}}>
              {"To our beloved customer!\nWe don't accept refill for today's transaction. "}

            </Text>
          </View>
          <View style={styles.wrapperWaterProduct}>
            <Text style={styles.waterProdStyle}>Water Product</Text>

            <FlatList
              horizontal={true}
              contentContainerStyle={{
                flexDirection: "row",
                alignItems: "center",
              }}
              showsHorizontalScrollIndicator={false}
              data={waterProduct}
              renderItem={({ item }) => (
                <TouchableOpacity
                  activeOpacity={0.5}
                  onPress={() => {
                    navigation.navigate("ProductDetailsAndOrders", {  item, storeName:passedStoreName });
                    // console.log('Sending Product screen', passedStoreName);
                  
                  
                  }}
                >
                  {/* ProductDetailsAndOrder*/}
                  <View style={styles.viewWaterItem}>
                    <Image
                      source={item.waterImage}
                      style={styles.waterImageStyle}
                    />
                    <Text style={{ fontSize: 21, fontFamily: "nunito-reg" }}>
                      {item.watername}
                    </Text>
                    <Text style={{ fontSize: 18, fontFamily: "nunito-reg" }}>
                      ₱{item.waterPrice.toFixed(2)}
                    </Text>
                  </View>
                </TouchableOpacity>
              )}
            />
          </View>

          
          <View style={styles.otherProductStyle}>
            <Text style={styles.otherProductLabelStyle}>
              Other Product Goes here
            </Text>
            <View style={styles.otherProductcontainer}>
              <Text style={{justifyContent:'center', alignItems:'center',textAlign:'center',fontWeight:'500'}}>
                Other Product goes here. Template only!
              </Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
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
   // backgroundColor: "yellowgreen",
    padding: 10,
    flex: 1,
    marginTop: 20,
  },
  viewwatername: {
    // backgroundColor: "red",
    width: 150,
    marginHorizontal: 100,
  },
  textwatername: {
    fontSize: 20,
    fontFamily: "nunito-bold",
    fontWeight: "bold",
  },
  wrapperWaterProduct: {
    //backgroundColor: "red",
    height: 300,
  },
  waterProdStyle: {
    fontFamily: "nunito-semibold",
    fontSize: 20,
    marginLeft: 6,
  },
  viewWaterItem: {
    backgroundColor: "white",
    padding: 3,

    width: 220,
    height: 250,
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
    width: 212,
    height: 180,
    resizeMode: "cover",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    marginLeft: 1,
  },
  itemWrapper: {
    backgroundColor: "yellow",
    flexDirection: "row",
  },
  otherProductStyle: {
   // backgroundColor: "coral",
    marginTop: 10,
    padding: 10,
  },
  otherProductLabelStyle: {
    fontFamily: "nunito-semibold",
    fontSize: 20,
    marginLeft: -5,
  },
  otherProductView: {
    //backgroundColor: "red",
    height: 300,
  },
  otherProductcontainer: {
    backgroundColor: "white",
    padding: 3,
    marginTop: 15,
    width: 220,
    height: 250,
    marginLeft: -5,
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
});
