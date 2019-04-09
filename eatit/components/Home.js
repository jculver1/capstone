import React from "react";
import { View, Text, Image, StyleSheet} from "react-native";
import { createStackNavigator, createAppContainer} from "react-navigation";
import Camera from "./Camera";
import ItemDetails from './ItemDetails'
import { Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';



class HomeScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Image source={require('../assets/logo2.png')}/>
        <Text style={styles.subHeader}>Checkout the nutrients in your food</Text>
        <Button 
          style={styles.button}
          buttonStyle={{
            backgroundColor: '#00CC99',
            fontFamily: 'Cochin',
          }}
          title="Click here to get started!"
          onPress={() => this.props.navigation.navigate('CheckIt')}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex: 1, 
    alignItems: "center", 
    justifyContent: "center",
    fontFamily: 'Cochin',
    marginBottom: 110,
  },
  subHeader:{
    fontSize: 22, 
    marginTop: 15,
    marginBottom: 20,
    fontFamily: 'Cochin',
    color: "#404040"
  },
  button: {
    borderRadius: 15,
    marginTop: 10, 
    color: '#404040', 
 }
})

const AppNavigator = createStackNavigator({

    Home: HomeScreen,
    CheckIt: Camera,
    ItemInformation: ItemDetails,
  
},
{
    initialRouteName: 'Home' ,
}
);

export default createAppContainer(AppNavigator);