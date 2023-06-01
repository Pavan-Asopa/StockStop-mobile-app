import React, {useState} from "react";
import { View, Text, StyleSheet, Dimensions, SafeAreaView } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { Button, ActivityIndicator, SegmentedButtons } from "react-native-paper";
import { scaleSize } from "../constants/Layout";
import { useDailyData } from "./DailyData";
import { useWeeklyData } from "./WeeklyData";

export default function ClosingChart({symbol}) {
  const daily = useDailyData(symbol);
  const weekly = useWeeklyData(symbol);  // fetch weekly data from api
  const [isWeekly, setIsWeekly] = useState(true);


  // if all data is null or still loading
  if(!daily || !weekly || weekly.loading || daily.loading) {
    return (
      // return a mesage on the screen to let the user know data are loading
      <View style={styles.loadingContainer}>
        <Text style={styles.text}>Loading closing data</Text>
        <ActivityIndicator animating={true} />
      </View>
    );
  };
  

  const labels = isWeekly ? weekly.labels : daily.labels;


  // set data based on allData
  const data = {
    labels: labels?.reverse() ?? [],   // data labels are initially in order from present day --> backwards, so need to reverse for chart
    datasets: [
      {

        data: isWeekly ? weekly.timePoints : daily.timePoints,  // timePoints was one of the keys of the object returned from api calls
        color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
        strokeWidth: 1
      }
    ],
    legend: isWeekly ? ["52-week closing prices"] : ["30 day closing prices"]
  };

  // define chart configuations, including colours and styles
  const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 1,
    barPercentage: 0.5,
    useShadowColorFromDataset: false
  };

  // function returns a line chart with buttons to toggle between daily and weekly data
  return (
    <View>
      <SafeAreaView style={styles.container}>
        <SegmentedButtons
          value={isWeekly}
          onValueChange={setIsWeekly}
          density="small"
          buttons={[
          {
            value: false,
            label: "Daily Data",
            icon: "calendar-today",
          },
          {
            value: true,
            label: "Weekly Data",
            icon: "calendar-week",
          },
          ]} 
        />
        </SafeAreaView>
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
    text: {
      fontSize: scaleSize(20),
      color: "#fff",
    },
  }
);
