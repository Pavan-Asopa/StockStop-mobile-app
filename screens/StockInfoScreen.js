import {Text, View, StyleSheet, ScrollView, Dimensions } from "react-native";
import React from "react";
import { scaleSize } from "../constants/Layout";
import { useStockDescription } from "../components/StockDescription";
import { Button } from "react-native-paper";
import ClosingChart from "../components/ClosingChart";

export default function StockInfoScreen({route, navigation}) {
     
    const symbol = route.params.stock;
    const {description} = useStockDescription(symbol);

    if(!description){
      return <Text style = {styles.text}>Description loading . . . </Text>
    }

    return (
        <ScrollView style={styles.container}>
          <Text style={styles.name}>{description.stockName}</Text>
          <View style={styles.lineBreak} />
          <Text style={styles.details}>Sector: {description.sector}</Text>
          <Text style={styles.details}>Industry: {description.industry}</Text>
          <ScrollView
            style={styles.descContainer}
            showsVerticalScrollIndicator={true}
            persistentScrollbar={true}
          >
            <Text style={styles.details}>{description.description}</Text>
          </ScrollView>
          <View style={styles.lineBreak} />
          <Button
            style={styles.newsButton}
            icon="newspaper-variant-multiple-outline"
            mode="contained-tonal"
            compact={true}
            onPress={() => navigation.push('News', {stock: symbol, name: description.stockName})}
          >Click for News</Button>
          {/* <ClosingChart symbol={symbol}/> */}
        </ScrollView> 
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000000",
        padding: scaleSize(5),
      },
      descContainer: {
        flex: 1,
        backgroundColor: "#000000",
        height: scaleSize(100),
        borderColor: "#fff",
        borderStyle: "solid",
      },
      lineBreak: {
        backgroundColor: '#A2A2A2',
        height: 2,
        width: Dimensions.get("window").width,
      },
      name: {
        fontSize: scaleSize(25),
        alignSelf: "center",
        color: "#fff",
        fontWeight: "bold",
        paddingBottom: scaleSize(2),
      },
      details: {
        fontSize: scaleSize(18),
        color: "#fff",
        paddingBottom: scaleSize(2),
      },
      text: {
        fontSize: scaleSize(20),
        color: "#fff",
      },
      newsButton: {
        flex: 1,
        alignSelf: "center",
        width: scaleSize(200),
        marginTop: scaleSize(5),
      },
    }
);