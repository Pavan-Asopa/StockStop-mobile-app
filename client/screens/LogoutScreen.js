import React, { useState, useEffect } from "react";
import { StyleSheet, View, TouchableWithoutFeedback, Keyboard, Text } from "react-native";
import { Button } from "react-native-paper";
import { useStocksContext } from "../contexts/StocksContext";
import { scaleSize } from "../constants/Layout";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';


export default function LogoutScreen() {
  const { ServerURL, addToWatchlist } = useStocksContext();
  // const user = route.params.user;
  // console.log(user);

  const [user, setUser] = useState("");
  const navigation = useNavigation();

  const getUserInfo = async () => {
    try {
      const tokens = await AsyncStorage.getItem("@Token");
      console.log(tokens);
      if (tokens) {
        const token = JSON.parse(tokens);
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token.token}`,
          },
        };
  
        fetch("http://localhost:3001/users/getemail", options)
          .then((response) => response.json())
          .then((response) => {
            // Handle the response
            if (response.success) {
              setUser(response.user)
            } else {
              console.log("Could not fetch user info");
            }
          })
          .catch((err) => console.log(err));
      }
    } catch (error) {
      console.log(error);
    }
  };

  getUserInfo() //call function to update state with user info

  const handleLogout = async () => {
    await AsyncStorage.clear();
    navigation.navigate("Login");
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        {/* <Button onPress={() => getUserInfo()}>Press me for magic</Button>
        <Text style = {styles.text}>{user}</Text> */}
        {/* <Button onPress={() => getUserInfo()}>{user}</Button> */}
        <Text style = {styles.text}>The current logged in user is : {user}</Text>
        <Button onPress={() => handleLogout()}>Logout</Button>
      </View>
    </TouchableWithoutFeedback>    
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
  },
  text: {
    fontSize: scaleSize(20),
    color: "#fff",
  },
});