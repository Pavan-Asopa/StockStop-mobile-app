import React, {useState} from 'react';
import { TextInput, HelperText, MD3Colors, Button, MD3DarkTheme } from 'react-native-paper';
import { View, StyleSheet, Text, Alert, TouchableOpacity } from "react-native";
import { scaleSize } from '../constants/Layout';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const API_URL = `http://localhost:3001`;

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [hidePass, setHidePass] = useState(true);

  const [token, setToken] = useState("");

  const navigation = useNavigation();
  
  const onChangeEmail = (email) => {
    if (!email.includes("@") || !email.includes(".")) { // ensure email follows appropriate format (contains @ and .)
      setEmailError(true);
    } else { 
      setEmailError(false);
    }
    setEmail(email); // set email as text input changes
  };

  // as text input in password field changes, check for errors
  const onChangePassword = (password) => {
    if (password.length < 6 || !/\d/.test(password)) { // ensure password is at least 6 characters long and includes at least 1 number
      setPasswordError(true);
    } else { 
      setPasswordError(false);
    }
    setPassword(password); // set password as text input changes
  };
 
  // function to handle actions when user clicks the login button
  const handleLogin = () => {
    // ensure that all fields have been completed and there are no errors before sending login request
    if (email !== "" && password !== "" && !emailError && !passwordError) {
      console.log("Calling login function");
      login(); // call login function
    } else {
      if (email === "" || password === "" || emailError || passwordError) {
        return (
          Alert.alert("Error", "Your email and/or password do not follow the appropriate formats. Please fix and try again.",
        ));
      }
    }
  };

  const clearForm = () => {
    setPassword("");
  }

  const login = async () => {
    try {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({email: email, password: password}),
      };
  
      fetch("http://localhost:3001/users/login", options)
        .then((response) => response.json())
        .then((response) => {
          if(response.success){
            setToken(response);
            AsyncStorage.setItem("@Token", JSON.stringify(response));
            navigation.navigate("Home", {token: response});
          } else {
            return (
              Alert.alert("Error", "Invalid login credentials. Please try again.",
                [
                  {
                    text: "Ok",
                  },
                ]
              )
            );
          }
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.error(error);
    } finally {
      clearForm();
    }

  };

  return (
    <TouchableOpacity>
      <View style={styles.break}></View>
      <Text style={styles.text}>Email Address</Text>
      <TextInput
        label="Email Address"
        value={email}
        onChangeText={onChangeEmail}
        placeholder="someone@gmail.com"
        autoCapitalize="none"
      />
      <HelperText type="error" visible={emailError} style={styles.helper}>
        Invalid email format - should contain "@" and "."
      </HelperText>
      <View style={styles.break}></View>
      <Text style={styles.text}>Password</Text>
      <TextInput
        label="Password" 
        secureTextEntry={hidePass ? true : false} 
        value={password} 
        onChangeText={onChangePassword} 
        placeholder="Password"
        autoCapitalize="none"
        right={
          <TextInput.Icon
            icon="eye"
            iconColor={MD3Colors.primary50}
            size={20}
            onPress={() => setHidePass(!hidePass)}
          />
        }
      />
      <HelperText type="error" visible={passwordError} style={styles.helper}>
        Passwords should be at least 6 characters in length and include at least one number
      </HelperText>
      <View style={styles.break}></View>
      <Button
        style={styles.loginButton}
        icon={"account-arrow-right"}
        mode="contained"
        onPress={() => handleLogin()}
      >Login</Button>
      <View style={styles.break}></View>
      <View style={styles.break}></View>
      <Text style={styles.registerText}>Don't have an account?</Text>
      <Button onPress={() => navigation.navigate("Register")}>Click here to register.</Button>
    </TouchableOpacity>
    );
  };

  const styles = StyleSheet.create({
    text: {
      fontSize: scaleSize(18),
      color: MD3DarkTheme.colors.primary,
      padding: scaleSize(5),
    },
    registerText: {
      color: "#fff",
      fontSize: scaleSize(16),
      alignSelf: "center",
    },
    helper: {
      fontSize: scaleSize(15),
      color: "#F62217",
    },
    break: {
      margin: scaleSize(8),
    },
    loginButton: {
      flex: 1,
      width: scaleSize(200),
      alignSelf: "center"
    }
});
  
export default LoginForm;
