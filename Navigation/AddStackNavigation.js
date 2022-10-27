import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AddProduct from "../Screens/AddProduct";
import Details from "../Category/Detail";
import Electronics from "../Category/Common";
import Images from "../Category/Images";
import Location from "../Category/Location";
import Price from "../Category/Price";
import SellDetailProvider from "../Context/SellDetailProvider";

const AddStack = createNativeStackNavigator();

const AddStackNavigation = () => {
  // const { category } = sellDetailState();
  return (
    <SellDetailProvider>
      <AddStack.Navigator>
        <AddStack.Screen
          name="Add-Product"
          component={AddProduct}
          options={{ headerShown: false }}
        />
        <AddStack.Screen
          name="Detail"
          component={Details}
          // options={{ headerTitle: category }}
          options={({ category }) => ({ title: category })}
        />

        <AddStack.Screen
          name="Common"
          component={Electronics}
          // options={({ route }) => ({ title: route.params.category })}
        />

        <AddStack.Screen
          name="Image"
          component={Images}
          options={{ headerTitle: "Upload Images" }}
        />
        <AddStack.Screen
          name="Location"
          component={Location}
          options={{ headerTitle: "Confirm Your Location" }}
        />
        <AddStack.Screen
          name="Price"
          component={Price}
          options={{ headerTitle: "Set a Price" }}
        />
      </AddStack.Navigator>
    </SellDetailProvider>
  );
};

export default AddStackNavigation;

const styles = StyleSheet.create({});
