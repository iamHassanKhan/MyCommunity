import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { View, Text, StyleSheet, Animated } from "react-native";
import { useRef, useEffect } from "react";
import { COLORS, SPACING } from "../../theme/theme";

// Screens
import FeedScreen from "../../screens/Main/FeedScreen";
import CommunityScreen from "../../screens/Main/CommunityScreen";
import ChatScreen from "../../screens/Main/ChatScreen";
import SettingsScreen from "../../screens/Main/SettingsScreen";

const Tab = createBottomTabNavigator();

function TabIcon({ name, label, focused }) {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.spring(scaleAnim, {
      toValue: focused ? 0.85 : 1,
      useNativeDriver: true,
      friction: 5,
      tension: 120,
    }).start();
  }, [focused]);

  return (
    <Animated.View
      style={[
        styles.iconContainer,
        focused && styles.activeTab,
        { transform: [{ scale: scaleAnim }] },
      ]}
    >
      <Ionicons
        name={name}
        size={18}
        color={focused ? COLORS.secondaryDark : COLORS.gray}
      />

      {focused && (
        <Text
          style={[styles.iconLabel, focused && { color: COLORS.secondaryDark }]}
        >
          {label}
        </Text>
      )}
    </Animated.View>
  );
}

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBar,
      }}
    >
      <Tab.Screen
        name="Feed"
        component={FeedScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon name="home-outline" label="Home" focused={focused} />
          ),
        }}
      />
      <Tab.Screen
        name="Community"
        component={CommunityScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon
              name="people-outline"
              label="Community"
              focused={focused}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Chat"
        component={ChatScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon name="chatbubble-outline" label="Chat" focused={focused} />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon
              name="settings-outline"
              label="Settings"
              focused={focused}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: "absolute",
    bottom: SPACING.sm,
    height: 50,
    backgroundColor: COLORS.backgroundDark,
    borderRadius: 40,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "baseline",
    alignContent: "center",
    justifyContent: "center",
    marginHorizontal: 8,
    flexWrap: "wrap",
  },
  iconContainer: {
    flexDirection: "row",
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
    // minWidth: 50,
    // paddingHorizontal: 0,
    // paddingVertical: 0,
    // backgroundColor: "red",
  },
  activeTab: {
    flexDirection: "row",
    backgroundColor: COLORS.primary,
    // paddingHorizontal: 10,
    // paddingVertical: 10,
    // borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    minWidth: 100,
    minHeight: 40,
  },
  iconLabel: {
    marginLeft: 6,
    fontSize: 12,
    fontWeight: "500",
    color: COLORS.white,
  },
});
