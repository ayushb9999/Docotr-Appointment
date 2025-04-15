import DoctorBanner from "@/components/DoctorBanner";
import HealthProduct from "@/components/HealthProduct";
import PopularDoctor from "@/components/PopularDoctor";
import colors from "@/constants/Color";
import { FontAwesome5 } from "@expo/vector-icons";
import { Stack } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import doctors from "@/data/doctors.json";
import MedicineList from "@/components/medicineList";

export default function Index() {
  const [filteredDoctors, setFilteredDoctors] = useState(doctors);
  const { width } = useWindowDimensions();
  const isTablet = width > 768;

  return (
    <View style={styles.mainContainer}>
      <Stack.Screen
        options={{
          title: "",
          headerStyle: {
            backgroundColor: colors.white,
            elevation: 0,
          },
          headerLeft: () => (
            <View style={[styles.headerLeft, { gap: isTablet ? 24 : 16 }]}>
              <Image
                source={{
                  uri: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D",
                }}
                style={[
                  styles.profileImage,
                  {
                    width: isTablet ? 60 : 44,
                    height: isTablet ? 60 : 44,
                  },
                ]}
              />
              <View>
                <Text
                  style={[styles.helloText, { fontSize: isTablet ? 24 : 20 }]}
                >
                  Hello Ayush
                </Text>
                <Text
                  style={[
                    styles.greetingText,
                    { fontSize: isTablet ? 14 : 12 },
                  ]}
                >
                  Good Morning!
                </Text>
              </View>
            </View>
          ),
          headerRight: () => (
            <View
              style={[
                styles.headerRight,
                {
                  marginRight: isTablet ? 30 : 20,
                  padding: isTablet ? 14 : 10,
                  borderRadius: isTablet ? 40 : 30,
                },
              ]}
            >
              <FontAwesome5
                name="comment"
                size={isTablet ? 28 : 24}
                color={colors.white}
              />
            </View>
          ),
        }}
      />

      <ScrollView
        contentContainerStyle={[
          styles.scrollContainer,
          { paddingBottom: isTablet ? 100 : 88 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <SafeAreaView>
          <View
            style={[styles.content, { paddingHorizontal: isTablet ? 24 : 18 }]}
          >
            <DoctorBanner />
            <HealthProduct />
            <PopularDoctor
              showPopularOnly={true}
              doctorsList={filteredDoctors}
            />
            <MedicineList showInHor={true} />
          </View>
        </SafeAreaView>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.white,
  },
  scrollContainer: {
    paddingBottom: 88,
  },
  content: {
    paddingHorizontal: 18,
    paddingTop: 0,
  },
  headerLeft: {
    paddingLeft: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  profileImage: {
    borderRadius: 80,
  },
  helloText: {
    fontWeight: "700",
    color: colors.black,
  },
  greetingText: {
    color: colors.mediumGray,
    fontWeight: "500",
  },
  headerRight: {
    elevation: 6,
    backgroundColor: colors.primary,
  },
});
