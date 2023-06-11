import React from 'react';
import { StyleSheet, View, Text, Alert } from 'react-native';
import { List, MD3DarkTheme } from 'react-native-paper';
import { useStocksContext } from '../contexts/StocksContext';
import { scaleSize } from '../constants/Layout';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SearchList({stocks}) {

  // call useStocksContext() to get the addToWatchList function
  const { addToWatchList } = useStocksContext();

  // POST request to update watchlist (add new stock) in database table
  const updateWatchlist = async (props) => {
    try {
      // get JWT token from AsyncStorage
      const tokens = await AsyncStorage.getItem("@Token");
      // if token exists, use it to complete POST request
      if (tokens) {
        const token = JSON.parse(tokens);
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token.token}`,
          },
          body: JSON.stringify({ symbol: props.symbol, name: props.name }),
        };
  
        // fetch data from database
        fetch("http://172.22.26.70:3001/users/updatewatchlist", options)
          .then((response) => response.json())
          .then((response) => {
            // handle the response
            if (response.success) {
              console.log("Entry added to watchlist");
            } else {
              console.log("Failed to add entry to watchlist");
            }
          })
          .catch((err) => console.log(err));
      }
    } catch (error) {
      console.error(error);
    }
  };
  
  // function to display an alert for the user to confirm whether they want to add the selected stock to their watchList
  const displayAlert = (props) => {
    return (
      Alert.alert("Confirm action", `Are you sure you want to add ${props.name} to your WatchList?`,
      [
        {
          text: "Cancel",
          onPress: () => console.log(`Cancelled adding ${props.name} to WatchList`),
        },
        {
          text: "Confirm",
          onPress: () => {
            addToWatchList({stockName: props.name, stockSymbol: props.symbol})
            updateWatchlist(props)
          }
        }
      ])
    );
  };

  // if user searches for a stock that does not exist in the available stocks list, display feedback message to alert them
  if (stocks.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyHeader}>No stocks meet the searched criteria.</Text>
        <Text style={styles.emptyMessage}>Please try again.</Text>
      </View>
    );
  }
  else {
    // map each stock of the available stocks list to create a list users can use to search for stocks and add to watchLists
    return (
      <View>
        {stocks.map((item) =>
          <List.Item
            title={item.name}
            titleStyle={styles.title}
            key={item.symbol}
            left={props => <List.Icon {...props} color={MD3DarkTheme.colors.primary} icon="plus-circle-outline"/>}
            onPress={() => displayAlert({name: item.name, symbol: item.symbol})} // selecting a stock asks user to confirm action
          />
        )}
      </View>
    );
  }
};

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    backgroundColor: "#000000",
    alignItems: "center",
    justifyContent: "center",
    marginTop: scaleSize(20),
  },
  emptyHeader: {
    fontSize: scaleSize(20),
    color: "#F62217",
    textAlign: "center",
  },
  emptyMessage: {
    fontSize: scaleSize(16),
    color: "#fff",
    textAlign: "center",
  },
  title: {
    color: "#fff",
    fontSize: scaleSize(20),
    fontWeight: "bold",
  },
  confirm: {
    fontStyle: "bolder",
  }
});
