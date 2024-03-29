import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  Text,
  View,
} from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { scaleSize } from "../constants/Layout";
import NewsList from "../components/NewsList";

async function getHeadlines(symbol) {
  const ALPHAVANTAGE_API_KEY = process.env.ALPHAVANTAGE_API_KEY;
  const url = `https://www.alphavantage.co/query?function=NEWS_SENTIMENT&tickers=${symbol}&limit=10&sort=LATEST,RELEVANCE&apikey=${ALPHAVANTAGE_API_KEY}`; // call api

  let res = await fetch(url);
  let data = await res.json();
  let articles = data.feed; // just get list of articles

  // return article titles and URLs
  return articles.map((article) => ({
    title: article.title,
    url: article.url,
  }));
}

export default function NewsScreen({ route, navigation }) {
  const name = route.params.name;
  const symbol = route.params.stock;
  const [headlines, setHeadlines] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // useEffect to get the data (call the api) and error check
  useEffect(() => {
    getHeadlines(symbol)
      .then((res) => setHeadlines(res))
      .catch((error) => setError(error.message))
      .finally(() => setLoading(false));
  }, [symbol]);

  // display feedback when news articles are loading
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.text}>Loading stock news</Text>
        <ActivityIndicator animating={true} />
      </View>
    );
  }

  // display feedback when an error occurs
  if (error) {
    return (
      <Text style={styles.text}>Something went wrong: {error.message}</Text>
    );
  }

  // return list of news articles, calling the NewsList component to style the list
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView indicatorStyle="white" style={styles.container}>
        <Text style={styles.header}>{name}</Text>
        <NewsList headlines={headlines.slice(0, 10)} />
      </ScrollView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: "#000000",
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    fontSize: scaleSize(20),
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
  },
  text: {
    fontSize: scaleSize(20),
    color: "#fff",
  },
});
