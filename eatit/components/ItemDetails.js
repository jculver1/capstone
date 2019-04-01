import React from "react";
import { Button, View, Text } from "react-native";

class ItemDetails extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center", color: "white" }}>
        <Text>Nutrient Page</Text>
        {/* <Button
          title="Check another Item!"
          onPress={() => this.props.navigation.navigate('CheckIt')}
        /> */}
      </View>
    );
  }
}

export default ItemDetails;

