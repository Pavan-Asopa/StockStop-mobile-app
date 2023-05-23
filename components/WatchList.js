import React from "react";
import { StyleSheet, View } from "react-native";
import { List } from "react-native-paper";
import { scaleSize } from "../constants/Layout";

export default function WatchList({stocks}) {

  console.log(stocks);

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
