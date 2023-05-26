import React, { useState } from 'react';
import { StyleSheet, View, Text, Alert } from 'react-native';
import { Button, List, Dialog, Portal, PaperProvider } from 'react-native-paper';
import { useStocksContext } from '../contexts/StocksContext';
import { scaleSize } from '../constants/Layout';

export default function SearchList({stocks}) {

  const {ServerURL, watchList, addToWatchList } = useStocksContext();

  const displayAlert = (props) => {
    console.log(props);
    return (
      Alert.alert("Confirm action", `Are you sure you want to add ${props.name} to your WatchList?`,
      [
        {
          text: "Cancel", 
          onPress: () => console.log("Cancel"),
        },
        {
          text: "Confirm",
          onPress: () => addToWatchList({stockName: props.name, stockSymbol: props.symbol})
        }
      ])
    );
  };

  if (stocks.length === 0) {
    return (
      <View>
        <Text style={styles.emptyHeader}>No stocks meet the searched criteria.{"\n"}</Text>
        <Text style={styles.emptyMessage}>Please try again.</Text>
      </View>
    );
  }
  else {
    return (
          <View>
            {stocks.map((item) =>
              <List.Item
                title={item.name}
                titleStyle={styles.title}
                key={item.symbol}
                left={props => <List.Icon {...props} color={"#2b6777"} icon="plus-circle-outline"/>}
                onPress={() => displayAlert({name: item.name, symbol: item.symbol})}
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
