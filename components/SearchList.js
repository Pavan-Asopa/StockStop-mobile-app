import React from 'react';
import { StyleSheet, View } from 'react-native';
import { List } from 'react-native-paper';
import { useStocksContext } from '../contexts/StocksContext';
import { scaleSize } from '../constants/Layout';

export default function SearchList({stocks}) {
  const { addToWatchList } = useStocksContext();

    return (
      <View>
        {stocks.map((item) =>
          <List.Item
            title={item.name}
            titleStyle={styles.title}
            key={item.symbol}
            left={props => <List.Icon {...props} color={"#2b6777"} icon="plus-circle-outline"/>}
            onPress={() => addToWatchList(item)}
          />
        )}
      </View>
    );
  }

  const styles = StyleSheet.create({
    title: {
      color: '#fff',
      fontSize: scaleSize(20),
      fontWeight: 'bold'
    }
  });
