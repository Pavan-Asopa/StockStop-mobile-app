import React,{ useState, useEffect } from 'react';
import {Text, StyleSheet } from "react-native";
import { scaleSize } from "../constants/Layout";

async function getStockDescription(symbol) {
    const url = `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${symbol}&apikey=UDOKLGMRBPTAE3WC`; // call api

    let res = await fetch(url);
    let data = await res.json();
    let sector = data.Sector.substring(0,1) + data.Sector.substring(1,).toLowerCase(); // format string (initially, text is all caps)
    let industry = data.Industry.substring(0,1) + data.Industry.substring(1,).toLowerCase(); // format string (initially, text is all caps)

    // return an object with stock description information
    return {
        stockName: data.Name,
        sector: sector,
        industry: industry,
        description: data.Description
    };
};

export function useStockDescription(symbol) {
    const [ loading, setLoading ] = useState(true);
    const [ error, setError ] = useState(null);
    const [ description, setDescription ] = useState([]);

    // useEffect to get the data (call the api) and error check
    useEffect(() => {
        getStockDescription(symbol)
            .then((res) => setDescription(res))
	        .catch((error) => setError(error.message))
            .finally(() => setLoading(false));
    }, [symbol]);

    // display feedback when information is loading
    if (loading) {
        return<Text style={styles.text}>Loading stock info...</Text>;
    }

    // display feedback when an error occurs
    if (error) {
        return<Text style={styles.text}>Something went wrong: {error}</Text>;
    }

    // return stock description object
    return { description };
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
