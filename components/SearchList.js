import React from 'react';
import { StyleSheet, View } from 'react-native';
import { List } from 'react-native-paper';

export default function SearchList({stocks}) {
    return (
      <View>
        {stocks.map((item) =>
          <List.Item
            title={item.name}
            titleStyle={styles.title}
            left={props => <List.Icon {...props} color={"#2b6777"} icon="plus-circle-outline"/>}
          />
        )}
      </View>
    );
  }

  const styles = StyleSheet.create({
    title: {
      color: '#fff',
      fontSize: 20,
      fontWeight: 'bold'
    }
  });
