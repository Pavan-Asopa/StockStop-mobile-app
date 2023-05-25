import React, {useState} from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { Button, ActivityIndicator } from "react-native-paper";
import { scaleSize } from "../constants/Layout";
import { useWeeklyData } from "./WeeklyData";
import { useDailyData } from "./DailyData";



export default function ClosingChart({symbol}) {

  const [allData, setAllData] = useState([]);
  function GetData(which) {
    if(which === "Daily"){
      setAllData(useDailyData(symbol));
      }
      else {
        setAllData(useWeeklyData(symbol));
      }

      if(!allData || allData.loading) {
        return (
          <View style={styles.loadingContainer}>
            <Text style={styles.text}>Loading closing data</Text>
            <ActivityIndicator animating={true} />
          </View>
        );
      };
  
  
    const labels = allData.labels?.reverse() ?? []; 

    const data = {
      labels: labels,
      datasets: [
        {
          data: allData.timePoints,
          color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
          strokeWidth: 1
        }
      ],
      legend: ["Daily Adjusted 30-day Closing Prices"]
    };
    }


    

  // const allWeeklyData = useWeeklyData(symbol);
  // if(!allWeeklyData || allWeeklyData.loading) {
  //   return (
  //     <View style={styles.loadingContainer}>
  //       <Text style={styles.text}>Loading closing data</Text>
  //       <ActivityIndicator animating={true} />
  //     </View>
  //   );
  // };

  // const labels = allWeeklyData.labels?.reverse() ?? []; 

  //   const data = {
  //       labels: labels,
  //       datasets: [
  //         {
  //           data: allWeeklyData.timePoints,
  //           color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  //           strokeWidth: 1
  //         }
  //       ],
  //       legend: ["52 Week Closing Prices"]
  //     };
  
  // const allDailyData = useDailyData(symbol);
  // if(!allDailyData || allDailyData.loading) {
  //   return (
  //     <View style={styles.loadingContainer}>
  //       <Text style={styles.text}>Loading closing data</Text>
  //       <ActivityIndicator animating={true} />
  //     </View>
  //   );
  // };

  // const labels = allDailyData.labels?.reverse() ?? []; 

  //   const data = {
  //       labels: labels,
  //       datasets: [
  //         {
  //           data: allDailyData.timePoints,
  //           color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  //           strokeWidth: 1
  //         }
  //       ],
  //       legend: ["Daily Adjusted 30-day Closing Prices"]
  //     };



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
              onPress={() => GetData("Daily")}
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
    loadingContainer: {
      flex: 1,
      backgroundColor: "#000000",
      alignItems: "center",
      justifyContent: "center",
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
