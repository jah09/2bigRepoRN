import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  StatusBar,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
export default function StationModule() {
  const [storeInfo, setstoreInfo] = useState([
    {
      id: 1,
      storeName: "Rhea Station",
      storeStatus: "Open",

      storeDistance: "4km",
      storePhoto: require("../assets/storeNoBG.png"),
    },
    {
      id: 2,
      storeName: "Dici Station",
      storeStatus: "Close",
      storeDistance: "24m",
      storePhoto: require("../assets/storeNoBG.png"),
    },
    {
      id: 3,
      storeName: "Rona Station",
      storeStatus: "Open",
      storeDistance: "20m",
      storePhoto: require("../assets/storeNoBG.png"),
    },
    {
      id: 4,
      storeName: "Aimee Station",
      storeStatus: "Close",
      storeDistance: "2km",
      storePhoto: require("../assets/storeNoBG.png"),
    },
    {
      id: 5,
      storeName: "Ja Station",
      storeStatus: "Open",
      storeDistance: "3m",
      storePhoto: require("../assets/storeNoBG.png"),
    },
    {
      id: 6,
      storeName: "Pet Station",
      storeStatus: "Cose",
      storeDistance: "100m",
      storePhoto: require("../assets/storeNoBG.png"),
    },
  ]);
  const styleTypes = ["default", "dark-content", "light-content"];
  const [visibleStatusBar, setvisibleStatusbar] = useState(false);
  const [styleStatusBar, setstyleStatusBar] = useState(styleTypes[0]);

  const [isPressed, setIsPressed] = useState(false);

  const navigation = useNavigation();
  // const onPressHandler_toProductPage = () => {
  //   navigation.navigate("Products");
  // };

  return (
    <View style={styles.container}>
      <FlatList
        keyExtractor={(item) => item.id}
        data={storeInfo}
        renderItem={({ item }) => (
          <View style={styles.container}>
            <View style={styles.storeWrapper}>
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => {
                  console.log("sending--1st screen-" + item.storeName);
                  navigation.navigate("Products", {
                    storeName: item.storeName,
                  });
                }}
              >
                <View style={styles.item}>
                  <View style={styles.itemLeft}>
                    <View style={styles.square}>
                      <Image
                        source={item.storePhoto}
                        style={styles.storePhotoStyle}
                      />
                    </View>
                    <View>
                      <Text style={styles.storeNameStyles}>
                        {item.storeName}
                      </Text>
                      <Text style={styles.storeStatusStyles}>
                        {item.storeStatus}
                      </Text>
                      <Text style={styles.storeStatusStyles}>
                        {item.storeDistance}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.circular}></View>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        )}
        ListHeaderComponent={
          <View style={styles.storeWrapper}>
            <Text style={styles.sectionTitle}>Nearby me</Text>
            <StatusBar
              backgroundColor="black"
              styleStatusBar={styleStatusBar}
            />
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "lightcyan",
  },
  storeWrapper: {
    //paddingTop: 80,
    paddingHorizontal: 15,
    //backgroundColor: 'green',
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 20,
  },
  items: {
    marginTop: 15,
    // backgroundColor: 'red',
  },

  writeTaskWrapper: {
    position: "absolute",
    bottom: 60,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },

  //from storeinfo.js
  item: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
    elevation: 4,
  },
  itemLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  viewforStoreInfos: {
    flexDirection: "column",
    alignItems: "center",
  },
  square: {
    width: 50,
    height: 55,
    backgroundColor: "#55BCF6",
    // opacity: 0.4,
    borderRadius: 15,
    marginRight: 15,
  },
  itemText: {
    maxWidth: "80%",
  },
  circular: {
    width: 12,
    height: 12,
    borderColor: "#55BCF6",
    borderWidth: 2,
    borderRadius: 5,
  },

  itemShaun: {
    padding: 15,
    marginTop: 16,
    borderColor: "#bbb",
    borderWidth: 1,
    borderStyle: "dashed",
    borderRadius: 10,
  },
  contentShaun: {
    padding: 40,
  },
  listShaun: {
    marginTop: 20,
  },
  storePhotoStyle: {
    width: 50,
    height: 50,
  },
  storeNameStyles: {
    fontSize: 20,
    fontFamily: "nunito-bold",
  },
  storeStatusStyles: {
    fontSize: 16,
    fontFamily: "nunito-light",
  },

  safeviewStyle: {
    flex: 1,
  },
  buttonPressed: {
    backgroundColor: "green",
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
});
