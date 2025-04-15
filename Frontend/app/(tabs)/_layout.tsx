import { Tabs } from "expo-router";
import React from "react";
import { Animated, View, useWindowDimensions } from "react-native";
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import Color from "@/constants/Color";
import colors from "@/constants/Color";

export default function TabLayout() {
  const { width } = useWindowDimensions();
  const isTablet = width > 768;

  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: "white",
          borderRadius: isTablet ? 40 : 30,
          borderWidth: 1,
          borderColor: colors.white,
          position: "absolute",
          bottom: isTablet ? 16 : 10,
          left: isTablet ? 40 : 20,
          right: isTablet ? 40 : 20,
          height: isTablet ? 90 : 70,
          elevation: 10,
          boxShadow: "0 1px 2px rgba(0,0,0,0.2)",
        },
        tabBarActiveTintColor: Color.primary,
        tabBarInactiveTintColor: Color.mediumGray,
        tabBarShowLabel: false,
      }}
    >
      {[
        { name: "index", icon: "dashboard" },
        { name: "doctorlist", icon: "list-alt" },
        { name: "appointment", icon: "pending-actions" },
        { name: "profile", icon: "user", isFontAwesome: true },
      ].map(({ name, icon, isFontAwesome }) => (
        <Tabs.Screen
          key={name}
          name={name}
          options={{
            tabBarLabel: "",
            tabBarIcon: ({ focused }) => (
              <Animated.View
                style={{
                  backgroundColor: focused ? Color.primary : "transparent",
                  borderRadius: isTablet ? 40 : 30,
                  width: isTablet ? 80 : 60,
                  height: isTablet ? 80 : 60,
                  alignItems: "center",
                  justifyContent: "center",
                  borderColor: colors.lightPrimary,
                  borderWidth: focused ? (isTablet ? 4 : 3) : 0,
                  marginTop: focused ? 0 : isTablet ? 30 : 20,
                }}
              >
                {isFontAwesome ? (
                  <FontAwesome5
                    name={icon}
                    size={isTablet ? 30 : 24}
                    color={focused ? Color.white : Color.mediumGray}
                  />
                ) : (
                  <MaterialIcons
                    name={icon as keyof typeof MaterialIcons.glyphMap}
                    size={isTablet ? 32 : 26}
                    color={focused ? Color.white : Color.mediumGray}
                  />
                )}
              </Animated.View>
            ),
          }}
        />
      ))}
    </Tabs>
  );
}
