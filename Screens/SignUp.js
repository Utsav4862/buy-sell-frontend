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
import axios from "axios";
import { URL } from "../API/api";

const Signup = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const signup = () => {
    axios
      .post(`${URL}/user/signup`, {
        name: name,
        email: email,
        password: password,
      })
      .then((res) => {
        let data = res.data;
        if (data.exist) {
          Alert.alert("Error", data.exist, [
            { text: "Login", onPress: () => navigation.navigate("Login") },
            { text: "Ok" },
          ]);
        } else {
          Alert.alert("Success", "Registration Done!!!", [
            { text: "Login Now", onPress: () => navigation.navigate("Login") },
          ]);
        }
        // console.log(res);
      });
  };

  return (
    <View style={styles.mainContainer}>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Create a new account</Text>
        </View>
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder={"Name"}
            value={name}
            onChangeText={(text) => setName(text)}
          />
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

        <TouchableOpacity style={styles.btn} onPress={signup}>
          <Text style={{ color: "#fff", fontWeight: "bold" }}>Sign Up</Text>
        </TouchableOpacity>

        <View style={styles.bottom}>
          <Text style={{ fontWeight: "bold", color: "#000" }}>
            Already have an account?{" "}
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={{ fontWeight: "bold", color: "#2abd6e" }}>Login</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default Signup;

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
