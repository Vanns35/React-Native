import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar ,
  TextInput,
  TouchableOpacity 
} from 'react-native';

import Logo from '../components/Logo';


import {Actions} from 'react-native-router-flux';

export default class Login extends Component<{}> {

  
  constructor(props)
      {
          super(props);
   
          this.state = {
            Email: '',
            mailValidate:true,
            Password: '',
            loading: false, 
            disabled: false, 
          }
      }
   
      saveData = () =>
      {
          this.setState({ loading: true, disabled: true }, () =>
          {
              fetch('http://192.168.2.15/vanns/Login/user_login.php',
              {
                  method: 'POST',
                  headers: 
                  {
                      'Accept': 'application/json',
                      'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(
                  {
                      Email: this.state.Email,
   
                      Password: this.state.Password
                  })
   
              }).then((response) => response.json()).then((responseJson) =>
              {
                  if(responseJson == "Password Matched")
                  {
                    Actions.home();
                    this.setState({ loading: false, disabled: false });
                  }
                  
                  else
                  {
                    alert(responseJson);
                    this.setState({ loading: false, disabled: false });
                  }
              }).catch((error) =>
              {
                  console.error(error);
                  this.setState({ loading: false, disabled: false });
              });
          });
      }

	render() {
		return(
			<View style={styles.container}>
				<Logo/>
				
        <TextInput style={styles.inputBox} 
              underlineColorAndroid='rgba(0,0,0,0)' 
              placeholder="Email"
              placeholderTextColor = "#ffffff"
              selectionColor="#fff"
              onChangeText = {(text) => this.setState({ Email: text })}
              //keyboardType="email-address"
              //onSubmitEditing={()=> this.password.focus()}
              />
          <TextInput style={styles.inputBox} 
              underlineColorAndroid='rgba(0,0,0,0)' 
              placeholder="Password"
              secureTextEntry={true}
              placeholderTextColor = "#ffffff"
              onChangeText = {(text) => this.setState({ Password: text })}
              //ref={(input) => this.password = input}
              />  
           <TouchableOpacity style={styles.button} onPress = { this.saveData }>
             <Text style={styles.buttonText}>Login</Text>
           </TouchableOpacity>     

				<View style={styles.signupTextCont}>
					<Text style={styles.signupText}>Don't have an account yet?</Text>
          <TouchableOpacity onPress={Actions.signup}>
          <Text style={styles.signupButton}> Signup</Text></TouchableOpacity>
				</View>
			</View>	
			)
	}
}

const styles = StyleSheet.create({
  container : {
    backgroundColor:'#455a64',
    flex: 1,
    alignItems:'center',
    justifyContent :'center'
  },
  signupTextCont : {
  	flexGrow: 1,
    alignItems:'flex-end',
    justifyContent :'center',
    paddingVertical:16,
    flexDirection:'row'
  },
  signupText: {
  	color:'rgba(255,255,255,0.6)',
  	fontSize:16
  },
  signupButton: {
  	color:'#ffffff',
  	fontSize:16,
  	fontWeight:'500'
  },
  inputBox: {
    width:300,
    backgroundColor:'rgba(255, 255,255,0.2)',
    borderRadius: 25,
    paddingHorizontal:16,
    fontSize:16,
    color:'#ffffff',
    marginVertical: 10
  },
  button: {
    width:300,
    backgroundColor:'#1c313a',
     borderRadius: 25,
      marginVertical: 10,
      paddingVertical: 13
  },
  buttonText: {
    fontSize:16,
    fontWeight:'500',
    color:'#ffffff',
    textAlign:'center'
  }
});
