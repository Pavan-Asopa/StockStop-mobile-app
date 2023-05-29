import React, { useState, useContext, useEffect } from "react";
import  AsyncStorage  from "@react-native-async-storage/async-storage";


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


  function addToWatchList(newStock) {
    setState((oldState) => {
    oldState.push(newStock);
      return [...state]
    });

    AsyncStorage.setItem("@Watch", JSON.stringify(state));

    return {state};
  }

  return { ServerURL: "http://131.181.190.87:3001", watchList: state, addToWatchList };
};