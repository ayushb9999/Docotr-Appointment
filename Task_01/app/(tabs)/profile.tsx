import AboutPatient from "@/components/aboutPatient";
import ProfileBanner from "@/components/profileBanner";
import colors from "@/constants/Color";
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import { router, Stack } from "expo-router";
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Profile() {
  return (
    <SafeAreaView style={{flex: 1 ,backgroundColor: colors.white }}>
      <ProfileBanner />

      <AboutPatient />
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

});
