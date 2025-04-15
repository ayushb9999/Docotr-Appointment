import {
  Link,
  router,
  Stack,
  useLocalSearchParams,
  useRouter,
} from "expo-router";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Platform,
} from "react-native";
import doctors from "@/data/doctors.json";
import * as Calendar from "expo-calendar";
import DateTimePicker from "react-native-modal-datetime-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  Feather,
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import colors from "@/constants/Color";

export default function DocDetails() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const doctor = doctors.find((doc) => doc.id.toString() === id);

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await Calendar.requestCalendarPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission Denied",
          "Calendar access is required to schedule an appointment."
        );
      }
    })();
  }, []);

  const showDatePicker = () => setDatePickerVisibility(true);
  const hideDatePicker = () => setDatePickerVisibility(false);
  const handleConfirm = (date: Date) => {
    setSelectedDate(date);
    hideDatePicker();
  };

  const storeAppointment = async () => {
    if (!doctor || !selectedDate) {
      Alert.alert("Error", "Please select a date first.");
      return;
    }
    const appointment = {
      doctor,
      date: selectedDate,
    };
    try {
      const storedAppointments = await AsyncStorage.getItem("appointments");
      const appointments = storedAppointments
        ? JSON.parse(storedAppointments)
        : [];
      appointments.push(appointment);
      await AsyncStorage.setItem("appointments", JSON.stringify(appointments));
      Alert.alert("Success", "Appointment scheduled successfully!");
      router.push("/(tabs)/appointment");
    } catch (error) {
      Alert.alert("Error", "Failed to store appointment data.");
    }
  };

  if (!doctor) {
    return (
      <View style={styles.notFoundContainer}>
        <Text style={styles.notFoundText}>Doctor not found</Text>
      </View>
    );
  }

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: "",
          headerTransparent: true,
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => router.back()}
              style={styles.headerLeft}
            >
              <FontAwesome5
                name="arrow-left"
                size={20}
                color={colors.primary}
              />
            </TouchableOpacity>
          ),
        }}
      />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Doctor Image */}
        <Image source={{ uri: doctor.image }} style={styles.doctorImage} />

        {/* Doctor Details */}
        <View style={styles.detailsContainer}>
          <Text style={styles.name}>{doctor.name}</Text>
          <Text style={styles.specialization}>{doctor.specialization}</Text>
          <View style={styles.experience__card}>
            <View style={styles.experience__card__container}>
              <View style={styles.patients__icon}>
                <FontAwesome5 name="briefcase" size={22} color={colors.white} />
              </View>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "600",
                  marginTop: 8,
                  color: colors.black,
                }}
              >
                {doctor.experience}
              </Text>
              <Text
                style={{
                  fontSize: 15,
                  color: colors.mediumGray,
                  fontWeight: "500",
                }}
              >
                Experience
              </Text>
            </View>
            <View style={styles.patient__card__container}>
              <View style={styles.patients__icon}>
                <MaterialCommunityIcons
                  name="account-group"
                  size={22}
                  color={colors.white}
                />
              </View>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "600",
                  marginTop: 8,
                  color: colors.black,
                }}
              >
                {doctor.totalPatients}+
              </Text>
              <Text
                style={{
                  fontSize: 15,
                  color: colors.mediumGray,
                  fontWeight: "500",
                }}
              >
                Patients
              </Text>
            </View>

            <View style={styles.rating__card__container}>
              <View style={styles.patients__icon}>
                <FontAwesome5 name="star" size={22} color={colors.white} />
              </View>
              <Text
                style={{
                  fontSize: 22,
                  fontWeight: "600",
                  marginTop: 8,
                  color: colors.black,
                }}
              >
                {doctor.rating}
              </Text>
              <Text
                style={{
                  fontSize: 15,
                  color: colors.mediumGray,
                  fontWeight: "500",
                }}
              >
                Ratings
              </Text>
            </View>
          </View>

          {/* About Doctor */}
          <Text style={styles.sectionTitle}>About Doctor</Text>
          <Text style={styles.aboutText}>{doctor.about}</Text>

          <Text style={styles.sectionTitle}>Select Appointment Date</Text>
          <TouchableOpacity style={styles.dateButton} onPress={showDatePicker}>
            <FontAwesome5 name="calendar" size={18} color={colors.white} />
            <Text style={styles.dateButtonText}>
              {selectedDate ? selectedDate.toDateString() : "Pick a Date"}
            </Text>
          </TouchableOpacity>
          <DateTimePicker
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />

          {/* Book Now Button */}
          <View style={styles.book__btn}>
            <Link href={`chat/${doctor.id}` as any} asChild>
              <TouchableOpacity style={styles.chat}>
                <Feather
                  name="message-square"
                  size={28}
                  color={colors.primary}
                />
              </TouchableOpacity>
            </Link>

            <TouchableOpacity
              style={styles.bookButton}
              // onPress={addAppointmentToCalendar}
            >
              <Text style={styles.bookButtonText} onPress={storeAppointment}>
                Book Now
              </Text>
            </TouchableOpacity>
          </View>
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
  doctorImage: {
    width: "100%",
    height: 300,
  },
  detailsContainer: {
    padding: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: "600",
    textAlign: "center",
    color: colors.black,
  },
  specialization: {
    fontSize: 20,
    color: colors.mediumGray,
    textAlign: "center",
    fontWeight: "500",
    marginBottom: 18,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "500",
    marginTop: 20,
    marginBottom: 8,
    color: colors.black,
  },
  dateButton: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 2,
    borderColor: colors.primary,
    padding: 20,
    borderRadius: 10,
    justifyContent: "center",
    marginBottom: 20,
  },
  dateButtonText: {
    color: colors.black,
    fontSize: 18,
    fontWeight: "700",
    marginLeft: 10,
  },
  headerLeft: {
    backgroundColor: colors.white,
    padding: 12,
    elevation: 6,
    margin: 10,
    borderRadius: 10,
    borderWidth: 3,
    borderColor: "#ffffff54",
    alignItems: "center",
  },
  aboutText: {
    fontSize: 16,
    color: colors.mediumGray,
    lineHeight: 22,
  },

  experience__card: {
    backgroundColor: "#D8D0FF",
    width: "100%",
    height: 130,
    borderRadius: 40,
  },
  experience__card__container: {
    position: "absolute",
    top: 0,
    left: 20,
    alignItems: "center",
  },
  patients__icon: {
    backgroundColor: "#E7E2FF",
    padding: 18,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
  },
  patient__card__container: {
    position: "absolute",
    top: 0,
    left: 131,
    alignItems: "center",
  },
  rating__card__container: {
    position: "absolute",
    top: 0,
    right: 28,
    alignItems: "center",
  },

  bookButton: {
    flex: 4,
    backgroundColor: colors.primary,
    paddingVertical: 14,
    borderRadius: 18,
    alignItems: "center",
  },
  bookButtonText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: "600",
  },
  book__btn: {
    flexDirection: "row",
    gap: 10,
  },
  chat: {
    flex: 1,
    borderWidth: 2,
    borderColor: colors.primary,
    paddingVertical: 14,
    borderRadius: 20,
    alignItems: "center",
  },
});
