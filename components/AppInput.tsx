import React from "react";
import { StyleSheet, TextInput, TextInputProps, View } from "react-native";
import { COLORS, FONT_SIZES, FONTS, SPACING } from "../theme/theme";

interface AppInputProps extends TextInputProps {
  variant?: "default" | "outlined";
}

const AppInput: React.FC<AppInputProps> = ({ variant = "default", style, ...props }) => {
  const getInputStyle = () => {
    switch (variant) {
      case "outlined":
        return { borderWidth: 1, borderColor: COLORS.gray, backgroundColor: COLORS.white };
      default:
        return { backgroundColor: COLORS.white };
    }
  };

  return (
    <View style={[styles.container, getInputStyle(), style]}>
      <TextInput
        style={styles.input}
        placeholderTextColor={COLORS.gray}
        {...props}
        
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",           // full width of parent
    height: 50,              // consistent height
    borderRadius: 8,
    paddingHorizontal: SPACING.md,
    marginVertical: SPACING.sm,
    justifyContent: "center", // vertically center text
  },
  input: {
    fontSize: FONT_SIZES.md,
    fontFamily: FONTS.regular,
    color: COLORS.black,
    flex: 1,                 // fill container height
  },
});

export default AppInput;
