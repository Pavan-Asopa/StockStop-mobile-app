import React, { useState } from 'react';
import { TextInput, HelperText, MD3Colors, Button, MD3DarkTheme } from 'react-native-paper';
import { View, StyleSheet, Text, Alert, TouchableOpacity } from "react-native";
import { scaleSize } from '../constants/Layout';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [hidePass, setHidePass] = useState(true);

  const navigation = useNavigation();
  
  // as text input in email field changes, check for error
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
    // if no errors and all fields are complete
    if (email !== "" && password !== "" && !emailError && !passwordError) {
      login(); // call login function

    // if errors or incomplete fields, display alert
    } else { 
      if (email === "" || password === "" || emailError || passwordError) {
        return (
          Alert.alert("Error", "Your email and/or password do not follow the appropriate formats. Please fix and try again.",
        ));
      }
    }
  };

  // function to clear password from form before navigating to another screen
  const clearForm = () => {
    setPassword("");
  }

  // POST request to check whether user exists in database and if so, to allow them to login
  const login = async () => {
    try {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({email: email, password: password}),
      };
  
      fetch("http://172.22.26.70:3001/users/login", options)
        .then((response) => response.json())
        .then((response) => {
          if(response.success){
            AsyncStorage.setItem("@Token", JSON.stringify(response)); // set token in AsyncStorage so other POST requests can use it
            navigation.navigate("Home", {token: response}); // navigate to main application screen
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
      clearForm(); // clear text input in form
    }
  };

  return (
    <TouchableOpacity>
      <View style={styles.break}></View>
      <Text style={styles.text}>Email Address</Text>
      <TextInput
        style={styles.input}
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
        style={styles.input}
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
        labelStyle={styles.loginButtonText}
        style={styles.loginButton}
        icon={"account-arrow-right"}
        mode="contained"
        onPress={() => handleLogin()}
      >Login</Button>
      <View style={styles.break}></View>
      <View style={styles.break}></View>
      <Text style={styles.registerText}>Don't have an account?</Text>
      <Button
        labelStyle={styles.registerButton}
        onPress={() => navigation.navigate("Register")}>Click here to register.</Button>
    </TouchableOpacity>
    );
  };

  const styles = StyleSheet.create({
    text: {
      fontSize: scaleSize(18),
      color: MD3DarkTheme.colors.primary,
      padding: scaleSize(10),
    },
    input: {
      marginLeft: scaleSize(10),
      marginRight: scaleSize(10),
    },
    registerText: {
      color: "#fff",
      fontSize: scaleSize(18),
      alignSelf: "center",
    },
    helper: {
      fontSize: scaleSize(15),
      color: "#F62217",
    },
    break: {
      margin: scaleSize(8),
    },
    loginButtonText: {
      fontSize: scaleSize(16),
    },
    loginButton: {
      flex: 1,
      width: scaleSize(200),
      alignSelf: "center"
    },
    registerButton: {
      fontSize: scaleSize(16),
    }
});
  
export default LoginForm;
