import * as React from "react";
import { Platform, StyleSheet, View, StatusBar } from "react-native";
import { NavigationContainer, DarkTheme } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StocksProvider } from "./contexts/StocksContext";
import LoginScreen from "./screens/LoginScreen";
import BottomTabNavigator from "./navigation/BottomTabNavigator";
import StockInfoScreen from "./screens/StockInfoScreen";
import NewsScreen from "./screens/NewsScreen";
import "react-native-gesture-handler";
import { MD3DarkTheme } from "react-native-paper";

const Stack = createStackNavigator();

const MyTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: MD3DarkTheme.colors.primary,
  },
};

export default function App(props) {
  return (
    <View style={styles.container}>
      <StocksProvider>
        {Platform.OS === "ios" && <StatusBar barStyle="default" />}
        <NavigationContainer theme={MyTheme}>
          <Stack.Navigator>
            {/* <Stack.Screen name="Login" component={LoginScreen} /> */}
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
