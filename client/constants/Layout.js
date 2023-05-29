import { Dimensions } from "react-native";

// function to account for displaying elements on screens of differing sizes
export function scaleSize(fontSize) {
  const window = Dimensions.get("window");
  return Math.round((fontSize / 375) * Math.min(window.width, window.height)); 
};
