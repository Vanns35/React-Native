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

export default class Home extends Component<{}> {

	constructor(props)
     {
        super(props);
    }

    render() {
		return(
			<View>
				<Logo/>
				<View>
          		<Text> welcome</Text>
				</View>
			</View>
			)
	}
}