import React from "react";
import { Button, View, Text } from "react-native";

class ItemDetails extends React.Component {

  foodIdentified = this.props.navigation.state.params.foodItem

  render() {
    console.log(this.foodIdentified)
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center"}}>
        <Text>Check out the nutrients in {this.foodIdentified}!</Text> 
      </View>
    );
  }
}

export default ItemDetails;

