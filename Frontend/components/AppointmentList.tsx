import colors from "@/constants/Color";
import {
  Feather,
  FontAwesome5,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Link } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Text, View } from "react-native";

export default function AppointmentList() {
  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  const [loading, setLoading] = useState(true);
  const [appointments, setAppointments] = useState<any[]>([]);
  const bgColors = ["#FFEBEE", "#E3F2FD", "#E8F5E9", "#FFF3E0", "#F3E5F5"];

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const storedAppointments = await AsyncStorage.getItem("appointments");
        if (storedAppointments) {
          setAppointments(JSON.parse(storedAppointments));
        }
      } catch (error) {
        console.error("Error retrieving appointments:", error);
      }
      setLoading(false);
    };

    fetchAppointments();

    const timeout = setTimeout(() => {
      setLoading(false);
    }, 60000);

    return () => clearTimeout(timeout);
  }, []);

  const handleCancel = async (index: number) => {
    Alert.alert(
      "Cancel Appointment",
      "Are you sure you want to cancel appointment ?",
      [
        {
          text: "No",
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: async () => {
            const updatedAppointments = [...appointments];
            updatedAppointments.splice(index, 1);
            setAppointments(updatedAppointments);
            await AsyncStorage.setItem(
              "appointments",
              JSON.stringify(updatedAppointments)
            );
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <ScrollView style={styles.container} showsHorizontalScrollIndicator={false}>
      <Text style={styles.currentDateText}>Today, {currentDate}</Text>
      {loading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={styles.loadingText}>Loading Appointments...</Text>
        </View>
      ) : appointments.length > 0 ? (
        appointments.map((appointment, index) => (
          <Link
            href={`/doctorDetails/${appointment.doctor.id}`}
            key={index}
            asChild
          >
            <TouchableOpacity style={styles.card}>
              <View style={styles.docCard}>
                <Image
                  source={{ uri: appointment.doctor.image }}
                  style={styles.doctorImage}
                />
                <View style={styles.detailsContainer}>
                  <Text style={styles.name}>{appointment.doctor.name}</Text>
                  <Text style={styles.specialization}>
                    {appointment.doctor.specialization}
                  </Text>
                  <View style={styles.infoRow}>
                    <FontAwesome5
                      name="star"
                      size={16}
                      color={colors.primary}
                    />
                    <Text style={styles.infoText}>
                      {appointment.doctor.rating} Rating
                    </Text>
                  </View>
                  <View style={styles.infoRow}>
                    <MaterialIcons
                      name="calendar-month"
                      size={18}
                      color={colors.primary}
                    />
                    <Text style={styles.appointmentText}>
                      {new Date(appointment.date).toDateString()}
                    </Text>
                  </View>
                </View>
              </View>

              <TouchableOpacity
                onPress={() => handleCancel(index)}
                style={styles.cancelButton}
              >
                <MaterialIcons name="cancel" size={24} color={colors.primary} />
                <Text style={styles.cancelButtonText}>Cancel Appointment</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          </Link>
        ))
      ) : (
        <View style={styles.noAppointmentsContainer}>
          <Text style={styles.noAppointmentsText}>
            No Appointments Scheduled
          </Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingTop: 20,
    paddingHorizontal: 20,
    marginBottom: 180,
  },
  currentDateText: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.mediumGray,
    marginBottom: 18,
  },
  card: {
    borderRadius: 15,
    padding: 8,
    marginBottom: 15,
    borderWidth: 2,
    backgroundColor: colors.white,
    elevation: 4,
    borderColor: colors.white,
    alignItems: "center",
    position: "relative",
  },
  docCard: {
    flexDirection: "row",
  },
  doctorImage: {
    width: 110,
    height: 120,
    borderRadius: 10,
    marginRight: 15,
  },
  detailsContainer: {
    flex: 1,
    justifyContent: "space-between",
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.black,
  },
  specialization: {
    fontSize: 16,
    color: colors.mediumGray,
    marginBottom: 5,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 6,
  },
  infoText: {
    fontSize: 14,
    color: colors.mediumGray,
  },
  appointmentText: {
    fontSize: 15,
    fontWeight: "700",
    color: colors.primary,
  },
  cancelButton: {
    flexDirection: "row",
    width: "100%",
    gap: 8,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 15,
    paddingInline: 18,
    paddingBlock: 10,
    backgroundColor: colors.white,
    elevation: 2,
    marginTop: 10,
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.primary,
  },
  noAppointmentsContainer: {
    alignItems: "center",
    justifyContent: "center",
    height: 200,
  },
  noAppointmentsText: {
    fontSize: 18,
    color: colors.mediumGray,
    fontWeight: "500",
  },
  loaderContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50,
  },
  loadingText: {
    fontSize: 16,
    color: colors.mediumGray,
    marginTop: 10,
  },
});
