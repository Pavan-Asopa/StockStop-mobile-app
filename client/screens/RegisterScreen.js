import React, { useState, useEffect } from "react";
import { StyleSheet, ScrollView, TouchableWithoutFeedback, Keyboard, Text, View } from "react-native";
import { scaleSize } from "../constants/Layout";
import RegisterForm from "../components/RegisterForm";

export default function RegisterScreen() {
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView style={styles.container}>
            <Text style={styles.header}>Register for a StockStop account</Text>
            <RegisterForm />
          </ScrollView>
        </TouchableWithoutFeedback>    
      );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#000000",
    },
    header: {
      fontSize: scaleSize(20),
      color: "#fff",
      fontWeight: "bold",
      alignSelf: "center",
      marginTop: scaleSize(20),
      marginBottom: scaleSize(20),
    },
    text: {
      fontSize: scaleSize(20),
      color: "#fff",
    },
});
