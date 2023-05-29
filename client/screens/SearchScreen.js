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

  // function to filter list of available stocks
  const searchFilterFunction = (searchText) => {

    // if user has typed something in the search bar
    if (searchText) {
      // filter all available stocks based on search query
      const newData = fullList.filter((stock) => 
        stock.name.includes(
          searchText[0].toUpperCase() + 
          searchText.slice(1,-1).toLowerCase()
        ));
      setFilteredList(newData); // set filteredList based on filtered data
      setSearch(searchText); // set search query

    // else: if nothing has been typed into the search bar
    } else {
      setFilteredList(fullList); // set filteredList to be full list of available stocks
      setSearch(searchText); // set search query (empty string)
    }};

  useEffect(() => {
    fetch(`https://financialmodelingprep.com/api/v3/nasdaq_constituent?apikey=02ea7babe095fdebdb6c4ef948886e07`) // call api
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
      setFullList(stocks); // initially, full list and filtered list are the same (until user starts to search)
      setFilteredList(stocks);
    })
  }, []);

  // display feedback when available stocks are loading
  if (loading) {
    return (
      <View style={styles.feedbackContainer}>
        <Text style={styles.loadingMessage}>Loading available stocks</Text>
        <ActivityIndicator animating={true} />
      </View>
    );
  };

  // display feedback when an error occurs
  if (error) {
    return (
      <View style={styles.feedbackContainer}>
        <Text style={styles.errorMessage}>Something went wrong: {error}</Text>
      </View>
    );
  };

  // return list of all available stocks, calling the SearchList component to style the list
  // include a search bar above the list for users to search for stocks
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
