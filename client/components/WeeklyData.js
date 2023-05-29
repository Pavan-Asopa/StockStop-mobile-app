import React, { useState, useEffect } from "react";

async function getWeeklyData(symbol) {
    const url = `https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY_ADJUSTED&symbol=${symbol}&apikey=UDOKLGMRBPTAE3WC`; // call api

    let res = await fetch(url);
    let data = await res.json();
    let values = data["Weekly Adjusted Time Series"]; // data contains metadata along with the data, only return the data

    return values;
};

export function useWeeklyData(symbol) {
    
    function updateLabels(values) {
        // ensure data have been returned before trying to iterate over values
        if (values.length == 0) return null;

        // the values returned from getWeeklyData have keys corresponding to each date
        // we want to push each date into the labels array and use these for the chart's x-axis
        const labels = [];
        for (let i = 0; i < 52; i++) {
            labels.push(Object.keys(values)[i]);
        };

        return labels;
    }

    function updateTimePoints(values) {
        // first ensure that both values and labels are not null
        if (values.length == 0) return null;
        if (labels.length == 0) return null;

        // the values returned from getWeeklyData are the actual closing prices
        // we want to push each closing price into the timePoints array and use these for the chart's data points
        const timePoints = [];
        for (let i = 0; i < labels.length; i++) {
            const label = labels[i];
            timePoints.push(values[label]["5. adjusted close"]);
        };

        return timePoints;
    }

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [values, setValues] = useState([]);

    // useEffect to get the data (call the api) and error check
    useEffect(() => {
        getWeeklyData(symbol)
            .then((res) => setValues(res))
            .catch((error) => setError(error.message))
            .finally(() => setLoading(false))
    }, [symbol]);

    // call updateLabels to set labels
    const labels = updateLabels(values);
    
    // return an object with labels, timePoints, and loading & error information
    // will be used to create a line chart
    return {
        labels: updateLabels(values),
        timePoints: updateTimePoints(values),
        loading,
        error
    };
};
