import MedicineList from "@/components/medicineList";
import { Stack } from "expo-router";
import React from "react";
import { ScrollView, View } from "react-native";

export default function index() {
  return (
    <View>
      <Stack.Screen options={{ headerShown: false }} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <MedicineList showInHor={false} />
      </ScrollView>
      {/* <FlatList
        data={medicines}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <MedicineList showInHor={false} />}
        nestedScrollEnabled={true}
      /> */}
    </View>
  );
}
