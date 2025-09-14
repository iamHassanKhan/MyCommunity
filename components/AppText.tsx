import React from "react";
import { Text, TextProps } from "react-native";
import { FONTS, FONT_SIZES } from "../theme/theme";
import { useTheme } from "../theme/ThemeContext";

interface AppTextProps extends TextProps {
  variant?: "h1" | "h2" | "h3" | "body" | "small";
  color?: string;
  bold?: boolean;
}

export const AppText: React.FC<AppTextProps> = ({
  children,
  variant = "body",
  color,
  bold = false,
  style,
  ...rest
}) => {
  const { colors } = useTheme();

  const getFontSize = () => {
    switch (variant) {
      case "h1":
        return FONT_SIZES.xxl;
      case "h2":
        return FONT_SIZES.xl;
      case "h3":
        return FONT_SIZES.lg;
      case "small":
        return FONT_SIZES.sm;
      default:
        return FONT_SIZES.md;
    }
  };

  return (
    <Text
      style={[
        {
          fontSize: getFontSize(),
          fontFamily: bold ? FONTS.bold : FONTS.regular,
          color: color || colors.text,
        },
        style,
      ]}
      {...rest}
    >
      {children}
    </Text>
  );
};

export default AppText;
