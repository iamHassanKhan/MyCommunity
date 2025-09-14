import React, { ReactNode } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../theme/ThemeContext";

interface AppScreenProps {
  children: ReactNode;
  scroll?: boolean; // enable scroll
  safeArea?: boolean; // wrap with safe area
  padding?: boolean; // apply default padding
  statusBar?: "light" | "dark"; // status bar style
}

export const AppScreenUI = ({
  children,
  scroll = false,
  safeArea = true,
  padding = true,
  statusBar = "dark",
}: AppScreenProps) => {
  const { colors } = useTheme();

  const Container = safeArea ? SafeAreaView : View;
  const Content = scroll ? ScrollView : View;

  return (
    <Container style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar
        barStyle={statusBar === "light" ? "light-content" : "dark-content"}
        backgroundColor={colors.background}
      />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <Content
          contentContainerStyle={scroll ? { flexGrow: 1 } : undefined}
          style={[styles.content, padding && styles.padding]}
          keyboardShouldPersistTaps="handled"
        >
          {children}
        </Content>
      </KeyboardAvoidingView>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    //backgroundColor:"red"
  },
  padding: {
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    padding: 0,
  },
});

export default AppScreenUI;
