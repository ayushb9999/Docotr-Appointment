import appointment from "@/app/(tabs)/appointment";
import colors from "@/constants/Color";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { Alert, Dimensions, Text, View } from "react-native";
import { BarChart } from "react-native-chart-kit";

export default function ProfileChart() {
  const [totalAppointments, setTotalAppointments] = useState(0);
  const [totalmedicine, setTotalMedicine] = useState(0);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const appointments = await AsyncStorage.getItem("appointments");
      const bookMedicine = await AsyncStorage.getItem("bookMedicine");

      setTotalAppointments(appointments ? JSON.parse(appointments).length : 0);
      setTotalAppointments(bookMedicine ? JSON.parse(bookMedicine).length : 0);
    } catch (error) {
      Alert.alert("error", "Oops Something Went Wrong, Try again later!");
    }
  };

  const data = {
    labels: ["Appointments", "Medicines"],
    datasets: [
      {
        data: [totalmedicine, totalAppointments],
      },
    ],
  };

  return (
    <View style={{ alignItems: "center", marginTop: 20 }}>
      {/* <Text
        style={{
          fontSize: 18,
          fontWeight: "600",
          color: colors.black,
          marginBottom: 10,
        }}
      >
        Total Appointments vs Medicines Booked
      </Text> */}
      <BarChart
        data={data}
        width={Dimensions.get("window").width - 10}
        height={280}
        yAxisSuffix=""
        yAxisLabel=""
        chartConfig={{
          backgroundColor: "#f2f2f2",
          backgroundGradientFrom: "#ffffff",
          backgroundGradientTo: "#ffffff",
          decimalPlaces: 0.79,
          color: (opacity = 1) => `rgba(104, 190, 140, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: { borderRadius: 10 },
          propsForDots: { r: "6", strokeWidth: "2", stroke: "#007AFF" },
        }}
        verticalLabelRotation={0}
        showValuesOnTopOfBars={true}
        fromZero={true}
      />
    </View>
  );
}
