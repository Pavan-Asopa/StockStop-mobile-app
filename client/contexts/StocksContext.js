import React, { useState, useContext, useEffect } from "react";
import { StyleSheet, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { scaleSize } from "../constants/Layout";

// function to fetch data from watchlist table in database (POST request)
export const fetchWatchlistData = async () => {
  try {
    // check for token in AsyncStorage
    const tokens = await AsyncStorage.getItem("@Token");
    // if token exists, call POST request
    if (tokens) {
      const token = JSON.parse(tokens);
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.token}`,
        },
      };

      // await data fetch
      const response = await fetch(
        "http://172.22.26.70:3001/users/retrievewatchlist",
        options
      );
      const data = await response.json(); // convert to JSON

      // is JSON response is successful, return watchlist
      if (data.success) {
        console.log("Watchlist retrieved from the database");
        console.log(data);
        return data.watchlist;
        // if not successful (error)
      } else {
        console.log("Could not fetch watchlist from the database");
      }
    }
  } catch (error) {
    console.log(error);
  }
};

// create stocks context
const StocksContext = React.createContext();

// create StocksProvider that will make watchlist available to all screens wrapped in provider
export const StocksProvider = ({ children }) => {
  const [list, setList] = useState([]); // initial watchlist state

  // fetch data from watchlist table in database
  useEffect(() => {
    // declare function to fetch data
    const fetchData = async () => {
      // set state to watchlist
      try {
        const watchlist = await fetchWatchlistData();
        setList(watchlist);
      } catch (error) {
        console.log(error);
      }
    };
    // call fetchData() to fetch the data
    fetchData();
  }, []);

  return (
    <StocksContext.Provider value={[list, setList]}>
      {children}
    </StocksContext.Provider>
  );
};

// function to use the stocks context
export const useStocksContext = () => {
  const [state, setState] = useContext(StocksContext); // retrieve state of watchlist from stocks context

  // alert user if they try to add a stock that already exists in watchlist
  const displayAlert = (props) => {
    return Alert.alert(
      "Warning",
      `${props.name} is already in your WatchList!`,
      [
        {
          text: "Okay",
          onPress: () =>
            console.log(
              `Acknowledged warning that ${props.name} is already in WatchList`
            ),
        },
      ]
    );
  };

  // function to add new stock to watchlist
  function addToWatchList(newStock) {
    // use list item index to check whether stock already exists in watchlist
    const index = state.findIndex(
      (stock) => stock.stockName === newStock.stockName
    );

    // if index === -1, means that stock does not exist in watchlist, thus can be added
    if (index === -1) {
      setState((oldState) => {
        oldState.push(newStock);
        return [...state];
      });
      // if index is anything but -1, means stocks already exists, displays alert to user
    } else {
      displayAlert({ name: newStock.stockName });
    }

    return { state };
  }

  // function to remove stock from watchlist
  function removeFromWatchList(newStock) {
    // find index of stock to be removed from watchlist
    const index = state.findIndex(
      (stock) => stock.stockName === newStock.stockName
    );

    // remove stock from watchlist using its index
    setState((oldState) => {
      oldState.splice(index, 1);
      return [...state];
    });

    return { state };
  }

  // allow access to watchlist and functions for any screens wrapped in context provider
  return {
    ServerURL: "http://172.22.26.70:3001",
    watchList: state,
    addToWatchList,
    removeFromWatchList,
  };
};

const styles = StyleSheet.create({
  text: {
    color: "#fff",
    fontSize: scaleSize(20),
    fontWeight: "bold",
  },
});
