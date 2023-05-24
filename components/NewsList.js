import React from "react";
import { Linking, StyleSheet, View } from "react-native";
import { List } from "react-native-paper";
import { scaleSize } from "../constants/Layout";

export default function NewsList({headlines}) {
    return (
      <View>
        {headlines.map((headline) =>
          <List.Item
            title={headline.title}
            titleStyle={styles.title}
            titleNumberOfLines={3}
            key={headline.title}
            left={props => <List.Icon {...props} color={"#2b6777"} icon="newspaper-variant-outline"/>}
            onPress={() => Linking.openURL(headline.url)}
          />
        )}
      </View>
    );
  };

  const styles = StyleSheet.create({
    title: {
      color: "#fff",
      fontSize: scaleSize(14),
      fontWeight: "bold"
    }
  });
