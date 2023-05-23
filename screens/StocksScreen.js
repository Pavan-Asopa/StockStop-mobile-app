import React, { useState, useEffect } from "react";
import { StyleSheet, View, ScrollView, Text } from "react-native";
import { useStocksContext } from "../contexts/StocksContext";
import { scaleSize } from "../constants/Layout";
import WatchList from "../components/WatchList";

export default function StocksScreen({route, navigation}) {
  const { ServerURL, watchList, addToWatchList } = useStocksContext();

 // console.log(watchList);

  useEffect(() => {
    // FixMe: fetch stock data from the server for any new symbols added to the watchlist and save in local StocksScreen state  
  }, [watchList]);


  if (watchList.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyHeader}>Your WatchList is empty.{"\n"}</Text>
        <Text style={styles.emptyMessage}>Go to the Search Screen to add stocks to your WatchList.</Text>
      </View>
    );
  } else {
    return (
      <ScrollView style={styles.container}>
        <WatchList stocks={watchList} />
      </ScrollView>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
    color: "#fff",
  },
  text: {
    fontSize: scaleSize(20),
    color: "#fff",
  },
  emptyContainer: {
    flex: 1,
    backgroundColor: "#000000",
    alignItems: "center",
    justifyContent: "center",
  },
  emptyHeader: {
    fontSize: scaleSize(20),
    color: "#F62217",
  },
  emptyMessage: {
    fontSize: scaleSize(16),
    color: "#fff",
    textAlign: "center",
  },
});
