import { LineChart } from "react-native-chart-kit";
import React from "react";
import { View, Text, StyleSheet } from "react-native";

const data = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43],
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
        strokeWidth: 2 // optional
      }
    ],
    legend: ["Rainy Days"] // optional
  };



export default function ClosingChart() {

    const data = {
        labels: ["January", "February", "March", "April", "May", "June"],
        datasets: [
          {
            data: [20, 45, 28, 80, 99, 43],
            color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
            strokeWidth: 2 // optional
          }
        ],
        legend: ["Rainy Days"] // optional
      };

      const chartConfig = {
        backgroundGradientFrom: "#1E2923",
        color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
        strokeWidth: 2, // optional, default 3
        barPercentage: 0.5,
        useShadowColorFromDataset: false // optional

      };

    return (
        <View>
            <Text>Line chart: </Text>
            <LineChart
                data={data}
                width={50}
                height={220}
                chartConfig={chartConfig}
            />
        </View>
    )
}