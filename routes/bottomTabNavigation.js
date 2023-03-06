import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import OrderModule from "../screens/orderModule";
import StationModule from "../screens/stationModule";
import MapModule from "../screens/mapModule";
import NotificationModule from "../screens/notificationModule";
import ProfileModule from "../screens/accountProfileModule";
import ProductComponent from "../screens/productComponent";
import ProductDetailsComponent from "../screens/productDetailsAndPlaceOrder";
import notificationModule from "../screens/notificationModule";
import { FontAwesome } from "@expo/vector-icons";

import { StyleSheet } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginModule from "../screens/loginModule";

const Tab = createBottomTabNavigator();
function MyTabsNavigator() {
  const Stack = createNativeStackNavigator();

  function OrderStack() {
    return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Orders" component={OrderModule} />
      </Stack.Navigator>
    );
  }

  function StationStack() {
    return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Stations" component={StationModule} />
        <Stack.Screen name="Product" component={ProductComponent} />
        <Stack.Screen name="ProductDetails"component={ProductDetailsComponent}/>
      </Stack.Navigator>
    );
  }
  function MapStack() {
    return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Maps" component={MapModule} />
      </Stack.Navigator>
    );
  }

  function NotificationStack() {
    return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Notifications" component={NotificationModule} />
      </Stack.Navigator>
    );
  }

  function ProfileStack() {
    return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Profiles" component={ProfileModule} />
      </Stack.Navigator>
    );
  }

  return (
    <Tab.Navigator
      initialRouteName="Profile"
      independent={true}
      tabBarVisible={true}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, size, color }) => {
          let iconName;
          if (route.name === "Order") {
            //  iconName ='first-order';
            iconName = "reorder";
            // <Image source={require('../assets/purchase-order.png')}/>
            size = focused ? 30 : 19;
            color = focused ? "white" : "black";
          } else if (route.name === "Station") {
            iconName = "home";
            size = focused ? 30 : 19;
            color = focused ? "white" : "black";
          } else if (route.name === "Map") {
            //iconName ='map-marked-alt';
            iconName = "map";
            size = focused ? 30 : 19;
            color = focused ? "white" : "black";
          } else if (route.name === "Notification") {
            iconName = "bell";

            size = focused ? 30 : 19;
            color = focused ? "white" : "black";
          } else if (route.name === "Profile") {
            iconName = "user-circle";
            size = focused ? 30 : 19;
            color = focused ? "white" : "black";
          }
          return <FontAwesome name={iconName} size={size} color={color} />;
        },

        headerShown: false,
        tabBarStyle: {
          bottom: 15,
          left: 10,
          right: 10,
          elevation: 0,
          backgroundColor: "#73a9c2",
          borderRadius: 15,
          height: 65,
          width: "95%",
          ...style.shadow,
        },
        tabBarLabelStyle: {
          color: "white",
          fontSize: 12,
          paddingBottom: 8,
        },
      })}
    >
      {/* <Tab.Screen name="Order" component={OrderStack}/>
      <Tab.Screen name="Station" component={StationStack}/>
      <Tab.Screen name="Map" component={MapStack}/>
      <Tab.Screen name="Notification" component={NotificationStack}/>
      <Tab.Screen name="Profile" component={ProfileStack}/> */}

      <Tab.Screen
        name="Order"
        component={OrderModule}
        options={{
          tabBarVisible: true,
        }}
      />

      <Tab.Screen
        name="Station"
        component={StationModule}
        options={{
          tabBarVisible: true,
        }}
      />

      <Tab.Screen
        name="Map"
        component={MapModule}
        options={{
          tabBarVisible: true,
        }}
      />

      <Tab.Screen
        name="Notification"
        component={notificationModule}
        options={{
          tabBarVisible: true,
        }}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileModule}
        options={{
          tabBarVisible: true,
        }}
      />

  

    </Tab.Navigator>
  );

}
const style = StyleSheet.create({
  shadow: {
    shadowColor: "#7F5DF0",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
});

export default MyTabsNavigator;
