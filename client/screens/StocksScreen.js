import React, { useState, useEffect } from "react";
import { StyleSheet, View, ScrollView, Text } from "react-native";
import { useStocksContext } from "../contexts/StocksContext";
import { scaleSize } from "../constants/Layout";
import WatchList from "../components/WatchList";

export default function StocksScreen({route, navigation}) {
  const { ServerURL, watchList, addToWatchList } = useStocksContext();
  console.log("Watchlist from context on stocks screen:", watchList);
  const [state, setState] = useState([])

  // const fetchWatchlist = async () => {
  //   try {
  //     const tokens = await AsyncStorage.getItem("@Token");
  //     console.log(tokens);
  //     if (tokens) {
  //       const token = JSON.parse(tokens);
  //       const options = {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${token.token}`,
  //         },
  //       };
  
  //       fetch("http://localhost:3001/users/retrievewatchlist", options)
  //         .then((response) => response.json())
  //         .then((response) => {
  //           // Handle the response
  //           if (response.success) {
  //             console.log("Watchlist retrieved from db");
  //             console.log(response);
  //             setState(response.watchlist)
  //           } else {
  //             console.log("Could not fetch watchlist from db");
  //           }
  //         })
  //         .catch((err) => console.log(err));
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   fetchWatchlist
  // }, [watchList]);

  if (watchList.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyHeader}>Your WatchList is empty.{"\n"}</Text>
        <Text style={styles.emptyMessage}>Go to the Search Screen to add stocks to your WatchList.</Text>
      </View>
    );
  } else {
    return (
      <ScrollView indicatorStyle="white" style={styles.container}>
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
