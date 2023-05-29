import React, {useState} from "react";
import { View, Text, StyleSheet, Dimensions, SafeAreaView } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { Button, ActivityIndicator, SegmentedButtons } from "react-native-paper";
import { scaleSize } from "../constants/Layout";
import { useDailyData } from "./DailyData";
import { useWeeklyData } from "./WeeklyData";

export default function ClosingChart({symbol}) {
  const allData = useWeeklyData(symbol); // fetch weekly data from api
  // const [allData, setAllData] = useState(defaultData);

  const [buttonValue, setButtonValue] = useState("weekly");

  // set allData based on which button the user clicked
  const getData = (which) => {
    if (which === "daily") {
      const newData = useDailyData(symbol) 
      // setAllData(newData);
    } else {
      const newData = useWeeklyData(symbol) 
      // setAllData(newData);
    }};

  // if all data is null or still loading
  if(!allData || allData.loading) {
    return (
      // return a mesage on the screen to let the user know data are loading
      <View style={styles.loadingContainer}>
        <Text style={styles.text}>Loading closing data</Text>
        <ActivityIndicator animating={true} />
      </View>
    );
  };
  
  // data labels are initially in order from present day --> backwards, so need to reverse for chart
  const labels = allData.labels?.reverse() ?? []; 

  // set data based on allData
  const data = {
    labels: labels,
    datasets: [
      {
        data: allData.timePoints, // timePoints was one of the keys of the object returned from api calls
        color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
        strokeWidth: 1
      }
    ],
    legend: ["Prices"]
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
          value={buttonValue}
          onValueChange={setButtonValue}
          density="small"
          buttons={[
          {
            value: "weekly",
            label: "Daily Data",
            icon: "calendar-today",
          },
          {
            value: "weekly",
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
