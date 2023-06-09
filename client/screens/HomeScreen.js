import React, { useState, useEffect } from "react";
import { StyleSheet, View, Image, Text, ScrollView, Dimensions, Icon } from "react-native";
import { MD3Colors, MD3DarkTheme, List, Button } from "react-native-paper";
import { useStocksContext } from "../contexts/StocksContext";
import { scaleSize } from "../constants/Layout";
import { FontAwesome } from '@expo/vector-icons';
const image = require ('../assets/images/nasdaq.jpg');

export default function HomeScreen({ navigation }) {
  const { ServerURL, addToWatchlist } = useStocksContext();
  const [state, setState] = useState({ /* FixMe: initial state here */ });

  return (
    <ScrollView indicatorStyle="white" style={styles.container}>
      <View>
        <Text style={styles.headerText}>
          Welcome to <Text style={styles.stockStop}>StockStop </Text>
          <FontAwesome name="line-chart" size={scaleSize(25)} color={MD3Colors.primary50} style={styles.logo} />
        </Text>
        <Text style={styles.slogan}>
          Your one-stop shop for all info on the top-traded NASDAQ stocks
        </Text>
        <Image source={image} style={styles.image} />
        <Text style={styles.info}>StockStop in 4 Simple Steps:</Text>
        <List.Item
          title="Search"
          titleStyle={styles.title}
          description="Browse and filter all available stocks on the search screen"
          descriptionStyle={styles.description}
          left={props => <List.Icon {...props} icon="numeric-1-circle-outline" color={MD3DarkTheme.colors.primary}/>}
        />
        <List.Item
          title="Add"
          titleStyle={styles.title}
          description="Click on a stock to add it to your WatchList"
          descriptionStyle={styles.description}
          left={props => <List.Icon {...props} icon="numeric-2-circle-outline" color={MD3DarkTheme.colors.primary}/>}
        />
        <List.Item
          title="Learn"
          titleStyle={styles.title}
          description="Click on stocks in your WatchList to view more detailed information"
          descriptionStyle={styles.description}
          left={props => <List.Icon {...props} icon="numeric-3-circle-outline" color={MD3DarkTheme.colors.primary}/>}
        />
        <List.Item
          title="Manage"
          titleStyle={styles.title}
          description="Delete stocks from your WatchList when you no longer wish to track them"
          descriptionStyle={styles.description}
          left={props => <List.Icon {...props} icon="numeric-4-circle-outline" color={MD3DarkTheme.colors.primary}/>}
        />
        <Button
          icon="information-outline"
          mode="contained"
          contentStyle={{flexDirection: "row-reverse"}}
          labelStyle={styles.buttonLabel}
          buttonColor={MD3Colors.primary80}
          style={styles.button}
          onPress={() => navigation.push("About")}
        >About StockStop</Button>
      </View>
    </ScrollView>    
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
  },
  headerText: {
    fontSize: scaleSize(25),
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: scaleSize(10),
    marginTop: scaleSize(10),
  },
  stockStop: {
    fontSize: scaleSize(25),
    color: MD3Colors.primary50,
    fontWeight: "bold",
  },
  slogan: {
    fontSize: scaleSize(18),
    color: "#DFDFDF",
    textAlign: "center",
    marginBottom: scaleSize(20),
  },
  image: {
    borderRadius: scaleSize(10),
    width: Dimensions.get("screen").width,
    height: scaleSize(200),
  },
  info: {
    fontSize: scaleSize(20),
    color: MD3DarkTheme.colors.primary,
    marginTop: scaleSize(20),
  },
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
  buttonLabel: {
    fontSize: scaleSize(18),
    color: "#000000"
  },
  button: {
    marginTop: scaleSize(20),
    width: scaleSize(200),
    alignSelf: "center",
    marginBottom: scaleSize(20),
  },
});