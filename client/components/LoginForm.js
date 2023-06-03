import React, {useState} from 'react';
import { TextInput, HelperText, MD3Colors, Button } from 'react-native-paper';
import { View, StyleSheet, Text, Alert } from "react-native";
import { scaleSize } from '../constants/Layout';

const API_URL = `http://http://localhost:3001`;

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);

  const [hidePass, setHidePass] = useState(true);

  const [token, setToken] = useState("");
  
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
    if (!emailError && !passwordError) { // ensure there are no errors before sending post requests
      login(); // call login function
    } else {
      if (emailError || passwordError) {
        return (
          Alert.alert("Error", "Your email and/or password do not follow the appropriate formats. Please fix and try again.",
        ));
      }
    }
  };

  const verify = () => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token.token}`,
      },
      body: JSON.stringify({email:email,password:password})
    };
    fetch('http://localhost:3001/users/login', options)
      .then(response => response.json())
      .then(response => console.log("hi"))
      .catch(err => console.log(err))
  };

  const login = () => {
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    };
    fetch("http://localhost:3001/users/login", options)
      .then((response) => response.json())
      .then((response) => {
        const { token } = response;
        setToken(token); // Store the token in state or AsyncStorage
        verify(); // Call the verification function
      })
      .catch((err) => console.error(err));
  };

  return (
    <View>
      <View style={styles.break}></View>
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
    </View>
    );
  };

  const styles = StyleSheet.create({
    helper: {
      fontSize: scaleSize(15),
      color: "#F62217",
    },
    break: {
      margin: scaleSize(10),
    },
    loginButton: {
      flex: 1,
      width: scaleSize(200),
      alignSelf: "center"
    }
});
  
export default LoginForm;
