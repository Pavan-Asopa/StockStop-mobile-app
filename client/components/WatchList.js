import React from "react";
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, View, Alert } from "react-native";
import { List } from "react-native-paper";
import { scaleSize } from "../constants/Layout";
import { useStocksContext } from '../contexts/StocksContext';

// map each individual stock contained within the watchList to create a list of watched stocks
export default function WatchList({stocks}) {

    // call useStocksContext() to get the URL, current watchList, and add/delete from watchList functions
  const {ServerURL, watchList, addToWatchList, removeFromWatchList } = useStocksContext();

  // declare a navigation constant to be able to use the useNavigation() hook later on
  const navigation = useNavigation();

  // function to display an alert for the user to confirm whether they want to add the selected stock to their watchList
  const displayAlert = (props) => {
    return (
      Alert.alert("Confirm action", `What would you like to do with ${props.name}?`,
      [
        {
          text: "View detailed information",
          onPress: () => {navigation.push("StockInfo", {stock: props.symbol})} // navigates user to detailed stock info page
        },
        {
          text: "Remove from WatchList",
          onPress: () => removeFromWatchList({stockName: props.name, stockSymbol: props.symbol}) // removes stock from watchList
        }
      ])
    );
  };

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
            // right={props => <Button {...props}
            //   // style={styles.binButton}
            //   // labelStyle={styles.binSize}
            //   icon="trash-can-outline"
            //   // mode="contained"
            //   onPress={() => removeFromWatchList({stockName: props.stockName, stockSymbol: props.stockSymbol})}
            // /> // clicking on trash bin button removes stock from watchList
            // } 
            onPress={() => displayAlert({name: stock.stockName, symbol: stock.stockSymbol})} // selecting a stock asks user to confirm action
          />
        );
      })}
    </View>
  );
};

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
