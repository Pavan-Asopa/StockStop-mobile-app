import {Text, StyleSheet, ScrollView } from "react-native";
import React from "react";
import { scaleSize } from "../constants/Layout";
import { useStockDescription } from "../components/StockDescription";
import { Button } from "react-native-paper";
import ClosingChart from "../components/ClosingChart";


export default function StockInfoScreen({route, navigation}) {
     
    const itemId = route.params.stock;
    const {description} = useStockDescription(itemId);


    if(!description){
      return <Text style = {styles.text}>Descritpion Loading . . . </Text>
    }
    

    return (
        <ScrollView style = {styles.container}>
             <Text style = {styles.text}>
               {description.stockName}
             </Text>
             <Text style = {styles.text}>
                Sector: {description.sector}
             </Text>
             <Text style = {styles.text}>
                Industry: {description.industry}
             </Text>
             <ScrollView>
                <Text style = {styles.text}>
                    Description: {description.description}
                </Text>
             </ScrollView>
             <Button 
             icon = "newspaper-variant-multiple-outline" 
             mode="contained-tonal" 
             onPress={() => navigation.push('News', {stock: itemId})}>
              Click for News</Button>
              <ClosingChart/>
        </ScrollView> 
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000000",
      },
      des_container: {
        flex: 1,
        backgroundColor: "#000000",
      },
      text: {
        fontSize: scaleSize(20),
        color: "#fff",
      },
    }
);