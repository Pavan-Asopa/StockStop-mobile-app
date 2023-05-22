import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { List } from 'react-native-paper';
import { useStocksContext } from '../contexts/StocksContext';
import { scaleSize } from '../constants/Layout';
import WatchList from '../components/WatchList';


// FixMe: implement other components and functions used in StocksScreen here (don't just put all the JSX in StocksScreen below)


export default function StocksScreen({route}) {
  const { ServerURL, watchList, addToWatchList } = useStocksContext();
  const [state, setState] = useState({ watchList });

  console.log(watchList);
  console.log(state);

  // can put more code here

  useEffect(() => {
    // FixMe: fetch stock data from the server for any new symbols added to the watchlist and save in local StocksScreen state  
  }, [watchList]);

  if (!state) {
    return (
      <View>
        <Text>WatchList is empty.</Text>
      </View>
    );
  } else {
    return (
      <ScrollView style={styles.container}>
        <WatchList stocks={state} />
      </ScrollView>
    );
  }
};

const styles = StyleSheet.create({
  title: {
    color: '#fff',
    fontSize: scaleSize(20),
    fontWeight: 'bold'
  }
  });