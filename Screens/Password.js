import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { TextInput } from "react-native";
import { TouchableOpacity } from "react-native";
import axios from "axios";
import { URL } from "../API/api";
import { Alert } from "react-native";
import { signupUser } from "../API/userApi";
import { Err } from "../Functions/Error";

const Password = ({ route, navigation }) => {
  const [password, setPassword] = useState();
  const { name, email } = route.params;

  const signup = async () => {
    console.log(password);
    try {
      let data = await signupUser(name, email, password);
      console.log(data);
      if (data.success) {
        Alert.alert("Congratulations!!", "Registration Done", [
          { text: "Login Now", onPress: () => navigation.navigate("Login") },
        ]);
      }
    } catch (error) {
      console.log(error);
      Err();
    }
  };
  return (
    <View style={styles.mainContainer}>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Create a Your Password</Text>
        </View>
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder={"Password"}
            secureTextEntry
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
        </View>

        <TouchableOpacity style={styles.btn} onPress={signup}>
          <Text style={{ color: "#fff", fontWeight: "bold" }}>Sign Up</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
};

export default Password;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    height: "100%",
    justifyContent: "center",
    width: "100%",
    alignContent: "center",
  },
  header: {
    alignItems: "center",
    marginBottom: 20,
  },

  headerText: {
    fontSize: 30,
    fontWeight: "bold",
    alignContent: "center",
  },
  // #2abd6e
  input: {
    height: 50,
    backgroundColor: "rgba(0,0,0,0.1)",
    marginBottom: 15,
    borderRadius: 20,
    paddingLeft: 10,
    marginLeft: 15,
    marginRight: 15,
    // elevation: 1,
  },

  btn: {
    backgroundColor: "#2abd6e",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    margin: 15,
    borderRadius: 20,
    elevation: 4,
  },
});
