import React, { useState, useEffect } from "react";

async function getDailyData(symbol) {
  const ALPHAVANTAGE_API_KEY = process.env.ALPHAVANTAGE_API_KEY;
  const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${symbol}&apikey=${ALPHAVANTAGE_API_KEY}`; // call api

  let res = await fetch(url);
  let data = await res.json();
  let values = data["Time Series (Daily)"]; // data contains metadata along with the data, only return the data

  return values;
}

export function useDailyData(symbol) {
  function updateLabels(values) {
    // ensure data have been returned before trying to iterate over values
    if (values.length == 0) return null;

    // the values returned from getDailyData have keys corresponding to each date
    // we want to push each date into the labels array and use these for the chart's x-axis
    const labels = [];
    for (let i = 0; i < 30; i++) {
      labels.push(Object.keys(values)[i]);
    }

    return labels;
  }

  function updateTimePoints(values) {
    // first ensure that both values and labels are not null
    if (values.length == 0) return null;
    if (labels.length == 0) return null;

    // the values returned from getDailyData are the actual closing prices
    // we want to push each closing price into the timePoints array and use these for the chart's data points
    const timePoints = [];
    for (let i = 0; i < labels.length; i++) {
      const label = labels[i];
      timePoints.push(values[label]["5. adjusted close"]);
    }

    return timePoints;
  }

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [values, setValues] = useState([]);

  // use effect to get the data (call the api) and error check
  useEffect(() => {
    getDailyData(symbol)
      .then((res) => setValues(res))
      .catch((error) => setError(error.message))
      .finally(() => setLoading(false));
  }, [symbol]);

  // call updateLabels to set labels
  const labels = updateLabels(values);

  // return an object with labels, timePoints, and loading & error information
  // will be used to create a line chart
  return {
    labels: updateLabels(values),
    timePoints: updateTimePoints(values),
    loading,
    error,
  };
}
