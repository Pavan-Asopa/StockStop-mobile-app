import * as React from "react";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";

// ensures consistent styling of the icons that make up the BottomTabNavigator
export default function TabBarIcon(props) {

  const {colors} = useTheme()

  return (
    <Ionicons
      name={props.name}
      size={30}
      style={{ marginBottom: -3 }}
      color={props.focused ? colors.primary : colors.text }
    />
  );
};
