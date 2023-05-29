import React from "react";
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, View } from "react-native";
import { List } from "react-native-paper";
import { scaleSize } from "../constants/Layout";

// map each individual stock contained within the watchList to create a list of watched stocks
export default function WatchList({stocks}) {

  // declare a navigation constant to be able to use the useNavigation() hook later on
  const navigation = useNavigation();

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
              onPress={() => {navigation.push("StockInfo", {stock: stock.stockSymbol})}} // clicking on a stock navigates user to detailed stock info page
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
