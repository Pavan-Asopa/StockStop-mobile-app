import React, {useState} from "react";
import { View, Text, StyleSheet, Dimensions, SafeAreaView } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { ActivityIndicator, SegmentedButtons } from "react-native-paper";
import { scaleSize } from "../constants/Layout";
import { useDailyData } from "./DailyData";
import { useWeeklyData } from "./WeeklyData";

export default function ClosingChart({symbol}) {
  const daily = useDailyData(symbol); // fetch daily data from api
  const weekly = useWeeklyData(symbol); // fetch weekly data from api
  const [isWeekly, setIsWeekly] = useState(true); // default chart data will be the weekly data

  // if data are null or still loading
  if(!daily || !weekly || weekly.loading || daily.loading) {
    return (
      // return a mesage on the screen to let the user know data are loading
      <View style={styles.loadingContainer}>
        <Text style={styles.text}>Loading closing data</Text>
        <ActivityIndicator animating={true} />
      </View>
    );
  };
  
  // set labels for chart
  const labels = isWeekly ? weekly.labels : daily.labels;

  const hideLabelsDaily = [1,2,3,4,5,6,7,8,9,11,12,13,14,15,16,17,18,19,21,22,23,24,25,26,27,28,29];
  const hideLabelsWeekly = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,41,42,43,44,45,46,47,48,49,50,51,52];

  // set chart data
  const data = {
    labels: labels?.reverse() ?? [], // data labels are initially in order from present day --> backwards, so need to reverse for chart
    datasets: [
      {
        data: isWeekly ? weekly.timePoints : daily.timePoints, // timePoints was one of the keys of the object returned from api calls
        color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
        strokeWidth: 1
      }
    ],
    legend: isWeekly ? ["52-Week Closing Prices"] : ["30-Day Closing Prices"]
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
        xLabelsOffset={3}
        yAxisLabel={"$"}
        yAxisInterval={5}
        hidePointsAtIndex={isWeekly ? hideLabelsWeekly : hideLabelsDaily}
        verticalLabelRotation={-10}
        width={Dimensions.get("window").width}
        height={300}
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
    }
  }
);
