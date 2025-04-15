import colors from "@/constants/Color";
import { router } from "expo-router";
import React from "react";
import { Image, useWindowDimensions } from "react-native";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function DoctorBanner() {
  const { width } = useWindowDimensions();
  const isTablet = width > 768;

  return (
    <View style={[styles.container, { padding: isTablet ? 24 : 2 }]}>
      <View
        style={[
          styles.container__card,
          { width: isTablet ? 300 : 220, padding: isTablet ? 20 : 14 },
        ]}
      >
        <Text
          style={[
            styles.container__title,
            { fontSize: isTablet ? 22 : 18, marginBottom: isTablet ? 12 : 8 },
          ]}
        >
          Looking for Specialist Doctor ?
        </Text>
        <Text
          style={[styles.container__subtitle, { fontSize: isTablet ? 18 : 15 }]}
        >
          Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        </Text>
        <TouchableOpacity
          style={[
            styles.container__button,
            {
              width: isTablet ? 180 : 120,
              paddingVertical: isTablet ? 14 : 12,
              marginTop: isTablet ? 24 : 20,
              borderRadius: isTablet ? 10 : 8,
            },
          ]}
          onPress={() => {
            router.push("/(tabs)/doctorlist");
          }}
        >
          <Text style={[styles.btn__txt, { fontSize: isTablet ? 18 : 14 }]}>
            BOOK NOW
          </Text>
        </TouchableOpacity>
      </View>
      <Image
        source={{
          uri: "https://static.vecteezy.com/system/resources/previews/041/408/858/non_2x/ai-generated-a-smiling-doctor-with-glasses-and-a-white-lab-coat-isolated-on-transparent-background-free-png.png",
        }}
        style={{
          width: isTablet ? 260 : 126,
          height: isTablet ? 280 : 170,
          position: "absolute",
          bottom: 0,
          right: isTablet ? 16 : 8,
          borderBottomRightRadius: 20,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    backgroundColor: colors.accentPurple,
    borderRadius: 20,
    flexDirection: "row",
    elevation: 4,
  },
  container__card: {},
  container__title: {
    fontWeight: "600",
    color: colors.black,
  },
  container__subtitle: {
    color: colors.black,
  },
  container__button: {
    backgroundColor: "#6048E6",
    borderWidth: 1,
    borderColor: colors.lightGray,
    elevation: 3,
  },
  btn__txt: {
    color: colors.white,
    alignSelf: "center",
    fontWeight: "500",
  },
});
