import React from "react";
import { StyleSheet, View, Text } from "react-native";
import AppScreenUI from "../../components/AppScreenUI";

import AppHeader from "../../components/AppHeader";

export default function CommunityScreen({ navigation }) {
  return (
    <AppScreenUI>
      <AppHeader
        iconLeft="exit-outline"
        iconLeftSIze={25}
        onPress={() => {
          navigation.navigate("Login");
        }}
        title="Community"
      />
    </AppScreenUI>
  );
}

const styles = StyleSheet.create({});
