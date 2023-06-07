import React, { useState, useContext, useEffect } from "react";
import { StyleSheet, Text, Alert } from "react-native";
import  AsyncStorage  from "@react-native-async-storage/async-storage";
import { scaleSize } from "../constants/Layout";

export const fetchWatchlistData = async () => {
  try {
    const tokens = await AsyncStorage.getItem("@Token");
    console.log(tokens);
    if (tokens) {
      const token = JSON.parse(tokens);
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.token}`,
        },
      };

      const response = await fetch("http://localhost:3001/users/retrievewatchlist", options);
      const data = await response.json();

      if (data.success) {
        console.log("Watchlist retrieved from the database");
        console.log(data);
        return data.watchlist;
      } else {
        console.log("Could not fetch watchlist from the database");
      }
    }
  } catch (error) {
    console.log(error);
  }
};

const StocksContext = React.createContext();

export const StocksProvider = ({ children }) => {
  const [state, setState] = useState([]);
  //const [list, setList] = useState([]);

  // const fetchWatchlist = async () => {
  //   try {
  //     const tokens = await AsyncStorage.getItem("@Token");
  //     console.log(tokens);
  //     if (tokens) {
  //       const token = JSON.parse(tokens);
  //       const options = {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${token.token}`,
  //         },
  //       };
  
  //       fetch("http://localhost:3001/users/retrievewatchlist", options)
  //         .then((response) => response.json())
  //         .then((response) => {
  //           // Handle the response
  //           if (response.success) {
  //             console.log("Watchlist retrieved from db");
  //             console.log(response);
  //             setState(response.watchlist)
  //           } else {
  //             console.log("Could not fetch watchlist from db");
  //           }
  //         })
  //         .catch((err) => console.log(err));
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };


  // let _retrieveData = async () => {
  //   try {
  //     const value = await AsyncStorage.getItem("@Watch");
  //     console.log("Retrieved WatchList");

  //     if (value !== null) {
  //       setState(JSON.parse(value));
  //     }
  //   } catch (error) {
  //     console.log(`Error retrieving data:`,error);
  //   }
  // };

  useEffect(() => {
    //_retrieveData();
    fetchWatchlistData()
      .then((watchlist) => setState(watchlist))
      .catch((error) => console.log(error));
    console.log(state);
  }, []);
  

  return (
    <StocksContext.Provider value={[state, setState]}>
      {children}
    </StocksContext.Provider>
  );
};

export const useStocksContext = () => {
  const [state, setState] = useContext(StocksContext);

  const displayAlert = (props) => {
    return (
      Alert.alert("Warning", `${props.name} is already in your WatchList!`,
      [
        {
          text: "Okay",
          onPress: () => console.log(`Acknowledged warning that ${props.name} is already in WatchList`),
        },
      ])
    );
  };

  function addToWatchList(newStock) {
    const index = state.findIndex(stock => stock.stockName === newStock.stockName);

    if (index === -1) {
      setState((oldState) => {
        oldState.push(newStock);
          return [...state]
        });
    } else {
        displayAlert({name: newStock.stockName})
    }

   // AsyncStorage.setItem("@Watch", JSON.stringify(state));

    return {state};
  }

  function removeFromWatchList(newStock) {
    const index = state.findIndex(stock => stock.stockName === newStock.stockName);

    setState((oldState) => {
      oldState.splice(index, 1);
        return [...state]
    });

    //AsyncStorage.setItem("@Watch", JSON.stringify(state));

    return {state};
  }

  return { ServerURL: "http://localhost:3001", watchList: state, addToWatchList, removeFromWatchList};
};

const styles = StyleSheet.create({
  text: {
    color: "#fff",
    fontSize: scaleSize(20),
    fontWeight: "bold",
  }
});
