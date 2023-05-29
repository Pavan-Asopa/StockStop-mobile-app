import React, { useState, useContext, useEffect } from "react";
import { StyleSheet, Text, Alert } from "react-native";
import  AsyncStorage  from "@react-native-async-storage/async-storage";
import { scaleSize } from "../constants/Layout";

const StocksContext = React.createContext();

export const StocksProvider = ({ children }) => {
  const [state, setState] = useState([]);

  let _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem("@Watch");
      console.log("Retrieved WatchList");

      if (value !== null) {
        setState(JSON.parse(value));
      }
    } catch (error) {
      console.log(`Error retrieving data:`,error);
    }
  };

  useEffect(() => {
    _retrieveData();
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

    AsyncStorage.setItem("@Watch", JSON.stringify(state));

    return {state};
  }

  function removeFromWatchList(newStock) {
    const index = state.findIndex(stock => stock.stockName === newStock.stockName);

    setState((oldState) => {
      oldState.splice(index, 1);
        return [...state]
    });

    AsyncStorage.setItem("@Watch", JSON.stringify(state));

    return {state};
  }

  return { ServerURL: "http://131.181.190.87:3001", watchList: state, addToWatchList, removeFromWatchList};
};

const styles = StyleSheet.create({
  text: {
    color: "#fff",
    fontSize: scaleSize(20),
    fontWeight: "bold",
  }
});
