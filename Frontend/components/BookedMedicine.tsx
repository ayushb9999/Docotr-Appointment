import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  ListRenderItem,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import colors from "@/constants/Color";
import { Feather } from "@expo/vector-icons";

export default function BookedMedicine() {
  const [bookedMedicines, setBookedMedicines] = useState<any[]>([]);

  useEffect(() => {
    fetchBookedMedicines();
  }, []);

  const fetchBookedMedicines = async () => {
    try {
      const storedData = await AsyncStorage.getItem("bookMedicine");
      if (storedData) {
        setBookedMedicines(JSON.parse(storedData));
      }
    } catch (error) {
      Alert.alert("Error", "Failed to fetch booked medicines.");
    }
  };

  const removeItem = async (id: number) => {
    try {
      const storedData = await AsyncStorage.getItem("bookMedicine");
      if (storedData) {
        let medicines = JSON.parse(storedData);

        const indexToRemove = medicines.findIndex(
          (medicine: any) => medicine.id === id
        );

        if (indexToRemove !== -1) {
          // check if item exists
          medicines.splice(indexToRemove, 1);
        }

        await AsyncStorage.setItem("bookMedicine", JSON.stringify(medicines));
        setBookedMedicines([...medicines]);

        Alert.alert("Success", "Medicine removed successfully!");
      }
    } catch (error) {
      Alert.alert("Error", "Something went wrong!");
    }
  };

  const renderItem: ListRenderItem<any> = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.dosage}>Dosage: {item.dosage}</Text>
        <Text style={styles.price}>Price: {item.price}</Text>
        <Text style={styles.frequency}>Frequency: {item.frequency}</Text>
      </View>
      <TouchableOpacity onPress={() => removeItem(item.id)}>
        <Feather name="trash" size={20} color={colors.primary} />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {bookedMedicines.length > 0 ? (
        <FlatList
          data={bookedMedicines}
          renderItem={renderItem}
          keyExtractor={(item) => `${item.id}-${item.name}`}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <Text style={styles.noDataText}>No medicines booked yet.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingBlock: 20,
    paddingLeft: 10,
  },
  header: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.black,
    marginBottom: 15,
  },
  card: {
    flexDirection: "row",
    backgroundColor: colors.lightGray,
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    elevation: 1,
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 10,
  },
  infoContainer: {
    flex: 1,
    marginLeft: 15,
    justifyContent: "center",
  },
  name: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.black,
  },
  dosage: {
    fontSize: 16,
    color: colors.mediumGray,
    marginTop: 3,
  },
  price: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.primary,
    marginTop: 3,
  },
  frequency: {
    fontSize: 15,
    color: colors.mediumGray,
    marginTop: 2,
  },
  noDataText: {
    textAlign: "center",
    fontSize: 16,
    color: colors.mediumGray,
    marginTop: 20,
  },
});
