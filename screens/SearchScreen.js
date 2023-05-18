import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, View, TouchableWithoutFeedback, Keyboard, Text, FlatList } from 'react-native';
import { List, Colors } from 'react-native-paper';
import { useStocksContext } from '../contexts/StocksContext';
import { scaleSize } from '../constants/Layout';
import { Ionicons } from '@expo/vector-icons';

// function searchBar() {

// }

function SearchList() {
  const stocks = [
    {
      symbol: 'NFLX',
      key: 'NFLX',
      name: 'Netflix'
    },
    {
      symbol: 'SPOT',
      key: 'SPOT',
      name: 'Spotify'
    },
    {
      symbol: 'TSLA',
      key: 'TSLA',
      name: 'Tesla'
    }
  ];

  return (
    <View style={styles.container}>
      {stocks.map((item) =>
        <List.Item
          title={item.name}
          titleStyle={styles.title}
          left={props => <List.Icon {...props} color={"#2b6777"} icon="arrow-right-drop-circle-outline"/>}
          //onPress={() => }
        />
      )}
      {/* <FlatList
        data = {stocks}
        renderItem = {({item}) => 
          <Text style={styles.stockItems}>
            <Text style={styles.stockSymbol}>
              {item.symbol}::
            </Text>
            <Text style={styles.stockName}>
              {item.name}
            </Text>
          </Text>}
      /> */}
    </View>
  );
}

export default function SearchScreen({ navigation }) {
  //const { ServerURL, addToWatchlist } = useStocksContext();
  const [state, setState] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://financialmodelingprep.com/api/v3/nasdaq_constituent?apikey=02ea7babe095fdebdb6c4ef948886e07`)
      .then(res => res.json())
      .then(data => 
        data.map(stock => {
          console.log(stock.name);
          return {
            name: stock.name,
            symbol: stock.symbol
          };
        }))
      .catch((error) => setError(error.message))
      .finally(() => setLoading(false))
    .then(stocks => setState(stocks))
  }, []);

  // if (loading) {
  //   return (
  //     <Text>
  //       Loading available stocks...
  //     </Text>
  //   );
  // }

  // if (error) {
  //   return (
  //     <Text>
  //       Something went wrong: {error}
  //     </Text>
  //   );
  // }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <SearchList />
      </View>
    </TouchableWithoutFeedback>    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000'
  },
  title: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold'
  },
  description: {
    color: '#fff',
    fontSize: 18,
  }
// use scaleSize(x) to adjust sizes for small/large screens
});