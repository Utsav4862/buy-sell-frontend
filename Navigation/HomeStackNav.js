import { Animated, StyleSheet, Text, View } from "react-native";
import React from "react";

import Home from "../Screens/Home";
import Search from "../Screens/Search";
import {
  TransitionPresets,
  CardStyleInterpolators,
  createStackNavigator,
} from "@react-navigation/stack";

const HomeStack = createStackNavigator();
// const TransitionScreenOptions = {
//   ...TransitionPresets.SlideFromRightIOS,
// };

const HomeStackNav = () => {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        gestureDirection: "horizontal",

        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
    >
      <HomeStack.Screen name="Home" component={Home} />
      <HomeStack.Screen name="Search" component={Search} />
    </HomeStack.Navigator>
  );
};

export default HomeStackNav;

const styles = StyleSheet.create({});
