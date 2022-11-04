import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { verifyOTP } from "../API/userApi";
import { Alert } from "react-native";
import { Err } from "../Functions/Error";
import Loader from "../Components/Loader";

const OtpScreen = ({ route, navigation }) => {
  const pin1Ref = useRef();
  const pin2Ref = useRef();
  const pin3Ref = useRef();
  const pin4Ref = useRef();

  const [otp, setOtp] = useState({ 1: "", 2: "", 3: "", 4: "" });
  const [isLoading, setIsLoading] = useState(false);
  const { name, email } = route.params;
  const verify = async () => {
    let finalOTP = otp[1] + otp[2] + otp[3] + otp[4];
    try {
      setIsLoading(true);
      let body = {
        email: email,
        otp: finalOTP,
      };

      const resp = await verifyOTP(body);
      console.log(resp);
      if (resp.error) {
        Alert.alert("Oops", resp.error);
        setIsLoading(false);
      } else {
        setIsLoading(false);
        navigation.navigate("Password", {
          name: name,
          email: email,
        });
      }
    } catch (error) {
      console.log(error);
      Err();
    }
  };

  return (
    <View style={styles.mainContainer}>
      {isLoading ? <Loader /> : ""}
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>
            Please Verify your email address
          </Text>
          <Text
            style={{
              fontSize: 15,
              color: "rgba(0,0,0,0.5)",
              alignContent: "center",
              marginTop: 10,
              marginLeft: 15,
            }}
          >
            Enter 4 digit code, which is sent you at {email}
          </Text>
        </View>
        <View style={styles.Form}>
          <TextInput
            style={styles.input}
            keyboardType="number-pad"
            maxLength={1}
            ref={pin1Ref}
            onChangeText={(text) => {
              setOtp({ ...otp, 1: text });
              text && pin2Ref.current.focus();
            }}
          />
          <TextInput
            style={styles.input}
            keyboardType="number-pad"
            maxLength={1}
            ref={pin2Ref}
            onChangeText={(text) => {
              setOtp({ ...otp, 2: text });
              text ? pin3Ref.current.focus() : pin1Ref.current.focus();
            }}
          />
          <TextInput
            style={styles.input}
            keyboardType="number-pad"
            maxLength={1}
            ref={pin3Ref}
            onChangeText={(text) => {
              setOtp({ ...otp, 3: text });
              text ? pin4Ref.current.focus() : pin2Ref.current.focus();
            }}
          />
          <TextInput
            style={styles.input}
            keyboardType="number-pad"
            maxLength={1}
            ref={pin4Ref}
            onChangeText={(text) => {
              setOtp({ ...otp, 4: text });
              !text && pin3Ref.current.focus();
            }}
          />
        </View>

        <TouchableOpacity
          disabled={isLoading}
          style={styles.btn}
          onPress={verify}
        >
          <Text style={{ color: "#fff", fontWeight: "bold" }}>Verify OTP</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
};

export default OtpScreen;

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
    fontSize: 25,
    fontWeight: "bold",
    alignContent: "center",
  },
  Form: {
    display: "flex",
    flexDirection: "row",
    marginLeft: 10,
  },
  // #2abd6e
  input: {
    height: 50,
    width: 50,
    backgroundColor: "rgba(0,0,0,0.1)",
    marginBottom: 15,
    borderRadius: 10,

    marginLeft: 15,
    marginRight: 15,

    textAlign: "center",
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
