import React, { useState, useEffect } from "react";
import { StyleSheet, View, TouchableWithoutFeedback, Keyboard } from "react-native";
import { useStocksContext } from "../contexts/StocksContext";
import { scaleSize } from "../constants/Layout";
import { Ionicons } from "@expo/vector-icons";

// FixMe: implement other components and functions used in SearchScreen here (don"t just put all the JSX in SearchScreen below)

//const [list, setList] 

const fetchWatchlist = async () => {
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

      fetch("http://localhost:3001/users/retrievewatchlist", options)
        .then((response) => response.json())
        .then((response) => {
          // Handle the response
          if (response.success) {
            setUser(response.list)
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




export default function HomeScreen({ navigation }) {
  const { ServerURL, addToWatchlist } = useStocksContext();
  const [state, setState] = useState({ /* FixMe: initial state here */ });

  // can put more code here

  useEffect(() => {
    // FixMe: fetch symbol names from the server and save in local SearchScreen state
  }, []);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        {/* FixMe: add children here! */ }
      </View>
    </TouchableWithoutFeedback>    
  )
}

const styles = StyleSheet.create({
// FixMe: add styles here ...
// use scaleSize(x) to adjust sizes for small/large screens
});