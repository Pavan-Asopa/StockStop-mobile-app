import React,{ useState, useEffect } from 'react';
import {Text, StyleSheet } from "react-native";
import { scaleSize } from "../constants/Layout";

async function getStockDescription(symbol) {
    const url = `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${symbol}&apikey=UDOKLGMRBPTAE3WC`;

    let res = await fetch(url);
    let data = await res.json();

    return {
        stockName: data.Name,
        sector: data.Sector,
        industry: data.Industry,
        description: data.Description
    };
}

export function useStockDescription(symbol) {
    const [ loading, setLoading ] = useState(true);
    const [ error, setError ] = useState(null);
    const [ description, setDescription ] = useState([]);

    useEffect(() => {
        getStockDescription(symbol)
            .then((res) => setDescription(res))
	        .catch((error) => setError(error.message))
            .finally(() => setLoading(false));
    }, [symbol]);

    if (loading) {
        return<Text style = {styles.text}>Loading stock info...</Text>;
    }

    if (error) {
        return<Text style = {styles.text}>Something went wrong: {error}</Text>;
    }

    return { description };
}

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