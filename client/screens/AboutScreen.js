import React from "react";
import { StyleSheet, View, Image, Text, ScrollView, Dimensions } from "react-native";
import { MD3Colors, MD3DarkTheme, List } from "react-native-paper";
import { scaleSize } from "../constants/Layout";
import { FontAwesome } from '@expo/vector-icons';
const image = require ('../assets/images/stock-market.jpg');

// about screen displays important information about the application
export default function AboutScreen({ navigation }) {

  return (
    <ScrollView indicatorStyle="white" style={styles.container}>
      <View>
        <Text style={styles.headerText}>
          About <Text style={styles.stockStop}>StockStop </Text>
          <FontAwesome name="line-chart" size={scaleSize(25)} color={MD3Colors.primary50} style={styles.logo} />
        </Text>
        <Text style={styles.slogan}>
          Your one-stop shop for all info on the top-traded NASDAQ stocks
        </Text>
        <Image source={image} style={styles.image} />
        <Text style={styles.text}>
            StockStop was created as a helpful resource for anyone interested in learning about the most 
            actively traded stocks on one of the largest stock exchanges in the world, the NASDAQ Exchange.
        </Text>
        <Text style={styles.text}>
            Three APIs were used to fetch the data displayed throughout this application:
        </Text>
        <List.Item
          title="Twelve Data"
          titleStyle={styles.title}
          left={props => <List.Icon {...props} icon="database" color={MD3DarkTheme.colors.primary}/>}
        />
        <List.Item
          title="Alpha Vantage"
          titleStyle={styles.title}
          left={props => <List.Icon {...props} icon="database" color={MD3DarkTheme.colors.primary}/>}
        />
        <List.Item
          title="Financial Modeling Prep"
          titleStyle={styles.title}
          left={props => <List.Icon {...props} icon="database" color={MD3DarkTheme.colors.primary}/>}
        />
        <Text style={styles.text}>
            This application was created by Joanna Salerno and Pavan Asopa.
        </Text>
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
  text: {
    fontSize: scaleSize(18),
    color: "#fff",
    paddingTop: scaleSize(20),
    paddingBottom: scaleSize(20),
    marginLeft: scaleSize(20),
    marginRight: scaleSize(20),
  },
  title: {
    color: MD3DarkTheme.colors.primary,
    fontSize: scaleSize(18),
  },
});
