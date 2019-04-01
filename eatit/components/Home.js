import React from "react";
import { Button, View, Text } from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";
import Camera from "./Camera";


class HomeScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Home Screen</Text>
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
  
},
{
    initialRouteName: 'Home' ,
}
);

export default createAppContainer(AppNavigator);