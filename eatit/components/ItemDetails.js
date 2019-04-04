import React from "react";
import { Button, View, Text, StyleSheet, FlatList } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

class ItemDetails extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      nutrientData: []
    };
    }

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
        this.setState({nutrientData : responseJson.report.food})
        console.log(this.state.nutrientData)
      })
      .catch(error => {
        console.error(error)
      })
    })
  }

  // nutrientList() {
  //   return this.state.nutrientData.nutrients.map((item) => {
  //     return(
  //       <Text>{item.name}</Text>
  //     )
  //   })
  // }

  render() {
    console.log(this.state.nutrientData)
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center"}}>
        <Text>Check out the nutrients in {this.foodIdentified}!</Text> 
        <ScrollView>
         
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  welcome: {
    flex: 1,
    margin: 20,
    backgroundColor: 'orange',
    margin: 10,
    textAlign: 'center',
    fontSize: 20,
    paddingTop: 70,
  }
});

export default ItemDetails;
