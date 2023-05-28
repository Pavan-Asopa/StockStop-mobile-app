import React, {useState} from "react";
import {Text, View, StyleSheet, ScrollView, Dimensions } from "react-native";
import { scaleSize } from "../constants/Layout";
import { useStockDescription } from "../components/StockDescription";
import { Button, Portal, Modal, PaperProvider, ActivityIndicator, Dialog } from "react-native-paper";
import ClosingChart from "../components/ClosingChart";

export default function StockInfoScreen({route, navigation}) {
     
    const symbol = route.params.stock;
    const {description} = useStockDescription(symbol);

    const [visible, setVisible] = useState(false);
    const showDialog = () => setVisible(true);
    const hideDialog = () => setVisible(false);

    if(!description) {
      return (
        <View style={styles.loadingContainer}>
          <Text style={styles.text}>Loading stock description</Text>
          <ActivityIndicator animating={true} />
        </View>
      );
    };

    return (
        <ScrollView style={styles.container}>
          <Text style={styles.name}>{description.stockName}</Text>
          <View style={styles.lineBreak} />
          <Text style={styles.details}>Sector: {description.sector}</Text>
          <Text style={styles.details}>Industry: {description.industry}</Text>
          <PaperProvider>
            <Portal>
              <Dialog visible={visible} onDismiss={hideDialog}>
                <Dialog.Title>{description.stockName}</Dialog.Title>
                <Dialog.Content>
                  <Text variant="bodyMedium">{description.description}</Text>
                </Dialog.Content>
                <Dialog.Actions>
                  <Button onPress={hideDialog}>Dismiss</Button>
                </Dialog.Actions>
              </Dialog>
            </Portal>
            <Button 
              style={styles.descriptionButton}
              mode="outlined"
              textColor="#fff"
              compact={true}
              onPress={showDialog}
            >Display stock description</Button>
            <View style={styles.lineBreak} />
            <Text style={styles.chartHeader}>Closing Data</Text>
            <ClosingChart symbol={symbol}/>
            <View style={styles.lineBreak} />
            <Text style={styles.newsHeader}>Want to get inside news?</Text>
            <Button
              style={styles.newsButton}
              icon="newspaper-variant-multiple-outline"
              //mode="contained-tonal"
              textColor="#fff"
              onPress={() => navigation.push('News', {stock: symbol, name: description.stockName})}
            >Click here</Button>
          </PaperProvider>
        </ScrollView> 
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000000",
        padding: scaleSize(5),
      },
      loadingContainer: {
        flex: 1,
        backgroundColor: "#000000",
        alignItems: "center",
        justifyContent: "center",
      },
      descriptionButton: {
        flex: 1,
        alignSelf: "center",
        width: scaleSize(200),
        marginTop: scaleSize(5),
      },
      newsButton: {
        flex: 1,
        alignSelf: "center",
      },
      lineBreak: {
        backgroundColor: "#A2A2A2",
        height: 2,
        width: Dimensions.get("window").width,
        marginTop: scaleSize(10),
        marginBottom: scaleSize(10),
      },
      name: {
        fontSize: scaleSize(25),
        alignSelf: "center",
        color: "#fff",
        fontWeight: "bold",
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
      chartHeader: {
        fontSize: scaleSize(20),
        alignSelf: "center",
        color: "#fff",
        fontWeight: "bold",
        paddingBottom: scaleSize(5),
      },
      newsHeader: {
        fontSize: scaleSize(18),
        alignSelf: "center",
        color: "#fff",
        fontWeight: "bold",
        paddingBottom: scaleSize(5),
      },
    }
);
