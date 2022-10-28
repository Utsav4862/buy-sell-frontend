import { StyleSheet, Text, View } from "react-native";
import React from "react";
import {
  createNativeStackNavigator,
  TransitionPresets,
} from "@react-navigation/native-stack";
import Login from "../Screens/Login";
import SignUp from "../Screens/SignUp";
import TabNavigator from "./TabNavigator";
import OtpScreen from "../Screens/OtpScreen";
import {
  CardStyleInterpolators,
  createStackNavigator,
} from "@react-navigation/stack";

const Stack = createStackNavigator();

const config = {
  animation: "spring",
  config: {
    stiffness: 1000,
    damping: 50,
    mass: 3,
    overshootClamping: false,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
};

const StackNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          gestureEnabled: true,
          gestureDirection: "horizontal",
          transitionSpec: {
            open: config,
            close: config,
          },
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      />
      <Stack.Screen
        name="Signup"
        component={SignUp}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      />

      <Stack.Screen name="Tabs" component={TabNavigator} />
      <Stack.Screen name="OTP" component={OtpScreen} />
    </Stack.Navigator>
  );
};

export default StackNavigation;

const styles = StyleSheet.create({});
