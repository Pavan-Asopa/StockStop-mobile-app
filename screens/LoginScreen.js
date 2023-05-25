import React, { useState, useEffect } from "react";
import { StyleSheet, ScrollView, TouchableWithoutFeedback, Keyboard, Text, View } from "react-native";
import { scaleSize } from "../constants/Layout";

export default function LoginScreen() {
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView style={styles.container}>
            <Text style={styles.header}>Login Page</Text>
          </ScrollView>
        </TouchableWithoutFeedback>    
      );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#000000",
    },
    loadingContainer: {
      flex: 1,
      backgroundColor: "#000000",
      alignItems: "center",
      justifyContent: "center",
    },
    header: {
      fontSize: scaleSize(20),
      color: "#fff",
      fontWeight: "bold",
      alignSelf: "center",
    },
    text: {
      fontSize: scaleSize(20),
      color: "#fff",
    },
});
