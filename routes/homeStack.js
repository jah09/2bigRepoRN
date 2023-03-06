import { StyleSheet, Text, View } from "react-native";
import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import OrderModule from "../screens/orderModule";
import LoginModule from "../screens/loginModule";
import CreateAccountModule from "../screens/createAccountModule";
import ForgotPassword from "../screens/forgotPasswordModule";
import BottomTabNavigator from "../routes/bottomTabNavigation";
import OrderStackNagivation from "../routes/otherNavigator";
import ProductScreens from "../screens/productComponent";
import ProductDetailAndPlaceOrder from "../screens/productDetailsAndPlaceOrder";

const Stack = createNativeStackNavigator();

export default function HomeStack() {
  const [fontLoaded] = useFonts({
    "nunito-light": require("../assets/fonts/Nunito-Light.ttf"),
    "nunito-medium": require("../assets/fonts/Nunito-Medium.ttf"),
    "nunito-reg": require("../assets/fonts/Nunito-Regular.ttf"),
    "nunito-semibold": require("../assets/fonts/Nunito-SemiBold.ttf"),
    "nunito-bold": require("../assets/fonts/Nunito-Bold.ttf"),
  });
  if (!fontLoaded) {
    return <AppLoading />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="Login"
      >
        <Stack.Screen
          name="TabNavigator"
          component={BottomTabNavigator}
          options={{
            tabBarVisible: true,
          }}
        />

        <Stack.Screen name="Login" component={LoginModule} />

        <Stack.Screen name="CreateAccount" component={CreateAccountModule} />

        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />

        <Stack.Screen name="OrderStackNav" component={OrderStackNagivation} />

        <Stack.Screen name="Products" component={ProductScreens} />

        <Stack.Screen
          name="ProductDetailsAndOrders"
          component={ProductDetailAndPlaceOrder}
        />
        <Stack.Screen name="OrderScreen" component={OrderModule} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
