import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../Screens/Home";
import Chat from "../Screens/Chat";
import Profile from "../Screens/Profile";
import AddProduct from "../Screens/AddProduct";
import MyAds from "../Screens/MyAds";
import AddStackNavigation from "./AddStackNavigation";

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false, }}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Chat" component={Chat} />
      <Tab.Screen name="Add" component={AddStackNavigation} />
      <Tab.Screen name="My-Ads" component={MyAds} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

export default TabNavigator;

const styles = StyleSheet.create({});
