import { router, Stack, useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import medicines from "@/data/medicine.json";
import { Feather } from "@expo/vector-icons";
import colors from "@/constants/Color";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Frequency } from "expo-calendar";

export default function MedicineDetails() {
  const { id } = useLocalSearchParams();
  const medicine = medicines.find((item) => item.id.toString() === id);
  const bgColors = ["#E6F7EF", "#EFE7F4", "#F4E7E7", "#E7F4FA", "#F4F8E7"];

  const router = useRouter();

  if (!medicine) {
    return (
      <View style={styles.notFoundContainer}>
        <Text style={styles.notFoundText}>Medicine not found</Text>
      </View>
    );
  }

  const handleBookNow = async () => {
    try {
      const storedMadicine = {
        id: medicine.id,
        image: medicine.image,
        name: medicine.name,
        dosage: medicine.dosage,
        frequency: medicine.frequency,
        price: medicine.price,
      };

      const exisitingData = await AsyncStorage.getItem("bookMedicine");
      const medicineArray = exisitingData ? JSON.parse(exisitingData) : [];

      medicineArray.push(storedMadicine);

      await AsyncStorage.setItem("bookMedicine", JSON.stringify(medicineArray));

      Alert.alert("Success", "Medicine booked successfully!");
      router.push("/(tabs)");
    } catch (error) {
      Alert.alert("Error", "Failed to book medicine.");
    }
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: "",
          headerTransparent: true,
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                router.push("/(tabs)");
              }}
              style={styles.headerLeft}
            >
              <Feather name="arrow-left" size={24} color={colors.primary} />
            </TouchableOpacity>
          ),
        }}
      />

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Medicine Image */}
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: medicine.image }}
            style={styles.medicineImage}
          />
        </View>

        {/* Medicine Details */}
        <View style={styles.detailsContainer}>
          <Text style={styles.name}>{medicine.name}</Text>
          <Text style={styles.price}>{medicine.price}</Text>

          <View
            style={[
              styles.infoCard,
              {
                backgroundColor: bgColors[medicine.id % bgColors.length],
              },
            ]}
          >
            <View style={styles.infoRow}>
              <Text style={styles.label}>Dosage:</Text>
              <Text style={styles.value}>{medicine.dosage}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Frequency:</Text>
              <Text style={styles.value}>{medicine.frequency}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Duration:</Text>
              <Text style={styles.value}>{medicine.duration}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Best Time:</Text>
              <Text style={styles.value}>{medicine.time}</Text>
            </View>
          </View>

          {/* About Medicine */}
          <Text style={styles.sectionTitle}>About This Medicine</Text>
          <Text style={styles.aboutText}>{medicine.about}</Text>

          {/* Buy Button */}
          <TouchableOpacity style={styles.buyButton} onPress={handleBookNow}>
            <Text style={styles.buyButtonText}>Buy Now</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  notFoundContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  notFoundText: {
    fontSize: 18,
    color: colors.primary,
  },
  imageContainer: {
    alignItems: "center",
    marginTop: 2,
    padding: 20,
    borderRadius: 20,
    backgroundColor: "",
  },
  medicineImage: {
    width: 180,
    height: 180,
    borderRadius: 20,
  },
  detailsContainer: {
    padding: 20,
    backgroundColor: "#FFF",
    borderRadius: 20,
    marginTop: 20,
    // boxShadow: '0 1px 2px rgba(0,0,0,0.2)',
  },
  name: {
    fontSize: 26,
    fontWeight: "700",
    textAlign: "center",
    color: colors.black,
  },
  price: {
    fontSize: 28,
    fontWeight: "700",
    textAlign: "center",
    color: colors.primary,
    marginTop: 5,
  },
  infoCard: {
    // backgroundColor: "#F7F8FA",
    padding: 15,
    borderRadius: 5,
    marginTop: 20,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  label: {
    fontSize: 17,
    fontWeight: "700",
    color: colors.black,
  },
  value: {
    fontSize: 17,
    color: colors.mediumGray,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginTop: 20,
    color: colors.black,
  },
  aboutText: {
    fontSize: 16,
    color: colors.mediumGray,
    lineHeight: 22,
    marginTop: 10,
  },
  buyButton: {
    backgroundColor: colors.primary,
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 20,
    boxShadow: "0 1px 2px rgba(0,0,0,0.2)",
    elevation: 4,
  },
  buyButtonText: {
    color: colors.white,
    fontSize: 20,
    fontWeight: "600",
  },
  headerLeft: {
    backgroundColor: colors.white,
    padding: 12,
    borderRadius: 10,
    marginLeft: 15,
    boxShadow: "0 1px 2px rgba(0,0,0,0.2)",
    elevation: 3,
  },
});
