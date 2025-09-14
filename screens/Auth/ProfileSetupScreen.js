import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
  TouchableWithoutFeedback,
} from "react-native";
import * as ImagePicker from "expo-image-picker";

import AppScreenUI from "../../components/AppScreenUI";
import AppButton from "../../components/AppButton";
import AppHeader from "../../components/AppHeader";
import AppInput from "../../components/AppInput";
import { COLORS } from "../../theme/theme";
import { Ionicons } from "@expo/vector-icons";

export default function ProfileSetupScreen({ navigation }) {
  const [photo, setPhoto] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });

    if (!result.canceled) {
      setPhoto(result.assets[0].uri);
    }
  };

  const handleSubmit = () => {
    if (!photo) {
      Alert.alert("Profile Picture Required", "Please select a profile photo.");
      return;
    }
    if (!name.trim()) {
      Alert.alert("Name Required", "Please enter your name.");
      return;
    }

    // ✅ Save profile info or pass to firebase/zustand
    navigation.navigate("MainTabs");
  };

  return (
    <AppScreenUI>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0} // offset for header
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={styles.mainContainer}
            contentContainerStyle={{ flexGrow: 1 }}
            keyboardShouldPersistTaps="handled"
            onScrollBeginDrag={Keyboard.dismiss} // ✅ dismiss keyboard when user scrolls
          >
            {/* Header Exit */}
            <AppHeader
              containerStyle={{ backgroundColor: COLORS.secondary }}
              leftIcons={[
                {
                  name: "exit-outline",
                  onPress: () => navigation.navigate("Login"),
                  color: "black",
                },
              ]}
            />

            {/* Title */}
            <View style={styles.titleContainer}>
              <Text style={styles.title}>{`Setup your \nProfile`}</Text>
            </View>

            {/* Form */}
            <View style={styles.formContainer}>
              {/* Avatar Picker */}
              <TouchableOpacity
                style={styles.avatarContainer}
                onPress={pickImage}
              >
                {photo ? (
                  <Image source={{ uri: photo }} style={styles.avatar} />
                ) : (
                  <Ionicons
                    name="camera-outline"
                    size={30}
                    color={COLORS.primary}
                  />
                )}
              </TouchableOpacity>

              {/* Name Input */}
              <AppInput
                placeholder="Enter your name *"
                value={name}
                onChangeText={setName}
              />

              {/* Email Input (optional) */}
              <AppInput
                placeholder="Enter your email (optional)"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
              />

              {/* Button */}
              <AppButton
                title="Get Started"
                style={styles.buttonStyles}
                variant="secondary"
                onPress={handleSubmit}
              />
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </AppScreenUI>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: COLORS.secondary,
  },
  titleContainer: {
    height: "30%",
  },
  title: {
    fontSize: 25,
    fontWeight: "500",
    color: COLORS.cardLight,
    padding: 30,
  },
  formContainer: {
    flex: 1,
    padding: 26,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: COLORS.danger,
    justifyContent: "center",
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginBottom: 20,
    overflow: "hidden",
    backgroundColor: COLORS.cardLight,
  },
  avatar: {
    width: "100%",
    height: "100%",
    borderRadius: 40,
  },
  buttonStyles: {
    borderRadius: 30,
    marginTop: 20,
  },
});
