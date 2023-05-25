import React, {useState, useEffect} from "react";

async function getDailyData(symbol) {
    const url = `https://api.twelvedata.com/time_series?symbol=${symbol}&interval=1day&apikey=f6c31332ded14e9ea847dffce4489c6a`;
    
    let res = await fetch(url);
    let data = await res.json();
    let values = data.values;

    return values;
}

export function useDailyData(symbol) {

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
        getDailyData(symbol)
            .then((res) => setValues(res))
            .then((data) => 
                data.map(stock => {
                    return {
                        date: stock.datetime,
                        close: stock.close
                    };
                }))
        .then(timeSeries => setRowData(timeSeries))
        .catch((error) => setError(error.message))
        .finally(() => setLoading(false))
    }, [symbol]);

    if (loading) {
        return<p>Loading time series data...</p>;
    }

    if (error) {
        return<p>Something went wrong: {error}</p>;
    }

    const labels = updateLabels(values);

    return {
        labels: updateLabels(values),
        timePoints: updateTimePoints(values),
        loading,
        error
    };
};
