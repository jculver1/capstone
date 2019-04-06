import React from "react";
import { Button, View, Text, Image } from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";
import Camera from "./Camera";
import ItemDetails from './ItemDetails'


class HomeScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Image source={require('../assets/logo2.png')}/>
        <Button
          title="Check the Nutrients!"
          onPress={() => this.props.navigation.navigate('CheckIt')}
        />
      </View>
    );
  }
}

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