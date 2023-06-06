import React, {useState} from "react";
import { Text, View, StyleSheet, ScrollView, Dimensions, Image } from "react-native";
import { scaleSize } from "../constants/Layout";
import { useStockDescription } from "../components/StockDescription";
import { Button, Portal, Modal, PaperProvider, ActivityIndicator, Dialog, MD3DarkTheme, MD3Colors } from "react-native-paper";
import ClosingChart from "../components/ClosingChart";
import { useStockLogo } from "../components/StockLogo";

export default function StockInfoScreen({route, navigation}) {
     
  const symbol = route.params.stock;
  const {description} = useStockDescription(symbol);
  const logo = useStockLogo(symbol);

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
      <PaperProvider>
        <Text style={styles.name}>{description.stockName}</Text>
        <View style={styles.lineBreak} />
        <View style={styles.descContainer}>
            <Text style={styles.details}>
              <Image style={styles.logo} src={logo} />
              <Text style={styles.bold}>Sector: </Text>{description.sector}{'\n'}
              <Text style={styles.bold}>Industry: </Text>{description.industry}
            </Text>
        </View>
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
          labelStyle={styles.descriptionButton}
          textColor={MD3Colors.primary50}
          onPress={showDialog}
        >Display stock description</Button>
        <View style={styles.lineBreak} />
        <Text style={styles.chartHeader}>Closing Data</Text>
        <ClosingChart symbol={symbol} />
        <View style={styles.lineBreak} />
        <Text style={styles.newsHeader}>Want to get inside news?</Text>
        <Button
          style={styles.newsButton}
          icon="newspaper-variant-multiple-outline"
          mode="contained"
          buttonColor={MD3Colors.primary50}
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
  descContainer: {
    flex: 1,
    alignItems: "flex-start",
  },
  descriptionButton: {
    flex: 1,
    alignSelf: "center",
    fontSize: scaleSize(18),
    width: scaleSize(250),
    marginTop: scaleSize(5),
  },
  newsButton: {
    flex: 1,
    alignSelf: "center",
    width: scaleSize(150),
    marginTop: scaleSize(5),
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
    color: MD3DarkTheme.colors.primary,
    fontWeight: "bold",
  },
  details: {
    fontSize: scaleSize(18),
    color: "#fff",
    paddingBottom: scaleSize(2),
  },
  bold: {
    fontWeight: "bold",
  },
  text: {
    fontSize: scaleSize(20),
    color: "#fff",
  },
  logo: {
    width: scaleSize(50),
    height: scaleSize(50),
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
});
