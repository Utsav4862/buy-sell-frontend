import {
  StyleSheet,
  TextInput,
  View,
  Text,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import * as SecureStore from "expo-secure-store";
import axios from "axios";
import { URL } from "../API/api";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = () => {
    axios
      .post(`${URL}/user/login`, {
        email: email,
        password: password,
      })
      .then(async (res) => {
        let data = res.data;
        console.log(data);
        if (data.error) {
          Alert.alert("Error", data.error, [
            { text: "Sign Up", onPress: () => navigation.navigate("Signup") },
            { text: "Ok" },
          ]);
        } else {
          await SecureStore.setItemAsync("TOKEN", data.token);

          navigation.navigate("Tabs");
        }
        // console.log(res);
      });
  };

  return (
    <View style={styles.mainContainer}>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Login to Continue...</Text>
        </View>
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder={"Email"}
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
          <TextInput
            style={styles.input}
            placeholder={"Password"}
            secureTextEntry
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
        </View>

        <TouchableOpacity style={styles.btn} onPress={login}>
          <Text style={{ color: "#fff", fontWeight: "bold" }}>Login</Text>
        </TouchableOpacity>

        <View style={styles.bottom}>
          <Text style={{ fontWeight: "bold", color: "#000" }}>
            Don't have an account?{" "}
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
            <Text style={{ fontWeight: "bold", color: "#2abd6e" }}>
              Create New
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default Login;

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

  bottom: {
    width: "100%",
    position: "absolute",
    bottom: 35,
    flexDirection: "row",
    justifyContent: "center",
  },
});
