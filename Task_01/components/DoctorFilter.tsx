import React, { useState } from "react";
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";
import doctors from "@/data/doctors.json";
import colors from "@/constants/Color";

const specializations = [
  "All",
  ...new Set(doctors.map((doctor) => doctor.specialization)),
];

type Props = {
  onFilter: (category: string) => void;
};

export default function DoctorFilter({ onFilter }: Props) {
  const [selectedFilter, setSelectedFilter] = useState("All");

  const handleFilterPress = (filter: string) => {
    setSelectedFilter(filter);
    onFilter(filter); 
  };

  return (
    <>
      <Text
        style={{
          fontSize: 24,
          fontWeight: "700",
          color: colors.black,
          paddingInline: 20,
          paddingBottom: 10,
        }}
      >
        All Doctors List
      </Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filterContainer}
      >
        {specializations.map((spec, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.filterButton,
              selectedFilter === spec && styles.activeFilter,
            ]}
            onPress={() => handleFilterPress(spec)}
          >
            <Text
              style={[
                styles.filterText,
                selectedFilter === spec && styles.activeText,
              ]}
            >
              {spec}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  filterContainer: {
    flexDirection: "row",
    paddingBlock: 15,
    paddingHorizontal: 8,
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.primary,
    marginRight: 10,
  },
  activeFilter: {
    backgroundColor: colors.primary,
  },
  filterText: {
    fontSize: 16,
    color: colors.primary,
    fontWeight: "600",
  },
  activeText: {
    color: colors.white,
  },
});
