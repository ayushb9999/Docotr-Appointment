import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import colors from "@/constants/Color";
import AppointmentList from "./AppointmentList";
import BookedMedicine from "@/components/BookedMedicine";
import ProfileChart from "./ProfileChart";

export default function AboutPatient() {
  const [activeTab, setActiveTab] = useState("Overview");
  const tabs = ["Overview", "Medicine", "Appointment"];

  const renderContent = () => {
    switch (activeTab) {
      case "Overview":
        return (
          <View style={{ width: "100%" }}>
            <ProfileChart />
          </View>
        );
      case "Medicine":
        return (
          <View style={{ width: "100%", height: "100%", paddingBottom: 80 }}>
            <BookedMedicine />
          </View>
        );
      case "Appointment":
        return (
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{ width: "100%", height: "100%" }}
          >
            <AppointmentList />
          </ScrollView>
        );

      default:
        return <Text style={styles.contentText}>Select a tab</Text>;
    }
  };

  return (
    <View style={styles.container}>
      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === tab ? styles.activeTab : null]}
            onPress={() => setActiveTab(tab)}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === tab ? styles.activeTabText : null,
              ]}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Tab Content */}
      <View style={styles.contentContainer}>{renderContent()}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingTop: 20,
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingBottom: 10,
  },
  tab: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  activeTab: {
    borderBottomWidth: 3,
    borderBottomColor: colors.primary,
  },
  tabText: {
    fontSize: 16,
    color: colors.mediumGray,
    fontWeight: "500",
  },
  activeTabText: {
    color: colors.primary,
    fontWeight: "700",
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 10,
  },
  contentText: {
    fontSize: 18,
    fontWeight: "500",
    color: colors.black,
    textAlign: "center",
  },
});
