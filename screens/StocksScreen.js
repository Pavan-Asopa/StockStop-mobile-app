import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, Text } from 'react-native';
import { useStocksContext } from '../contexts/StocksContext';
import { scaleSize } from '../constants/Layout';
import WatchList from '../components/WatchList';


// FixMe: implement other components and functions used in StocksScreen here (don't just put all the JSX in StocksScreen below)


export default function StocksScreen({route}) {
  const { ServerURL, currentList, addToWatchList } = useStocksContext();
  const [stocks, setStocks] = useState({ currentList });

  console.log(stocks);

  useEffect(() => {
    // FixMe: fetch stock data from the server for any new symbols added to the watchlist and save in local StocksScreen state  
  }, [currentList]);

  if (stocks.currentList === undefined) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}> Your WatchList is empty.</Text>
      </View>
    );
  } else {
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.text}>This is your watch screen.</Text>
        {/* <WatchList stocks={stocks} /> */}
      </ScrollView>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
    padding: scaleSize(10),
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
  emptyText: {
    fontSize: scaleSize(25),
    color: "#800000",
  },
  });