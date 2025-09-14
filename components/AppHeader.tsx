import React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
  Dimensions,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../theme/theme";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const scale = (size: number) => (SCREEN_WIDTH / 375) * size; // base 375 width

interface IconConfig {
  name: keyof typeof Ionicons.glyphMap;
  onPress: () => void;
  color?: string;
  size?: number;
  badgeCount?: number;
}

interface AppHeaderProps {
  title?: string;
  titleStyle?: any;
  image?: any;
  avatarPress?: () => void;
  welcomeMessage?: string;
  userName?: string;
  leftIcons?: IconConfig[];
  rightIcons?: IconConfig[];
  containerStyle?: any;
}

export default function AppHeader({
  title,
  titleStyle,
  image,
  avatarPress,
  welcomeMessage,
  userName,
  leftIcons = [],
  rightIcons = [],
  containerStyle,
}: AppHeaderProps) {
  const renderIcons = (icons: IconConfig[], side: "left" | "right") =>
    icons.map((icon, index) => (
      <View key={`${side}-${index}`} style={styles.iconWrapper}>
        <TouchableOpacity
          style={styles.headerButton}
          onPress={icon.onPress}
          activeOpacity={0.7}
        >
          <Ionicons
            name={icon.name}
            color={icon.color || COLORS.cardDark}
            size={icon.size || scale(24)}
          />
        </TouchableOpacity>
        {icon.badgeCount && icon.badgeCount > 0 && (
          <View style={styles.badgeContainer}>
            <Text style={styles.badgeText}>
              {icon.badgeCount > 99 ? "99+" : icon.badgeCount}
            </Text>
          </View>
        )}
      </View>
    ));

  return (
    <View style={[styles.headerContainer, containerStyle]}>
      {/* LEFT SECTION: User Info + Left Icons */}
      <View style={styles.leftSection}>
        {renderIcons(leftIcons, "left")}
        {userName && (
          <TouchableOpacity
            style={styles.userWrapper}
            onPress={avatarPress}
            activeOpacity={avatarPress ? 0.7 : 1}
          >
            {image && <Image source={image} style={styles.avatarStyle} />}
            <View style={styles.userTextContainer}>
              {welcomeMessage && (
                <Text style={styles.userWelcome} numberOfLines={1}>
                  {welcomeMessage}
                </Text>
              )}
              <Text style={styles.userName} numberOfLines={1}>
                {userName}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      </View>

      {/* CENTER SECTION: Title (if no user info) */}
      {!userName && title && (
        <View style={styles.centerContainer}>
          <Text style={[styles.headerTitle, titleStyle]} numberOfLines={1}>
            {title}
          </Text>
        </View>
      )}

      {/* RIGHT SECTION: Right Icons */}
      <View style={styles.rightSection}>{renderIcons(rightIcons, "right")}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: scale(12),
    paddingVertical: Platform.OS === "android" ? scale(10) : scale(14),
    backgroundColor: COLORS.backgroundLight,
  },
  leftSection: {
    flexDirection: "row",
    alignItems: "center",
    minWidth: scale(60),
  },
  centerContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: scale(8),
  },
  rightSection: {
    flexDirection: "row",
    alignItems: "center",
    minWidth: scale(60),
  },
  iconWrapper: {
    position: "relative",
    marginHorizontal: scale(4),
  },
  headerButton: {
    backgroundColor: COLORS.cardLight,
    borderRadius: scale(40),
    padding: scale(8),
  },
  avatarStyle: {
    width: scale(40),
    height: scale(40),
    borderRadius: scale(20),
    borderColor: COLORS.gray,
    borderWidth: 0.5,
  },
  userWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: scale(8),
  },
  userTextContainer: {
    marginLeft: scale(6),
    justifyContent: "center",
  },
  userWelcome: {
    fontSize: scale(10),
    color: COLORS.gray,
    fontWeight: "500",
  },
  userName: {
    fontSize: scale(15),
    color: COLORS.cardDark,
    fontWeight: "700",
  },
  headerTitle: {
    fontSize: scale(18),
    fontWeight: "600",
    color: COLORS.cardDark,
    textAlign: "center",
  },
  badgeContainer: {
    position: "absolute",
    top: -scale(4),
    right: -scale(4),
    backgroundColor: COLORS.danger,
    borderRadius: scale(10),
    paddingHorizontal: scale(5),
    paddingVertical: scale(1),
    minWidth: scale(18),
    alignItems: "center",
    justifyContent: "center",
  },
  badgeText: {
    color: COLORS.white,
    fontSize: scale(10),
    fontWeight: "700",
  },
});
