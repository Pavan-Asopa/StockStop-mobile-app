import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, View, ScrollView, TouchableWithoutFeedback, Keyboard, Text } from "react-native";
import { Searchbar, ActivityIndicator } from "react-native-paper";
import { useStocksContext } from "../contexts/StocksContext";
import { scaleSize } from "../constants/Layout";

import SearchList from "../components/SearchList";

export default function SearchScreen({ navigation }) {
  const { ServerURL, watchList, addToWatchList } = useStocksContext();
  const [search, setSearch] = useState("");
  const [fullList, setFullList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

const searchFilterFunction = (searchText) => {
  if (searchText) {
    const newData = fullList.filter((stock) => 
      stock.name.includes(
        searchText[0].toUpperCase() + 
        searchText.slice(1,-1).toLowerCase()
        )
      );
    setFilteredList(newData);
    setSearch(searchText);
  } else {
    setFilteredList(fullList);
    setSearch(searchText);
  }};

  useEffect(() => {
    fetch(`https://financialmodelingprep.com/api/v3/nasdaq_constituent?apikey=02ea7babe095fdebdb6c4ef948886e07`)
      .then(res => res.json())
      .then(data => 
        data.map(stock => {
          return {
            name: stock.name,
            symbol: stock.symbol
          };
        }))
      .catch((error) => setError(error.message))
      .finally(() => setLoading(false))
    .then(stocks => {
      setFullList(stocks);
      setFilteredList(stocks);
    })
  }, []);

  if (loading) {
    return (
      <View style={styles.feedbackContainer}>
        <Text style={styles.loadingMessage}>Loading available stocks</Text>
        <ActivityIndicator animating={true} />
      </View>
    );
  };

  if (error) {
    return (
      <View style={styles.feedbackContainer}>
        <Text style={styles.errorMessage}>Something went wrong: {error}</Text>
      </View>
    );
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView indicatorStyle="white">
        <Searchbar
          placeholder="Search for a stock here"
          onChangeText={searchFilterFunction}
          value={search}
        />
        <ScrollView style={styles.container}>
          <SearchList stocks={filteredList} />
        </ScrollView>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
  },
  feedbackContainer: {
    flex: 1,
    backgroundColor: "#000000",
    alignItems: "center",
    justifyContent: "center",
  },
  loadingMessage: {
    fontSize: scaleSize(20),
    color: "#fff",
    paddingRight: scaleSize(5),
  },
  errorMessage: {
    fontSize: scaleSize(20),
    color: "#fff",
  },
});
