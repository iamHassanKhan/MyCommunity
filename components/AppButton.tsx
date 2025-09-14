import React from "react";
import { ActivityIndicator, StyleSheet, Text, TextStyle, TouchableOpacity, ViewStyle } from "react-native";
import { COLORS, FONT_SIZES, FONTS, SPACING } from "../theme/theme";

interface AppButtonProps {
  title: string;
  onPress: () => void;
  variant?: "primary" | "secondary" | "outline";
  style?: ViewStyle;
  textStyle?: TextStyle;
  disabled?: boolean;           // new prop
  loading?: boolean;            // new prop
}

const AppButton: React.FC<AppButtonProps> = ({
  title,
  onPress,
  variant = "primary",
  style,
  textStyle,
  disabled = false,
  loading = false,
}) => {
  const getButtonStyle = () => {
    let baseStyle = {};
    switch (variant) {
      case "secondary":
        baseStyle = { backgroundColor: COLORS.secondary };
        break;
      case "outline":
        baseStyle = {
          backgroundColor: "transparent",
          borderWidth: 1,
          borderColor: COLORS.primary,
        };
        break;
      default:
        baseStyle = { backgroundColor: COLORS.primary };
    }
    if (disabled || loading) {
      baseStyle = { ...baseStyle, opacity: 0.5 }; // visually indicate disabled
    }
    return baseStyle;
  };

  return (
    <TouchableOpacity
      style={[styles.button, getButtonStyle(), style]}
      onPress={onPress}
      activeOpacity={0.8}
      disabled={disabled || loading} // prevent press
    >
      {loading ? (
        <ActivityIndicator color={COLORS.white} />
      ) : (
        <Text style={[styles.text, textStyle]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: SPACING.default,
    //paddingHorizontal: SPACING.default,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: COLORS.white,
    fontSize: FONT_SIZES.sm,
    fontFamily: FONTS.medium,
  },
});

export default AppButton;
