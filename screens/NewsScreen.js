import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, TouchableWithoutFeedback, Keyboard, Text } from 'react-native';
import { Searchbar } from 'react-native-paper';
import { scaleSize } from '../constants/Layout';
import { Ionicons } from '@expo/vector-icons';

import NewsList from '../components/NewsList';

async function getHeadlines(symbol) {    
    const url = `https://www.alphavantage.co/query?function=NEWS_SENTIMENT&tickers=${symbol}&limit=10&sort=LATEST,RELEVANCE&apikey=UDOKLGMRBPTAE3WC`

    let res = await fetch(url);
    let data = await res.json();
    let articles = data.feed;

    return articles.map((article) => ({
        title: article.title,
        url: article.url
    }));
}

export default function NewsScreen({ navigation }) {
  const [headlines, setHeadlines] = useState([]);
  const [symbol, setSymbol] = useState("AAPL");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getHeadlines(symbol)
      .then(res => setHeadlines(res))
      .catch((error) => setError(error.message))
      .finally(() => setLoading(false))
  }, [symbol]);

  if (loading) {
    return (
      <Text>
        Loading stock news...
      </Text>
    );
  }

  if (error) {
    return (
      <Text>
        Something went wrong: {error.message}
      </Text>
    );
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView style={styles.container}>
        <NewsList headlines={headlines.slice(0,10)} />
      </ScrollView>
    </TouchableWithoutFeedback>    
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
});
