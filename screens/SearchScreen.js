import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, View, TouchableWithoutFeedback, Keyboard, Text } from 'react-native';
import { Searchbar } from 'react-native-paper';
import { useStocksContext } from '../contexts/StocksContext';
import { scaleSize } from '../constants/Layout';
import { Ionicons } from '@expo/vector-icons';

import SearchList from '../components/SearchList';

export default function SearchScreen({ navigation }) {
  //const { ServerURL, addToWatchlist } = useStocksContext();
  const [fullList, setFullList] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filteredList, setFilteredList] = useState([]);
  const [search, setSearch] = useState("");

// const searchFilterFunction = (props) => {
//   if (props.searchText) {
//     const newData = masterDataSource.filter(
//       function (item) {
//         const itemData = item.title
//           ? item.title.toUpperCase()
//           : ''.toUpperCase();
//         const textData = text.toUpperCase();
//         return itemData.indexOf(textData) > -1;
//     });
//     setFilteredDataSource(newData);
//     setSearch(props.searchText);
//   } else {
//     setFilteredDataSource(props.fullList);
//     setSearch(props.searchText);
//   }};

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
    .then(stocks => setFullList(stocks))
  }, []);

  if (loading) {
    return (
      <Text>
        Loading available stocks...
      </Text>
    );
  }

  if (error) {
    return (
      <Text>
        Something went wrong: {error}
      </Text>
    );
  }

  let test = "la";
  const newData = fullList.filter((stock) => 
    stock.name.includes(test[0].toUpperCase()+test.slice(1,-1).toLowerCase()))

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView>
        <Searchbar
          placeholder="Search"
          //onChangeText={onChangeSearch}
          //value={searchQuery}
        />
        <ScrollView style={styles.container}>
          <SearchList stocks={fullList} />
        </ScrollView>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000'
  },
// use scaleSize(x) to adjust sizes for small/large screens
});
