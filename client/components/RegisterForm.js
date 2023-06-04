import React, {useState} from 'react';
import { TextInput, HelperText, MD3Colors, Button, MD3DarkTheme } from 'react-native-paper';
import { View, StyleSheet, Text, Alert } from "react-native";
import { scaleSize } from '../constants/Layout';
import { useNavigation } from '@react-navigation/native';

const RegisterForm = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [password2, setPassword2] = useState("");
  const [matchError, setMatchError] = useState(false);

  const [hidePass, setHidePass] = useState(true);
  const [hidePass2, setHidePass2] = useState(true);

  const navigation = useNavigation();

  // as text input in email field changes, check for errors
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

  // as text input in second password field changes, compare this second password to first password
  const onChangePassword2 = (password2) => {
    if (password !== password2) { // ensure both passwords match, as this field is meant to confirm the password
      setMatchError(true);
    } else { 
      setMatchError(false);
    }
    setPassword2(password2); // set password2 as text input changes
  };

  // function to handle actions when user clicks the register button
  const handleRegister = () => {
    // ensure that all fields have been completed and there are no errors before registering user
    if (email !== "" && password!== "" && password2!== "" && !emailError && !passwordError && !matchError) {
      register(); // call register function to add new user to database
    } else {
      if (email === "" || password === "" || password2 === "" || emailError || passwordError || matchError) {
        return (
          Alert.alert("Error", "Unable to register user with provided details. Please check the provided email and/or password.",
        ));
      }
    }
  };

  // register function that adds new user to database
  const register = () => {
    const options = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({email: email, password: password})
    };
    fetch('http://localhost:3001/users/register', options)
      .then(response => response.json())
      .then(response => {
        console.log(response)
        if (response.success === true) {
          return (
            Alert.alert("Success", "New user registered.",
            [
              {
                text: "Login",
                onPress: () => navigation.navigate("Login"),
              },
            ]
          ));
        } else {
          return (
            Alert.alert("Error", "User already exists. Register with new details or login with existing account.",
            [
              {
                text: "Login",
                onPress: () => navigation.navigate("Login"),
              },
              {
                text: "Register",
              },
            ]
          ));
        }
      })
      .catch(err => console.error(err));
  };

  return (
    <View>
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
      <Text style={styles.text}>Confirm Password</Text>
      <TextInput
        label="Confirm Password" 
        secureTextEntry={hidePass2 ? true : false} 
        value={password2} 
        onChangeText={onChangePassword2} 
        placeholder="Confirm Password"
        autoCapitalize="none"
        right={
          <TextInput.Icon
            icon="eye"
            iconColor={MD3Colors.primary50}
            size={20}
            onPress={() => setHidePass2(!hidePass2)}
          />
        }
      />
      <HelperText type="error" visible={matchError} style={styles.helper}>
        Passwords do not match
      </HelperText>
      <View style={styles.break}></View>
      <Button
        style={styles.loginButton}
        icon={"account-plus"}
        mode="contained"
        onPress={() => handleRegister()}
      >Register</Button>
    </View>
    );
  };

  const styles = StyleSheet.create({
    text: {
      fontSize: scaleSize(18),
      color: MD3DarkTheme.colors.primary,
    },
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
  
export default RegisterForm;
