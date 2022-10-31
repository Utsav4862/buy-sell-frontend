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
import Loader from "../Components/Loader";
import { loginUser } from "../API/userApi";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const login = async () => {
    // if (email == "" || !email.includes("@") || password == "") {
    //   Alert.alert("Invalid", "Enter Valid Detail");
    //   return;
    // }
    try {
      setIsLoading(true);
      let res = await loginUser(email, password);
      console.log(res);
      if (res.error) {
        setIsLoading(false);
        Alert.alert("Error", res.error, [
          { text: "Sign Up", onPress: () => navigation.navigate("Signup") },
          { text: "Ok" },
        ]);
      } else {
        await SecureStore.setItemAsync("TOKEN", res.token);
        navigation.navigate("Tabs");
        setIsLoading(false);
      }
      // axios
      //   .post(`${URL}/user/login`, {
      //     email: email,
      //     password: password,
      //   })
      //   .then(async (res) => {
      //     let data = res.data;
      //     console.log(data);
      //     if (data.error) {
      //       setIsLoading(false);
      //       Alert.alert("Error", data.error, [
      //         { text: "Sign Up", onPress: () => navigation.navigate("Signup") },
      //         { text: "Ok" },
      //       ]);
      //     } else {
      //       await SecureStore.setItemAsync("TOKEN", data.token);
      //       setIsLoading(false);
      //       navigation.navigate("Tabs");
      //     }
      //   })
      //   .catch((err) => {
      //     setIsLoading(false);
      //     Alert.alert("Error", "Something went wrong!!");
      //   });
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      Alert.alert("Error", "Something went wrong!!");
    }
  };

  return (
    <View style={[styles.mainContainer, isLoading ? { opacity: 0.2 } : ""]}>
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
          <TouchableOpacity
            disabled={isLoading}
            onPress={() => navigation.navigate("Signup")}
          >
            <Text style={{ fontWeight: "bold", color: "#2abd6e" }}>
              Create New
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      {isLoading ? <Loader /> : ""}
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
