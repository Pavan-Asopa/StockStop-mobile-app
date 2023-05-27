import React, {useState} from 'react';
import { TextInput, HelperText, MD3Colors  } from 'react-native-paper';
import {View, StyleSheet, Text} from "react-native";


const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [hidePass, setHidePass] = useState(true);
    

    const onChangeEmail = email => setEmail(email);
    const hasErrorsEmail = () => {
        return !email.includes('@');
      };

      const onChangePassword = password => setPassword(password);
      const hasErrorsPassword = () => {
        return password.length < 6 ;
      };
  
    return (
        <View>
        <TextInput label="Email Address" value={email} onChangeText={onChangeEmail} placeholder='someone@gmail.com' />
        <HelperText type="error" visible={hasErrorsEmail()}>
            Email should contain '@'
        </HelperText>

        <TextInput label="Password" 
        secureTextEntry={hidePass ? true : false} 
        value={password} 
        onChangeText={onChangePassword} 
        right={
            <TextInput.Icon
              name="eye"
              iconColor="#22C55E"
              onPress={() => setHidePass(!hidePass)}
            />
          }
         />
        <HelperText type="error" visible={hasErrorsPassword()}>
            Password should be atleast 6 characters
        </HelperText>
        
    </View>
    );
  };
  
  export default LoginForm;