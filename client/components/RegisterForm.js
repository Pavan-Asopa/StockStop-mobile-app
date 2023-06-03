import React, {useState} from 'react';
import { TextInput, HelperText, MD3Colors, Button } from 'react-native-paper';
import { View, StyleSheet, Text } from "react-native";
import { scaleSize } from '../constants/Layout';

const RegisterForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hidePass, setHidePass] = useState(true);
  const [password2, setPassword2] = useState("");
  const [emailError, setEmailError] = useState(true);
  const [passwordError, setPasswordError] = useState(true);
  const [matchError, setMatchError] = useState("");
    
  const onChangeEmail = (email) => {
    if(!email.includes("@")){
        setEmailError(true);
    }else{ 
        setEmailError(false)
    };
        setEmail(email);
  }

  const onChangePassword = (password) => {
    if(password.length < 6 ){
        setPasswordError(true);
    }else{ 
        setPasswordError(false)
    };
        setPassword(password);
  }

  const onChangePassword2 = (password2) => {
    if(password !== password2){
        setMatchError(true);
      
    }else{ 
        setMatchError(false)
    };
        setPassword2(password2);
  }


  const handlePress = () => {
    if(!emailError && !passwordError && !matchError){
        register();
    }else{
        if(emailError) {
            console.log("Email format is incorrect")
        }
    }
  }

  const register = () => {
    const options = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({email:email,password:password})
      };
      
      fetch('http://localhost:3001/users/register', options)
        .then(response => response.json())
        .then(response => console.log(response.error))
        .catch(err => console.error(err));
    }



  
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
      <HelperText type="error" visible={emailError}>
        Email should contain '@' sign
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
      <HelperText type="error" visible={passwordError}>
        Passwords should be at least 6 characters in length and include atleast one number
      </HelperText>
      <View style={styles.break}></View>
      <TextInput
        label="Confirm Password" 
        secureTextEntry={hidePass ? true : false} 
        value={password2} 
        onChangeText={onChangePassword2} 
        placeholder="Confirm Password"
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
      <HelperText type="error" visible={matchError}>
        Passwords do not match
      </HelperText>
      <View style={styles.break}></View>
      <Button
        style={styles.loginButton}
        icon={"account-arrow-right"}
        mode="contained"
        onPress={() => handlePress()}
      >
        Register
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
  
export default RegisterForm;
