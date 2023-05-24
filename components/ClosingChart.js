import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { Button } from "react-native-paper";
import { scaleSize } from "../constants/Layout";
import { useWeeklyData } from "./WeeklyData";

export default function ClosingChart(symbol) {

  const allWeeklyData = useWeeklyData(symbol);

  if(!allWeeklyData) {
    return <Text styles={styles.text}>Loading Data . . .</Text>
  };

  const labels = allWeeklyData.labels?.reverse() ?? []; 

    const data = {
        labels: labels,
        datasets: [
          {
            data: allWeeklyData.timePoints,
            color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
            strokeWidth: 1
          }
        ],
        legend: ["52 Week Closing Prices"]
      };

      const chartConfig = {
        backgroundGradientFrom: "#1E2923",
        color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
        strokeWidth: 1,
        barPercentage: 0.5,
        useShadowColorFromDataset: false
      };

    return (
        <View>
            <View style={styles.toggleButtons}>
            <Button
              icon="chart-line"
              mode="contained"
              compact={true}
            >30-Days</Button>
            <Button
              icon="chart-line"
              mode="contained"
              compact={true}
            >52 Weeks</Button>
            <Button
              icon="chart-line"
              mode="contained"
              compact={true}
            >5 Years</Button>
            </View>
            <LineChart
                data={data}
                yAxisLabel={"$"}
                width={Dimensions.get("window").width}
                height={200}
                chartConfig={chartConfig}
            />
        </View>
    );
};

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: "#000000",
    },
    toggleButtons: {
      flexDirection: "row",
      justifyContent: "space-evenly"
    },
    text: {
      fontSize: scaleSize(20),
      color: "#fff",
    },
  }
);
