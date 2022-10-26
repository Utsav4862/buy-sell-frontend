import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AddProduct from "../Screens/AddProduct";
import Details from "../Category/Detail";

import Books from "../Category/Books";
import Electronics from "../Category/Electronics";
import Images from "../Category/Images";
import Location from "../Category/Location";
import Price from "../Category/Price";

const AddStack = createNativeStackNavigator();

const AddStackNavigation = () => {
  return (
    <AddStack.Navigator>
      <AddStack.Screen
        name="Add-Product"
        component={AddProduct}
        options={{ headerShown: false }}
      />
      <AddStack.Screen
        name="Detail"
        component={Details}
        options={({ route }) => ({ title: route.params.category })}
      />

      <AddStack.Screen name="Electronics" component={Electronics} />

      <AddStack.Screen name="Books" component={Books} />
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
  );
};

export default AddStackNavigation;

const styles = StyleSheet.create({});
