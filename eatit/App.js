import React  from 'react';
import { StyleSheet, View } from 'react-native';
import Camera from './components/Camera.js';
import { createAppContainer } from 'react-navigation';
import AppNavigator from './components/Home'

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {

	constructor(props){
		super(props);
		process.nextTick = setImmediate;
	}

	render() {
		return (
			// <View style={styles.container}>
			// 	<Camera />
		 	// </View>
			<AppContainer/>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',	
	}
});
