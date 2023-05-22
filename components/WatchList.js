import React from 'react';
import { StyleSheet, View } from 'react-native';
import { List } from 'react-native-paper';
import { scaleSize } from '../constants/Layout';

export default function WatchList({stocks}) {
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
    },
  });
