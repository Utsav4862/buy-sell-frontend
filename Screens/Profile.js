import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const Profile = () => {
  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <SafeAreaView>
        <View style={styles.header}>
          <Text style={styles.headerTxt}>Account</Text>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  header: {
    marginTop: 20,
    marginLeft: 20,
  },
  headerTxt: {
    fontSize: 35,
    fontWeight: "bold",
  },
});
