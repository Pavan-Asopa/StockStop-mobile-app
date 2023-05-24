import React, {useState} from "react";
import {Text, View, StyleSheet, ScrollView, Dimensions } from "react-native";
import { scaleSize } from "../constants/Layout";
import { useStockDescription } from "../components/StockDescription";
import { Button, Portal, Modal, PaperProvider, ActivityIndicator } from "react-native-paper";
import ClosingChart from "../components/ClosingChart";

export default function StockInfoScreen({route, navigation}) {
     
    const symbol = route.params.stock;
    const {description} = useStockDescription(symbol);

    const [visible, setVisible] = useState(false);
    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);

    if(!description){
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
              <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={styles.descContainer}>
                <Text style={styles.alert}>Click outside of this window to dismiss it.</Text>
                <Text>{'\n'}</Text>
                <Text>{description.description}</Text>
              </Modal>
            </Portal>
            <Button style={styles.descButton} onPress={showModal}>Display stock description</Button>
            <View style={styles.lineBreak} />
            <Button
              style={styles.newsButton}
              icon="newspaper-variant-multiple-outline"
              mode="contained-tonal"
              compact={true}
              onPress={() => navigation.push('News', {stock: symbol, name: description.stockName})}
            >Click for News</Button>
          </PaperProvider>
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
      loadingContainer: {
        flex: 1,
        backgroundColor: "#000000",
        alignItems: "center",
        justifyContent: "center",
      },
      descContainer: {
        backgroundColor: "#fff",
        marginTop: scaleSize(150),
        padding: scaleSize(20),
        height: scaleSize(400),
        width: scaleSize(325),
        justifyContent: "center",
        alignSelf: "center"
      },
      descButton: {
        marginTop: scaleSize(5),
      },
      alert :{
        fontStyle: "italic",
      },
      lineBreak: {
        backgroundColor: "#A2A2A2",
        height: 2,
        width: Dimensions.get("window").width,
        marginBottom: scaleSize(10),
      },
      name: {
        fontSize: scaleSize(25),
        alignSelf: "center",
        color: "#fff",
        fontWeight: "bold",
        paddingBottom: scaleSize(10),
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