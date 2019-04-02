import React from "react";
import { Button, View, Text } from "react-native";

class ItemDetails extends React.Component {

  foodIdentified = this.props.navigation.state.params.foodItem

  foodsRoute = `http://localhost:3001/foods/${this.foodIdentified}`

  getFoodName() {
    return fetch(this.foodsRoute)
      .then((response) => response.json())
      .then((responseJson) => {  
        this.setState({
          food_id: responseJson[0].usda_id
        })
        return responseJson.usda_id;
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    this.getFoodName()
    // console.log(this.state.food_id)
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center"}}>
        <Text>Check out the nutrients in {this.foodIdentified}!</Text> 
      </View>
    );
  }
}

export default ItemDetails;

