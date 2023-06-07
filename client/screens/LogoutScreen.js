import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, View, TouchableWithoutFeedback, Keyboard, Text, Dimensions } from "react-native";
import { Button, MD3Colors, MD3DarkTheme } from "react-native-paper";
//import { useStocksContext } from "../contexts/StocksContext";
import { scaleSize } from "../constants/Layout";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';



export default function LogoutScreen() {
  //const { ServerURL, addToWatchlist} = useStocksContext();

  const [user, setUser] = useState("");
  const navigation = useNavigation();

  const getUserInfo = async () => {
    try {
      const tokens = await AsyncStorage.getItem("@Token");
      //console.log(tokens);
      if (tokens) {
        const token = JSON.parse(tokens);
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token.token}`,
          },
        };
  
        fetch("http://localhost:3001/users/getemail", options)
          .then((response) => response.json())
          .then((response) => {
            // Handle the response
            if (response.success) {
              setUser(response.user)
            } else {
              console.log("Could not fetch user info");
            }
          })
          .catch((err) => console.log(err));
      }
    } catch (error) {
      console.log(error);
    }
  };

  getUserInfo() // call function to update state with user info

  // const handleLogout = async () => {
  //   //try {
  //     //await AsyncStorage.removeItem('@Token');
  //     //await AsyncStorage.clear();
  //     //console.log("Token Cleared from AsyncStorage")
  //     console.log('Before clearing token');
  //     try {
  //       const token = await AsyncStorage.getItem('@Token');
  //       console.log('Token value:', token);
  //       await AsyncStorage.removeItem('@Token');
  //       console.log('Token Cleared from AsyncStorage');
  //       console.log('Token value:', token);
  //       navigation.navigate('Login');
  //     } catch (error) {
  //       console.log(error);
  //     } 
  //     //navigation.navigate('Login');
  //     // Handle the error, e.g., show an error message to the user
  
  // };

  const handleLogout = async () => {
      console.log('Before clearing token');
      try {
        const token = await AsyncStorage.getItem('@Token');
        console.log('Token value:', token);
        await AsyncStorage.removeItem('@Token');
        console.log('Token Cleared from AsyncStorage');
        console.log('Token value:', token);
        navigation.navigate('Login');
      } catch (error) {
        console.log(error);
      }   
  };

//   const handleLogout = async () => {
//     console.log('Before clearing token');
//     try {
//       const token = await AsyncStorage.getItem('@Token');
//       console.log('Token value:', token);
//       await AsyncStorage.removeItem('@Token');
//       console.log('Token Cleared from AsyncStorage');
//       const token2 = await AsyncStorage.getItem('@Token');
//       console.log('Token value:', token2);
//       navigation.navigate('Login');
//     } catch (error) {
//       console.log(error);
//     }   
// };


  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text style={styles.headerText}>Thank you for using <Text style={styles.stockStop}>StockStop</Text></Text>
        <Text style={styles.slogan}>Your one-stop shop for all info on the top-traded NASDAQ stocks</Text>
        <View style={styles.lineBreak}></View>
        <Text style={styles.subheaderText}>You are currently logged in as:</Text>
        <Text style={styles.userText}>{user}</Text>
        <Button
          icon="logout"
          mode="contained"
          contentStyle={{flexDirection: "row-reverse"}}
          buttonColor={MD3DarkTheme.colors.primary}
          labelStyle={styles.logoutText}
          style={styles.logoutButton}
          onPress={() => handleLogout()}
        >Logout</Button>
      </View>
    </TouchableWithoutFeedback>    
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
    justifyContent: "center"
  },
  headerText: {
    fontSize: scaleSize(25),
    color: "#fff",
    textAlign: "center",
    marginBottom: scaleSize(10),
  },
  stockStop: {
    fontSize: scaleSize(25),
    color: MD3Colors.primary50,
  },
  slogan: {
    fontSize: scaleSize(18),
    color: "#DFDFDF",
    textAlign: "center",
    marginBottom: scaleSize(20),
  },
  subheaderText: {
    fontSize: scaleSize(20),
    color: "#fff",
    textAlign: "center",
    marginTop: scaleSize(20),
    marginBottom: scaleSize(10),
  },
  userText: {
    fontSize: scaleSize(20),
    color: MD3DarkTheme.colors.primary,
    alignSelf: "center",
  },
  logoutText: {
    fontSize: scaleSize(18),
    color: "#000000",
  },
  logoutButton: {
    marginTop: scaleSize(30),
    width: scaleSize(200),
    alignSelf: "center",
  },
  lineBreak: {
    backgroundColor: "#A2A2A2",
    height: 2,
    width: Dimensions.get("window").width,
    marginTop: scaleSize(20),
    marginBottom: scaleSize(20),
  },
});