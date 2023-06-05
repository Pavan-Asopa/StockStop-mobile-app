import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Alert } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { Button, List, Dialog, Portal, MD3DarkTheme } from 'react-native-paper';
import { useStocksContext } from '../contexts/StocksContext';
import { scaleSize } from '../constants/Layout';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SearchList({stocks}) {

  // call useStocksContext() to get the URL, current watchList, and addToWatchList function
  const { addToWatchList } = useStocksContext();
  //const token = JSON.parse(AsyncStorage.getItem("@Token"));
  //console.log(token);

  // const [state, setState] = useState("");

  // let _retrieveToken = async () => {
  //   try {
  //     const value = await AsyncStorage.getItem("@Token");
  //     console.log("Retrieved Token");

  //     if (value !== null) {
  //       setState(value);
  //     }
  //   } catch (error) {
  //     console.log(`Error retrieving data:`,error);
  //   }
  // };

  // useEffect(() => {
  //   _retrieveToken();
  // }, []);

  const {colors} = useTheme();
  
  const updateWatchlist = async () => {
    try {
      const tokens = await AsyncStorage.getItem("@Token");
      console.log("This")
      console.log(tokens);
      if (tokens) {
        const token = JSON.parse(tokens);
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token.token}`,
          },
          body: JSON.stringify({ symbol : "ZM" }),
        };
  
        fetch("http://localhost:3001/users/updatewatchlist", options)
          .then((response) => response.json())
          .then((response) => {
            // Handle the response
            if (response.success) {
              console.log("Entry added to watchlist");
            } else {
              console.log("Failed to add entry to watchlist");
            }
          })
          .catch((err) => console.error(err));
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
          //onPress: () => addToWatchList({stockName: props.name, stockSymbol: props.symbol})
          onPress: () => updateWatchlist()
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
