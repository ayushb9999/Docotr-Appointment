import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Dimensions,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import * as ImagePicker from "expo-image-picker";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import colors from "@/constants/Color";
import { Stack, useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width } = Dimensions.get("window");
const isTablet = width >= 768;
import Toast from "react-native-simple-toast";

const Register = () => {
  const router = useRouter();
  const [userType, setUserType] = useState("patient");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [doctorName, setDoctorName] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [location, setLocation] = useState("");
  const [experience, setExperience] = useState("");
  const [about, setAbout] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [bloodGroup, setBloodGroup] = useState("");
  const [gender, setGender] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Dropdown States
  const [userTypeOpen, setUserTypeOpen] = useState(false);
  const [genderOpen, setGenderOpen] = useState(false);
  const [specialistOpen, setSpecialistOpen] = useState(false);
  const [bloodGroupOpen, setBloodGroupOpen] = useState(false);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to pick an image.");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
      setImage(result.assets[0].uri);
    }
  };

  const handleRegister = async () => {
    if (!email || !password) {
      Toast.show("Email and Password are required!", Toast.LONG);
      return;
    }

    const formData = new FormData();

    formData.append("email", email);
    formData.append("password", password);
    formData.append("userType", userType);

    if (userType === "patient") {
      formData.append("name", name);
      formData.append("gender", gender);
      formData.append("bloodGroup", bloodGroup);
    } else {
      formData.append("name", doctorName);
      formData.append("specialist", specialist);
      formData.append("location", location);
      formData.append("experience", experience);
      formData.append("about", about);
    }

    if (image) {
      const uriParts = image.split(".");
      const fileType = uriParts[uriParts.length - 1];
      formData.append("image", {
        uri: image,
        name: `photo.${fileType}`,
        type: `image/${fileType}`,
      } as any);
    }

    console.log("User Data:", formData);

    try {
      const response = await fetch(
        "https://e6db-103-99-15-226.ngrok-free.app/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        Toast.show(data.message || "Registration failed", Toast.LONG);
        return;
      }

      const { token, user } = data;

      await AsyncStorage.setItem("userToken", token);
      await AsyncStorage.setItem("userId", JSON.stringify(user._id));

      Toast.show("Registration Successful", Toast.LONG);

      router.replace("/(tabs)");
    } catch (error) {
      Toast.show("Something went wrong!", Toast.SHORT);
      console.error("Registration Error:", error);
    }
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.heading}>Create Account</Text>

        <DropDownPicker
          open={userTypeOpen}
          value={userType}
          items={[
            { label: "Patient", value: "patient" },
            { label: "Doctor", value: "doctor" },
          ]}
          setOpen={setUserTypeOpen}
          setValue={setUserType}
          style={styles.dropdown}
          dropDownContainerStyle={styles.dropdownContainer}
        />

        {/* Form Fields */}
        <View style={styles.inputContainer}>
          <Ionicons name="person-outline" size={24} color={colors.primary} />
          <TextInput
            value={userType === "doctor" ? doctorName : name}
            onChangeText={userType === "doctor" ? setDoctorName : setName}
            placeholder={
              userType === "doctor" ? "Enter Doctor Name" : "Enter Name"
            }
            style={styles.input}
          />
        </View>

        <View style={styles.inputContainer}>
          <Ionicons name="mail-outline" size={24} color={colors.primary} />
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="Enter Email"
            keyboardType="email-address"
            style={styles.input}
          />
        </View>

        <View style={styles.inputContainer}>
          <Ionicons
            name="lock-closed-outline"
            size={24}
            color={colors.primary}
          />
          <TextInput
            value={password}
            onChangeText={setPassword}
            placeholder="Enter Password"
            secureTextEntry={!showPassword}
            style={styles.input}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Ionicons
              name={showPassword ? "eye-off-outline" : "eye-outline"}
              size={24}
              color={colors.primary}
            />
          </TouchableOpacity>
        </View>

        {/* Conditional Fields */}
        {userType === "patient" ? (
          <>
            <DropDownPicker
              open={genderOpen}
              value={gender}
              items={[
                { label: "Male", value: "Male" },
                { label: "Female", value: "Female" },
              ]}
              setOpen={setGenderOpen}
              setValue={setGender}
              style={styles.dropdown}
              dropDownContainerStyle={styles.dropdownContainer}
              placeholder="Select Gender"
            />

            <DropDownPicker
              open={bloodGroupOpen}
              value={bloodGroup}
              items={[
                { label: "A+", value: "A+" },
                { label: "A-", value: "A-" },
                { label: "B+", value: "B+" },
                { label: "B-", value: "B-" },
                { label: "O+", value: "O+" },
                { label: "O-", value: "O-" },
                { label: "AB+", value: "AB+" },
                { label: "AB-", value: "AB-" },
              ]}
              setOpen={setBloodGroupOpen}
              setValue={setBloodGroup}
              style={styles.dropdown}
              dropDownContainerStyle={styles.dropdownContainer}
              placeholder="Select Blood Group"
            />
          </>
        ) : (
          <>
            <DropDownPicker
              open={specialistOpen}
              value={specialist}
              items={[
                { label: "Cardiologist", value: "Cardiologist" },
                { label: "Neurologist", value: "Neurologist" },
                { label: "Dermatologist", value: "Dermatologist" },
              ]}
              setOpen={setSpecialistOpen}
              setValue={setSpecialist}
              style={styles.dropdown}
              dropDownContainerStyle={styles.dropdownContainer}
              placeholder="Select Specialist"
            />
          </>
        )}

        {/* Image Picker */}
        <TouchableOpacity style={styles.imageButton} onPress={pickImage}>
          <Text style={styles.imageButtonText}>Pick an Image</Text>
        </TouchableOpacity>
        {image && <Image source={{ uri: image }} style={styles.image} />}

        {/* Register Button */}
        <TouchableOpacity
          style={styles.registerButton}
          onPress={handleRegister}
        >
          <Text style={styles.registerButtonText}>Register</Text>
        </TouchableOpacity>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: isTablet ? 40 : 20,
    backgroundColor: colors.white,
    flexGrow: 1,
    justifyContent: "center",
  },
  heading: {
    fontSize: isTablet ? 36 : 28,
    fontWeight: "700",
    color: colors.primary,
    textAlign: "center",
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.black,
    marginBottom: 5,
  },
  dropdown: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.lightGray,
    borderRadius: 12,
    paddingHorizontal: 12,
    marginBottom: 20,
  },
  dropdownContainer: {
    borderColor: colors.lightGray,
    borderRadius: 12,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.lightGray,
    borderRadius: 12,
    paddingVertical: 6,
    paddingHorizontal: 16,
    elevation: 2,
    marginBottom: 20,
  },
  input: {
    flex: 1,
    fontSize: isTablet ? 18 : 16,
  },
  registerButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: isTablet ? 18 : 14,
    alignItems: "center",
    elevation: 4,
  },
  registerButtonText: {
    fontSize: isTablet ? 20 : 16,
    fontWeight: "700",
    color: colors.white,
  },
  imageButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },

  imageButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.white,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: "center",
    marginTop: 10,
  },
});

export default Register;
