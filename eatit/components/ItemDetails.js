import React from "react";
import { Button, View, Text } from "react-native";

class ItemDetails extends React.Component {

  constructor(props){
		super(props);
     
    }

    // componentDidMount(){
    //   this.getFoods()
    //   this.getNutrients()
    // }

  foodIdentified = this.props.navigation.state.params.foodItem

  foodsRoute = `http://localhost:3001/foods/${this.foodIdentified}`

  componentDidMount(){
    return fetch(this.foodsRoute)
    .then(response => response.json())
    .then(responseJson => {
      let food_id = responseJson[0].usda_id
      return fetch(`https://api.nal.usda.gov/ndb/reports/?ndbno=${food_id}&type=f&format=json&api_key=g03EsNMIdLVGVFxer9G0rkguZEPyUf2dcDyxlKH6&nutrients=205&nutrients=204&nutrients=208&nutrients=269`)
      .then(respons => respons.json())
      .then(responseJson => {
        console.log(responseJson, 'hi')
      })
      .catch(error => {
        console.error(error)
      })
    })
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center"}}>
        <Text>Check out the nutrients in {this.foodIdentified}!</Text> 
      </View>
    );
  }
}

export default ItemDetails;
