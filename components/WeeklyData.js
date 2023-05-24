import React, { useState, useEffect } from "react";

async function getWeeklyData(symbol) {
    const url = `https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY_ADJUSTED&symbol=${symbol}&apikey=${process.env.REACT_APP_ALPHAVANTAGE_APIKEY}`;
    let res = await fetch(url);
    let data = await res.json();
    let values = data["Weekly Adjusted Time Series"];

    return values;
};

export function useWeeklyData(symbol) {
    
    function updateLabels(values) {
        if (values.length == 0) return null;

        const labels = [];
        for (let i = 0; i < 52; i++) {
            labels.push(Object.keys(values)[i]);
        };

        return labels;
    }

    function updateTimePoints(values) {
        if (values.length == 0) return null;
        if (labels.length == 0) return null;

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

    useEffect(() => {
        getWeeklyData(symbol)
            .then((res) => setValues(res))
            .catch((error) => setError(error.message))
            .finally(() => setLoading(false))
    }, [symbol]);

    const labels = updateLabels(values);

    return {
        labels: updateLabels(values),
        timePoints: updateTimePoints(values),
        loading,
        error
    };
};
