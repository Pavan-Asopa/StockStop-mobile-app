import React from "react";
import { Linking, StyleSheet, View } from "react-native";
import { useTheme } from "@react-navigation/native";
import { List } from "react-native-paper";
import { scaleSize } from "../constants/Layout";

// map each individual headline to create a list of headlines
export default function NewsList({ headlines }) {
  // ensuring consistent styling and colours with useTheme()
  const { colors } = useTheme();

  return (
    <View>
      {headlines.map((headline) => (
        <List.Item
          title={headline.title}
          titleStyle={styles.title}
          titleNumberOfLines={3}
          key={headline.title}
          left={(props) => (
            <List.Icon
              {...props}
              color={colors.primary}
              icon="newspaper-variant-outline"
            />
          )}
          onPress={() => Linking.openURL(headline.url)} // clicking on a headline navigates user to article in web browser
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    color: "#fff",
    fontSize: scaleSize(14),
    fontWeight: "bold",
  },
});
