import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { List } from 'react-native-paper';
import { useStocksContext } from '../contexts/StocksContext';
import { scaleSize } from '../constants/Layout';

export default function SearchList({stocks}) {

  const {ServerURL, watchList, addToWatchList } = useStocksContext();
  
  console.log(stocks.length); // logging this to try to debug displaying no filtered stocks

  if (stocks.length === 0) {
    return (
      <View>
        <Text styles={styles.emptyHeader}>No stocks meet the searched criteria.{"\n"}</Text>
        <Text styles={styles.emptyMessage}>Please try again.</Text>
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
            onPress={() => addToWatchList({stockName: item.name, stockSymbol: item.symbol})}
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
});
