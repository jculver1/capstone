import React from "react";
import { View, Text, StyleSheet, Switch,   ActivityIndicator,} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Button, Header} from 'react-native-elements';


const DisplayData = (props) => {
  if(props.checkLoaded && props.DRILoaded){
    const vitAndMin = props.nutrientData.filter(item => item.group === 'Minerals' || item.group === 'Vitamins' && item.value > 0)

    const findMatch = vitAndMin.filter(item => {
      for(let i=0; i< props.DRI.length; i++){
        if(props.DRI[i].name === item.name){
          return item
        }
      }
    })

    let findPercentages = findMatch.map(item => {
      for(let i = 0; i < props.DRI.length; i++){
        if(item.name === props.DRI[i].name){
          return ({
            name: item.name, 
            percentage: ((item.value / props.DRI[i].daily_value) * 100).toFixed(2)
          })
        }
      }
    })

    const sortByPercentages = findPercentages.sort((a,b) => {
      return b.percentage - a.percentage
    })

    return sortByPercentages.map((item) => {
          return(
              <View style={{flexDirection: 'row', flex: 1, justifyContent: 'space-between', marginBottom:15 }}>
                <Text>{item.name+ '     '}</Text>
                <Text>{`${item.percentage}%`}</Text>
              </View>
          )
        })
  }else{
    return <Text>Loading...</Text>
  }
}


const DisplayMacroNutrients = (props) => {
  if(props.checkLoaded && props.DRILoaded){
    const macronutrients = props.nutrientData.filter(item => item.group === 'Proximates' && item.value > 0 && item.unit !== 'kJ' && item.name !== 'Ash')

  return macronutrients.map(item => {
    return(
      <View style={{flexDirection: 'row', flex: 1, justifyContent: 'space-between', marginBottom:15 }}>
        <Text>{item.name+ '     '}</Text>
        <Text>{`${item.value} ${item.unit}`}</Text>
      </View>
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
      DRILoaded: false,
      switchToggle: false
    };
    }

  foodIdentified = this.props.navigation.state.params.foodItem

  foodIdFormated = this.foodIdentified.charAt(0).toUpperCase() + this.foodIdentified.slice(1)

  foodsRoute = `https://glacial-wave-75572.herokuapp.com/foods/${this.foodIdentified}`

  nutrientRoute = 'https://glacial-wave-75572.herokuapp.com/nutrients'

  componentDidMount(){
    this.fetchNutrientComparisons()
    return fetch(this.foodsRoute)
    .then(response => response.json())
    .then(responseJson => {
      const food_id = responseJson[0].usda_id
      console.log(food_id)
      return fetch(`https://api.nal.usda.gov/ndb/reports/?ndbno=${food_id}&type=f&format=json&api_key=g03EsNMIdLVGVFxer9G0rkguZEPyUf2dcDyxlKH6&nutrients=205&nutrients=204&nutrients=208&nutrients=269`)
      .then(respons => respons.json())
      .then(responseJson => {
        this.setState(
          {
          nutrientData : responseJson.report.food.nutrients,
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

toggleSwitch = value => {
  this.setState({ switchToggle: !this.state.switchToggle })
}

AddToDailyLog(){
  if(this.state.checkLoaded && this.state.DRILoaded){
    let postData = this.state.nutrientData.map(item => {
      return ({
        name: item.name, 
        value: item.value,
        unit: item.unit 
    })
  })
  console.log(postData)

  this.setState(
    {postNutrients: postData}
  )
  }
}

  render() {
    return (
      <View style={styles.container}>

      {this.state.DRILoaded && this.state.checkLoaded ? 
      (
      <View style={styles.container}>
        <Header
          centerComponent={{ 
            text: this.foodIdFormated, 
            style:styles.headerText 
          }}
          containerStyle={{
            backgroundColor: '#EE4266',
            justifyContent: 'center',
            alignContent: 'center',
            alignItems: 'center'
          }}
        />
        <Text style={styles.header}>{this.state.switchToggle ? 'Macronutrients' : 'Micronutrients'}</Text>
        <Switch
        // style={{ marginTop: 5 }}
        style={styles.toggle}
        onValueChange={() => this.toggleSwitch()}
        value={!this.state.switchToggle}
        />
        <ScrollView style={styles.scrollContent}>
          {this.state.switchToggle ? (<DisplayMacroNutrients nutrientData={this.state.nutrientData} checkLoaded={this.state.checkLoaded} DRI={this.state.DRI} DRILoaded={this.state.DRILoaded}/>) : ( <DisplayData nutrientData={this.state.nutrientData} checkLoaded={this.state.checkLoaded} DRI={this.state.DRI} DRILoaded={this.state.DRILoaded}/>)}
        </ScrollView> 
        <View style={styles.buttonContainer}>
          <Button style={styles.button}
              buttonStyle={{
                backgroundColor: '#00CC99',
                fontFamily: 'Cochin',
            }}
            title="Check A Different Item"
            onPress={() => this.props.navigation.navigate('CheckIt')}
          />
        </View>
      </View>
      )
      : 
      (<ActivityIndicator size="large" color="#EE4266" style={styles.loader} />)
      }
      </View>

    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: 'space-between',
    alignItems:'center',
    // alignContent: 'space-between'
  },
  header:{
    marginTop: 20,
    fontSize: 23, 
    marginTop: 25,
    marginBottom: 25,
    fontFamily: 'Cochin',
    color: "#404040"
  },
  scrollContent: {
    flex: 1,
    marginTop: 20,
    // marginBottom: 20,
  },
  buttonContainer:{
    flex: 1, 
    flexDirection: 'row',  
    justifyContent: 'space-between',
    color: '#404040',
    paddingTop: 50
  },
  button: {
    borderRadius: 15,
    marginBottom: 5,
    marginTop: 25,
    marginLeft: 10,
    marginRight: 10,
    color: '#404040',
 },
 nutrientHeaders:{
  fontFamily: 'Cochin',
  color: '#EE4266',
  fontSize: 20
 },
 toggle:{
  marginBottom: 15,
  backgroundColor: '#EE4266', 
  borderRadius: 17
 },
 headerText:{
  color: '#fff',  
  fontFamily: 'Cochin', 
  fontSize: 40,
  alignSelf: 'center'
 },
 loader:{
   alignSelf: 'center',
   paddingTop: 300
 } 

});

export default ItemDetails;
