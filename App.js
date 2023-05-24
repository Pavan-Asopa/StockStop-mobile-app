import * as React from "react";
import { Platform, StyleSheet, View, StatusBar } from "react-native";
import { NavigationContainer, DarkTheme } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import BottomTabNavigator from "./navigation/BottomTabNavigator";
import { StocksProvider } from "./contexts/StocksContext";
import StockInfoScreen from "./screens/StockInfoScreen";
import NewsScreen from "./screens/NewsScreen";
import "react-native-gesture-handler";


const Stack = createStackNavigator();

export default function App(props) {
  return (
    <View style={styles.container}>
      <StocksProvider>
        {Platform.OS === "ios" && <StatusBar barStyle="default" />}
        <NavigationContainer theme={DarkTheme}>
          <Stack.Navigator>
            <Stack.Screen name="Home" component={BottomTabNavigator} options={{ headerShown: false }}/>
            <Stack.Screen name="StockInfo" component={StockInfoScreen} />
            <Stack.Screen name="News" component={NewsScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </StocksProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
