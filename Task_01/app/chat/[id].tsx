import colors from "@/constants/Color";
import { Stack, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import {
  SafeAreaView,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function DocChat() {
  const { id } = useLocalSearchParams();
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! How can I help you today?", sender: "doctor" },
    { id: 2, text: "I have a question about my appointment.", sender: "user" },
    { id: 3, text: "Yes! Sure.", sender: "doctor" },
  ]);
  const [inputText, setInputText] = useState("");

  const sendMessage = () => {
    if (inputText.trim() === "") return;

    const newMessage = {
      id: messages.length + 1,
      text: inputText,
      sender: "user",
    };
    setMessages([...messages, newMessage]);
    setInputText("");

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          text: "I'll get back to you shortly!",
          sender: "doctor",
        },
      ]);
    }, 1000);
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: "",
          headerTransparent: true,
          headerLeft: () => (
            <View style={{}}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "500",
                  color: colors.black,
                  marginInline: 10,
                }}
              >
                Live Chat
              </Text>
            </View>
          ),
        }}
      />

      <SafeAreaView
        style={{ flex: 1, backgroundColor: colors.white, paddingTop: 50 }}
      >
        <FlatList
          data={messages}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View
              style={{
                alignSelf: item.sender === "user" ? "flex-end" : "flex-start",
                backgroundColor:
                  item.sender === "user" ? colors.primary : "#E0E0E0",
                padding: 10,
                borderRadius: 10,
                marginVertical: 10,
                maxWidth: "80%",
                marginHorizontal: 10,
              }}
            >
              <Text
                style={{
                  color: item.sender === "user" ? colors.white : colors.black,
                }}
              >
                {item.text}
              </Text>
            </View>
          )}
          contentContainerStyle={{ padding: 10 }}
        />

        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flexDirection: "row", alignItems: "center", padding: 10 }}
        >
          <TextInput
            style={{
              flex: 1,
              borderWidth: 1,
              borderColor: colors.mediumGray,
              borderRadius: 20,
              padding: 10,
              marginRight: 10,
            }}
            placeholder="Type a message..."
            value={inputText}
            onChangeText={setInputText}
          />
          <TouchableOpacity
            onPress={sendMessage}
            style={{
              backgroundColor: colors.primary,
              padding: 10,
              borderRadius: 20,
            }}
          >
            <Ionicons name="send" size={24} color={colors.white} />
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
}
