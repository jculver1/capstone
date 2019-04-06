import React from "react";
import { Button, View, Text, StyleSheet, FlatList, ListView } from "react-native";
import { ScrollView } from "react-native-gesture-handler";


const DisplayData = (props) => {
  if(props.checkLoaded && props.DRILoaded){
    const vitAndMin = props.nutrientData.filter(item => item.group === 'Minerals' || item.group === 'Vitamins' && item.value > 0)
    const findPercentages = vitAndMin.map(item => {
      for(let i = 0; i < props.DRI.length; i++){
        if(props.DRI[i].name === item.name){
          return(`${item.name}: ${((item.value / props.DRI[i].daily_value) * 100).toFixed(2)}%`)
      }
      }
    })
   const regex = /[+-]?\d+(\.\d+)?/g;
   
   const customSort = function (a, b) {
      return ((b.match(regex)) - ((a.match(regex))));
  } 
  const sortByPercentages = findPercentages.sort(customSort)

    return sortByPercentages.map((item) => {
          return(
              <Text>{item}</Text> 
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
      checkLoaded: false,
      DRI: [],
      DRILoaded: false
    };
    }

  foodIdentified = this.props.navigation.state.params.foodItem

  foodsRoute = `https://glacial-wave-75572.herokuapp.com/foods/${this.foodIdentified}`

  nutrientRoute = 'https://glacial-wave-75572.herokuapp.com/nutrients'

  componentDidMount(){
    this.fetchNutrientComparisons()
    return fetch(this.foodsRoute)
    .then(response => response.json())
    .then(responseJson => {
      let food_id = responseJson[0].usda_id
      console.log(food_id)
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

  fetchNutrientComparisons(){
    return fetch(this.nutrientRoute)
    .then(response => response.json())
    .then(responseJson => {
      this.setState(
        {DRI: responseJson,
        DRILoaded: true}
      )
      console.log(this.state.DRI)
    })
    .catch(error => {
      console.error(error)
    })
  }


  render() {
    return (
      <View style={styles.container}>
        <Text>Check out the nutrients in {this.foodIdentified}!</Text> 
        <ScrollView style={styles.scrollContent}>
          <DisplayData nutrientData={this.state.nutrientData} checkLoaded={this.state.checkLoaded} DRI={this.state.DRI} DRILoaded={this.state.DRILoaded}/>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    justifyContent: 'center',
    flex: 1,
    alignItems: "center"
  },

  scrollContent: {
    paddingVertical: 20
  }
});

export default ItemDetails;
