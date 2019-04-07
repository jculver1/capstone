import React from "react";
import { Button, View, Text, Image, StyleSheet} from "react-native";
import { createStackNavigator, createAppContainer} from "react-navigation";
import Camera from "./Camera";
import ItemDetails from './ItemDetails'


class HomeScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Image source={require('../assets/logo2.png')}/>
        <Text style={styles.subHeader}>Checkout the nutrients in your food</Text>
        <Button
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
    justifyContent: "center"
  },
  subHeader:{
    fontSize: 20, 
    marginTop: 20
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