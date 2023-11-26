import React from "react";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, View, Alert } from "react-native";
import { List } from "react-native-paper";
import { scaleSize } from "../constants/Layout";
import { useStocksContext } from "../contexts/StocksContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

// map each individual stock contained within the watchList to create a list of watched stocks
export default function WatchList({ stocks }) {
  // call useStocksContext() to get the URL, current watchList, and add/delete from watchList functions
  const { ServerURL, watchList, addToWatchList, removeFromWatchList } =
    useStocksContext();

  // declare a navigation constant to be able to use the useNavigation() hook later on
  const navigation = useNavigation();

  // function to display an alert for the user to confirm whether they want to add the selected stock to their watchList
  const displayAlert = (props) => {
    return Alert.alert(
      "Confirm action",
      `What would you like to do with ${props.name}?`,
      [
        {
          text: "View detailed information",
          onPress: () => {
            navigation.push("StockInfo", { stock: props.symbol });
          }, // navigates user to detailed stock info page
        },
        {
          text: "Remove from WatchList",
          onPress: () => {
            removeFromWatchList({
              stockName: props.name,
              stockSymbol: props.symbol,
            }); // removes stock from watchList
            deleteFromWatchlist(props); //deletes from backend watchlist table
          },
        },
      ]
    );
  };

  // POST request to delete stock from watchlist in database table
  const deleteFromWatchlist = async (props) => {
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
          body: JSON.stringify({ symbol: props.symbol }),
        };

        // fetch data from database
        fetch("http://172.22.26.70:3001/users/deletewatchlist", options)
          .then((response) => response.json())
          .then((response) => {
            // handle the response
            if (response.success) {
              console.log("Entry deleted from watchlist");
            } else {
              console.log("Failed to delete entry from watchlist");
            }
          })
          .catch((err) => console.log(err));
      }
    } catch (error) {
      console.log(error);
    }
  };

  // map each stock within watchlist to create and display watchlist
  return (
    <View>
      {stocks.map((stock) => {
        return (
          <List.Item
            title={stock.stockName}
            titleStyle={styles.title}
            key={stock.stockSymbol}
            description={stock.stockSymbol}
            descriptionStyle={styles.description}
            onPress={() =>
              displayAlert({ name: stock.stockName, symbol: stock.stockSymbol })
            } // selecting a stock asks user to confirm action
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    color: "#fff",
    fontSize: scaleSize(20),
    fontWeight: "bold",
  },
  description: {
    color: "#D3D3D3",
    fontSize: scaleSize(14),
    marginRight: 5,
  },
});
