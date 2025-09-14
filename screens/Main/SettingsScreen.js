import React from "react";
import { View, Text, StyleSheet } from "react-native";
import AppScreenUI from "../../components/AppScreenUI";
export default function SettingsScreen() {
  return (
    <AppScreenUI>
      <View style={styles.container}>
        <Text style={styles.text}>Settings Screen</Text>
      </View>
    </AppScreenUI>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
  text: { fontSize: 20, fontWeight: "bold" },
});
