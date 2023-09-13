import { useEffect, useState } from "react";
import { View, Image, Text} from "react-native";
import { getDish } from "../../services/omdbService";
import { ListComponentStyle } from "./styles";
import { StatusBar } from 'expo-status-bar';
import { TouchableOpacity,ScrollView, StyleSheet } from "react-native";
import { useContextState } from "../../../ContextState.js";
import Info from './Info';

const Child = ({route, navigation}) => {
    const { json } = route.params;
    const [dish, setDish] = useState([]);
    const { contextState, setContextState } = useContextState();

    useEffect(() => {
        getDish(json).then((response) => {
            setDish(response);
        }).catch((error) => {
            console.log(error);
        });
    }, [])
    
    return (
        <View key={dish.id}>
            <Image style={ListComponentStyle.Image} source={{uri: dish.image}}/>
            <Text>Nombre: {dish.title}</Text>
            <Text>Precio: USD{dish.pricePerServing}</Text>
            <Text>Tiempo en preparación: {dish.readyInMinutes} minutos</Text>
            <Text>Vegano: {vegan(dish.vegan)}</Text>
            <Text>HealthScore: {dish.healthScore}</Text>
            <TouchableOpacity onPress={()=>{setContextState({ newValue: dish.pricePerServing, type: "SET_PRECIOTOTALPLUS" });}}><Text>Agregar</Text></TouchableOpacity>
            <Info></Info>
        </View>
    )
}

const vegan = (vegan) => {
    if(vegan === true){
        return(<Text>Sí</Text>)
    }
    else{
        return(<Text>No</Text>)
    }
}


export default Child;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:'#012245',
    },
    
  });
