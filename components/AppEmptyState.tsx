import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { COLORS, FONT_SIZES, FONTS, SPACING } from "../theme/theme";

interface AppEmptyStateProps {
  title?: string;
  description?: string;
}

const AppEmptyState: React.FC<AppEmptyStateProps> = ({
  title = "Nothing Here",
  description = "No data available at the moment.",
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: SPACING.lg,
  },
  title: {
    fontSize: FONT_SIZES.lg,
    fontFamily: FONTS.bold,
    color: COLORS.gray,
    marginBottom: SPACING.sm,
  },
  description: {
    fontSize: FONT_SIZES.md,
    fontFamily: FONTS.regular,
    color: COLORS.gray,
    textAlign: "center",
  },
});

export default AppEmptyState;
