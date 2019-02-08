import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar ,
  TouchableOpacity,
  TextInput
} from 'react-native';


import {Actions} from 'react-native-router-flux';

export default class Signup extends Component<{}> {
  constructor(){
    super()
   
   this.state = {
      Name: '',
      nameValidate:true,
      Username: '',
      Email: '',
      mailValidate:true,
      Phone:'',
      phoneValidate:true,
      Password: '',
      confirmpass:'',
   }

}

saveData = () =>
      {
          this.setState({ loading: true, disabled: true }, () =>
          {
              fetch('http://192.168.2.15/vanns/Login/user_registration.php',
              {
                  method: 'POST',
                  headers: 
                  {
                      'Accept': 'application/json',
                      'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(
                  {
                      Name: this.state.Name,
                      Username: this.state.Username,
                      Email: this.state.Email,
                      Phone: this.state.Phone, 
                      Password: this.state.Password
                  })
   
              }).then((response) => response.json()).then((responseJson) =>
              {
                  if(responseJson == "Registered Succesfully")
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

  goBack() {
      Actions.pop()
  }

validate(text,type)
{
  alph=/^[a-zA-Z]+$/
  mailformat=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
  phoneformat=/^\d{10}$/

  if(type=='Username')
  {
    if(alph.test(text))
    {
      this.setState({
        nameValidate:true,
      })
    }
    else
    {
      this.setState({
        nameValidate:false,
      })
    }
  }

  else if(type=='Email')
  {
    if(text != null)
    {
      this.setState({
        mailValidate:true,
      })
    }
    else
    {
      this.setState({
        mailValidate:false,
      })
    }
  }

  else if(type=='mail')
  {
    if(mailformat.test(text))
    {
      this.setState({
        mailValidate:true,
      })
    }
    else
    {
      this.setState({
        mailValidate:false,
      })
    }
  }
  else if(type=='Phone')
  {
    if(phoneformat.test(text))
    {
      this.setState({
        phoneValidate:true,
      })
    }
    else
    {
      this.setState({
        phoneValidate:false,
      })
    }
    
  }
  

}   

	render() {
		return(
			<View style={styles.container}>
				 <View>
         <Text style = {styles.textTitle}> SIGN UP </Text>
         
    </View> 
        <TextInput style = {[styles.inputBox,!this.state.nameValidate? styles.error:null]}
              underlineColorAndroid='rgba(0,0,0,0)' 
              placeholder="Name"
              placeholderTextColor = "#ffffff"
              selectionColor="#fff"
              onChangeText = {(text) => this.setState({ Name: text })}
              />

              <TextInput style={styles.inputBox} 
              underlineColorAndroid='rgba(0,0,0,0)' 
              placeholder="Username"
              placeholderTextColor = "#ffffff"
              selectionColor="#fff"
              onChangeText = {(text) => this.setState({ Username: text })}
              />

              <TextInput style = {[styles.inputBox,!this.state.mailValidate? styles.error:null]}
              underlineColorAndroid='rgba(0,0,0,0)' 
              placeholder="Email"
              placeholderTextColor = "#ffffff"
              selectionColor="#fff"
              //onChangeText = {(text) => this.validate(text,'Email')}
              onChangeText = {(text) => this.setState({ Email: text })}
              />

              <TextInput style = {[styles.inputBox,!this.state.phoneValidate? styles.error:null]} 
              underlineColorAndroid='rgba(0,0,0,0)' 
              placeholder="Phone"
              placeholderTextColor = "#ffffff"
              selectionColor="#fff"
              onChangeText = {(text) => this.setState({ Phone: text })}
              />

               <TextInput style={styles.inputBox} 
              underlineColorAndroid='rgba(0,0,0,0)' 
              placeholder="Password"
              placeholderTextColor = "#ffffff"
              selectionColor="#fff"
              secureTextEntry={true}
              onChangeText = {(text) => this.setState({ Password: text })}
              />

               <TextInput secureTextEntry={true} style={styles.inputBox} 
              underlineColorAndroid='rgba(0,0,0,0)' 
              placeholder="Confirm Password"
              placeholderTextColor = "#ffffff"
              selectionColor="#fff"
              />

              <TouchableOpacity style={styles.button} onPress = { this.saveData }>
             <Text style={styles.buttonText}>SignUp</Text>
           </TouchableOpacity>     


              
				<View style={styles.signupTextCont}>
					<Text style={styles.signupText}>Already have an account?</Text>
					<TouchableOpacity onPress={this.goBack}><Text style={styles.signupButton}> Sign in</Text></TouchableOpacity>
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
    margin:15,
  
  },
  error: {
    borderWidth:2,
    borderColor:'red',
   },
   textTitle: {
    fontSize:30,
    textAlign:'center',
     color:'white',
     margin:15,
   },
    button: {
    width:300,
    backgroundColor:'#1c313a',
     borderRadius: 25,
      marginVertical: 10,
      paddingVertical: 13,
  },
  buttonText: {
    fontSize:16,
    fontWeight:'500',
    color:'#ffffff',
    textAlign:'center',
  }
});
