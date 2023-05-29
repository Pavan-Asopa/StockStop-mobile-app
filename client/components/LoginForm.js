import React, {useState} from 'react';
import { TextInput, HelperText, MD3Colors, Button } from 'react-native-paper';
import { View, StyleSheet, Text } from "react-native";
import { scaleSize } from '../constants/Layout';

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hidePass, setHidePass] = useState(true);
    
  const onChangeEmail = (email) => setEmail(email);
  const hasErrorsEmail = () => {
    return !email.includes("@");
  };

  const onChangePassword = (password) => setPassword(password);
  const hasErrorsPassword = () => {
    return password.length < 6 ;
  };
  
  return (
    <View>
      <View style={styles.break}></View>
      <TextInput
        label="Email Address"
        value={email}
        onChangeText={onChangeEmail}
        placeholder="someone@gmail.com"
      />
      <HelperText type="error" visible={hasErrorsEmail()}>
        Email should contain '@' sign
      </HelperText>
      <View style={styles.break}></View>
      <TextInput
        label="Password" 
        secureTextEntry={hidePass ? true : false} 
        value={password} 
        onChangeText={onChangePassword} 
        placeholder="Password"
        right={
          <TextInput.Icon
            icon="eye"
            iconColor={MD3Colors.primary50}
            size={20}
            onPress={() => setHidePass(!hidePass)}
          />
        }
      />
      <HelperText type="error" visible={hasErrorsPassword()}>
        Passwords should be at least 6 characters in length
      </HelperText>
      <View style={styles.break}></View>
      <Button
        style={styles.loginButton}
        icon={"account-arrow-right"}
        mode="contained"
      >
        Login
      </Button>
    </View>
    );
  };

  const styles = StyleSheet.create({
    header: {
      fontSize: scaleSize(20),
      color: "#fff",
      fontWeight: "bold",
      alignSelf: "center",
      marginTop: scaleSize(20),
      marginBottom: scaleSize(20),
    },
    break: {
      margin: scaleSize(15),
    },
    loginButton: {
      flex: 1,
      width: scaleSize(200),
      alignSelf: "center"
    }
});
  
export default LoginForm;
