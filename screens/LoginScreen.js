import React, { useState, useEffect } from "react";
import { StyleSheet, ScrollView, TouchableWithoutFeedback, Keyboard, Text, View } from "react-native";
import { scaleSize } from "../constants/Layout";

import LoginForm from "../components/LoginForm";

export default function LoginScreen() {
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView style={styles.container}>
            <Text style={styles.header}>Login Page</Text>
            <LoginForm/>
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
    },
    text: {
      fontSize: scaleSize(20),
      color: "#fff",
    },
});
