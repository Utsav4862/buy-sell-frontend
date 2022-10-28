import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../Screens/Home";
import Chat from "../Screens/Chat";
import Profile from "../Screens/Profile";
import AddProduct from "../Screens/AddProduct";
import MyAds from "../Screens/MyAds";
import AddStackNavigation from "./AddStackNavigation";
import {
  AntDesign,
  Entypo,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import HomeStackNav from "./HomeStackNav";

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: 60,
          paddingBottom: 7,
        },
        tabBarInactiveTintColor: "lightgray",
        tabBarActiveTintColor: "#2abd6e",
        // tabBarShowLabel: false,
        tabBarLabelStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Tab.Screen
        name="HomeStack"
        component={HomeStackNav}
        options={{
          tabBarLabel: "HOME",
          tabBarIcon: ({ color }) => (
            <Entypo name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Chat"
        component={Chat}
        options={{
          tabBarLabel: "CHAT",
          tabBarIcon: ({ color }) => (
            <Entypo name="chat" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Add"
        component={AddStackNavigation}
        options={{
          unmountOnBlur: true,
          tabBarLabel: "SELL",
          tabBarIcon: ({ color }) => (
            <View style={{}}>
              <MaterialIcons
                name="add-circle-outline"
                color={color}
                size={35}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Liked"
        component={MyAds}
        options={{
          tabBarLabel: "Liked",
          tabBarIcon: ({ color, focused }) =>
            focused ? (
              <AntDesign name="hearto" color={color} size={26} />
            ) : (
              <AntDesign name="hearto" color={color} size={26} />
            ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: "ACCOUNT",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;

const styles = StyleSheet.create({});
