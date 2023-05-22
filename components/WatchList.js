import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { List } from 'react-native-paper';
import { useStocksContext } from '../contexts/StocksContext';
import { scaleSize } from '../constants/Layout';

export default function WatchList({stocks}) {
    const { ServerURL, watchList, addToWatchList } = useStocksContext();
    const [state, setState] = useState({ watchList });

    return (
      <View>
        {stocks.map((stock) => {
            <List.Item
              title={stock.name}
              titleStyle={styles.title}
              key={stock.symbol}
            />
        })}
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
