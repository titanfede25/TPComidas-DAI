import { useEffect, useState } from "react";
import { View, Image, Text} from "react-native";
import { getDish } from "../../services/omdbService";
import { ListComponentStyle } from "./styles";
import { StatusBar } from 'expo-status-bar';
import { TouchableOpacity,ScrollView, StyleSheet } from "react-native";
/*no se ve */

const Child = ({route, navigation}) => {
    const { json } = route.params;
    const [dish, setDish] = useState([]);
    useEffect(() => {
        getDish(json).then((response) => {
            setDish(response);
        }).catch((error) => {
            console.log(error);
        });
    }, [])
    console.log(dish)
    
    return (
        <View style={ListComponentStyle.container} >
        <Text>{json}</Text>
        </ View >
    )
}

export default Child;
/*
<Text>¿Vegano? {response.vegan}</Text>
<Text>HealthScore: {response.healthScore}</Text>*/
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:'#012245',
    },
    
  });
