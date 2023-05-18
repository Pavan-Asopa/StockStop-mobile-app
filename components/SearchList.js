import React, { useState } from 'react';
import { StyleSheet, View, TouchableWithoutFeedback, Keyboard, Text, FlatList } from 'react-native';
import { List } from 'react-native-paper';

export default function SearchList({stocks}) {
    return (
      <View>
        {stocks.map((item) =>
          <List.Item
            title={item.name}
            titleStyle={styles.title}
            left={props => <List.Icon {...props} color={"#2b6777"} icon="arrow-right-drop-circle-outline"/>}
            //onPress={() => }
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
    },
  // use scaleSize(x) to adjust sizes for small/large screens
  });
