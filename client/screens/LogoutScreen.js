import React, { useState, useEffect } from "react";
import { StyleSheet, View, TouchableWithoutFeedback, Keyboard } from "react-native";
import { useStocksContext } from "../contexts/StocksContext";
import { scaleSize } from "../constants/Layout";
import { Ionicons } from "@expo/vector-icons";

// FixMe: implement other components and functions used in SearchScreen here (don"t just put all the JSX in SearchScreen below)







export default function LogoutScreen({ navigation }) {
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