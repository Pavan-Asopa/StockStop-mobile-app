import { LineChart } from "react-native-chart-kit";
import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function ClosingChart() {

    const data = {
        labels: ["January", "February", "March", "April", "May", "June"],
        datasets: [
          {
            data: [20, 45, 28, 80, 99, 43],
            color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
            strokeWidth: 2
          },
          {
            data: [20, 45, 28, 80, 99, 43],
            color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
            strokeWidth: 2
          }
        ],
        legend: ["Rainy Days"]
      };

      const chartConfig = {
        backgroundGradientFrom: "#1E2923",
        color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
        strokeWidth: 2,
        barPercentage: 0.5,
        useShadowColorFromDataset: false
      };

    return (
        <View>
            <Text>Line chart:</Text>
            <LineChart
                data={data}
                width={500}
                height={220}
                chartConfig={chartConfig}
            />
        </View>
    );
};
