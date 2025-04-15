import React from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import colors from "@/constants/Color";
import medicines from "@/data/medicine.json";
import { Link, Stack } from "expo-router";
import { Feather, FontAwesome5, MaterialIcons } from "@expo/vector-icons";

const bgColors = ["#E6F7EF", "#EFE7F4", "#F4E7E7", "#E7F4FA", "#F4F8E7"];

type porps = {
  showInHor?: boolean;
};
export default function MedicineList({ showInHor }: porps) {
  const { width } = useWindowDimensions();
  const isTablet = width > 768;

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.header}>Medicine List</Text>
        <FlatList
          horizontal={showInHor}
          nestedScrollEnabled={true}
          showsHorizontalScrollIndicator={false}
          data={medicines}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ paddingHorizontal: showInHor ? 2 : 0 }}
          renderItem={({ item, index }) => (
            <Link href={`/medicine/${item.id}` as any} asChild>
              <TouchableOpacity style={styles.card} onPress={() => {}}>
                {/* Left: Medicine Image */}
                <View
                  style={[
                    styles.imageContainer,
                    { backgroundColor: bgColors[index % bgColors.length] },
                  ]}
                >
                  <Image source={{ uri: item.image }} style={styles.image} />
                </View>
                {/* Right: Medicine Details */}
                <View style={styles.detailsContainer}>
                  <Text style={styles.name}>{item.name}</Text>
                  <Text style={styles.details}>
                    <Feather
                      name="calendar"
                      size={16}
                      color={colors.mediumGray}
                    />{" "}
                    {item.dosage} - {item.frequency}
                  </Text>
                  <Text style={styles.price}>{item.price}</Text>
                </View>
              </TouchableOpacity>
            </Link>
          )}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white },
  header: {
    fontSize: 22,
    fontWeight: "700",
    color: colors.black,
    marginTop: 15,
    marginInline: 20,
  },
  card: {
    flexDirection: "row",
    backgroundColor: colors.white,
    borderWidth: 2,
    borderRadius: 14,
    borderColor: "#E6F7EF",
    marginBlock: 10,
    marginInline: 12,
    alignItems: "center",
    elevation: 4,
  },
  imageContainer: {
    height: "100%",
    borderRadius: 13,
    paddingInline: 16,
    alignItems: "center",
  },
  image: { width: 60, height: 60, borderRadius: 10, marginTop: 14 },
  detailsContainer: { flex: 1, paddingInline: 20, paddingBlock: 14 },
  name: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.black,
    alignItems: "center",
  },
  details: { fontSize: 14, color: colors.mediumGray, marginVertical: 4 },
  price: { fontSize: 18, fontWeight: "700", color: colors.primary },
});
