import React from "react";
import { Button, View, Text, StyleSheet, FlatList, ListView } from "react-native";
import { ScrollView } from "react-native-gesture-handler";


const DisplayData = (props) => {
  if(props.checkLoaded){
    return props.nutrientData.map((item) => {
          return(
            <Text>{item.name + ' ' + item.value + ''}</Text>
          )
        })
  }else{
    return <Text>Loading...</Text>
  }
}

class ItemDetails extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      nutrientData: [],
      checkLoaded: false
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
        this.setState(
          {nutrientData : responseJson.report.food.nutrients,
          checkLoaded : !this.state.checkLoaded
          }
          )
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
        <DisplayData nutrientData={this.state.nutrientData} checkLoaded={this.state.checkLoaded}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  }
});

export default ItemDetails;
