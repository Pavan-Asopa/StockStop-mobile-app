import React, { useState, useEffect } from "react";
import { Text, StyleSheet, Image, View } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { scaleSize } from "../constants/Layout";

async function getStockLogo(symbol) {
  const TWELVEDATA_API_KEY = process.env.ALPHAVANTAGE_API_KEY;
  const url = `https://api.twelvedata.com/logo?symbol=${symbol}&apikey=${TWELVEDATA_API_KEY}`; // call api

  let res = await fetch(url);
  let data = await res.json();
  let logo = data.url;

  return logo; // return URL to be used to draw logo image
}

export function useStockLogo(symbol) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [logo, setLogo] = useState("");

  // useEffect to get the data (call the api) and error check
  useEffect(() => {
    getStockLogo(symbol)
      .then((res) => setLogo(res))
      .catch((error) => setError(error.message))
      .finally(() => setLoading(false));
  }, [symbol]);

  // display feedback when stock logo is loading
  if (loading) {
    return <ActivityIndicator animating={true} />;
  }

  // display feedback when an error occurs
  if (error) {
    return <Text style={styles.text}>Something went wrong: {error}</Text>;
  }

  // return stock logo image
  return (
    <View>
      <Image style={styles.logo} source={{ uri: logo }} />
    </View>
  );
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
  logo: {
    width: scaleSize(50),
    height: scaleSize(50),
  },
});
