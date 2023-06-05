import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, View, ScrollView, TouchableWithoutFeedback, Keyboard, Text } from "react-native";
import { Searchbar, ActivityIndicator, Banner, Button, MD3Colors } from "react-native-paper";
import { useStocksContext } from "../contexts/StocksContext";
import { scaleSize } from "../constants/Layout";

import SearchList from "../components/SearchList";
import { TouchableOpacity } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SearchScreen({ navigation }) {
  const { ServerURL, watchList, addToWatchList } = useStocksContext();
  const [search, setSearch] = useState("");
  const [fullList, setFullList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const [bannerVisible, setBannerVisible] = useState(false);
  const email = AsyncStorage.getItem('@email');
  console.log(email);
  const password = AsyncStorage.getItem('@password');
  console.log(password);

  const verify = () => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token.token}`,
      },
      body: JSON.stringify({email, password})
    };
    fetch('http://localhost:3001/users/updatewatchlist', options)
      .then(response => response.json())
      .then(response => {
        console.log(response)

      })
      .catch(err => console.log(err))
  };

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
    <TouchableOpacity>
      <ScrollView indicatorStyle="white">
        <Button
          labelStyle={styles.help}
          icon="help-circle-outline"
          mode="text"
          textColor={MD3Colors.primary50}
          accessibilityHint="Display page help"
          contentStyle={{flexDirection: "row-reverse"}}
          onPress={() => setBannerVisible(true)}
        >Add Stocks to WatchList</Button>
        <Banner
          visible={bannerVisible}
          contentStyle={styles.banner}
          actions={[
            {
              label: "Okay",
              onPress: () => setBannerVisible(false),
            },
          ]}
        >
          Below is a list of available stocks.{'\n'}
          Use the search bar to look for a specific stock.{'\n'}
          Select a stock to add it to your WatchList.
        </Banner>
        <Searchbar
          placeholder="Search for a stock here"
          onChangeText={searchFilterFunction}
          value={search}
        />
        <ScrollView style={styles.container}>
          <SearchList stocks={filteredList} />
        </ScrollView>
      </ScrollView>
    </TouchableOpacity>
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
  help: {
    flex: 1,
    fontSize: scaleSize(20),
    padding: scaleSize(10),
    fontWeight: "bold",
  }
});
