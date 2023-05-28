import React, {useState, useEffect} from "react";

async function getDailyData(symbol) {
    const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${symbol}&apikey=UDOKLGMRBPTAE3WC`;
    
    let res = await fetch(url);
    let data = await res.json();
    let values = data["Time Series (Daily)"];

    return values;
};

export function useDailyData(symbol) {
    
    function updateLabels(values) {
        if (values.length == 0) return null;

        const labels = [];
        for (let i = 0; i < 30; i++) {
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
        getDailyData(symbol)
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