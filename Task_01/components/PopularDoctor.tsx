import colors from "@/constants/Color";
import Color from "@/constants/Color";
import {
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { Link } from "expo-router";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  useWindowDimensions,
} from "react-native";

type Props = {
  showPopularOnly: boolean;
  doctorsList: any[];
};

export default function PopularDoctor({
  showPopularOnly,
  doctorsList = [],
}: Props) {
  if (!doctorsList || doctorsList.length == 0) {
    return (
      <View style={styles.noDoctorsContainer}>
        <Text style={styles.noDoctorsText}>No doctors found.</Text>
      </View>
    );
  }

  const { width } = useWindowDimensions();
  const tablet = width > 768;

  return (
    <View>
      {showPopularOnly ? (
        <>
          <Text
            style={{
              fontSize: 22,
              fontWeight: "700",
              color: Color.black,
              marginBottom: 10,
              marginTop: 20,
              marginInline: 8,
            }}
          >
            {showPopularOnly ? "Popular Doctors" : ""}
          </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              paddingLeft: 2,
              paddingBottom: 10,
            }}
          >
            {doctorsList.map((doctor) => (
              <Link
                href={`doctorDetails/${doctor.id}` as any}
                asChild
                key={doctor.id}
              >
                <TouchableOpacity key={doctor.id} style={styles.doctorCard}>
                  {/* Doctor Image */}
                  <Image
                    source={{ uri: doctor.image }}
                    style={styles.doctorImage}
                  />

                  {/* Doctor Details */}
                  <View style={styles.doctorInfo}>
                    <Text style={styles.doctorName}>{doctor.name}</Text>
                    <Text style={styles.doctorSpecialization}>
                      {doctor.specialization}
                    </Text>

                    {/* Rating & Experience */}
                    <View style={styles.infoRow}>
                      <FontAwesome5
                        name="star"
                        size={16}
                        color={Color.primary}
                      />
                      <Text style={styles.doctorRating}>
                        {doctor.rating} |{" "}
                        <FontAwesome5
                          name="briefcase"
                          size={15}
                          color={colors.primary}
                        />{" "}
                        {doctor.experience}
                      </Text>
                    </View>

                    {/* Location */}
                    <View style={styles.infoRow}>
                      <Ionicons
                        name="location-outline"
                        size={16}
                        color={Color.mediumGray}
                      />
                      <Text style={styles.locationText}>{doctor.location}</Text>
                    </View>

                    {/* Total Patients */}
                    <View style={styles.infoRow}>
                      <MaterialCommunityIcons
                        name="account-group"
                        size={16}
                        color={Color.primary}
                      />
                      <Text style={styles.patientsText}>
                        {doctor.totalPatients} Patients
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </Link>
            ))}
          </ScrollView>
        </>
      ) : (
        <>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              padding: 20,
              paddingBottom: 180,
            }}
          >
            {doctorsList.map((doctor) => (
              <Link
                href={`doctorDetails/${doctor.id}` as any}
                asChild
                key={doctor.id}
              >
                <TouchableOpacity
                  key={doctor.id}
                  style={{
                    flexDirection: "row",
                    backgroundColor: Color.white,
                    borderRadius: 12,
                    marginBottom: 20,
                    padding: 10,
                    width: "100%",
                    height: 180,
                    alignItems: "center",
                    marginRight: 15,

                    boxShadow: "0 1px 2px rgba(0,0,0,0.2)",
                    elevation: 3,
                  }}
                >
                  {/* Doctor Image */}
                  <Image
                    source={{ uri: doctor.image }}
                    style={styles.doctorImage}
                  />

                  {/* Doctor Details */}
                  <View style={styles.doctorInfo}>
                    <Text style={styles.doctorName}>{doctor.name}</Text>
                    <Text style={styles.doctorSpecialization}>
                      {doctor.specialization}
                    </Text>

                    {/* Rating & Experience */}
                    <View style={styles.infoRow}>
                      <FontAwesome5
                        name="star"
                        size={16}
                        color={Color.primary}
                      />
                      <Text style={styles.doctorRating}>
                        {doctor.rating} |{" "}
                        <FontAwesome5
                          name="briefcase"
                          size={15}
                          color={colors.primary}
                        />{" "}
                        {doctor.experience}
                      </Text>
                    </View>

                    {/* Location */}
                    <View style={styles.infoRow}>
                      <Ionicons
                        name="location-outline"
                        size={16}
                        color={Color.mediumGray}
                      />
                      <Text style={styles.locationText}>{doctor.location}</Text>
                    </View>

                    {/* Total Patients */}
                    <View style={styles.infoRow}>
                      <MaterialCommunityIcons
                        name="account-group"
                        size={16}
                        color={Color.primary}
                      />
                      <Text style={styles.patientsText}>
                        {doctor.totalPatients} Patients
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </Link>
            ))}
          </ScrollView>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  doctorScroll: {
    paddingLeft: 2,
    paddingBottom: 10,
  },
  doctorCard: {
    flexDirection: "row",
    backgroundColor: Color.white,
    borderRadius: 12,
    marginBottom: 20,
    padding: 10,
    width: 320,
    height: 180,
    alignItems: "center",
    marginRight: 15,

    boxShadow: "0 1px 2px rgba(0,0,0,0.2)",
    elevation: 3,
  },
  doctorImage: {
    width: 128,
    height: 160,
    borderRadius: 10,
    marginRight: 12,
  },
  doctorInfo: {
    flex: 1,
    justifyContent: "space-between",
  },
  doctorName: {
    fontSize: 18,
    fontWeight: "bold",
    color: Color.black,
  },
  doctorSpecialization: {
    fontSize: 15,
    letterSpacing: 0.5,
    fontWeight: "500",
    color: Color.mediumGray,
    marginBottom: 8,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    marginBottom: 2,
  },
  doctorRating: {
    fontSize: 14,
    fontWeight: "600",
    color: Color.mediumGray,
  },
  locationText: {
    fontSize: 14,
    color: Color.mediumGray,
    marginTop: 5,
  },
  patientsText: {
    fontSize: 14,
    color: Color.primary,
    fontWeight: "600",
    marginTop: 5,
  },
  noDoctorsContainer: {
    alignItems: "center",
    justifyContent: "center",
    height: 200,
  },
  noDoctorsText: {
    fontSize: 18,
    color: colors.mediumGray,
    fontWeight: "500",
  },
});
