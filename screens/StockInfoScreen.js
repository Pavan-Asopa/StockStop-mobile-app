import {Text, View, StyleSheet } from "react-native";
import React from "react";
import { scaleSize } from "../constants/Layout";
import { useStockDescription } from "../components/StockDescription";


export default function StockInfoScreen({route, navigation}) {
     
    //const {itemId} = route.params;
    //console.log(itemId); 
    const {description} = useStockDescription("AAPL");
    console.log(description);

    return (
        <View style = {styles.container}>
             <Text style = {styles.text}> ...</Text>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000000",
      },
      text: {
        fontSize: scaleSize(20),
        color: "#fff",
      },
    }
);