import React, { useEffect } from "react";
import { Animated, StyleSheet, Text } from "react-native";
import { COLORS, FONTS, SPACING } from "../constants/theme";

interface AppToastProps {
  message: string;
  duration?: number; // in ms
  onHide?: () => void;
}

const AppToast: React.FC<AppToastProps> = ({ message, duration = 3000, onHide }) => {
  const opacity = new Animated.Value(0);

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();

    const timer = setTimeout(() => {
      Animated.timing(opacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => onHide && onHide());
    }, duration);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Animated.View style={[styles.container, { opacity }]}>
      <Text style={styles.text}>{message}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: SPACING.lg,
    left: SPACING.lg,
    right: SPACING.lg,
    backgroundColor: COLORS.white,
    padding: SPACING.md,
    borderRadius: 8,
    alignItems: "center",
  },
  text: {
    color: COLORS.black,
    fontFamily: FONTS.medium,
  },
});

export default AppToast;
