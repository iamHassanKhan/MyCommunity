import React from "react";
import { View, ViewStyle } from "react-native";
import { COLORS, SPACING } from "../theme/theme";

interface AppDividerProps {
  vertical?: boolean; // Divider orientation
  color?: string;     // Divider color
  thickness?: number; // Line thickness
  margin?: number;    // Space around the divider
  style?: ViewStyle;  // Additional custom styles
}

const AppDivider: React.FC<AppDividerProps> = ({
  vertical = false,
  color = COLORS.gray,
  thickness = 1,
  margin = SPACING.md,
  style,
}) => {
  const dividerStyle: ViewStyle = vertical
    ? {
        width: thickness,
        height: "100%",
        backgroundColor: color,
        marginHorizontal: margin,
      }
    : {
        height: thickness,
        width: "100%",
        backgroundColor: color,
        marginVertical: margin,
      };

  return <View style={[dividerStyle, style]} />;
  //Fuck This Divider
};

export default AppDivider;
